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

  if (!prisma.heroContent) {
    return NextResponse.json({ ok: true, hero: null });
  }

  try {
    const hero = await prisma.heroContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, hero });
  } catch {
    return NextResponse.json({ ok: true, hero: null });
  }
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.heroContent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel HeroContent sudah ada dengan: npx prisma db push.",
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

  const badge = String(body?.badge ?? "");
  const titleLine1 = String(body?.titleLine1 ?? "");
  const titleLine2 = String(body?.titleLine2 ?? "");
  const description = String(body?.description ?? "");
  const primaryCtaLabel = String(body?.primaryCtaLabel ?? "");
  const secondaryCtaLabel = String(body?.secondaryCtaLabel ?? "");
  const clients = Array.isArray(body?.clients) ? body.clients : null;
  const images = Array.isArray(body?.images) ? body.images : null;

  try {
    const hero = await prisma.heroContent.upsert({
      where: { id: 1 },
      update: {
        badge,
        titleLine1,
        titleLine2,
        description,
        primaryCtaLabel,
        secondaryCtaLabel,
        clients,
        images,
      },
      create: {
        id: 1,
        badge,
        titleLine1,
        titleLine2,
        description,
        primaryCtaLabel,
        secondaryCtaLabel,
        clients,
        images,
      },
    });

    return NextResponse.json({ ok: true, hero });
  } catch (e) {
    const msg = String(e?.message ?? "");
    if (msg.toLowerCase().includes("does not exist") || msg.toLowerCase().includes("unknown table")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Tabel HeroContent belum ada di database. Jalankan: npx prisma db push (setelah schema.prisma berisi model HeroContent).",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Gagal menyimpan ke database." },
      { status: 500 }
    );
  }
}
