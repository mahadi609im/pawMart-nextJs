/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // ✅ hostname ঠিক একই রকম
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
