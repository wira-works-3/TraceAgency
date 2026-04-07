import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

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
  const envDir = process.env.UPLOAD_DIR;
  if (envDir) return envDir;
  return path.join(process.cwd(), "public", "uploads");
}

function safeExtensionFromName(filename) {
  const ext = path.extname(String(filename ?? "")).toLowerCase();
  if (!ext) return "";
  if (!/^\.[a-z0-9]+$/i.test(ext)) return "";
  return ext;
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Form data tidak valid." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ ok: false, error: "File wajib diupload." }, { status: 400 });
  }

  const uploadDir = getUploadDir();
  await fs.mkdir(uploadDir, { recursive: true });

  const originalName = file.name ? String(file.name) : "upload";
  const ext = safeExtensionFromName(originalName) || ".bin";
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const fullPath = path.join(uploadDir, filename);

  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(fullPath, bytes);

  return NextResponse.json({ ok: true, url: `/uploads/${filename}`, filename });
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
  const filename = String(body?.filename ?? "").trim();
  const target = filename || url.replace(/^\/uploads\//, "");

  if (!target || target.includes("/") || target.includes("\\") || target.includes("..")) {
    return NextResponse.json({ ok: false, error: "Target tidak valid." }, { status: 400 });
  }

  const uploadDir = getUploadDir();
  const fullPath = path.join(uploadDir, target);

  try {
    await fs.unlink(fullPath);
  } catch {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
