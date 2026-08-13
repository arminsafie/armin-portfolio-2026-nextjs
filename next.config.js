/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure content.json ships with the serverless output on hosts like
  // Vercel, since it's read via a dynamic fs path that tracing can miss.
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./content.json"],
      "/admin": ["./content.json"],
      "/api/content": ["./content.json"],
    },
  },
};

module.exports = nextConfig;
