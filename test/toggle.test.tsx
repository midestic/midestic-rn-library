import { fireEvent, render, screen } from "@testing-library/react-native";
import { AppCheckbox, AppSwitch, StatusSwitch } from "../src";

describe("AppCheckbox", () => {
  it("toggles its value", async () => {
    const onValueChange = jest.fn();
    await render(<AppCheckbox value={false} onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByRole("checkbox"));

    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("is ignored while disabled", async () => {
    const onValueChange = jest.fn();
    await render(<AppCheckbox value={false} disabled onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByRole("checkbox"));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("exposes the checked state to assistive technology", async () => {
    await render(<AppCheckbox value onValueChange={() => {}} />);

    expect(screen.getByRole("checkbox").props.accessibilityState.checked).toBe(true);
  });
});

describe("AppSwitch", () => {
  it("toggles its value", async () => {
    const onValueChange = jest.fn();
    await render(<AppSwitch value={false} onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByRole("switch"));

    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("is ignored while disabled", async () => {
    const onValueChange = jest.fn();
    await render(<AppSwitch value disabled onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByRole("switch"));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe("StatusSwitch", () => {
  it("toggles and shows the inactive label", async () => {
    const onValueChange = jest.fn();
    await render(<StatusSwitch value={false} onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByRole("switch"));

    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("Offline")).toBeTruthy();
  });

  it("uses the custom labels", async () => {
    await render(<StatusSwitch value onValueChange={() => {}} onlineLabel="Driving" offlineLabel="Idle" />);

    expect(screen.getByText("Driving")).toBeTruthy();
  });
});
