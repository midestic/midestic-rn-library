import { Colors } from "../../constants/Colors";
import { Pressable, View } from "react-native";

export type AppSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

const TRACK_WIDTH = 36;
const TRACK_HEIGHT = 20;
const THUMB_SIZE = 16;
const TRACK_PADDING = 2;
const BORDER_WIDTH = 1;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2 - BORDER_WIDTH * 2;

export const AppSwitch = ({ value, onValueChange, disabled = false, className = "" }: AppSwitchProps) => {
  const primaryColor = Colors.primary;

  return (
    <Pressable
      onPress={() => {
        if (!disabled) onValueChange(!value);
      }}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      className={`${disabled ? "opacity-50" : ""} ${className}`}
      style={{
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: TRACK_HEIGHT / 2,
        paddingHorizontal: TRACK_PADDING,
        paddingVertical: TRACK_PADDING,
        borderWidth: BORDER_WIDTH,
        borderColor: "rgba(0,0,0,0.04)",
        backgroundColor: value ? primaryColor : "#D9D9D9",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          backgroundColor: "#FFFFFF",
          borderWidth: BORDER_WIDTH,
          borderColor: "rgba(0,0,0,0.06)",
          transform: [{ translateX: value ? TRAVEL : 0 }],
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
          elevation: 1,
        }}
      />
    </Pressable>
  );
};
