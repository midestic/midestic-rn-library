# midestic-rn-library

A React Native component library built with **NativeWind (Tailwind CSS)** - buttons, inputs, drawers, modals, calendars and 60+ SVG icons, all themed through the same `className` API.

- **25 components** (`Button`, `Input`, `OTPInput`, `Drawer`, `DraggableDrawer`, `Modal`, `Calendar`, `SelectInput`, ...)
- **60+ icons** exported as plain components (`ArrowLeft`, `LocationIcon`, `StarIcon`, ...)
- **Design tokens** shipped as a Tailwind preset (`primary`, `warning`, `title`, `text`, `background`, ...)
- **TypeScript first** - every component and prop type is exported
- **Storybook** - every component has stories in [`example/`](./example)
- **Docs site** - Docusaurus docs in [`docs/`](./docs)

## Installation

```bash
npm install midestic-rn-library
```

The library ships its TypeScript source (plus generated `.d.ts` files), so your app's Babel/Metro setup compiles it the same way it compiles your own screens. That is what makes NativeWind `className` support work inside the package.

### Peer dependencies

```bash
npm install nativewind tailwindcss react-native-svg react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

## NativeWind setup

**1. Babel**

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
  };
};
```

**2. Tailwind**

```js
// tailwind.config.js
module.exports = {
  presets: [require("nativewind/preset"), require("midestic-rn-library/tailwind-preset")],
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    // required: scan the library's className strings
    "./node_modules/midestic-rn-library/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
```

**3. Metro**

Wrap your Expo Metro config with NativeWind so `className` styles in the library are transformed:

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
```

**4. Global CSS**

```js
// index.js / index.ts
import "./global.css";
```

## Usage

```tsx
import { Button, Input, ThemedView, type ButtonProps } from "midestic-rn-library";

export function SignIn() {
  const [email, setEmail] = useState("");

  return (
    <ThemedView safe className="justify-center gap-[16px] px-[24px]">
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />

      <Button title="Continue" fullWidth size="md" disabled={!email} onPress={() => {}} />
    </ThemedView>
  );
}
```

Every component accepts `className`, so you can restyle anything without wrapper `View`s:

```tsx
<Button title="Ghost" variant="ghost" className="rounded-[24px] bg-white" />
```

## Components

| Category | Components                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| Actions  | `Button`                                                                                                     |
| Inputs   | `Input`, `NumberInput`, `Textarea`, `SearchInput`, `PhoneInput`, `SelectInput`, `OTPInput`, `OTPInputSquare` |
| Toggles  | `AppSwitch`, `AppCheckbox`, `StatusSwitch`                                                                   |
| Overlays | `Modal`, `Drawer`, `DraggableDrawer`, `CelebrationShower`, `Calendar`                                        |
| Layout   | `ThemedView`, `ThemedText`, `ThemedTitle`, `ThemedScrollView`, `SafeTopView`, `HeaderBack`                   |
| Media    | `AppImage`                                                                                                   |
| Icons    | 60+ SVG icons (`ArrowLeft`, `CalendarIcon`, `LocationIcon`, `StarIcon`, ...)                                 |
| Utils    | `cn`, `useAppRefresh`, `Colors`                                                                              |

Full prop tables live in the docs site (`npm run docs:start`).

## Design tokens

```js
// available as className utilities out of the box
<ThemedTitle className="text-title-light">Title</ThemedTitle>
<ThemedText className="text-text-light">Body</ThemedText>
<Text className="text-warning">Something went wrong</Text>
```

| Token                                  | Value                 |
| -------------------------------------- | --------------------- |
| `primary`                              | `#3195C9`             |
| `warning`                              | `#D53838`             |
| `call`                                 | `#16A34A`             |
| `message`                              | `#2563EB`             |
| `success`                              | `#11A75C`             |
| `title-light` / `title-dark`           | `#121212` / `#FFFFFF` |
| `text-light` / `text-dark`             | `#625F72` / `#D4D4D4` |
| `background-light` / `background-dark` | `#FFFFFF` / `#252231` |
| `ui-light` / `ui-dark`                 | `#D6D5E1` / `#2F2B3D` |

## Storybook

```bash
npm run storybook        # expo start with Storybook enabled
npm run storybook:ios
npm run storybook:android
```

The example app lives in [`example/`](./example) and renders the Storybook UI when `EXPO_PUBLIC_STORYBOOK_ENABLED=true`.

To use the published library in another React Native Storybook app, install it and its native peer dependencies:

```bash
npm install midestic-rn-library
npm install nativewind tailwindcss react-native-svg react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

Add a story that imports components from the package:

```tsx
import type { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "midestic-rn-library";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { title: "Continue" },
};
```

Make sure the app's Storybook story glob includes that file and its Tailwind `content` includes `./node_modules/midestic-rn-library/src/**/*.{js,jsx,ts,tsx}`. See [NativeWind setup](#nativewind-setup) for the rest of the required configuration.

## Development

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # jest (27 tests)
npm run build       # emit .d.ts into dist/types
npm pack --dry-run  # verify publish contents
```

## Publishing to npm

The package is public (`publishConfig.access` is set to `public`). Before the first release, make sure `midestic-rn-library` is available on npm and that you are signed in with an account allowed to publish it. For each release, update the version and publish from the project root:

```bash
npm login
npm version patch --no-git-tag-version   # use minor or major when appropriate
npm pack --dry-run  # review the files that will be published
npm publish
```

`npm publish` runs the configured pre-publish checks and builds the TypeScript declarations before uploading. Do not publish a version that already exists on npm.

## License

MIT
