/** @type {import('next').NextConfig} */
const { SHOPIFY_STORE_DOMAIN } = process.env;

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone',
  swcMinify: false,
  experimental: { esbuildMinify: true },
  images: {
    unoptimized: true,
    domains: ['cdn.shopify.com', SHOPIFY_STORE_DOMAIN, 'niagarastandsout.ca'],
  },
};

module.exports = nextConfig;
