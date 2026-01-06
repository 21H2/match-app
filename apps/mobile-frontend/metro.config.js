const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// Add additional source extensions
config.resolver.sourceExts.push('svg', 'mjs', 'cjs');

// Configure transformer for proper bundling
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
