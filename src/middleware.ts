import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Exclude static assets, api routes, Next.js internal files
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'invitatum.com';

  // Check if request is accessing via a custom subdomain
  // Examples: alyadanbudi.invitatum.com or alyadanbudi.localhost:3000
  let subdomain: string | null = null;

  if (hostname.includes('localhost') && hostname.split('.').length > 1) {
    const parts = hostname.split('.');
    if (parts[0] !== 'www' && parts[0] !== 'localhost') {
      subdomain = parts[0];
    }
  } else if (hostname.endsWith(mainDomain)) {
    const candidate = hostname.replace(`.${mainDomain}`, '');
    if (candidate && candidate !== 'www' && candidate !== mainDomain && !candidate.includes('.')) {
      subdomain = candidate;
    }
  }

  // If a valid invitation subdomain is detected, rewrite to invitation route
  if (subdomain && !['admin', 'dashboard', 'api', 'auth'].includes(subdomain.toLowerCase())) {
    if (url.pathname.startsWith('/untuk/')) {
      const guestSlug = url.pathname.replace('/untuk/', '');
      return NextResponse.rewrite(new URL(`/invitation/${subdomain}/untuk/${guestSlug}`, req.url));
    }
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL(`/invitation/${subdomain}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
