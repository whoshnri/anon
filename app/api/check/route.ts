import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('user') ?? '';


  const result = await db.query('SELECT * FROM users WHERE username = $1', [slug]);
    const user = result.rows[0];

  return NextResponse.json({ valid: !!user });
}
