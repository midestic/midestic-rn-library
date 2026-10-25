import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { Button, Calendar, ThemedText } from "midestic-rn-library";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  args: {
    visible: false,
    onClose: () => {},
    onApply: () => {},
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: function CalendarStory() {
    const [visible, setVisible] = useState(true);
    const [value, setValue] = useState<Date | null>(new Date());

    return (
      <View className="w-[340px] gap-[12px]">
        <ThemedText>Selected: {value ? value.toDateString() : "none"}</ThemedText>
        <Button title="Pick a date" onPress={() => setVisible(true)} />

        <Calendar
          visible={visible}
          value={value}
          onClose={() => setVisible(false)}
          onApply={(date) => {
            setValue(date);
            setVisible(false);
          }}
        />
      </View>
    );
  },
};
