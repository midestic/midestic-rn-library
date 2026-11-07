import { fireEvent, render, screen } from "@testing-library/react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src";
import { Text } from "react-native";

describe("Tabs", () => {
  it("switches the active tab when a trigger is pressed", async () => {
    const onValueChange = jest.fn();
    await render(
      <Tabs defaultValue="account" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="account">
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text>Account settings</Text>
        </TabsContent>
        <TabsContent value="password">
          <Text>Password settings</Text>
        </TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Account settings")).toBeTruthy();
    expect(screen.queryByText("Password settings")).toBeNull();

    await fireEvent.press(screen.getByRole("tab", { name: "Password" }));

    expect(onValueChange).toHaveBeenCalledWith("password");
    expect(screen.queryByText("Account settings")).toBeNull();
    expect(screen.getByText("Password settings")).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Password" }).props.accessibilityState.selected).toBe(true);
  });

  it("updates controlled selection through the callback", async () => {
    const onValueChange = jest.fn();
    await render(
      <Tabs value="account" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="password">
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text>Account settings</Text>
        </TabsContent>
      </Tabs>,
    );

    await fireEvent.press(screen.getByRole("tab", { name: "Password" }));

    expect(onValueChange).toHaveBeenCalledWith("password");
    expect(screen.getByText("Account settings")).toBeTruthy();
  });

  it("does not select a disabled trigger", async () => {
    const onValueChange = jest.fn();
    await render(
      <Tabs defaultValue="account" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="password" disabled>
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    await fireEvent.press(screen.getByRole("tab", { name: "Password" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
