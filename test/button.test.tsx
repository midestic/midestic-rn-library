import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "../src";

describe("Button", () => {
  it("renders the title", async () => {
    await render(<Button title="Continue" />);

    expect(screen.getByText("Continue")).toBeTruthy();
  });

  it("calls onPress", async () => {
    const onPress = jest.fn();
    await render(<Button title="Continue" onPress={onPress} />);

    await fireEvent.press(screen.getByText("Continue"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", async () => {
    const onPress = jest.fn();
    await render(<Button title="Continue" disabled onPress={onPress} />);

    await fireEvent.press(screen.getByText("Continue"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("hides the title while loading", async () => {
    await render(<Button title="Continue" loading />);

    expect(screen.queryByText("Continue")).toBeNull();
  });

  it("renders with icons", async () => {
    await render(<Button title="Continue" leftIcon={<></>} rightIcon={<></>} />);

    expect(screen.getByText("Continue")).toBeTruthy();
  });
});
