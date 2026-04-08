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

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.servicesContent) {
    return NextResponse.json({ ok: true, services: null });
  }

  try {
    const services = await prisma.servicesContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, services });
  } catch {
    return NextResponse.json({ ok: true, services: null });
  }
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.servicesContent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel ServicesContent sudah ada dengan: npx prisma db push.",
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

  const pillLabel = String(body?.pillLabel ?? "");
  const headingLine1 = String(body?.headingLine1 ?? "");
  const headingLine2 = String(body?.headingLine2 ?? "");
  const ctaLabel = String(body?.ctaLabel ?? "");
  const detailCtaLabel = String(body?.detailCtaLabel ?? "");
  const services = Array.isArray(body?.services) ? body.services : null;

  try {
    const saved = await prisma.servicesContent.upsert({
      where: { id: 1 },
      update: { pillLabel, headingLine1, headingLine2, ctaLabel, detailCtaLabel, services },
      create: { id: 1, pillLabel, headingLine1, headingLine2, ctaLabel, detailCtaLabel, services },
    });
    return NextResponse.json({ ok: true, services: saved });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("does not exist") || msg.includes("unknown table")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Tabel ServicesContent belum ada di database. Jalankan: npx prisma db push (setelah schema.prisma berisi model ServicesContent).",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: "Gagal menyimpan ke database." }, { status: 500 });
  }
}
