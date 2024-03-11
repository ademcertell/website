const runtimeCaching = require("next-pwa/cache");
const { withContentlayer } = require("next-contentlayer");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['i.scdn.co'],
},
};

module.exports = withContentlayer(nextConfig);