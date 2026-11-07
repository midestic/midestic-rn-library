import type { Meta, StoryObj } from "@storybook/react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "midestic-rn-library";
import { Text } from "react-native";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  args: {
    defaultValue: "account",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">
          <Text>Account</Text>
        </TabsTrigger>
        <TabsTrigger value="password">
          <Text>Password</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Manage your account settings.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text>Change your password here.</Text>
      </TabsContent>
    </Tabs>
  ),
};
