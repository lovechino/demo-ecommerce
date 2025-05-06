/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.smartwork.3i.com.vn",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "backend.smartwork.3i.com.vnundefined",
        pathname: "",
      },

      {
        protocol: "https",
        hostname: "file.hstatic.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
