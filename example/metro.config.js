const fs = require("fs");
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const projectModules = path.join(projectRoot, "node_modules");
const workspaceModules = path.join(workspaceRoot, "node_modules");

const config = getDefaultConfig(projectRoot);

// The component library is linked from the parent folder, so watch it and let
// it resolve its own dependencies from either node_modules.
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [projectModules, workspaceModules];

// Packages installed in both node_modules (react, react-native, ...) must always
// resolve to this app's copy - otherwise the linked library pulls in a second
// copy of React Native and the app breaks at runtime.
const sharedPackages = new Set();

for (const entry of fs.readdirSync(projectModules)) {
  if (entry.startsWith(".")) {
    continue;
  }

  if (entry.startsWith("@")) {
    for (const scoped of fs.readdirSync(path.join(projectModules, entry))) {
      if (fs.existsSync(path.join(workspaceModules, entry, scoped))) {
        sharedPackages.add(`${entry}/${scoped}`);
      }
    }
  } else if (fs.existsSync(path.join(workspaceModules, entry))) {
    sharedPackages.add(entry);
  }
}

const packageNameOf = (request) => {
  const parts = request.split("/");
  return request.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
};

const configWithStorybook = withStorybook(config, {
  configPath: "./.rnstorybook",
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
});

const previousResolveRequest = configWithStorybook.resolver.resolveRequest;

configWithStorybook.resolver.resolveRequest = (context, moduleName, platform) => {
  const forward = (nextContext) =>
    previousResolveRequest
      ? previousResolveRequest(nextContext, moduleName, platform)
      : context.resolveRequest(nextContext, moduleName, platform);

  if (
    moduleName.startsWith(".") ||
    path.isAbsolute(moduleName) ||
    !sharedPackages.has(packageNameOf(moduleName))
  ) {
    return forward(context);
  }

  return forward({ ...context, disableHierarchicalLookup: true });
};

module.exports = withNativeWind(configWithStorybook, {
  input: "./global.css",
});
