/** @type {import('tailwindcss').Config} */
module.exports = {
  // Reusable design tokens shipped with the library (primary, warning, title, ...).
  presets: [require("midestic-rn-library/tailwind-preset")],
  content: [
    "./App.tsx",
    "./index.ts",
    "./.rnstorybook/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // The library ships its Tailwind classes as source - it must be scanned too.
    "./node_modules/midestic-rn-library/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
