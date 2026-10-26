#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const packageRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(packageRoot, "src");
const componentRoot = path.join(sourceRoot, "components", "ui");
const nativePackages = new Set([
  "react-native-svg",
  "react-native-safe-area-context",
  "react-native-gesture-handler",
  "react-native-reanimated",
]);
const corePackages = new Set(["react", "react-native"]);

function print(message = "") {
  process.stdout.write(`${message}\n`);
}

const usage = `midestic-rn-library - add personal React Native components to your app

Usage:
  npx midestic-rn-library list
  npx midestic-rn-library init
  npx midestic-rn-library add <component...> [--src-dir <directory>] [--overwrite]

Examples:
  npx midestic-rn-library add button
  npx midestic-rn-library add button input themed-view
  npx midestic-rn-library add draggable-drawer --src-dir app

Components are copied into your project as editable source files.
`;

function componentNames() {
  const names = fs
    .readdirSync(componentRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name.slice(0, -".tsx".length))
    .sort();

  if (fs.existsSync(path.join(sourceRoot, "icons", "index.tsx"))) {
    names.push("icons");
  }

  return names;
}

function findSourceFile(basePath) {
  const candidates = [
    basePath,
    ...[".tsx", ".ts", ".jsx", ".js"].map((extension) => `${basePath}${extension}`),
  ];

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
      continue;
    }

    const resolved = path.resolve(candidate);
    if (!resolved.startsWith(`${sourceRoot}${path.sep}`)) {
      throw new Error(`Local import resolves outside the component source: ${candidate}`);
    }

    return resolved;
  }

  throw new Error(`Could not resolve local component import: ${basePath}`);
}

function localImports(contents) {
  const imports = [];
  const pattern = /\b(?:from\s*|import\s*)["'](\.{1,2}\/[^"']+)["']/g;

  for (const match of contents.matchAll(pattern)) {
    imports.push(match[1]);
  }

  return imports;
}

function moduleImports(contents) {
  const imports = [];
  const pattern = /\b(?:from\s*|import\s*)["']([^"']+)["']|require\(["']([^"']+)["']\)/g;

  for (const match of contents.matchAll(pattern)) {
    const specifier = match[1] || match[2];
    if (specifier && !specifier.startsWith(".") && !specifier.startsWith("#")) {
      imports.push(specifier);
    }
  }

  return imports;
}

function packageName(specifier) {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function collectFiles(componentName) {
  const entry =
    componentName === "icons"
      ? findSourceFile(path.join(sourceRoot, "icons", "index.tsx"))
      : findSourceFile(path.join(componentRoot, `${componentName}.tsx`));
  const files = new Set();
  const packages = new Set();
  const pending = [entry];

  while (pending.length > 0) {
    const file = pending.pop();
    if (files.has(file)) {
      continue;
    }

    files.add(file);
    const contents = fs.readFileSync(file, "utf8");

    for (const importedPackage of moduleImports(contents)) {
      const name = packageName(importedPackage);
      if (!corePackages.has(name)) {
        packages.add(name);
      }
    }

    for (const specifier of localImports(contents)) {
      pending.push(findSourceFile(path.resolve(path.dirname(file), specifier)));
    }
  }

  return { files, packages };
}

function parseAddArguments(args) {
  const components = [];
  let srcDir = "src";
  let overwrite = false;

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--overwrite") {
      overwrite = true;
    } else if (argument === "--src-dir") {
      const value = args[index + 1];
      if (!value || value.startsWith("-")) {
        throw new Error("--src-dir requires a directory path.");
      }
      srcDir = value;
      index += 1;
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      components.push(argument);
    }
  }

  if (path.isAbsolute(srcDir) || srcDir.split(/[\\/]/).includes("..")) {
    throw new Error("--src-dir must be a relative path inside your project.");
  }

  return { components, srcDir, overwrite };
}

function listComponents() {
  print("Available components:");
  for (const name of componentNames()) {
    print(`  ${name}`);
  }
}

function installedPackages(cwd) {
  const projectManifest = path.join(cwd, "package.json");
  const installed = new Set();
  if (!fs.existsSync(projectManifest)) {
    return installed;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(projectManifest, "utf8"));
  } catch (error) {
    throw new Error(`Could not read ${projectManifest}: ${error.message}`);
  }
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error("The project package.json must contain a JSON object.");
  }

  for (const section of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    for (const dependency of Object.keys(manifest[section] || {})) {
      installed.add(dependency);
    }
  }

  return installed;
}

function initialize(cwd) {
  const presetSource = path.join(packageRoot, "tailwind", "preset.js");
  const presetDestination = path.join(cwd, "midestic-rn-library.preset.js");

  if (fs.existsSync(presetDestination)) {
    print("midestic-rn-library.preset.js already exists; leaving it unchanged.");
  } else {
    fs.copyFileSync(presetSource, presetDestination);
    print("Created midestic-rn-library.preset.js");
  }

  print(`
Add the preset and your source files to tailwind.config.js:

  presets: [require("./midestic-rn-library.preset")],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

NativeWind v4 must also be configured in Babel, Metro, and your global CSS.
See the installation guide for complete setup instructions.
`);
}

function addComponents(args, cwd) {
  const { components, srcDir, overwrite } = parseAddArguments(args);
  if (components.length === 0) {
    throw new Error(
      "Specify at least one component name. Run `npx midestic-rn-library list` to see available components.",
    );
  }

  const available = new Set(componentNames());
  const unknown = components.filter((name) => !available.has(name));
  if (unknown.length > 0) {
    throw new Error(
      `Unknown component${unknown.length > 1 ? "s" : ""}: ${unknown.join(", ")}. Run \`npx midestic-rn-library list\` to see available components.`,
    );
  }

  const files = new Set();
  const packages = new Set();

  for (const component of new Set(components)) {
    const result = collectFiles(component);
    for (const file of result.files) files.add(file);
    for (const dependency of result.packages) packages.add(dependency);
  }

  const installed = installedPackages(cwd);
  const destinationRoot = path.resolve(cwd, srcDir);
  const copies = [...files].map((source) => ({
    source,
    destination: path.join(destinationRoot, path.relative(sourceRoot, source)),
  }));

  const conflicts = copies.filter(
    ({ source, destination }) =>
      fs.existsSync(destination) &&
      fs.readFileSync(destination, "utf8") !== fs.readFileSync(source, "utf8") &&
      !overwrite,
  );

  if (conflicts.length > 0) {
    const paths = conflicts.map(({ destination }) => `  ${path.relative(cwd, destination)}`).join("\n");
    throw new Error(
      `These files already exist with different content. No files were changed:\n${paths}\nUse --overwrite to replace them.`,
    );
  }

  const written = [];
  for (const { source, destination } of copies) {
    if (fs.existsSync(destination) && !overwrite) {
      continue;
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
    written.push(destination);
  }

  print(`Added ${[...new Set(components)].join(", ")} (${written.length} source files):`);
  for (const destination of written) {
    print(`  ${path.relative(cwd, destination)}`);
  }

  const missing = [...packages].filter((dependency) => !installed.has(dependency)).sort();
  const npmPackages = missing.filter((dependency) => !nativePackages.has(dependency));
  const nativeDependencies = missing.filter((dependency) => nativePackages.has(dependency));

  if (npmPackages.length > 0) {
    print(`\nInstall these component dependencies:\n  npm install ${npmPackages.join(" ")}`);
  }
  if (nativeDependencies.length > 0) {
    print(
      `\nNative dependencies required: ${nativeDependencies.join(", ")}\nFor Expo, install SDK-compatible versions with:\n  npx expo install ${nativeDependencies.join(" ")}`,
    );
  }
  print(
    "\nAll components use NativeWind className styles. See the installation guide to configure NativeWind.",
  );
}

function main(args, cwd = process.cwd()) {
  const [command, ...rest] = args;

  if (!command || command === "--help" || command === "-h" || command === "help") {
    print(usage);
    return;
  }

  if (command === "list") {
    listComponents();
    return;
  }

  if (command === "init") {
    initialize(cwd);
    return;
  }

  if (command === "add") {
    addComponents(rest, cwd);
    return;
  }

  throw new Error(`Unknown command: ${command}\n\n${usage}`);
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { main };
