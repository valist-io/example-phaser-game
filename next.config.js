/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "./",
  reactStrictMode: true,
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback.events = require.resolve('events/');
      config.resolve.fallback.fs = false;
    }
    config.plugins.push(new options.webpack.IgnorePlugin({ resourceRegExp: /^electron$/ }));
    return config;
  },
}

module.exports = nextConfig
