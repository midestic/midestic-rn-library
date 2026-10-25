/** @type {import('jest').Config} */
module.exports = {
  preset: "@react-native/jest-preset",
  testMatch: ["**/test/**/*.test.@(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@testing-library|react-native-svg|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-worklets|nativewind|react-native-css-interop)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/icons/**"],
};
