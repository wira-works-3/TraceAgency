import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  if (!prisma.servicesContent) {
    return NextResponse.json({ ok: true, services: null });
  }
  try {
    const services = await prisma.servicesContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, services });
  } catch {
    return NextResponse.json({ ok: true, services: null });
  }
}
