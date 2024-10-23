/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "expor t", // Outputs a Single-Page Application (SPA).
  // distDir: "./build", // Changes the build output directory to `./dist`.
  // experimental: {
  //   appDir: true, // Ensure this is set to true for App Router
  // },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
