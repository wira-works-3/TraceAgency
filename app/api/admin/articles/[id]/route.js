import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "node:fs/promises";
import path from "node:path";

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

function getUploadDir() {
  const configured = process.env.UPLOAD_DIR ? String(process.env.UPLOAD_DIR) : "";
  if (configured.trim()) return configured;
  return path.join(process.cwd(), "public", "uploads");
}

function getUrlPrefix() {
  const configured = process.env.UPLOAD_URL_PREFIX ? String(process.env.UPLOAD_URL_PREFIX) : "";
  return configured.trim() || "/uploads";
}

function safeBasename(value) {
  const base = path.basename(String(value ?? ""));
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function normalizeUploadUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("/")) return raw;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      return new URL(raw).pathname || "";
    } catch {
      return "";
    }
  }
  return "";
}

async function deleteUploadedFileByUrl(url) {
  const normalizedUrl = normalizeUploadUrl(url);
  if (!normalizedUrl) return { attempted: false, deleted: false, reason: "empty" };
  const urlPrefix = getUrlPrefix();
  const normalizedPrefix = urlPrefix.endsWith("/") ? urlPrefix : `${urlPrefix}/`;
  if (!normalizedUrl.startsWith(normalizedPrefix)) return { attempted: false, deleted: false, reason: "not_upload" };

  const fileName = safeBasename(normalizedUrl.slice(normalizedPrefix.length));
  if (!fileName) return { attempted: true, deleted: false, reason: "invalid_filename" };

  const uploadDir = getUploadDir();
  const resolvedDir = path.resolve(uploadDir);
  const resolvedFile = path.resolve(path.join(uploadDir, fileName));
  if (!resolvedFile.startsWith(resolvedDir + path.sep) && resolvedFile !== resolvedDir) {
    return { attempted: true, deleted: false, reason: "path_outside_upload_dir" };
  }

  try {
    await fs.unlink(resolvedFile);
    return { attempted: true, deleted: true, reason: "deleted" };
  } catch (e) {
    const code = String(e?.code ?? "");
    if (code === "ENOENT") return { attempted: true, deleted: true, reason: "not_found" };
    if (code === "EACCES" || code === "EPERM") return { attempted: true, deleted: false, reason: "permission_denied" };
    return { attempted: true, deleted: false, reason: code || "unlink_failed" };
  }
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
    const row = await prisma.article.findUnique({ where: { id }, select: { image: true } });
    await prisma.article.delete({ where: { id } });
    const result = await deleteUploadedFileByUrl(row?.image);
    return NextResponse.json({
      ok: true,
      file: {
        attempted: Boolean(result?.attempted),
        deleted: Boolean(result?.deleted),
        reason: String(result?.reason ?? ""),
        url: String(row?.image ?? ""),
      },
    });
  } catch (e) {
    const msg = String(e?.message ?? "").toLowerCase();
    if (msg.includes("record") && msg.includes("not found")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: "Gagal menghapus artikel." }, { status: 500 });
  }
}
