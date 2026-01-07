const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable symlinks for monorepo
config.resolver.nodeModulesPaths = [
  __dirname + '/node_modules',
  __dirname + '/../../node_modules',
];

// Ensure proper source extensions
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'];

module.exports = config;
