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

export async function GET(_request, { params }) {
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
