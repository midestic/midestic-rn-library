import { TextInput, type TextInputProps, View } from "react-native";

export type TextareaProps = TextInputProps & {
  className?: string;
  containerClassName?: string;
};

export const Textarea = ({
  className = "",
  containerClassName = "",
  multiline = true,
  textAlignVertical = "top",
  style,
  ...props
}: TextareaProps) => {
  return (
    <View className={`min-h-[160px] rounded-[12px] border border-[#E6E7EA] bg-white p-[14px] ${containerClassName}`}>
      <TextInput
        {...props}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        className={`flex-1 p-0 text-[16px] text-title-light ${className}`}
        style={[
          {
            minHeight: 132,
          },
          style,
        ]}
      />
    </View>
  );
};
