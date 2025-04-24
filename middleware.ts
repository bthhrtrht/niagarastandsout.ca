import { NextResponse, type NextRequest } from 'next/server';
import redirects from './data/redirects.json';

// typed redirects list
type Redirect = { from: string; to: string };

export const config = {
  matcher: ['/:path*'],
};

export async function middleware(req: NextRequest) {
  // handle legacy redirects
  const { pathname, origin } = req.nextUrl;
  const hit = (redirects as Redirect[]).find(r => r.from === pathname);
  if (hit) {
    return NextResponse.redirect(new URL(hit.to, origin), 301);
  }
  const res = NextResponse.next();
  // basic security headers
  res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src *; script-src 'self'; style-src 'self' 'unsafe-inline';"
  );
  res.headers.set('X-Frame-Options', 'DENY');
  try {
    const pathname = req.nextUrl.pathname;
    const parts = pathname.split('/');
    const slug = parts[2];
    const cookie = req.cookies.get(`ab-${slug}`)?.value || 'unknown';
    const origin = req.nextUrl.origin;
    // log page view
    await fetch(`${origin}/api/ab-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, variant: cookie, eventType: 'view' }),
    });
  } catch (_) {
    // silent
  }
  return res;
}
