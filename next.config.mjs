/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  distDir: "build",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.ignoreWarnings = [
      {
        module: /sequelize/,
        message:
          /Module not found|dependency is an expression|Import trace for/,
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  // async headers() {
  headers() {
    return Promise.resolve([
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              // eslint-disable-next-line max-len
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]);
  },
  experimental: {
    serverActions: {
      allowedOrigins: [""],
    },
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    cssChunking: "loose",
    optimizePackageImports: ["antd", "react-bootstrap", "@mui/material"],
  },
  devIndicators: {
    buildActivity: true, // defaults to true
    buildActivityPosition: "top-right", // defaults to 'bottom-right'
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
