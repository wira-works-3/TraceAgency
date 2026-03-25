/** Data artikel jurnal — gambar dari /public agar tampil konsisten tanpa bergantung Unsplash. */
export const articlesData = [
  {
    id: "1",
    title: "Panduan Memilih SPG & Usher yang Tepat untuk Event Anda",
    excerpt:
      "Memilih talent yang tepat adalah kunci kesuksesan event. Ketahui perbedaan peran SPG dan Usher serta tips memilih talent yang sesuai dengan brand image Anda.",
    date: "12 Okt 2023",
    image: "/Usher/Usher-8.JPG",
    category: "Tips & Trik",
    // Kontrol posisi gambar saat `object-fit: cover` agar tidak kepotong.
    // Format: "50% <angka>" (angka lebih besar = fokus lebih ke bawah, lebih kecil = fokus lebih ke atas)
    objectPosition: "50% 60%",
  },
  {
    id: "2",
    title: "Tren Event Marketing 2024 yang Wajib Anda Ketahui",
    excerpt:
      "Dari interaksi hybrid hingga personalisasi, temukan tren event marketing terbaru untuk meningkatkan engagement.",
    date: "05 Okt 2023",
    image: "/Usher/Usher-9.jpg",
    category: "Marketing",
    objectPosition: "50% 5%",
  },
  {
    id: "3",
    title: "Pentingnya Grooming dan Attitude bagi Seorang Talent",
    excerpt:
      "Mengapa penampilan dan sikap profesional sangat penting saat mewakili sebuah brand di lapangan.",
    date: "28 Sep 2023",
    image: "/Usher/Usher-16.jpg",
    category: "Grooming",
    objectPosition: "50% 0%",
  },
  {
    id: "4",
    title: "Suksesnya Kampanye Brand X bersama Trace Agency",
    excerpt:
      "Studi kasus bagaimana kolaborasi talent yang tepat meningkatkan konversi penjualan hingga 40%.",
    date: "15 Sep 2023",
    image: "/SPG/SPG-10.JPG",
    category: "Case Study",
    objectPosition: "50% 55%",
  },
];

export const featuredArticle = articlesData[0];
export const sidebarArticles = articlesData.slice(1);
