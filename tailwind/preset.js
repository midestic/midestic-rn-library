/**
 * Shareable Tailwind preset for midestic-rn-library.
 *
 * Usage in your app's tailwind.config.js:
 *
 *   module.exports = {
 *     presets: [require("midestic-rn-library/tailwind-preset")],
 *     content: [
 *       "./App.tsx",
 *       "./components",
 *       "./node_modules/midestic-rn-library/src",
 *     ],
 *   };
 *
 * Every glob above must cover the library source (it ships as TS), and every
 * value below can be overridden by extending the theme in your own config.
 */
// The library renders through className, so the NativeWind preset is pulled in
// automatically when nativewind is installed. Apps can still list it themselves.
let nativewindPreset;

try {
  nativewindPreset = require("nativewind/preset");
} catch {
  nativewindPreset = undefined;
}

module.exports = {
  presets: nativewindPreset ? [nativewindPreset] : [],
  theme: {
    extend: {
      colors: {
        primary: "#3195C9",
        warning: "#D53838",
        call: "#16A34A",
        message: "#2563EB",
        title: {
          light: "#121212",
          dark: "#FFFFFF",
        },
        text: {
          light: "#625F72",
          dark: "#D4D4D4",
        },
        background: {
          light: "#FFFFFF",
          dark: "#252231",
        },
        ui: {
          light: "#D6D5E1",
          dark: "#2F2B3D",
        },
        success: "#11A75C",
        info: "#3195C9",
      },
      fontFamily: {
        sans: ["System"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
};
