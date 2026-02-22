/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'muzem.co', pathname: '/**' }],
  },
};

module.exports = nextConfig;
