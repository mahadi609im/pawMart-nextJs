import { NextResponse } from 'next/server';

export function middleware(request) {
  const authCookie = request.cookies.get('auth');

  const protectedPaths = [
    '/addListing',
    '/myListing',
    '/add-product',
    '/manage-items',
  ];

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );
  if (isProtectedPath && !authCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/addListing/:path*',
    '/myListing/:path*',
    '/add-product/:path*',
    '/manage-items/:path*',
  ],
};
