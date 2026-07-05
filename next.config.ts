import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  outputFileTracingExcludes: {
    "/api/admin/**/*": ["./public/images/**/*", "./src/lib/**/*"],
  },
};

export default nextConfig;
