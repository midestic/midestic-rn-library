import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import {
  HeaderBack,
  SafeTopView,
  ThemedScrollView,
  ThemedText,
  ThemedTitle,
  ThemedView,
} from "midestic-rn-library";

const meta = {
  title: "Components/Layout",
  component: ThemedView,
  args: {
    safe: false,
  },
  argTypes: {
    safe: { control: "boolean" },
  },
} satisfies Meta<typeof ThemedView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAndTitle: Story = {
  name: "ThemedText / ThemedTitle",
  render: () => (
    <View className="w-[340px] gap-[8px]">
      <ThemedTitle>Page title</ThemedTitle>
      <ThemedText>Body copy uses the theme text colour and the sans font.</ThemedText>
      <ThemedText className="text-primary font-[600]">Customised with className</ThemedText>
    </View>
  ),
};

export const HeaderBackStory: Story = {
  name: "HeaderBack",
  render: () => (
    <View className="w-[340px]">
      <HeaderBack title="Trip details" onBackPress={() => {}} />
    </View>
  ),
};

export const ScrollView: Story = {
  name: "ThemedScrollView",
  render: () => (
    <ThemedScrollView className="h-[320px] w-[340px] rounded-[16px] border border-[#E7EAEB]">
      <View className="gap-[12px] p-[16px]">
        {Array.from({ length: 12 }, (_, index) => (
          <ThemedText key={index}>Row {index + 1} - pull down to refresh.</ThemedText>
        ))}
      </View>
    </ThemedScrollView>
  ),
};

export const SafeTop: Story = {
  name: "SafeTopView",
  render: () => (
    <SafeTopView className="w-[340px] rounded-[16px] bg-[#F5F5F5]">
      <View className="p-[16px]">
        <ThemedText>Padded by the top safe-area inset.</ThemedText>
      </View>
    </SafeTopView>
  ),
};
