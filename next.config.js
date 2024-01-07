/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
      },
      {
        protocol: "https",
        hostname: "emyotefstnyjryixraib.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
