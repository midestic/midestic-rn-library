jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const actual = jest.requireActual("react-native-gesture-handler");
  const MockGestureDetector = ({ children }: { children: import("react").ReactNode }) =>
    React.createElement(React.Fragment, null, children);

  return {
    Gesture: actual.Gesture,
    GestureDetector: MockGestureDetector,
    GestureHandlerRootView: actual.GestureHandlerRootView,
  };
});

import { fireEvent, render, screen } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DraggableDrawer,
  Drawer,
  Modal,
  ThemedText,
  ThemedTitle,
  ThemedView,
  type DrawerStepProps,
} from "../src";

const FirstDrawerStep = ({ nextStep }: DrawerStepProps) => (
  <ThemedText onPress={nextStep}>First step</ThemedText>
);
const SecondDrawerStep = () => <ThemedText>Second step</ThemedText>;

describe("DraggableDrawer", () => {
  it("renders its steps and advances to the next step", async () => {
    await render(
      <GestureHandlerRootView>
        <DraggableDrawer
          visible
          onClose={jest.fn()}
          steps={[FirstDrawerStep, SecondDrawerStep]}
          title="Choose an option"
          useModal={false}
          backdropClassName="bg-black/50"
          panelStyle={{ backgroundColor: "white" }}
        />
      </GestureHandlerRootView>,
    );

    expect(screen.getByText("Choose an option")).toBeTruthy();
    await fireEvent.press(screen.getByText("First step"));
    expect(screen.getByText("Second step")).toBeTruthy();
  });
});

describe("Modal", () => {
  it("renders its children when visible", async () => {
    await render(
      <Modal visible onClose={jest.fn()} title="Delete account">
        <ThemedText>Are you sure?</ThemedText>
      </Modal>,
    );

    expect(screen.getByText("Delete account")).toBeTruthy();
    expect(screen.getByText("Are you sure?")).toBeTruthy();
  });

  it("calls onClose from the close button", async () => {
    const onClose = jest.fn();
    await render(
      <Modal visible onClose={onClose} title="Delete account">
        <ThemedText>Body</ThemedText>
      </Modal>,
    );

    await fireEvent.press(screen.getByLabelText("Close"));

    expect(onClose).toHaveBeenCalled();
  });
});

describe("Drawer", () => {
  it("renders title and content", async () => {
    await render(
      <Drawer visible onClose={jest.fn()} title="Filters">
        <ThemedText>Filter body</ThemedText>
      </Drawer>,
    );

    expect(screen.getByText("Filters")).toBeTruthy();
    expect(screen.getByText("Filter body")).toBeTruthy();
  });
});

describe("ThemedText / ThemedTitle / ThemedView", () => {
  it("renders children", async () => {
    await render(
      <ThemedView>
        <ThemedTitle>Title</ThemedTitle>
        <ThemedText>Body</ThemedText>
      </ThemedView>,
    );

    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
  });

  it("keeps the default class names so they can be overridden", async () => {
    await render(<ThemedText className="text-primary">Hello</ThemedText>);

    expect(screen.getByText("Hello").props.className).toContain("text-primary");
  });
});
