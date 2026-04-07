import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "ta_admin_session";

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

function sanitizeHighlights(value) {
  if (!value || typeof value !== "object") return null;
  const pillLabel = String(value.pillLabel ?? "");
  const headingLine1 = String(value.headingLine1 ?? "");
  const headingLine2 = String(value.headingLine2 ?? "");
  const itemsRaw = Array.isArray(value.items) ? value.items : [];
  const items = itemsRaw.map((it) => ({
    value: Number.isFinite(Number(it?.value)) ? Number(it.value) : 0,
    suffix: String(it?.suffix ?? ""),
    label: String(it?.label ?? ""),
  }));
  return { pillLabel, headingLine1, headingLine2, items };
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.aboutContent) {
    return NextResponse.json({ ok: true, about: null });
  }

  try {
    const about = await prisma.aboutContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, about });
  } catch {
    return NextResponse.json({ ok: true, about: null });
  }
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.aboutContent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel AboutContent sudah ada dengan: npx prisma db push.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body tidak valid." }, { status: 400 });
  }

  const description = String(body?.description ?? "");
  const highlights = sanitizeHighlights(body?.highlights);

  try {
    const about = await prisma.aboutContent.upsert({
      where: { id: 1 },
      update: { description, highlights },
      create: { id: 1, description, highlights },
    });
    return NextResponse.json({ ok: true, about });
  } catch (e) {
    const msg = String(e?.message ?? "");
    if (msg.toLowerCase().includes("does not exist") || msg.toLowerCase().includes("unknown table")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Tabel AboutContent belum ada di database. Jalankan: npx prisma db push (setelah schema.prisma berisi model AboutContent).",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: "Gagal menyimpan ke database." }, { status: 500 });
  }
}
