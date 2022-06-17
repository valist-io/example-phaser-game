/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  assetPrefix: './',
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback.events = require.resolve('events/');
      config.resolve.fallback.fs = false;
    }
    config.plugins.push(new options.webpack.IgnorePlugin({ resourceRegExp: /^electron$/ }));
    return config;
  },
}
