import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  className?: string;
};

export const SelectInput = ({
  label,
  placeholder = "Select an option",
  value,
  options,
  onValueChange,
  className = "",
}: SelectInputProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: SelectOption) => {
    onValueChange?.(option.value);
    setOpen(false);
  };

  return (
    <View className={`relative w-full ${open ? "z-[999]" : "z-0"} ${className}`}>
      {label && <Text className="mb-[12px] font-sans text-[16px] font-[400] text-title-light">{label}</Text>}

      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        className="h-[56px] w-full flex-row items-center justify-between rounded-[12px] border border-[#E7EAEB] bg-white px-[16px]"
      >
        <Text className={`font-sans text-[16px] ${selectedOption ? "text-title-light" : "text-[#999999]"}`}>
          {selectedOption?.label ?? placeholder}
        </Text>

        <Text className="text-[16px] text-[#999999]">{open ? "⌃" : "⌄"}</Text>
      </Pressable>

      {open && (
        <View className="fixed left-0 right-0  z-[1000] overflow-hidden rounded-[12px] border border-[#E7EAEB] bg-white">
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => handleSelect(option)}
              className="px-[16px] py-[14px] active:bg-[#F5F5F5]"
            >
              <Text className="font-sans text-[16px] font-[400] text-title-light">{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};
