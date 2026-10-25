import { Pressable, View } from "react-native";
import { ArrowLeft } from "../../icons";
import { ThemedTitle } from "./themed-title";

export type HeaderProps = {
  title?: string;
  /** Called when the back arrow is pressed. */
  onBackPress?: () => void;
  className?: string;
};

export const HeaderBack = ({ title, onBackPress, className = "" }: HeaderProps) => {
  return (
    <View className={`relative flex-row items-center py-[20px]   ${className}`}>
      <Pressable
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        disabled={!onBackPress}
        className="z-10"
      >
        <ArrowLeft color="#121212" />
      </Pressable>

      {title && (
        <View className="absolute inset-x-0 items-center">
          <ThemedTitle className="font-sans text-[18px] font-[500] text-title-light">{title}</ThemedTitle>
        </View>
      )}
    </View>
  );
};


