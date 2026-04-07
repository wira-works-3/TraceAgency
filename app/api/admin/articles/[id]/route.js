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

export async function GET(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.article) {
    return NextResponse.json({ ok: true, article: null });
  }

  const resolvedParams = await params;
  const id = String(resolvedParams?.id ?? "").trim();
  if (!id) return NextResponse.json({ ok: true, article: null });

  try {
    const row = await prisma.article.findUnique({ where: { id } });
    return NextResponse.json({ ok: true, article: row ? normalizeArticle(row) : null });
  } catch {
    return NextResponse.json({ ok: true, article: null });
  }
}

export async function PUT(request, { params }) {
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

  const resolvedParams = await params;
  const id = String(resolvedParams?.id ?? "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "ID tidak valid." }, { status: 400 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body tidak valid." }, { status: 400 });
  }

  const title = String(body?.title ?? "").trim();
  const excerpt = String(body?.excerpt ?? "").trim();
  const image = String(body?.image ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const objectPosition = String(body?.objectPosition ?? "").trim() || null;
  const content = body?.content ?? null;
  const date = coerceDate(body?.date) ?? null;

  if (!title || !excerpt || !image || !category) {
    return NextResponse.json(
      { ok: false, error: "Field wajib: title, excerpt, image, category." },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.article.update({
      where: { id },
      data: { title, excerpt, content, image, category, objectPosition, ...(date ? { date } : {}) },
    });
    return NextResponse.json({ ok: true, article: normalizeArticle(updated) });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("record") && msg.includes("not found")) {
      return NextResponse.json({ ok: false, error: "Artikel tidak ditemukan." }, { status: 404 });
    }
    return NextResponse.json({ ok: false, error: "Gagal menyimpan artikel." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma.article) {
    return NextResponse.json({ ok: true });
  }

  const resolvedParams = await params;
  const id = String(resolvedParams?.id ?? "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "ID tidak valid." }, { status: 400 });

  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("record") && msg.includes("not found")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: "Gagal menghapus artikel." }, { status: 500 });
  }
}
