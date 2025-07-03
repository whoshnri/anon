// app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');

    if (!user) {
      return NextResponse.json({ error: 'Missing user param' }, { status: 400 });
    }

    const result = await db.query(
      'SELECT * FROM messages WHERE "user" = $1 ORDER BY id DESC',
      [user]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET /api/messages error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, prompt, content } = body;

    if (!user || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const timestamp = new Date().toISOString();

    const result = await db.query(
      `INSERT INTO messages ("user", prompt, content, ip, timestamp)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [user, prompt || '', content, ip, timestamp]
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
