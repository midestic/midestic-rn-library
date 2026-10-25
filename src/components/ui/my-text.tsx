import React from "react";
import { Text, TextProps } from "react-native";

export type MyTextProps = TextProps & {
  className?: string;
  children: React.ReactNode;
};

export const MyText = ({ className = "", children, ...props }: MyTextProps) => {
  return (
    <Text {...props} className={`font-sans ${className}`}>
      {children}
    </Text>
  );
};
