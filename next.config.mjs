/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://yoursub-backend-production.up.railway.app/:path*",
      },
    ];
  },
};

export default nextConfig;
