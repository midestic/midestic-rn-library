import "./global.css";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Input, ThemedText, ThemedTitle, ThemedView, AppSwitch } from "midestic-rn-library";

import StorybookUI from "./.rnstorybook";

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

export default function App() {
  if (isStorybookEnabled) {
    return <StorybookUI />;
  }

  return <Playground />;
}

function Playground() {
  const [accepted, setAccepted] = useState(false);

  return (
    <ThemedView safe className="justify-center gap-[16px] px-[24px]">
      <StatusBar style="auto" />

      <ThemedTitle className="text-center">midestic-rn-library</ThemedTitle>
      <ThemedText className="text-center">
        A tiny playground app. Run <ThemedText className="font-[600]">npm run storybook</ThemedText> to browse
        every component.
      </ThemedText>

      <Input label="Email" placeholder="you@example.com" />

      <View className="flex-row items-center justify-between">
        <ThemedText>Accept terms</ThemedText>
        <AppSwitch value={accepted} onValueChange={setAccepted} />
      </View>

      <Button
        title="Continue"
        fullWidth
        size="md"
        disabled={!accepted}
        onPress={() => Alert.alert("Nice", "You pressed Continue")}
      />
      <Button title="Secondary" variant="secondary" fullWidth size="md" onPress={() => {}} />
      <Button title="Outline" variant="outline" fullWidth size="md" onPress={() => {}} />
    </ThemedView>
  );
}
