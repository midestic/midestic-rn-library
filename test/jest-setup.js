require("react-native-gesture-handler/jestSetup");

jest.mock("react-native-safe-area-context", () => {
  const mock = require("react-native-safe-area-context/jest/mock");
  return { __esModule: true, ...mock.default };
});

// react-native-reanimated needs native modules that do not exist in the Jest
// environment, so we swap in a tiny JS implementation of the API this library uses.
jest.mock("react-native-reanimated", () => {
  const React = require("react");
  const { View } = require("react-native");

  const AnimatedView = React.forwardRef((props, ref) => React.createElement(View, { ...props, ref }));
  AnimatedView.displayName = "Animated.View";

  const createSharedValue = (initial) => ({ value: initial });

  return {
    __esModule: true,
    default: { View: AnimatedView, createAnimatedComponent: (Component) => Component },
    Animated: { View: AnimatedView, createAnimatedComponent: (Component) => Component },
    createAnimatedComponent: (Component) => Component,
    useSharedValue: createSharedValue,
    useAnimatedStyle: (factory) => (typeof factory === "function" ? factory() : factory),
    useAnimatedProps: (factory) => (typeof factory === "function" ? factory() : factory),
    withSpring: (value) => value,
    withTiming: (value) => value,
    withRepeat: (value) => value,
    cancelAnimation: () => {},
    interpolate: (value) => value,
    Easing: { linear: (t) => t, ease: (t) => t },
  };
});
