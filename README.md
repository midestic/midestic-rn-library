# midestic-rn-library

My personal collection of React Native components, styled with NativeWind. Use the CLI to copy only the components you want into your app, then edit and maintain those source files yourself.

> This is an independent personal component library. It complements React Native's built-in components; it is not a replacement for them.

## Add components

From your React Native app, list available components and add only the ones you want:

```bash
npx midestic-rn-library list
npx midestic-rn-library init
npx midestic-rn-library add button
npx midestic-rn-library add input themed-view
```

The CLI copies the selected component files and their local helpers into your app's `src/` directory. It does not add this library as a runtime dependency. Existing files are left untouched; use `--overwrite` only when you want to replace them.

Use `--src-dir app` to copy components into `app/` instead of `src/`. The CLI reports any additional package dependencies needed by your selected components.

## Requirements

The components use React Native and NativeWind v4. Configure NativeWind in your app's Babel, Metro, Tailwind, and global CSS setup. The `init` command copies the design-token preset and prints the Tailwind configuration to add. See the [installation guide](./docs/docs/installation.mdx) for full instructions.

Some components require additional native packages, such as `react-native-svg`, `react-native-safe-area-context`, `react-native-gesture-handler`, or `react-native-reanimated`. The CLI lists dependencies for the components you add; in Expo apps, install native packages with `npx expo install`.

## Available components

`app-image`, `app-switch`, `button`, `calendar`, `celebration-shower`, `checkbox`, `draggable-drawer`, `drawer`, `header-back`, `icons`, `input`, `modal`, `my-text`, `number-input`, `otp-input`, `otp-input-square`, `phone-input`, `safe-top-view`, `search-input`, `select-input`, `status-switch`, `textarea`, `themed-scrollview`, `themed-text`, `themed-title`, `themed-view`.

The `icons` entry adds the current icon set as one source file.

## Examples and documentation

- Run the interactive component stories with `npm run storybook`.
- Start the docs site with `npm run docs:start`.
- Build the docs site with `npm run docs:build`.

The Storybook app and docs site in this repository are for browsing and developing this personal component collection.

## Development

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm pack --dry-run
```

## Publishing the CLI

After confirming the npm package name is available and you are signed in:

```bash
npm version patch --no-git-tag-version
npm pack --dry-run
npm publish
```

Publishing runs the package checks and builds TypeScript declarations. Users can then run the CLI with `npx midestic-rn-library`.

## License

MIT
