import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  if (!prisma.article) {
    return NextResponse.json(
      { ok: true, articles: [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const rows = await prisma.article.findMany({ orderBy: { date: "desc" } });
    const articles = rows.map(normalizeArticle);
    return NextResponse.json(
      { ok: true, articles },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: true, articles: [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
