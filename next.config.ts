import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // cdn.sanity.io : images du blog/réalisations gérées depuis le Studio
    // Sanity (ajouté le 2026-10-10, CMS — voir claude/lot3-version-anglaise.md).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
