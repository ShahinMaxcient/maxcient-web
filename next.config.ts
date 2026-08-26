import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 narrowed the default to [75] and silently coerces any other
    // `quality` prop to the nearest allowed value — so 82 has to be declared
    // here or the full-bleed heroes quietly render at 75 again.
    qualities: [75, 82],
    // Default ladder jumps 2048 -> 3840, so a 1440px screen at 2x DPR (needing
    // ~2880) is handed a 3840 file — on the full-bleed heroes that was ~400KB
    // of pixels it never displays. The two extra rungs keep the same sharpness
    // at a much closer match.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3072, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Supabase Storage — where admin-uploaded images live.
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
