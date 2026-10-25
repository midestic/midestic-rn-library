import type { ReactNode } from "react";
import { Text, type TextProps } from "react-native";

export type ThemedTitleProps = TextProps & {
  children?: ReactNode;
  className?: string;
};

export function ThemedTitle({ children, className = "", ...props }: ThemedTitleProps) {
  return (
    <Text className={`font-sans text-[24px]  font-[700] text-title-light ${className}`} {...props}>
      {children}
    </Text>
  );
}
