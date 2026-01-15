import { NextResponse } from 'next/server';

export function proxy(request) {
  const authCookie = request.cookies.get('auth')?.value === 'true';
  console.log(authCookie);

  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/addListing',
    '/addListing/:path*',
    '/myListing',
    '/myListing/:path*',
  ],
};
