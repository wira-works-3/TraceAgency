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

  if (!prisma.videoShowcaseContent) {
    return NextResponse.json({ ok: true, videoShowcase: null });
  }

  try {
    const videoShowcase = await prisma.videoShowcaseContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, videoShowcase });
  } catch {
    return NextResponse.json({ ok: true, videoShowcase: null });
  }
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.videoShowcaseContent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel VideoShowcaseContent sudah ada dengan: npx prisma db push.",
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
  const heading = String(body?.heading ?? "");
  const description = String(body?.description ?? "");
  const categories = Array.isArray(body?.categories) ? body.categories : null;

  try {
    const saved = await prisma.videoShowcaseContent.upsert({
      where: { id: 1 },
      update: { pillLabel, heading, description, categories },
      create: { id: 1, pillLabel, heading, description, categories },
    });
    return NextResponse.json({ ok: true, videoShowcase: saved });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("does not exist") || msg.includes("unknown table")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Tabel VideoShowcaseContent belum ada di database. Jalankan: npx prisma db push (setelah schema.prisma berisi model VideoShowcaseContent).",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: "Gagal menyimpan ke database." }, { status: 500 });
  }
}

