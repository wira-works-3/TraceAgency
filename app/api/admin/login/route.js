import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "ta_admin_session";

function getSessionToken() {
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (token) return token;
  if (process.env.NODE_ENV !== "production") return "dev_admin_session_token";
  return null;
}

export async function POST(request) {
  const sessionToken = getSessionToken();
  if (!sessionToken) {
    return NextResponse.json({ ok: false, error: "Server belum dikonfigurasi." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body tidak valid." }, { status: 400 });
  }

  const emailRaw = String(body?.email ?? "").trim();
  const email = emailRaw.toLowerCase();
  const password = String(body?.password ?? "");

  if (!emailRaw || !password) {
    return NextResponse.json({ ok: false, error: "Email dan password wajib." }, { status: 400 });
  }

  try {
    const user = await prisma.adminUser.findFirst({
      where: { OR: [{ email: emailRaw }, { email }] },
    });
    if (!user) {
      return NextResponse.json({ ok: false, error: "Email atau password salah." }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Email atau password salah." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("can't reach database server") || msg.includes("unknown database") || msg.includes("access denied")) {
      return NextResponse.json(
        { ok: false, error: "Koneksi database gagal. Pastikan MySQL aktif dan DATABASE_URL benar." },
        { status: 500 }
      );
    }
    if (msg.includes("does not exist") || msg.includes("unknown table") || msg.includes("table") && msg.includes("doesn't exist")) {
      return NextResponse.json(
        { ok: false, error: "Tabel AdminUser belum ada. Jalankan: npx prisma db push lalu npx prisma db seed." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: "Gagal login (server error)." }, { status: 500 });
  }
}
