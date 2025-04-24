#!/usr/bin/env tsx
import dotenv from 'dotenv';

dotenv.config();
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
const API_VERSION = process.env.SHOPIFY_API_VERSION!;

const THEME_ID = process.argv[2];
if (!THEME_ID) {
  console.error('Usage: tsx scripts/updateCollectionTemplate.ts <theme_id>');
  process.exit(1);
}

async function main() {
  const assetKey = 'layout/theme.liquid';
  const getUrl = `https://${DOMAIN}/admin/api/${API_VERSION}/themes/${THEME_ID}/assets.json?asset[key]=${assetKey}`;
  const getRes = await fetch(getUrl, {
    headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN }
  });
  if (!getRes.ok) {
    console.error('Failed to fetch theme.liquid:', await getRes.text());
    process.exit(1);
  }
  const getData: any = await getRes.json();
  const value = getData.asset.value as string;

  const snippet = `
{% if template == 'collection' and collection.image %}
  <div class="collection-banner">
    <img src="{{ collection.image.src | img_url: 'master' }}" alt="{{ collection.image.alt | escape }}" loading="lazy" />
  </div>
{% endif %}
`;

  const newValue = value.includes(snippet)
    ? value
    : value.replace('<main', `${snippet}\n<main`);

  const updateUrl = `https://${DOMAIN}/admin/api/${API_VERSION}/themes/${THEME_ID}/assets.json`;
  const updateRes = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN
    },
    body: JSON.stringify({ asset: { key: assetKey, value: newValue } })
  });
  const updateData = await updateRes.json();
  if (!updateRes.ok || updateData.errors) {
    console.error('Error updating template:', updateData);
    process.exit(1);
  }

  console.log('✅ theme.liquid has been updated to include the image banner snippet.');
}

main().catch(err => { console.error(err); process.exit(1); });
