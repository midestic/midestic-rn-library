const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const cliPath = path.resolve(__dirname, "../bin/cli.cjs");

function runCli(args, cwd) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: "utf8",
  });
}

function withTempDirectory(run) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "midestic-cli-"));
  try {
    run(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test("list prints available component names", () => {
  const result = runCli(["list"], process.cwd());
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /button/);
  assert.match(result.stdout, /draggable-drawer/);
  assert.match(result.stdout, /icons/);
});

test("add copies only the requested component and its local dependencies", () => {
  withTempDirectory((directory) => {
    fs.writeFileSync(path.join(directory, "package.json"), JSON.stringify({ dependencies: { react: "19" } }));
    const result = runCli(["add", "button"], directory);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(path.join(directory, "src/components/ui/button.tsx")), true);
    assert.equal(fs.existsSync(path.join(directory, "src/lib/utils.ts")), true);
    assert.equal(fs.existsSync(path.join(directory, "src/components/ui/input.tsx")), false);
    assert.match(result.stdout, /npm install .*class-variance-authority/);
  });
});

test("add does not overwrite conflicting files unless requested", () => {
  withTempDirectory((directory) => {
    const destination = path.join(directory, "src/components/ui/button.tsx");
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, "custom component");

    const result = runCli(["add", "button"], directory);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /No files were changed/);
    assert.equal(fs.readFileSync(destination, "utf8"), "custom component");
    assert.equal(fs.existsSync(path.join(directory, "src/lib/utils.ts")), false);
  });
});

test("add rejects unknown component names", () => {
  const result = runCli(["add", "not-a-component"], process.cwd());
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown component/);
});

test("add rejects an invalid project manifest before copying files", () => {
  withTempDirectory((directory) => {
    fs.writeFileSync(path.join(directory, "package.json"), "{ invalid");
    const result = runCli(["add", "button"], directory);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /Could not read .*package.json/);
    assert.equal(fs.existsSync(path.join(directory, "src/components/ui/button.tsx")), false);
  });
});

test("add rejects source directories that escape the project", () => {
  const result = runCli(["add", "button", "--src-dir", "../outside"], process.cwd());
  assert.equal(result.status, 1);
  assert.match(result.stderr, /inside your project/);
});

test("add icons copies the icon set and reports its native dependency", () => {
  withTempDirectory((directory) => {
    const result = runCli(["add", "icons"], directory);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(path.join(directory, "src/icons/index.tsx")), true);
    assert.match(result.stdout, /react-native-svg/);
    assert.match(result.stdout, /npx expo install react-native-svg/);
  });
});

test("add draggable-drawer copies its files and reports gesture dependencies", () => {
  withTempDirectory((directory) => {
    const result = runCli(["add", "draggable-drawer"], directory);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(path.join(directory, "src/components/ui/draggable-drawer.tsx")), true);
    assert.match(result.stdout, /react-native-gesture-handler/);
    assert.match(result.stdout, /react-native-reanimated/);
  });
});

test("init creates a local preset without changing an existing preset", () => {
  withTempDirectory((directory) => {
    const initialized = runCli(["init"], directory);
    const preset = path.join(directory, "midestic-rn-library.preset.js");
    assert.equal(initialized.status, 0, initialized.stderr);
    assert.equal(fs.existsSync(preset), true);

    fs.writeFileSync(preset, "custom preset");
    const repeated = runCli(["init"], directory);
    assert.equal(repeated.status, 0, repeated.stderr);
    assert.equal(fs.readFileSync(preset, "utf8"), "custom preset");
  });
});
