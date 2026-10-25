import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ReactNode } from "react";
import { View } from "react-native";
import {
  AppCheckbox,
  AppSwitch,
  Input,
  MyText,
  NumberInput,
  PhoneInput,
  SearchInput,
  SelectInput,
  StatusSwitch,
  Textarea,
} from "midestic-rn-library";

const Stack = ({ children }: { children: ReactNode }) => (
  <View className="w-[340px] gap-[20px]">{children}</View>
);

const meta = {
  title: "Components/Inputs",
  component: Input,
  decorators: [
    (Story) => (
      <Stack>
        <Story />
      </Stack>
    ),
  ],
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
  argTypes: {
    error: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithError: Story = {
  args: { label: "Email", error: "Enter a valid email address" },
};

export const NumberInputStory: Story = {
  name: "NumberInput",
  render: () => <NumberInput label="Age" placeholder="18" />,
};

export const TextareaStory: Story = {
  name: "Textarea",
  render: () => <Textarea placeholder="Tell us something..." />,
};

export const SearchInputStory: Story = {
  name: "SearchInput",
  render: () => <SearchInput placeholder="Search trips" />,
};

export const PhoneInputStory: Story = {
  name: "PhoneInput",
  render: () => <PhoneInput label="Phone number" placeholder="8012345678" />,
};

export const SelectInputStory: Story = {
  name: "SelectInput",
  render: function SelectStory() {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <SelectInput
        label="City"
        value={value}
        onValueChange={setValue}
        options={[
          { label: "Lagos", value: "lagos" },
          { label: "Abuja", value: "abuja" },
          { label: "Port Harcourt", value: "ph" },
        ]}
      />
    );
  },
};

export const Switches: Story = {
  name: "Switch / Checkbox / Status",
  render: function ToggleStory() {
    const [on, setOn] = useState(true);
    const [checked, setChecked] = useState(false);
    const [online, setOnline] = useState(true);

    return (
      <View className="w-[340px] gap-[24px]">
        <View className="flex-row items-center justify-between">
          <MyText>Notifications</MyText>
          <AppSwitch value={on} onValueChange={setOn} />
        </View>

        <View className="flex-row items-center gap-[12px]">
          <AppCheckbox value={checked} onValueChange={setChecked} />
          <MyText>Accept terms</MyText>
        </View>

        <StatusSwitch value={online} onValueChange={setOnline} />
      </View>
    );
  },
};
