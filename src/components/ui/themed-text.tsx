import type { ReactNode } from "react";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  children?: ReactNode;
  className?: string;
};

export function ThemedText({ children, className = "", ...props }: ThemedTextProps) {
  return (
    <Text className={`font-sans text-[16px]  font-[400] text-text-light ${className}`} {...props}>
      {children}
    </Text>
  );
}
