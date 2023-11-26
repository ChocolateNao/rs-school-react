/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: './dist',
  images: {
    remotePatterns: [{
      hostname: 'cdn.myanimelist.net'
    }],
  },
};

module.exports = nextConfig;
