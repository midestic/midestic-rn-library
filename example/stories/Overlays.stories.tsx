import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { Button, CelebrationShower, Drawer, Modal, ThemedText } from "midestic-rn-library";

const meta = {
  title: "Components/Overlays",
  component: Modal,
  args: {
    visible: false,
    onClose: () => {},
    title: "Confirm",
    children: null,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalStory: Story = {
  name: "Modal",
  render: function ModalStory() {
    const [visible, setVisible] = useState(true);

    return (
      <View className="w-[340px] gap-[12px]">
        <Button title="Open modal" onPress={() => setVisible(true)} />
        <Modal visible={visible} onClose={() => setVisible(false)} title="Delete account">
          <View className="gap-[16px]">
            <ThemedText>This action cannot be undone. Are you sure?</ThemedText>
            <Button title="Delete" variant="danger" fullWidth onPress={() => setVisible(false)} />
          </View>
        </Modal>
      </View>
    );
  },
};

export const DrawerStory: Story = {
  name: "Drawer",
  render: function DrawerStory() {
    const [visible, setVisible] = useState(true);

    return (
      <View className="w-[340px] gap-[12px]">
        <Button title="Open drawer" onPress={() => setVisible(true)} />
        <Drawer visible={visible} onClose={() => setVisible(false)} title="Filters">
          <View className="gap-[8px] px-[16px] pb-[24px]">
            <ThemedText>Only rides with AC</ThemedText>
            <ThemedText>Premium drivers</ThemedText>
          </View>
        </Drawer>
      </View>
    );
  },
};

export const Celebration: Story = {
  name: "CelebrationShower",
  render: () => (
    <View className="h-[300px] w-[340px] items-center justify-center rounded-[16px] bg-[#FFF7E8]">
      <ThemedText className="font-[600]">Ride completed!</ThemedText>
      <CelebrationShower count={40} />
    </View>
  ),
};
