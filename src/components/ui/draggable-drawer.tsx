import { type ComponentType, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// export type DrawerStepProps = {
//   currentStep: number;
//   nextStep: () => void;
//   previousStep: () => void;
//   goToStep: (step: number) => void;
//   onClose: () => void;
//   setDrawerHeight: (override: ResponsiveHeight | null | undefined) => void;
//   [key: string]: any;
// };

export type DrawerStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  onClose: () => void;
  setDrawerHeight: (override: ResponsiveHeight | null | undefined) => void;

  [key: string]: any;
};

export type ResponsiveHeight = number | `${number}%` | `${number}vh`;

export type DraggableDrawerProps = {
  visible: boolean;
  onClose: () => void;
  steps: ComponentType<DrawerStepProps>[];
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  peekHeight?: ResponsiveHeight;
  minHeight?: ResponsiveHeight;
  maxHeight?: ResponsiveHeight;
  initialMaxHeight?: ResponsiveHeight;
  bottomInset?: ResponsiveHeight;
  useModal?: boolean;
  initialStep?: number;
  step?: number;
  onStepChange?: (step: number) => void;
  overlayContent?: ReactNode | ((props: DrawerStepProps) => ReactNode);
  backdropClassName?: string;
  panelStyle?: StyleProp<ViewStyle>;
  className?: string;
  contentClassName?: string;
  stepProps?: Record<string, any>;
};

const TAB_BAR_HEIGHT = 91;

const asVhOrPercent = (raw: string): number | null => {
  const match = raw.trim().match(/^([\d.]+)\s*(vh|%)$/i);

  if (!match) return null;

  const value = parseFloat(match[1]);

  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  return value;
};

const resolveHeight = (input: ResponsiveHeight, percentBase: number, vhBase: number): number => {
  if (typeof input === "number") {
    return Number.isFinite(input) && input >= 0 ? input : 0;
  }

  const parsed = asVhOrPercent(input);

  if (parsed === null) {
    return 0;
  }

  const unit = input.trim().slice(-2).toLowerCase();

  if (unit === "vh") {
    return (parsed / 100) * vhBase;
  }

  return (parsed / 100) * percentBase;
};

export const DraggableDrawer = ({
  visible,
  onClose,
  steps,
  title,
  showCloseButton = true,
  closeOnBackdropPress = true,
  peekHeight = TAB_BAR_HEIGHT,
  minHeight,
  maxHeight = "100%",
  initialMaxHeight = "62%",
  bottomInset = TAB_BAR_HEIGHT,
  useModal = true,
  initialStep = 0,
  step,
  onStepChange,
  overlayContent,
  backdropClassName = "",
  panelStyle,
  className = "",
  contentClassName = "",
  stepProps = {},
}: DraggableDrawerProps) => {
  const { height: screenHeight } = useWindowDimensions();

  const [currentStep, setCurrentStep] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [measuredStep, setMeasuredStep] = useState<number | null>(null);
  const [stepHeightOverride, setStepHeightOverride] = useState<ResponsiveHeight | null | undefined>(
    undefined,
  );

  const bottomInsetPx = useMemo(
    () => resolveHeight(bottomInset, screenHeight, screenHeight),
    [bottomInset, screenHeight],
  );

  const availableHeight = useMemo(
    () => Math.max(0, screenHeight - bottomInsetPx),
    [screenHeight, bottomInsetPx],
  );

  const maxHeightPx = useMemo(
    () => resolveHeight(maxHeight, availableHeight, screenHeight),
    [maxHeight, availableHeight, screenHeight],
  );

  const minHeightPx = useMemo(
    () => (minHeight == null ? 0 : resolveHeight(minHeight, availableHeight, screenHeight)),
    [minHeight, availableHeight, screenHeight],
  );

  const peekHeightPx = useMemo(
    () => resolveHeight(peekHeight, availableHeight, screenHeight),
    [peekHeight, availableHeight, screenHeight],
  );

  const initialMaxHeightPx = useMemo(
    () => resolveHeight(initialMaxHeight, availableHeight, screenHeight),
    [initialMaxHeight, availableHeight, screenHeight],
  );

  const clampedMax = useMemo(
    () => Math.max(peekHeightPx, Math.min(maxHeightPx, availableHeight)),
    [peekHeightPx, maxHeightPx, availableHeight],
  );

  const clampedMin = useMemo(
    () => Math.max(peekHeightPx, Math.min(minHeightPx, clampedMax)),
    [peekHeightPx, minHeightPx, clampedMax],
  );

  const clampedPeek = useMemo(
    () => Math.max(0, Math.min(peekHeightPx, clampedMin)),
    [peekHeightPx, clampedMin],
  );

  const clampedInitialMax = useMemo(
    () => Math.max(clampedPeek, Math.min(initialMaxHeightPx, clampedMax)),
    [clampedPeek, initialMaxHeightPx, clampedMax],
  );

  const contentRequiredHeight = useMemo(() => contentHeight + headerHeight, [contentHeight, headerHeight]);

  const overridePx = useMemo(() => {
    if (stepHeightOverride == null) {
      return null;
    }

    return resolveHeight(stepHeightOverride, availableHeight, screenHeight);
  }, [stepHeightOverride, availableHeight, screenHeight]);

  const minHeightPxProvided = useMemo(() => {
    if (minHeight == null) {
      return null;
    }

    return resolveHeight(minHeight, availableHeight, screenHeight);
  }, [minHeight, availableHeight, screenHeight]);

  const naturalHeight = useMemo(() => {
    if (overridePx != null) {
      return Math.max(clampedPeek, Math.min(clampedMax, overridePx));
    }

    if (contentRequiredHeight > 0) {
      return Math.max(clampedPeek, Math.min(clampedMax, contentRequiredHeight));
    }

    if (minHeightPxProvided != null) {
      return Math.max(clampedPeek, Math.min(clampedMax, minHeightPxProvided));
    }

    return clampedPeek;
  }, [overridePx, contentRequiredHeight, minHeightPxProvided, clampedMax, clampedPeek]);

  const initialOpenHeight = useMemo(
    () => Math.min(clampedInitialMax, naturalHeight),
    [clampedInitialMax, naturalHeight],
  );

  const drawerHeight = useSharedValue(initialOpenHeight);

  const startHeight = useSharedValue(initialOpenHeight);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setCurrentStep(Math.max(0, Math.min(initialStep, steps.length - 1)));
    setContentHeight(0);
    setMeasuredStep(null);
    setStepHeightOverride(undefined);

    drawerHeight.value = clampedPeek;
  }, [visible, initialStep, steps.length, clampedPeek]);

  useEffect(() => {
    if (typeof step !== "number") {
      return;
    }

    setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)));
  }, [step, steps.length]);

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  useEffect(() => {
    if (!visible || measuredStep !== currentStep) {
      return;
    }

    const nextHeight = Math.min(clampedInitialMax, naturalHeight);

    if (nextHeight !== drawerHeight.value) {
      drawerHeight.value = withTiming(nextHeight, { duration: 260 });
    }
  }, [
    contentHeight,
    headerHeight,
    currentStep,
    measuredStep,
    visible,
    clampedInitialMax,
    naturalHeight,
    stepHeightOverride,
  ]);

  const setDrawerHeightFromStep = useCallback((override: ResponsiveHeight | null | undefined) => {
    setStepHeightOverride(override);
  }, []);

  useEffect(() => {
    const safeHeight = Math.max(clampedPeek, Math.min(drawerHeight.value, clampedMax));

    drawerHeight.value = safeHeight;
  }, [clampedPeek, clampedMax]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        return prev;
      }

      return prev + 1;
    });
  }, [steps.length]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev <= 0) {
        return prev;
      }

      return prev - 1;
    });
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= steps.length) {
        return;
      }

      setCurrentStep(step);
    },
    [steps.length],
  );

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .maxPointers(1)
        .activeOffsetY([-10, 10])
        .failOffsetX([-10, 10])
        .onStart(() => {
          startHeight.value = drawerHeight.value;
        })
        .onUpdate((event) => {
          const nextHeight = startHeight.value - event.translationY;

          const clampedHeight = Math.max(clampedPeek, Math.min(clampedMax, nextHeight));

          drawerHeight.value = clampedHeight;
        })
        .onEnd(() => {
          const currentHeight = drawerHeight.value;

          const middlePoint = (clampedMax + clampedPeek) / 2;

          let targetHeight = currentHeight;

          if (currentHeight >= middlePoint) {
            targetHeight = clampedMax;
          } else {
            targetHeight = clampedPeek;
          }

          drawerHeight.value = withTiming(targetHeight, { duration: 260 });
        }),
    [clampedPeek, clampedMax],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: drawerHeight.value,
  }));

  const CurrentStep = steps[currentStep];

  const renderedOverlayContent =
    typeof overlayContent === "function"
      ? overlayContent({
          currentStep,
          nextStep,
          previousStep,
          goToStep,
          onClose,
          setDrawerHeight: setDrawerHeightFromStep,
          ...stepProps,
        })
      : overlayContent;

  const drawerBottom = useModal ? bottomInsetPx : 0;

  const drawerContent = (
    <View pointerEvents="box-none" className="flex-1 bg-transparent">
      {useModal || closeOnBackdropPress ? (
        <Pressable
          pointerEvents={closeOnBackdropPress ? "auto" : "none"}
          className={`absolute inset-0 ${backdropClassName}`}
          onPress={closeOnBackdropPress ? onClose : undefined}
        />
      ) : null}

      {renderedOverlayContent}

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[{ bottom: drawerBottom }, animatedStyle]}
          className={`absolute w-full rounded-t-[24px] bg-transparent ${className}`}
        >
          <View className="flex-1 rounded-t-[24px] bg-white" style={panelStyle}>
            <View
              onLayout={(event) => {
                setHeaderHeight(event.nativeEvent.layout.height);
              }}
            >
              <View className="items-center py-[10px]">
                <View className="h-[5px] w-[45px] rounded-full bg-[#D9D9D9]" />
              </View>

              {(title || showCloseButton) && (
                <View className="flex-row items-center justify-between px-[20px] pt-[10px]">
                  {title ? (
                    <Text className=" text-[20px] font-[600] text-title-light">{title}</Text>
                  ) : (
                    <View />
                  )}

                  {showCloseButton && (
                    <Pressable
                      onPress={onClose}
                      className="h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F5F5F5]"
                    >
                      <Text className="text-[18px] text-title-light">×</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>

            <View
              key={currentStep}
              className={`${contentClassName}`}
              onLayout={(event) => {
                setContentHeight(event.nativeEvent.layout.height);
                setMeasuredStep(currentStep);
              }}
            >
              {CurrentStep && (
                <CurrentStep
                  currentStep={currentStep}
                  nextStep={nextStep}
                  previousStep={previousStep}
                  goToStep={goToStep}
                  onClose={onClose}
                  setDrawerHeight={setDrawerHeightFromStep}
                  {...stepProps}
                />
              )}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );

  if (!visible) {
    return null;
  }

  if (useModal) {
    return (
      <Modal visible transparent animationType="none" onRequestClose={onClose}>
        {drawerContent}
      </Modal>
    );
  }

  return drawerContent;
};
