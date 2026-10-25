import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";

const inputVariants = cva("flex-row items-center rounded-xl border", {
  variants: {
    variant: {
      default: "border-ui-light bg-background-light ",

      error: "border-warning bg-background-light ",

      disabled: "border-ui-light ",
    },

    size: {
      sm: "h-[42px] px-3",
      md: "h-[50px] px-4",
      lg: "h-[56px] px-4",
    },

    fullWidth: {
      true: "w-full",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const inputTextVariants = cva("flex-1 font-sans text-title-light ", {
  variants: {
    size: {
      sm: "text-[14px]",
      md: "text-[16px]",
      lg: "text-[16px]",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export type NumberInputProps = TextInputProps &
  VariantProps<typeof inputVariants> & {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
    inputClassName?: string;
  };

export const NumberInput = ({
  label,
  error,
  leftIcon,
  rightIcon,
  variant,
  size = "md",
  fullWidth,
  className = "",
  inputClassName = "",
  editable = true,
  ...props
}: NumberInputProps) => {
  const isDisabled = !editable;

  const inputVariant = error ? "error" : isDisabled ? "disabled" : (variant ?? "default");

  return (
    <View className={cn(fullWidth && "w-full", className)}>
      {label && <Text className="mb-2 font-sans text-[14px] font-[500] text-title-light ">{label}</Text>}

      <View
        className={cn(
          inputVariants({
            variant: inputVariant,
            size,
            fullWidth,
          }),
        )}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <TextInput
          editable={editable}
          placeholderTextColor="#999999"
          className={cn(
            inputTextVariants({
              size,
            }),
            inputClassName,
          )}
          {...props}
        />

        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>

      {error && <Text className="mt-1 font-sans text-[12px] text-warning">{error}</Text>}
    </View>
  );
};
