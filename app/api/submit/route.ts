import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const body = await req.json();

    const formData = {
      message: body,
      ip,
    };

    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbwlh_LNciDlcYGt-qW0rPc_5B6MOXgvj3mi-m4wfA0h2NWv9caldXlE-LVD2b6kKLwVfg/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Google Script error:', text);
      return NextResponse.json({ result: 'fail', error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ result: 'success', data });
  } catch (err: unknown) {
  let message = 'Request failed';

  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'string') {
    message = err;
  } else if (err && typeof err === 'object' && 'message' in err) {
    message = String((err).message);
  }

  console.error('Submission failed:', message);

  return NextResponse.json(
    { result: 'fail', error: message },
    { status: 500 }
  );
}

}
