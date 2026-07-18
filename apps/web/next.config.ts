import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [{ source: "/", destination: "/site" }];
  },
  async redirects() {
    return [{ source: "/v2", destination: "/", permanent: true }];
  },
};

export default nextConfig;
