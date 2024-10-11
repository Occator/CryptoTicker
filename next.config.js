/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["coin-images.coingecko.com"],
=======
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
    ],
>>>>>>> feature/userProfile
  },
};

module.exports = nextConfig;
