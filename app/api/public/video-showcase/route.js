import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma.videoShowcaseContent) {
    return NextResponse.json({ ok: true, videoShowcase: null }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const videoShowcase = await prisma.videoShowcaseContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, videoShowcase }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: true, videoShowcase: null }, { headers: { "Cache-Control": "no-store" } });
  }
}

