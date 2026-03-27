/** Data artikel jurnal — gambar dari /public agar tampil konsisten tanpa bergantung Unsplash. */
const defaultServices = [
  "SPG Event & Pameran",
  "SPG Reguler (mall/toko)",
  "SPB",
  "Brand Ambassador",
  "Usher",
];

const defaultReasons = [
  "Talent terlatih & profesional",
  "Attitude baik & komunikatif",
  "Siap kerja cepat & fleksibel",
];

const makeCityArticleContent = (city) => ({
  intro:
    `Sedang mencari agency SPG ${city} untuk event, pameran, atau promosi? Kami menyediakan jasa talent event profesional yang berpengalaman, menarik, dan komunikatif untuk membantu meningkatkan penjualan dan brand Anda di seluruh daerah.`,
  servicesTitle: "Layanan Kami berupa:",
  services: defaultServices,
  reasonsTitle: "Kenapa Harus Pilih Kami?",
  reasons: defaultReasons,
  cta: `Butuh jasa SPG ${city} sekarang? Hubungi kami untuk penawaran terbaik & booking cepat.`,
  whatsappLabel: "WhatsApp: +62 851-9164-1608",
});

export const articlesData = [
  {
    id: "jakarta",
    title: "Agency SPG Jakarta Profesional | Jasa SPG Jakarta Terpercaya",
    excerpt:
      "Sedang mencari agency SPG Jakarta untuk event, pameran, atau promosi? Temukan jasa talent event profesional yang berpengalaman dan komunikatif untuk kebutuhan brand Anda.",
    date: "27 Mar 2026",
    image: "/SPG/SPG-10.JPG",
    category: "Jakarta",
    objectPosition: "50% 55%",
    content: makeCityArticleContent("Jakarta"),
  },
  {
    id: "semarang",
    title: "Agency SPG Semarang Profesional | Jasa SPG Semarang Terpercaya",
    excerpt:
      "Sedang mencari agency SPG Semarang untuk event, pameran, atau promosi? Kami siap membantu kebutuhan talent event profesional untuk meningkatkan performa promosi brand Anda.",
    date: "27 Mar 2026",
    image: "/Usher/Usher-9.jpg",
    category: "Semarang",
    objectPosition: "50% 12%",
    content: makeCityArticleContent("Semarang"),
  },
  {
    id: "surabaya",
    title: "Agency SPG Surabaya Profesional | Jasa SPG Surabaya Terpercaya",
    excerpt:
      "Butuh agency SPG Surabaya yang cepat, profesional, dan komunikatif? Kami menyediakan talent event berpengalaman untuk event dan promosi Anda.",
    date: "27 Mar 2026",
    image: "/Usher/Usher-16.jpg",
    category: "Surabaya",
    objectPosition: "50% 8%",
    content: makeCityArticleContent("Surabaya"),
  },
  {
    id: "bali",
    title: "Agency SPG Bali Profesional | Jasa SPG Bali Terpercaya",
    excerpt:
      "Cari agency SPG Bali terpercaya untuk event, pameran, atau promosi? Kami menyediakan talent event profesional untuk membantu brand Anda tampil maksimal.",
    date: "27 Mar 2026",
    image: "/Usher/Usher-8.JPG",
    category: "Bali",
    objectPosition: "50% 60%",
    content: makeCityArticleContent("Bali"),
  },
];

export const featuredArticle = articlesData[0];
export const sidebarArticles = articlesData.slice(1);
