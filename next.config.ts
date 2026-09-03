import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'legendary-space-pancake-4p795p4vr66cjqq5-3000.app.github.dev', // Your forwarded GitHub Codespaces URL
        '*.app.github.dev',
      ],
    },
  },
};

export default nextConfig;
