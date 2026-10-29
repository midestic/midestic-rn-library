import { type ReactNode } from "react";
import { Pressable, Modal as RNModal, Text, View } from "react-native";

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;

  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;

  className?: string;
  contentClassName?: string;
};

export const Modal = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnBackdropPress = true,
  className = "",
  contentClassName = "px-[16px] py-[40px]",
}: ModalProps) => {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/40 px-[16px]">
        <Pressable className="absolute inset-0" onPress={closeOnBackdropPress ? onClose : undefined} />

        <View className={`w-full rounded-[20px] bg-white ${className}`}>
          {(title || showCloseButton) && (
            <View className="flex-row items-center justify-between px-[16px]  ">
              {title ? (
                <Text className="font-sans text-[20px] font-[600] text-title-light">{title}</Text>
              ) : (
                <View />
              )}

              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  className="h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F5F5F5]"
                >
                  <Text className="text-[18px] text-title-light">×</Text>
                </Pressable>
              )}
            </View>
          )}

          <View className={contentClassName}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};
