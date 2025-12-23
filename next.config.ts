import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "sgp.cloud.appwrite.io",
      },
       {
        protocol: 'https',
        hostname: 'sgp.cloud.appwrite.io',
      }
    ],
  },
};

export default nextConfig;
