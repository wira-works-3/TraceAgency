import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma.aboutContent) {
    return NextResponse.json({ ok: true, about: null });
  }
  try {
    const about = await prisma.aboutContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, about });
  } catch {
    return NextResponse.json({ ok: true, about: null });
  }
}
