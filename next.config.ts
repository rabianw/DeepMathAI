import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // The project's default Vercel domain served a duplicate copy of the site that Google indexed
  // ahead of the real domain; send it (and every path on it) permanently to www.deepmathai.ai.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "deepmathai.vercel.app" }],
        destination: "https://www.deepmathai.ai/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
