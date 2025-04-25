import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

// Background logger for A/B events
async function logAbEvent(slug: string, variant: string, eventType: string) {
  const filePath = path.resolve(process.cwd(), 'data', 'ab-events.json');
  let data: any[] = [];
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(content || '[]');
  } catch (e: any) {
    if (e.code !== 'ENOENT') console.error('Read error:', e);
  }
  data.push({ slug, variant, eventType, timestamp: new Date().toISOString() });
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e: any) {
    console.error('Write error:', e);
  }
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (measurementId && apiSecret) {
    const sendToGA4 = async (attempt = 1) => {
      try {
        const clientId = randomUUID();
        const response = await fetch(
          `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, events: [{ name: 'ab_event', params: { slug, variant, event_type: eventType } }] })
          }
        );
        if (!response.ok) {
          throw new Error(`GA4 responded with status ${response.status}`);
        }
      } catch (fetchError: any) {
        const code = fetchError?.cause?.code || fetchError.code;
        if ((code === 'EAI_AGAIN' || code === 'EAGAIN') && attempt < 3) {
          await new Promise(res => setTimeout(res, 100 * attempt));
          return sendToGA4(attempt + 1);
        }
        console.error(`GA4 forward error (attempt ${attempt}):`, fetchError);
      }
    };
    void sendToGA4();
  }
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { slug, variant, eventType } = body;
  if (!slug || !variant || !eventType) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  void logAbEvent(slug, variant, eventType);
  return NextResponse.json({ success: true });
}
