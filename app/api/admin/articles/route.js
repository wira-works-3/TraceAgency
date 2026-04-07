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

function normalizeArticle(row) {
  const date = row?.date ? new Date(row.date) : null;
  const formattedDate = date
    ? new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(date)
    : null;

  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? null,
    date: date ? date.toISOString() : null,
    dateLabel: formattedDate,
    image: row.image,
    category: row.category,
    objectPosition: row.objectPosition ?? null,
  };
}

function coerceDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.article) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel Article sudah ada dengan: npx prisma db push.",
      },
      { status: 500 }
    );
  }

  try {
    const rows = await prisma.article.findMany({ orderBy: { date: "desc" } });
    return NextResponse.json({ ok: true, articles: rows.map(normalizeArticle) });
  } catch {
    return NextResponse.json({ ok: true, articles: [] });
  }
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.article) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Prisma Client belum sinkron dengan schema. Jalankan: npx prisma generate. Setelah itu pastikan tabel Article sudah ada dengan: npx prisma db push.",
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

  const id = String(body?.id ?? "").trim();
  const title = String(body?.title ?? "").trim();
  const excerpt = String(body?.excerpt ?? "").trim();
  const image = String(body?.image ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const objectPosition = String(body?.objectPosition ?? "").trim() || null;
  const content = body?.content ?? null;
  const date = coerceDate(body?.date) ?? new Date();

  if (!id || !title || !excerpt || !image || !category) {
    return NextResponse.json(
      { ok: false, error: "Field wajib: id, title, excerpt, image, category." },
      { status: 400 }
    );
  }

  try {
    const created = await prisma.article.create({
      data: { id, title, excerpt, content, date, image, category, objectPosition },
    });
    return NextResponse.json({ ok: true, article: normalizeArticle(created) });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return NextResponse.json({ ok: false, error: "ID artikel sudah dipakai." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: "Gagal membuat artikel." }, { status: 500 });
  }
}
