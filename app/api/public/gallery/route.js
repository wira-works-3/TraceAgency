import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma.galleryContent) {
    return NextResponse.json({ ok: true, gallery: null }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const gallery = await prisma.galleryContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, gallery }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: true, gallery: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
