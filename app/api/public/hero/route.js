import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
