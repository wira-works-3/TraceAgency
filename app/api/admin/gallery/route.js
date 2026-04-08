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

function clampInt(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.floor(n)));
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.galleryContent) {
    return NextResponse.json({ ok: true, gallery: null });
  }

  try {
    const gallery = await prisma.galleryContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, gallery });
  } catch {
    return NextResponse.json({ ok: true, gallery: null });
  }
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.galleryContent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel GalleryContent sudah ada dengan: npx prisma db push.",
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

  const sideLabel = String(body?.sideLabel ?? "");
  const headingLine1 = String(body?.headingLine1 ?? "");
  const headingLine2 = String(body?.headingLine2 ?? "");
  const items = clampInt(body?.items, 0, 99);
  const itemsData = Array.isArray(body?.itemsData) ? body.itemsData : null;

  try {
    const saved = await prisma.galleryContent.upsert({
      where: { id: 1 },
      update: { sideLabel, headingLine1, headingLine2, items, itemsData },
      create: { id: 1, sideLabel, headingLine1, headingLine2, items, itemsData },
    });
    return NextResponse.json({ ok: true, gallery: saved });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("does not exist") || msg.includes("unknown table")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Tabel GalleryContent belum ada di database. Jalankan: npx prisma db push (setelah schema.prisma berisi model GalleryContent).",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: "Gagal menyimpan ke database." }, { status: 500 });
  }
}
