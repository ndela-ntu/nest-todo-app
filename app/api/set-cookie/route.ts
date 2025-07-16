import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { success } from "zod/v4";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const cookieStore = cookies();
  (await cookieStore).set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
