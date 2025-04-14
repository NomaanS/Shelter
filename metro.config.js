const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;

// Fix for older Node.js versions that don't have os.availableParallelism
// This is a workaround for the error in Metro bundler
if (!process.versions.node.startsWith('20.')) {
  const os = require('os');
  if (!os.availableParallelism) {
    os.availableParallelism = () => Math.max(os.cpus().length - 1, 1);
  }
}

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in the project directory
config.watchFolders = [projectRoot];

// 2. Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

// Add custom type files to asset extensions
config.resolver.assetExts.push("d.ts");

module.exports = config; 