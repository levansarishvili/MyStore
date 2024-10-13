/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "expor t", // Outputs a Single-Page Application (SPA).
  // distDir: "./build", // Changes the build output directory to `./dist`.
  experimental: {
    appDir: true, // Ensure this is set to true for App Router
  },
};

export default nextConfig;
