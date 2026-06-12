import type { NextConfig } from "next";
import { htmlRedirects } from "./lib/html-pages";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return htmlRedirects();
  },
};

export default nextConfig;
