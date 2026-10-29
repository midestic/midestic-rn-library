import { type ReactNode } from "react";
import { Pressable, Text, TextInput, View, type TextInputProps } from "react-native";

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
};

export const Input = ({
  label,
  error,
  className = "",
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  ...props
}: InputProps) => {
  return (
    <View className={`w-full gap-[8px] ${className}`}>
      {label && <Text className="font-sans text-[16px] font-[400] text-title-light">{label}</Text>}

      <View
        className={`h-[56px] w-full flex-row items-center rounded-[12px] border ${
          error ? "border-warning bg-background-light" : "border-[#E7EAEB]"
        }`}
      >
        {leftIcon && (
          <Pressable
            onPress={onLeftIconPress}
            className="ml-[16px] h-[24px] w-[24px] items-center justify-center"
          >
            {leftIcon}
          </Pressable>
        )}

        <TextInput
          className="h-full flex-1 px-[16px] font-sans text-[16px] text-title-light placeholder:text-[14px] focus:outline-none focus:ring-0"
          placeholderTextColor="#999999"
          {...props}
        />

        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            className="mr-[16px] h-[24px] w-[24px] items-center justify-center"
          >
            {rightIcon}
          </Pressable>
        )}
      </View>

      {error && <Text className="font-sans text-[12px] text-warning">{error}</Text>}
    </View>
  );
};
