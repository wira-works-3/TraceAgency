import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma.servicesContent) {
    return NextResponse.json({ ok: true, services: null }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const services = await prisma.servicesContent.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, services }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: true, services: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
