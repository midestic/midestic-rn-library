import { RefreshControl, ScrollView, type ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export type ThemedScrollViewProps = ScrollViewProps & {
  safe?: boolean;
  safeTop?: boolean;
  safeBottom?: boolean;
  /** Controlled pull-to-refresh state. */
  refreshing?: boolean;
  /** Called on pull-to-refresh. Use an async function to keep the spinner until it resolves. */
  onRefresh?: () => Promise<unknown> | void;
  className?: string;
  contentContainerClassName?: string;
};

export const ThemedScrollView = ({
  safe = false,
  safeTop = false,
  safeBottom = false,
  refreshing: controlledRefreshing,
  onRefresh,
  className = "",
  contentContainerClassName = "",
  style,
  contentContainerStyle,
  refreshControl,
  children,
  ...props
}: ThemedScrollViewProps) => {
  const insets = useSafeAreaInsets();
  const [uncontrolledRefreshing, setUncontrolledRefreshing] = useState(false);

  const isRefreshing = controlledRefreshing ?? uncontrolledRefreshing;

  const handleRefresh = async () => {
    if (controlledRefreshing === undefined) {
      setUncontrolledRefreshing(true);
    }

    try {
      await onRefresh?.();
    } finally {
      if (controlledRefreshing === undefined) {
        setUncontrolledRefreshing(false);
      }
    }
  };

  const shouldApplyTopInset = safe || safeTop;
  const shouldApplyBottomInset = safe || safeBottom;

  return (
    <ScrollView
      className={`flex-1 bg-white ${className}`}
      contentContainerClassName={contentContainerClassName}
      style={style}
      contentContainerStyle={[
        {
          ...(shouldApplyTopInset && {
            paddingTop: insets.top,
          }),
          ...(shouldApplyBottomInset && {
            paddingBottom: insets.bottom,
          }),
        },
        contentContainerStyle,
      ]}
      refreshControl={
        refreshControl ??
        (onRefresh ? <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} /> : undefined)
      }
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
