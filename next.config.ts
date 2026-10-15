import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },
  // Keep the development "N" button away from the WhatsApp button (bottom-left)
  devIndicators: { position: "bottom-right" },
};

export default nextConfig;
