import { NextRequest, NextResponse } from 'next/server';
import { getToken } from './services/cookie.service';

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken();
    if (!token) {
      const redirectUrl = new URL('/register', request.nextUrl);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    const redirectUrl = new URL('/register', request.nextUrl);
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/analyze_cv/:path*', // Matches /analyze_cv and all nested routes
    '/applicants',
    '/jobs',
    '/upload_cvs',
  ],
};
