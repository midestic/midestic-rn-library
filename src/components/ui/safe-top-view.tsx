import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SafeTopViewProps = ViewProps & {
  children?: React.ReactNode;
  className?: string;
};

export const SafeTopView = ({ children, className = "" }: SafeTopViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "white" }} className={className}>
      {children}
    </View>
  );
};
