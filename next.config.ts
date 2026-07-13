import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.dzcdn.net" },
      { protocol: "https", hostname: "pps.whatsapp.net" },
      { protocol: "https", hostname: "static.whatsapp.net" },
      { protocol: "https", hostname: "media.whatsapp.com" },
    ],
  },
};

export default nextConfig;
