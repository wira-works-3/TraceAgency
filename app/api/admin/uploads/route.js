import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

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

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Form data tidak valid." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || typeof file !== "object" || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ ok: false, error: "File tidak ditemukan." }, { status: 400 });
  }

  const originalName = typeof file.name === "string" ? file.name : "upload";
  const safeName = safeBasename(originalName);
  const ext = path.extname(safeName).toLowerCase();
  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
  if (!allowedExt.has(ext)) {
    return NextResponse.json({ ok: false, error: "Format file tidak didukung." }, { status: 400 });
  }

  const uploadDir = getUploadDir();
  const urlPrefix = getUrlPrefix();
  const fileName = `${crypto.randomUUID()}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, bytes);
    return NextResponse.json({ ok: true, url: `${urlPrefix}/${fileName}` });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal menyimpan file." }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body tidak valid." }, { status: 400 });
  }

  const url = String(body?.url ?? "").trim();
  if (!url) return NextResponse.json({ ok: false, error: "URL tidak valid." }, { status: 400 });

  const urlPrefix = getUrlPrefix();
  const normalizedPrefix = urlPrefix.endsWith("/") ? urlPrefix : `${urlPrefix}/`;
  if (!url.startsWith(normalizedPrefix)) {
    return NextResponse.json({ ok: false, error: "Path tidak valid." }, { status: 400 });
  }

  const fileName = safeBasename(url.slice(normalizedPrefix.length));
  if (!fileName) return NextResponse.json({ ok: false, error: "Path tidak valid." }, { status: 400 });

  const uploadDir = getUploadDir();
  const resolvedDir = path.resolve(uploadDir);
  const resolvedFile = path.resolve(path.join(uploadDir, fileName));
  if (!resolvedFile.startsWith(resolvedDir + path.sep) && resolvedFile !== resolvedDir) {
    return NextResponse.json({ ok: false, error: "Path tidak valid." }, { status: 400 });
  }

  try {
    await fs.unlink(resolvedFile);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = String(e?.code ?? "");
    if (msg === "ENOENT") return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "Gagal menghapus file." }, { status: 500 });
  }
}
