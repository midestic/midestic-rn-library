# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-28

### Added

- 25 components: `Button`, `Input`, `NumberInput`, `Textarea`, `SearchInput`, `PhoneInput`, `SelectInput`, `OTPInput`, `OTPInputSquare`, `AppSwitch`, `AppCheckbox`, `StatusSwitch`, `Modal`, `Drawer`, `DraggableDrawer`, `Calendar`, `CelebrationShower`, `ThemedView`, `ThemedText`, `ThemedTitle`, `ThemedScrollView`, `SafeTopView`, `HeaderBack`, `AppImage`, `MyText`
- 60+ SVG icons exported as components (`ArrowLeft`, `LocationIcon`, `StarIcon`, ...) with a shared `IconProps` type
- Shareable Tailwind preset (`midestic-rn-library/tailwind-preset`) with the design tokens (`primary`, `warning`, `title`, `text`, `background`, ...)
- `cn()` utility and `useAppRefresh()` hook
- Accessibility props on toggles and OTP inputs (`role`, `state`, `accessibilityLabel`)
- `error` support on `Input` (red border + message), matching `NumberInput`
- Storybook 10 setup in `example/` with stories for every component and the icon set
- Docusaurus documentation site in `docs/`
- Jest test suite (28 tests) covering buttons, inputs, toggles and overlays

### Changed

- `StatusSwitch` knob image is now an optional `knobImage` prop instead of a bundled asset
- `HeaderBack` takes `onBackPress` instead of depending on `expo-router`
- `ThemedScrollView` accepts `refreshing`/`onRefresh` instead of a hard `useAppRefresh` dependency
