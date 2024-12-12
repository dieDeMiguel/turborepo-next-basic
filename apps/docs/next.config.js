/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-vercel-ip-country",
            value: "true",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
