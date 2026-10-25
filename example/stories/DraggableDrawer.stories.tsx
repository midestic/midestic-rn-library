import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { Button, DraggableDrawer, ThemedText, ThemedTitle, type DrawerStepProps } from "midestic-rn-library";

type StepProps = DrawerStepProps & { reason?: string };

const FirstStep = ({ nextStep, onClose }: StepProps) => (
  <View className="gap-[16px] px-[20px] pb-[24px]">
    <ThemedTitle className="text-[18px]">Cancel this trip?</ThemedTitle>
    <ThemedText>Your driver is already on the way.</ThemedText>
    <View className="gap-[8px]">
      <Button title="Yes, cancel" variant="danger" fullWidth onPress={onClose} />
      <Button title="Keep trip" variant="outline" fullWidth onPress={onClose} />
    </View>
  </View>
);

const SecondStep = ({ previousStep, onClose }: StepProps) => (
  <View className="gap-[16px] px-[20px] pb-[24px]">
    <ThemedTitle className="text-[18px]">Why are you cancelling?</ThemedTitle>
    <Button title="Too long a wait" fullWidth onPress={previousStep} />
    <Button title="Driver asked me to" fullWidth onPress={previousStep} />
    <Button title="Confirm" variant="primary" fullWidth onPress={onClose} />
  </View>
);

const meta = {
  title: "Components/DraggableDrawer",
  component: DraggableDrawer,
  args: {
    visible: false,
    onClose: () => {},
    steps: [FirstStep, SecondStep],
  },
} satisfies Meta<typeof DraggableDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiStep: Story = {
  render: function DrawerStory() {
    const [visible, setVisible] = useState(true);

    return (
      <View className="w-[340px] gap-[12px]">
        <Button title="Open drawer" onPress={() => setVisible(true)} />
        <DraggableDrawer
          visible={visible}
          onClose={() => setVisible(false)}
          steps={[FirstStep, SecondStep]}
          title="Cancel trip"
          initialMaxHeight="70%"
        />
      </View>
    );
  },
};
