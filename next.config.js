/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  }, // according to https://github.com/vercel/next.js/issues/50870
};

module.exports = nextConfig;
