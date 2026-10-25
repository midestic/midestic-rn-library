import React, { type ReactNode } from "react";
import { Image, Text, TextInput, View, type ImageSourcePropType, type TextInputProps } from "react-native";

export type PhoneInputProps = TextInputProps & {
  flag?: ImageSourcePropType | ReactNode;
  countryCode?: string;
  label?: string;
  className?: string;
};

export const PhoneInput = ({
  flag,
  countryCode = "+234",
  label = "Your phone number",
  className = "",
  ...props
}: PhoneInputProps) => {
  const isElement = React.isValidElement(flag);

  return (
    <View className={`w-full gap-[12px] ${className}`}>
      {label && <Text className="font-sans text-[16px] font-[400] text-title-light ">{label}</Text>}

      <View className="w-full flex-row items-center gap-[6px]">
        <View className="h-[56px] w-[82px] flex-row items-center justify-center gap-[4px] rounded-[12px] border border-[#E7EAEB]">
          {isElement ? (
            <View className="h-[20px] w-[20px] items-center justify-center">{flag as ReactNode}</View>
          ) : flag ? (
            <Image source={flag as ImageSourcePropType} className="h-[20px] w-[20px]" resizeMode="contain" />
          ) : null}

          <Text className="font-sans text-[14px] font-[400] text-title-light ">{countryCode}</Text>
        </View>

        <TextInput
          className="h-[56px] flex-1 rounded-[12px] border border-[#E7EAEB] px-[16px] font-sans text-[16px] text-title-light outline-none placeholder:text-[14px]"
          keyboardType="phone-pad"
          placeholder="Phone number"
          placeholderTextColor="#999999"
          {...props}
        />
      </View>
    </View>
  );
};
