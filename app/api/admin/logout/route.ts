import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });
  response.cookies.delete(SESSION_COOKIE.name);
  return response;
}
