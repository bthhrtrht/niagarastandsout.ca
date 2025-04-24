/** @type {import('next').NextConfig} */
const { SHOPIFY_STORE_DOMAIN } = process.env;

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone',
  images: {
    domains: ['cdn.shopify.com', SHOPIFY_STORE_DOMAIN, 'niagarastandsout.ca'],
  },
};

module.exports = nextConfig;
