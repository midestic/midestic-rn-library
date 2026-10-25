import type { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "midestic-rn-library";
import { View } from "react-native";

const meta = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <View className="w-[320px] gap-[12px]">
        <Story />
      </View>
    ),
  ],
  args: {
    title: "Continue",
    onPress: () => {},
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "cancel", "wait", "call", "msg", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "primary", "cancel", "wait", "call", "msg", "danger"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", title: "Secondary" },
};

export const Outline: Story = {
  args: { variant: "outline", title: "Outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost", title: "Ghost" },
};

export const Danger: Story = {
  args: { variant: "danger", title: "Delete" },
};

export const Cancel: Story = {
  args: { variant: "cancel", size: "cancel", title: "Cancel" },
};

export const Call: Story = {
  args: { variant: "call", size: "call", title: "Call driver" },
};

export const Message: Story = {
  args: { variant: "msg", size: "msg", title: "Message" },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: "sm", title: "Small" },
};
