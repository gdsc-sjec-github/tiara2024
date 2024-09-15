/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api/verify/:id",
        destination: "/coordinators/verify/:id",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/",
        permanent: true,
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**"
      }
    ],
  },
};

export default nextConfig;
