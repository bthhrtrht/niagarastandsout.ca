#!/usr/bin/env ts-node
import 'dotenv/config';
import { getAllCollections } from '../lib/getAllCollections';

(async () => {
  try {
    const collections = await getAllCollections();
    console.log(JSON.stringify(collections, null, 2));
  } catch (e) {
    console.error('Error fetching collections:', e);
    process.exit(1);
  }
})();
