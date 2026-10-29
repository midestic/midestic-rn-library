import { type ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";

export type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;

  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;

  className?: string;
  contentClassName?: string;
};

export const Drawer = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnBackdropPress = true,
  className = "",
  contentClassName = "",
}: DrawerProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable
          className="absolute inset-0 bg-black/40"
          onPress={closeOnBackdropPress ? onClose : undefined}
        />

        <View className={`w-full rounded-t-[24px] bg-white ${className}`}>
          {(title || showCloseButton) && (
            <View className="ml-auto w-[80%] flex-row items-center justify-between  px-[20px] pt-[20px]">
              {title ? (
                <Text className="text-center  font-sans text-[20px] font-[500] text-title-light">
                  {title}
                </Text>
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

          <View className={contentClassName}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};
