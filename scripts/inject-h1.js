#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const baseDir = path.join(__dirname, '../app/free-svgs');
if (!fs.existsSync(baseDir)) {
  console.error(`Directory not found: ${baseDir}`);
  process.exit(1);
}

const dirs = fs.readdirSync(baseDir).filter(name => {
  const dir = path.join(baseDir, name);
  return fs.statSync(dir).isDirectory();
});

dirs.forEach(slug => {
  const pageFile = path.join(baseDir, slug, 'page.tsx');
  if (!fs.existsSync(pageFile)) {
    console.warn(`Skipping ${slug}: page.tsx not found`);
    return;
  }

  let content = fs.readFileSync(pageFile, 'utf-8');
  if (/<h1[^>]*>/.test(content)) {
    console.log(`Skipping ${slug}: <h1> exists`);
    return;
  }

  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  const lines = content.split('\n');
  const retIdx = lines.findIndex(l => /\breturn\s*\(/.test(l));
  if (retIdx === -1) {
    console.warn(`Could not find return in ${pageFile}`);
    return;
  }

  // Insert <h1> after return(
  const insertIdx = retIdx + 1;
  const indent = lines[insertIdx].match(/^\s*/)[0] || '';
  lines.splice(insertIdx, 0, `${indent}<h1>${title} SVG Collection</h1>`);

  fs.writeFileSync(pageFile, lines.join('\n'), 'utf8');
  console.log(`Injected <h1> into ${slug}/page.tsx`);
});
