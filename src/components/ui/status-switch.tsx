import { Image, Pressable, Text, View, type ImageSourcePropType } from "react-native";

export type StatusSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  onlineLabel?: string;
  offlineLabel?: string;
  /** Optional image rendered inside the sliding knob (a plain white circle is used when omitted). */
  knobImage?: ImageSourcePropType;
  disabled?: boolean;
  className?: string;
};

const SWITCH_WIDTH = 120;
const SWITCH_HEIGHT = 46;
const KNOB_SIZE = 38;
const HORIZONTAL_PADDING = 4;

export const StatusSwitch = ({
  value,
  onValueChange,
  onlineLabel = "Online",
  offlineLabel = "Offline",
  knobImage,
  disabled = false,
  className = "",
}: StatusSwitchProps) => {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={value ? onlineLabel : offlineLabel}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      className={`${disabled ? "opacity-50" : ""} ${className}`}
      style={{
        width: SWITCH_WIDTH,
        height: SWITCH_HEIGHT,
        borderRadius: SWITCH_HEIGHT / 2,
        paddingHorizontal: HORIZONTAL_PADDING,
        justifyContent: "center",
        backgroundColor: value ? "#96D900" : "#B8B8B8",
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          position: "absolute",
          left: value ? HORIZONTAL_PADDING : KNOB_SIZE + HORIZONTAL_PADDING,
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: "400",
          textAlign: "center",
          width: SWITCH_WIDTH - KNOB_SIZE - HORIZONTAL_PADDING * 2,
        }}
      >
        {value ? onlineLabel : offlineLabel}
      </Text>

      <View
        style={{
          position: "absolute",
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          left: value ? SWITCH_WIDTH - KNOB_SIZE - HORIZONTAL_PADDING : HORIZONTAL_PADDING,
          borderRadius: KNOB_SIZE / 2,
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {knobImage ? (
          <Image source={knobImage} resizeMode="contain" style={{ width: KNOB_SIZE, height: KNOB_SIZE }} />
        ) : null}
      </View>
    </Pressable>
  );
};
