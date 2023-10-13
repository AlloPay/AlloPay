// https://facebook.github.io/metro/docs/configuration/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const findWorkspaceRoot = require('find-yarn-workspace-root');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.watcher.healthCheck = { enabled: true };

/* Monorepo */
// 1. Watch all files within the monorepo
config.projectRoot = __dirname;
const workspaceRoot = findWorkspaceRoot(config.projectRoot);
config.watchFolders = [workspaceRoot]; // Metro will only resolve projectRoot and watchFolders

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(config.projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// const getSymlinkedNodeModulesForDirectory = require('expo-yarn-workspaces/common/get-symlinked-modules');
// config.resolver.extraNodeModules = {
//   ...config.resolver.extraNodeModules,
//   ...getSymlinkedNodeModulesForDirectory(workspaceRoot),
//   ...getSymlinkedNodeModulesForDirectory(config.projectRoot),
// };

config.resolver.sourceExts.push('cjs', 'mjs');

// node-libs-react-native
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...require('node-libs-react-native'),
};

module.exports = config;
