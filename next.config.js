/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: ["8txnngwl-3000.usw3.devtunnels.ms", "localhost:3000"]
        }
      }
};

module.exports = nextConfig;
