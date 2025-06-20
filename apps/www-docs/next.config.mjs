import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@unlogg/ui"],
  // async rewrites() {
  //   return [
  //     {
  //       source: "/docs/:path*.mdx",
  //       destination: "/llms.mdx/:path*",
  //     },
  //   ];
  // },
};

export default withMDX(config);
