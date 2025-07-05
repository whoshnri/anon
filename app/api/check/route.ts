import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('user') ?? '';

  console.log(slug)
  const result = await db.query('SELECT * FROM users WHERE username = $1', [slug]);
    const user = result.rows[0];
  console.log(user)



  return NextResponse.json({ valid: !!user });
}
