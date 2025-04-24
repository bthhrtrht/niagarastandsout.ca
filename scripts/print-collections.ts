import 'dotenv/config';
import { getAllCollections } from '../lib/getAllCollections';

(async () => {
  const collections = await getAllCollections();
  console.log('Live Shopify Collection Handles:');
  collections.forEach((col: any) => {
    console.log(`- Handle: ${col.handle} | Title: ${col.title}`);
  });
})();
