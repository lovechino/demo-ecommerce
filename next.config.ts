import { NextConfig } from "next";
import { Configuration } from "webpack";
import withBundleAnalyzer from "@next/bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  // output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.smartwork.3i.com.vn",
        pathname: "/uploads/images/**",
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

  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },

  experimental: {
    scrollRestoration: true,
  },

  webpack(config: Configuration, { isServer }: { isServer: boolean }) {
    if (!isServer && config.optimization?.minimizer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        })
      );
    }

    return config;
  },
};

export default withAnalyzer(nextConfig);
