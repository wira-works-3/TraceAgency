import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "ta_admin_session";
const ADMIN_SECRET = process.env.ADMIN_SECRET_CODE;

// Dummy check if we are authorized as admin
function getSessionToken() {
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (token) return token;
  if (process.env.NODE_ENV !== "production") return "dev_admin_session_token";
  return null;
}

function isAuthorized(request) {
  const expected = getSessionToken();
  if (!expected) return false;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return token === expected;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.sectionEditLimit) {
    return NextResponse.json({ ok: false, error: "Tabel SectionEditLimit belum dimigrasi." }, { status: 500 });
  }

  try {
    const limits = await prisma.sectionEditLimit.findMany();
    // Konversi array object hasil select menjadi bentuk map { sectionKey: count }
    const mapped = {};
    for (const item of limits) {
      mapped[item.id] = item.editCount;
    }
    return NextResponse.json({ ok: true, editCounts: mapped });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Gagal memuat batas edit." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.sectionEditLimit) {
    return NextResponse.json({ ok: false, error: "Tabel SectionEditLimit belum dimigrasi." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { action, section, password } = body;

    if (!section || typeof section !== "string") {
      return NextResponse.json({ ok: false, error: "Section tidak dispesifikasikan." }, { status: 400 });
    }

    // Aksi UNLOCK: butuh password yg benar
    if (action === "unlock") {
      if (password !== ADMIN_SECRET) {
        return NextResponse.json({ ok: false, error: "Password salah." }, { status: 401 });
      }

      await prisma.sectionEditLimit.upsert({
        where: { id: section },
        update: { editCount: 0 },
        create: { id: section, editCount: 0 }
      });
      return NextResponse.json({ ok: true, unlocked: true });
    }

    // Aksi INCREMENT: tambahkan +1 pasca save section
    if (action === "increment") {
      const record = await prisma.sectionEditLimit.upsert({
        where: { id: section },
        update: { editCount: { increment: 1 } },
        create: { id: section, editCount: 1 }
      });
      return NextResponse.json({ ok: true, editCount: record.editCount });
    }

    return NextResponse.json({ ok: false, error: "Aksi tidak dikenali." }, { status: 400 });
  } catch (e) {
    console.error("API error at edit-limits:", e);
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan sistem." }, { status: 500 });
  }
}
