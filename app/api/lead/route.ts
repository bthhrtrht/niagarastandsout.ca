import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, slug, message } = await req.json();
    if (!name || !email || !slug || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const filePath = path.resolve(process.cwd(), 'data', 'leads.json');
    const data: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
    data.push({ name, email, slug, message, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    // forward lead event to GA4 Measurement Protocol
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
              events: [{ name: 'lead_capture', params: { slug, name, email } }]
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
