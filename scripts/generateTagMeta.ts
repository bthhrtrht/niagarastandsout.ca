#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { default as OpenAI } from 'openai';

dotenv.config();

// Load cleaned tags
const cleaned = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/cleanedTags.json'), 'utf-8')) as { slug: string; variants: string[] }[];

// Initialize AI client
const ai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY!,
  baseURL: process.env.DEEPSEEK_BASE_URL
});

async function main() {
  const meta: any[] = [];

  for (const { slug, variants } of cleaned) {
    const prompt = `Generate JSON with title, description, metaTitle, metaDescription, alt, imageUrl for the tag slug '${slug}' and variants ${variants.join(', ')}. Use Shopify tone. Output ONLY valid JSON.`;
    const completion = await ai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a Shopify store SEO assistant. Respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
    });
    let content = completion.choices[0].message?.content || '{}';
    // Extract JSON substring
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      content = content.substring(start, end + 1);
    }
    let obj;
    try {
      obj = JSON.parse(content);
    } catch (err) {
      console.error(`Failed to parse JSON for ${slug}:`, content);
      throw err;
    }
    meta.push({ slug, ...obj });
    console.log(`✅ Generated meta for ${slug}`);
  }

  const outPath = path.resolve(__dirname, '../data/tagMeta.json');
  fs.writeFileSync(outPath, JSON.stringify(meta, null, 2));
  console.log(`✅ Tag meta written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
