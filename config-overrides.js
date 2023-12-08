// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Add polyfills
  config.resolve.fallback = {
    fs: false,
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    querystring: require.resolve('querystring-es3'),
    path: require.resolve('path-browserify'),
  };

  return config;
};
