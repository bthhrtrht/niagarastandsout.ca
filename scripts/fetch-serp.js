#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { GoogleSearch as SerpApi } from 'google-search-results-nodejs';

const client = new SerpApi(process.env.SERPAPI_KEY);
const keywords = [
  'boat decals canada',
  'custom vinyl decals',
  'waterproof stickers ontario',
  'storefront decals hamilton',
  'vehicle wrap toronto',
  'custom stickers ontario',
  'laptop decals canada',
  'rv trailer graphics ontario',
  'commercial vehicle decals canada',
  'kitchen decals ontario',
  'outdoor adventure decals canada',
  'funny stickers canada',
  'business window lettering niagara falls',
  'custom banners canada',
  'warehouse safety labels ontario',
  'marina boat graphics canada',
  'custom waterproof labels bottles',
  'vehicle magnet signs ontario',
  'vinyl signs canada',
  'custom wall decals canada',
  'car decals ontario',
  'truck decals canada',
  'window decals canada',
  'wall stickers canada',
  'custom laptop skins canada',
  'rv decals canada',
  'boat graphics canada',
  'custom banners ontario',
  'event banners canada',
  'trade show banners canada',
  'retail signs canada',
  'point of purchase signs canada',
  'custom point of purchase displays canada'
];

const urls = new Set();

function fetchFor(query) {
  return new Promise(resolve => {
    client.json(
      { q: query, engine: 'google', num: 10 },
      data => {
        if (data.organic_results) {
          data.organic_results.forEach(r => urls.add(r.link));
        }
        resolve();
      }
    );
  });
}

(async () => {
  for (const kw of keywords) {
    console.log(`Fetching SERP for: ${kw}`);
    await fetchFor(kw);
  }
  const top100 = Array.from(urls).slice(0, 100);
  fs.writeFileSync('competitors.json', JSON.stringify(top100, null, 2), 'utf-8');
  console.log(`Collected ${top100.length} URLs.`);
})();
