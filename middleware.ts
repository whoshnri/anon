import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;

  const isUsersRoute = pathname.startsWith('/users');
  const isUserSlugRoute = pathname.startsWith('/play');

  if (!(isUsersRoute || isUserSlugRoute)) {
    return NextResponse.next();
  }

  const parts = pathname.split('/').filter(Boolean);
  const user = parts[1]
  console.log(user)

  try {
      const res = await fetch(`${baseUrl}/api/check?user=${encodeURIComponent(user)}`, {
      cache: 'no-store',
    });
    const data = await res.json();

    if (!data.valid) {
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
  } catch (err) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}
