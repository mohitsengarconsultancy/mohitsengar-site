import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // /shopify and /shopify-experts cannibalized the same query; the
      // experts page is the richer canonical target.
      {
        source: "/shopify",
        destination: "/shopify-experts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
