import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { OTPInput, OTPInputSquare } from "midestic-rn-library";

const meta = {
  title: "Components/OTPInput",
  component: OTPInput,
  args: {
    length: 6,
    onChangeText: () => {},
  },
  argTypes: {
    length: { control: { type: "number", min: 3, max: 8 } },
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Round: Story = {};

export const Square: Story = {
  render: function SquareStory() {
    const [code, setCode] = useState("");

    return (
      <View className="gap-[12px]">
        <OTPInputSquare length={4} onChangeText={setCode} />
        <View>
          <OTPInput length={4} value={code} onChangeText={setCode} />
        </View>
      </View>
    );
  },
};

export const FourDigits: Story = {
  args: { length: 4 },
};
