import { Colors } from "../../constants/Colors";
import { Pressable, View } from "react-native";

export type AppCheckboxProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: number;
  /** Accessibility label announced by screen readers. */
  accessibilityLabel?: string;
  className?: string;
};

export const AppCheckbox = ({
  value,
  onValueChange,
  disabled = false,
  size = 20,
  accessibilityLabel = "Checkbox",
  className = "",
}: AppCheckboxProps) => {
  const primaryColor = Colors.primary;

  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          onValueChange(!value);
        }
      }}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      className={`${disabled ? "opacity-50" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.5,
        borderColor: value ? primaryColor : "#D1D5DB",
        backgroundColor: value ? primaryColor : "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value && (
        <View
          style={{
            width: size * 0.45,
            height: size * 0.45,
            borderRadius: (size * 0.45) / 2,
            backgroundColor: "#FFFFFF",
          }}
        />
      )}
    </Pressable>
  );
};
