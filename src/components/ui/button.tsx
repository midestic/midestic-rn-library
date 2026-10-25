import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";

const buttonVariants = cva("flex-row items-center justify-center rounded-full font-sans gap-[10px]", {
  variants: {
    variant: {
      primary: "bg-primary active:bg-primary/80 ",

      cancel: "bg-[#F5F5F5] active:bg-gray-200",

      wait: "bg-[#FFFFFF] border border-primary",

      call: "bg-call active:bg-call/70 gap-[10px]",

      msg: "bg-message gap-[10px] active:bg-message/80",

      danger: "bg-warning active:bg-warning/80",

      secondary: "bg-gray-600 active:bg-gray-700",

      outline: "border border-primary bg-transparent active:bg-primary/10",

      ghost: "bg-transparent active:bg-gray-100 dark:active:bg-gray-800",
    },

    size: {
      sm: "px-3 py-2",
      md: "px-4 py-3 h-[50px]",
      lg: "px-6 py-4",
      primary: "h-[52px] px-8 ",
      cancel: "h-[52px] px-8",
      wait: "h-[52px] px-8",
      call: "h-[44px]",
      msg: "h-[44px]",
      danger: "h-[52px]",
    },

    fullWidth: {
      true: "w-full",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "primary",
  },
});

const textVariants = cva("font-[600] font-sans", {
  variants: {
    variant: {
      primary: "text-white ",
      secondary: "text-white",
      outline: "text-primary",
      ghost: "text-primary",
      wait: "text-primary",
      danger: "text-white",
      cancel: "text-warning",
      call: "text-white",
      msg: "text-white",
    },

    size: {
      sm: "text-[12px]",
      md: "text-[16px] ",
      lg: "text-[16px]",
      primary: "text-[16px] ",
      cancel: "text-[16px]",
      wait: "text-[16px]",
      call: "font-[500] text-[16px]",
      msg: "font-[500] text-[16px]",
      danger: "text-[16px]",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "primary",
  },
});

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    title?: string;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
    textClassName?: string;
  };

export const Button = ({
  title,
  variant = "primary",
  size = "md",
  fullWidth,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  textClassName = "",
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const isLightText = variant === "primary" || variant === "secondary" || variant === "danger";

  return (
    <Pressable
      disabled={isDisabled}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        isDisabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator className={isLightText ? "" : "text-primary"} />
      ) : (
        <>
          {leftIcon}

          {title && (
            <Text
              className={cn(
                textVariants({
                  variant,
                  size,
                }),
                "mx-1",
                textClassName,
              )}
            >
              {title}
            </Text>
          )}

          {rightIcon}
        </>
      )}
    </Pressable>
  );
};
