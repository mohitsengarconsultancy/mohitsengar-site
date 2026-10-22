import type { NextConfig } from "next";

const CANONICAL_ORIGIN = "https://www.mohitsengar.org";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      // The CV PDF is out of date and no longer linked from /resume; keep it
      // out of search results until it is regenerated from the resume page.
      {
        source: "/Mohit-Sengar-CV.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  async redirects() {
    return [
      // The .com domains served a duplicate of the site with HTTP 200.
      // Send every path on them to the canonical .org origin.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mohitsengar.com" }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mohitsengar.com" }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
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
