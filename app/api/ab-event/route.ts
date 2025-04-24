import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { slug, variant, eventType } = await req.json();
    if (!slug || !variant || !eventType) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const filePath = path.resolve(process.cwd(), 'data', 'ab-events.json');
    const data: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
    data.push({ slug, variant, eventType, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    // forward event to GA4 Measurement Protocol
    try {
      const measurementId = process.env.GA_MEASUREMENT_ID;
      const apiSecret = process.env.GA_API_SECRET;
      if (measurementId && apiSecret) {
        const clientId = randomUUID();
        await fetch(
          `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id: clientId,
              events: [{ name: 'ab_event', params: { slug, variant, eventType } }]
            })
          }
        );
      }
    } catch {
      // ignore GA errors
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
