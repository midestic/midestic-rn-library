import { useState, type ReactNode } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";
import { LocationIcon } from "../../icons";

export type SearchInputProps = TextInputProps & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  className?: string;
};

export const SearchInput = ({
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  className = "",
  onFocus,
  onBlur,
  ...props
}: SearchInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      className={`h-[50px] flex-row items-center rounded-[100px] bg-[#F8F8F8] px-[16px] ${
        focused ? "border border-primary" : ""
      } ${className}`}
    >
      {leftIcon && (
        <Pressable
          onPress={onLeftIconPress}
          disabled={!onLeftIconPress}
          className="mr-[10px] h-[24px] w-[24px] items-center justify-center"
        >
          {leftIcon}
        </Pressable>
      )}

      <TextInput
        {...props}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        className="h-full flex-1 font-sans text-[16px] text-title-light outline-none"
        placeholderTextColor="#999999"
      />

      {focused && <LocationIcon />}

      {rightIcon && (
        <Pressable
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
          className="ml-[10px] h-[24px] w-[24px] items-center justify-center"
        >
          {rightIcon}
        </Pressable>
      )}
    </View>
  );
};
