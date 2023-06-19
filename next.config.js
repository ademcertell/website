const runtimeCaching = require('next-pwa/cache')
const { withContentlayer } = require("next-contentlayer");

const withPWA = require('next-pwa')({
  dest: 'public',
  skipWaiting: true, // installs new SW when available without a prompt, we only need to send a reload request to user.
  register: true,
  runtimeCaching,
  buildExcludes: [
    /chunks\/images\/.*$/, // Don't precache files under .next/static/chunks/images this improves next-optimized-images behaviour
    /chunks\/pages\/api\/.*/ // Dont cache the API it needs fresh serverinfo
  ]
  // exclude: [
  //   /middleware-manifest\.json$/, // exclude middleware to fix error @see https://github.com/shadowwalker/next-pwa/issues/288#issuecomment-955777098,
  //   /build-manifest\.json$/,
  //   /\.map$/, // dont cache map files
  //   /^.*ts.*$/ // Dont let serviceworker touch the TS streams
  // ],
})


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = withContentlayer(nextConfig);