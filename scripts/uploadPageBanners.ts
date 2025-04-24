#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-04';

async function main() {
  const dirArg = process.argv[2] || 'BANNERS';
  const bannersDir = path.resolve(__dirname, `../${dirArg}`);
  if (!fs.existsSync(bannersDir)) {
    console.error(`Directory not found: ${bannersDir}`);
    process.exit(1);
  }
  const files = fs.readdirSync(bannersDir).filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f));

  for (const file of files) {
    const slug = path.parse(file).name;
    const filePath = path.join(bannersDir, file);
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(file).toLowerCase();
    let mimeType: string;
    switch (ext) {
      case '.jpg': case '.jpeg': mimeType = 'image/jpeg'; break;
      case '.png': mimeType = 'image/png'; break;
      case '.webp': mimeType = 'image/webp'; break;
      case '.svg': mimeType = 'image/svg+xml'; break;
      default: mimeType = 'application/octet-stream';
    }
    // Upload banner via Shopify REST Admin API
    const restUrl = `https://${DOMAIN}/admin/api/${API_VERSION}/files.json`;
    try {
      const attachment = buffer.toString('base64');
      const response = await fetch(restUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Shopify-Access-Token': ADMIN_TOKEN
        },
        body: JSON.stringify({ file: { attachment, filename: file, content_type: mimeType, public: true } })
      });
      const text = await response.text();
      let data: any;
      try { data = JSON.parse(text); } catch {}
      if (!response.ok) {
        console.error(
          `❌ Failed to upload banner '${slug}' [${response.status} ${response.statusText}]:`,
          data || text || '<empty>'
        );
      } else {
        const url = data?.file?.public_url || data?.file?.src || '<no-url>';
        console.log(`✅ Uploaded banner '${slug}':`, url);
      }
    } catch (err) {
      console.error(`❌ Network error uploading banner '${slug}':`, err);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
