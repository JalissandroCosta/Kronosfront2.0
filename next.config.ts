import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.jsdelivr.net',
        protocol: 'https',
        pathname: '/**'
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
        pathname: '/**'
      },
      {
        hostname: 'tvhistoria.com.br',
        protocol: 'https',
        pathname: '/**'
      },
      {
        hostname: '**',
        protocol: 'https',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
