// app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookie = (await cookies()).get("auth_user");
  return NextResponse.json({ user: cookie?.value ?? null });
}
