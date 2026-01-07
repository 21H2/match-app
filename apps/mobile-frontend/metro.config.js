const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// Enable symlinks for monorepo
config.resolver.nodeModulesPaths = [
  __dirname + '/node_modules',
  __dirname + '/../../node_modules',
];

// Ensure proper source extensions
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'];

// Set project root to handle monorepo structure
config.projectRoot = __dirname;
config.watchFolders = [__dirname];

module.exports = mergeConfig(config, {});
