import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '20 s'),
});

// Define which routes you want to rate limit
export const config = {
  matcher: '/',
};

export default async function middleware(request: NextRequest) {
  // Only apply rate limiting in production
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next(); // Skip rate limiting in development
  }

  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/blocked', request.url));
}