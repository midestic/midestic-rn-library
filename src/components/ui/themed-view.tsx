import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  children?: React.ReactNode;
  safe?: boolean;
  className?: string;
};

export const ThemedView = ({ children, safe = false, className = "", style, ...props }: ThemedViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-background-light font-sans  ${className}`}
      style={[
        {
          paddingTop: safe ? insets.top : 0,
          paddingBottom: safe ? insets.bottom : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
