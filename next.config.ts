import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Keep your webpack rule as a fallback for production or alternative scripts
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mjs|cjs)$/,
      type: 'javascript/auto',
    });
    return config;
  },

  // 2. Add an empty turbopack configuration block to silence the error
  turbopack: {}, 

  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
