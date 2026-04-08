const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const path = require("node:path");

const prisma = new PrismaClient();

function parseDateLabel(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "Traceagencys@gmail.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD belum di-set di environment.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash },
  });

  const articlesPath = path.join(process.cwd(), "data", "articles.json");
  const articlesData = require(articlesPath);

  for (const article of articlesData) {
    const id = String(article?.id ?? "").trim();
    if (!id) continue;
    const date = parseDateLabel(article?.date) ?? new Date();

    await prisma.article.upsert({
      where: { id },
      update: {
        title: String(article?.title ?? ""),
        excerpt: String(article?.excerpt ?? ""),
        content: article?.content ?? null,
        date,
        image: String(article?.image ?? ""),
        category: String(article?.category ?? ""),
        objectPosition: article?.objectPosition ? String(article.objectPosition) : null,
      },
      create: {
        id,
        title: String(article?.title ?? ""),
        excerpt: String(article?.excerpt ?? ""),
        content: article?.content ?? null,
        date,
        image: String(article?.image ?? ""),
        category: String(article?.category ?? ""),
        objectPosition: article?.objectPosition ? String(article.objectPosition) : null,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
