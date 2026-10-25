import type { Meta, StoryObj } from "@storybook/react-native";
import { AppImage } from "midestic-rn-library";
import { View } from "react-native";

const meta = {
  title: "Components/AppImage",
  component: AppImage,
  args: {
    source: { uri: "https://picsum.photos/240/240" },
    className: "h-[160px] w-[160px] rounded-[16px]",
    contentFit: "cover",
  },
  argTypes: {
    contentFit: {
      control: "select",
      options: ["cover", "contain", "fill", "none", "scale-down"],
    },
  },
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rounded: Story = {};

export const Contain: Story = {
  args: { contentFit: "contain" },
};

export const Sizes: Story = {
  render: () => (
    <View className="flex-row gap-[12px]">
      <AppImage source={{ uri: "https://picsum.photos/200/200" }} className="h-[64px] w-[64px] rounded-[32px]" />
      <AppImage source={{ uri: "https://picsum.photos/200/300" }} className="h-[64px] w-[64px] rounded-[12px]" />
      <AppImage source={{ uri: "https://picsum.photos/300/200" }} className="h-[64px] w-[64px]" contentFit="fill" />
    </View>
  ),
};
