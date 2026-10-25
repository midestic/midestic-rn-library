import { fireEvent, render, screen } from "@testing-library/react-native";
import { Input, NumberInput, OTPInput, OTPInputSquare, PhoneInput, SelectInput, Textarea } from "../src";

describe("Input", () => {
  it("renders a label and placeholder", async () => {
    await render(<Input label="Email" placeholder="you@example.com" />);

    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("you@example.com")).toBeTruthy();
  });

  it("forwards changes to onChangeText", async () => {
    const onChangeText = jest.fn();
    await render(<Input placeholder="Email" onChangeText={onChangeText} />);

    await fireEvent.changeText(screen.getByPlaceholderText("Email"), "hi");

    expect(onChangeText).toHaveBeenCalledWith("hi");
  });

  it("renders an error message when provided", async () => {
    await render(<Input label="Email" error="Enter a valid email address" />);

    expect(screen.getByText("Enter a valid email address")).toBeTruthy();
  });
});

describe("NumberInput", () => {
  it("renders an error message when provided", async () => {
    await render(<NumberInput label="Age" error="Must be a number" />);

    expect(screen.getByText("Must be a number")).toBeTruthy();
  });
});

describe("Textarea", () => {
  it("is multiline by default", async () => {
    await render(<Textarea placeholder="Message" />);

    expect(screen.getByPlaceholderText("Message").props.multiline).toBe(true);
  });
});

describe("PhoneInput", () => {
  it("renders the country code and label", async () => {
    await render(<PhoneInput label="Phone" countryCode="+234" placeholder="8012345678" />);

    expect(screen.getByText("Phone")).toBeTruthy();
    expect(screen.getByText("+234")).toBeTruthy();
  });
});

describe("OTPInput", () => {
  it("renders one box per character", async () => {
    await render(<OTPInput length={4} />);

    expect(screen.getAllByLabelText(/^Digit/)).toHaveLength(4);
  });

  it("emits the assembled code", async () => {
    const onChangeText = jest.fn();
    await render(<OTPInput length={4} onChangeText={onChangeText} />);

    await fireEvent.changeText(screen.getByLabelText("Digit 1"), "7");

    expect(onChangeText).toHaveBeenCalledWith("7");
  });
});

describe("OTPInputSquare", () => {
  it("renders one box per character", async () => {
    await render(<OTPInputSquare length={6} />);

    expect(screen.getAllByLabelText(/^Digit/)).toHaveLength(6);
  });
});

describe("SelectInput", () => {
  const options = [
    { label: "Lagos", value: "lagos" },
    { label: "Abuja", value: "abuja" },
  ];

  it("lists options after the trigger is pressed", async () => {
    await render(<SelectInput options={options} />);

    expect(screen.queryByText("Lagos")).toBeNull();

    await fireEvent.press(screen.getByText("Select an option"));

    expect(screen.getByText("Lagos")).toBeTruthy();
  });

  it("reports the selected value", async () => {
    const onValueChange = jest.fn();
    await render(<SelectInput options={options} onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByText("Select an option"));
    await fireEvent.press(screen.getByText("Abuja"));

    expect(onValueChange).toHaveBeenCalledWith("abuja");
  });
});
