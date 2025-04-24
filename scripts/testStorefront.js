import dotenv from 'dotenv';
dotenv.config();
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
if (!domain || !token) throw new Error('Missing .env variables!');

fetch(`https://${domain}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
  body: JSON.stringify({ query: '{ shop { name } }' }),
})
  .then(res => res.json())
  .then(data => console.log('✅ Storefront API connection successful – Shop name:', data.data.shop.name))
  .catch(err => console.error('❌ Storefront API error:', err));
