#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

(async () => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const siteDomain = 'https://niagarastandsout.ca';
  const dataPath = path.join(__dirname, '../data/free-svgs.json');
  let entries: { handle: string }[] = [];
  try {
    entries = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (err) {
    console.error(`Failed to read data/free-svgs.json: ${err}`);
    process.exit(1);
  }

  for (const { handle } of entries) {
    console.log(`Checking page: ${handle}`);
    // Image check
    const imageUrl = `${siteDomain}/cdn/shop/files/${handle}.png`;
    try {
      const res = await fetch(imageUrl, { method: 'HEAD' });
      if (!res.ok) {
        errors.push(`Missing image for ${handle}: ${res.status} at ${imageUrl}`);
      } else {
        console.log(`  [PASS] Image exists`);
      }
    } catch (err) {
      errors.push(`Error fetching image for ${handle}: ${err}`);
    }

    // Page file
    const pagePath = path.join(__dirname, `../app/free-svgs/${handle}/page.tsx`);
    if (!fs.existsSync(pagePath)) {
      errors.push(`Missing page file: ${pagePath}`);
      continue;
    }
    const content = fs.readFileSync(pagePath, 'utf-8');
    // H1
    if (/\<h1\>.*\<\/h1\>/.test(content)) {
      console.log(`  [PASS] <h1> present`);
    } else {
      errors.push(`${handle}: <h1> tag missing`);
    }
    // Newsletter form
    if (/NewsletterForm|newsletter-form/.test(content)) {
      console.log(`  [PASS] Newsletter form present`);
    } else {
      errors.push(`${handle}: Newsletter signup form missing`);
    }
    // JSON-LD schema
    if (/type="application\/ld\+json"/.test(content)) {
      console.log(`  [PASS] JSON-LD schema present`);
    } else {
      errors.push(`${handle}: SEO JSON-LD schema missing`);
    }
    console.log('');
  }

  console.log('Preflight check complete.');
  if (errors.length) {
    console.error('=== CRITICAL ERRORS ===');
    errors.forEach(e => console.error(`- ${e}`));
    process.exit(1);
  }
  if (warnings.length) {
    console.warn('=== WARNINGS ===');
    warnings.forEach(w => console.warn(`- ${w}`));
  }
  console.log('[OK] All checks passed.');
  process.exit(0);
})();
