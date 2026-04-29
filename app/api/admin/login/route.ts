import { NextResponse } from "next/server";
import { checkPassword, signSession, SESSION_COOKIE } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  if (!checkPassword(password)) {
    return NextResponse.redirect(
      new URL("/admin/login?error=1", request.url),
      { status: 303 },
    );
  }

  const token = await signSession();
  const response = NextResponse.redirect(new URL("/admin", request.url), {
    status: 303,
  });
  response.cookies.set(SESSION_COOKIE.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_COOKIE.maxAge,
  });
  return response;
}
