import { useRef, useState } from "react";
import { TextInput, View, type TextInputInstance, type TextInputKeyPressEvent } from "react-native";

export type OTPInputProps = {
  length?: number;
  value?: string;
  onChangeText?: (value: string) => void;
  className?: string;
};

export const OTPInput = ({ length = 6, value = "", onChangeText, className = "" }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array.from({ length }, (_, index) => value[index] || ""));

  const inputRefs = useRef<(TextInputInstance | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);
    onChangeText?.(newOtp.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: TextInputKeyPressEvent, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className={`flex-row gap-[8px] ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <View key={index} className="h-[48px] w-[48px] items-center justify-center rounded-full bg-[#F5F5F5]">
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="number-pad"
            maxLength={1}
            accessibilityLabel={`Digit ${index + 1}`}
            textAlign="center"
            className="h-[48px] w-[48px] rounded-full p-0 text-center font-sans text-[18px] font-[600] text-title-light"
          />
        </View>
      ))}
    </View>
  );
};
