const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add additional source extensions
config.resolver.sourceExts.push('svg', 'mjs', 'cjs');

// Enable symlinks if needed
config.resolver.unstable_enableSymlinks = true;

// Configure transformer for better error handling
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
    mangle: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
};

module.exports = config;
