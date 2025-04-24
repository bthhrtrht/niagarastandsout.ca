#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

(async () => {
  const errors = [];
  const warnings = [];
  const siteDomain = 'https://niagarastandsout.ca';
  const dataPath = path.join(__dirname, '../data/free-svgs.json');
  let entries = [];
  try {
    entries = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (err) {
    console.error(`Failed to read data/free-svgs.json: ${err}`);
    process.exit(1);
  }

  for (const { handle } of entries) {
    console.log(`Checking page: ${handle}`);
    const imageUrl = `${siteDomain}/cdn/shop/files/${handle}.png`;
    try {
      const res = await fetch(imageUrl, { method: 'HEAD' });
      if (!res.ok) {
        errors.push(`Missing image for ${handle}: HTTP ${res.status} at ${imageUrl}`);
      } else {
        console.log('  [PASS] Image exists');
      }
    } catch (err) {
      errors.push(`Error fetching image for ${handle}: ${err}`);
    }

    const compPath = path.join(__dirname, '../components/FreeSvgPage.tsx');
    if (!fs.existsSync(compPath)) {
      errors.push(`Missing component file: ${compPath}`);
      continue;
    }
    const content = fs.readFileSync(compPath, 'utf-8');
    if (/<h1[^>]*>[\s\S]*?<\/h1>/.test(content)) {
      console.log('  [PASS] <h1> present');
    } else {
      errors.push(`${handle}: <h1> tag missing`);
    }
    if (/NewsletterForm|newsletter-form/.test(content)) {
      console.log('  [PASS] Newsletter form present');
    } else {
      errors.push(`${handle}: Newsletter signup form missing`);
    }
    if (/type="application\/ld\+json"/.test(content)) {
      console.log('  [PASS] JSON-LD schema present');
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
