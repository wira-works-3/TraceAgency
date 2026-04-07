const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

/**
 * Helper function untuk fetching data dari WordPress REST API
 */
async function fetchAPI(endpoint, queryParams = "") {
  try {
    const url = `${WP_API_URL}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate cache setiap 60 detik (ISR)
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch from WP API: ${res.status} ${res.statusText}`);
      throw new Error("Failed to fetch data dari WordPress");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("fetchAPI Error:", error);
    return null;
  }
}

/**
 * Mengambil daftar semua artikel (Posts)
 * Menggunakan _embed agar mendapatkan Featured Image dan author
 * @param {number} perPage Jumlah artikel per halaman
 * @param {number} page Nomor halaman
 */
export async function getAllPosts(perPage = 10, page = 1) {
  const data = await fetchAPI("/posts", `_embed&per_page=${perPage}&page=${page}`);
  return data;
}

/**
 * Mengambil artikel secara spesifik berdasarkan slug
 * @param {string} slug Slug URL dari artikel WordPress
 */
export async function getPostBySlug(slug) {
  const data = await fetchAPI("/posts", `_embed&slug=${slug}`);
  // Data dikembalikan dalam bentuk array, ambil elemen pertama jika ada
  return data && data.length > 0 ? data[0] : null;
}

/**
 * Mengambil artikel (Posts) dengan jumlah tertentu untuk Landing Page
 * @param {number} limit Batas artikel yang mau diambil
 */
export async function getFeaturedPosts(limit = 4) {
  return await getAllPosts(limit);
}

/**
 * Format data WordPress mentah menjadi format yang siap dipakai oleh React Component
 * @param {Object} wpPost Data artikel mentah dari WP REST API
 */
export function formatWPPost(wpPost) {
  if (!wpPost) return null;

  // Mendapatkan URL Featured Image jika ada
  let imageUrl = "/traceagency.png"; // Fallback image bawaan desain
  if (
    wpPost._embedded &&
    wpPost._embedded["wp:featuredmedia"] &&
    wpPost._embedded["wp:featuredmedia"][0] &&
    wpPost._embedded["wp:featuredmedia"][0].source_url
  ) {
    imageUrl = wpPost._embedded["wp:featuredmedia"][0].source_url;
  }

  // Mendapatkan Kategori (diambil kategori pertama)
  let categoryName = "Artikel";
  if (
    wpPost._embedded &&
    wpPost._embedded["wp:term"] &&
    wpPost._embedded["wp:term"][0] &&
    wpPost._embedded["wp:term"][0].length > 0
  ) {
    categoryName = wpPost._embedded["wp:term"][0][0].name;
  }

  // Format tanggal khusus Indonesia
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(wpPost.date));

  // Excerpt butuh sedikit pembersihan HTML tags (<p>...</p>) bawaan WP
  let excerptText = "";
  if (wpPost.excerpt && wpPost.excerpt.rendered) {
    excerptText = wpPost.excerpt.rendered
      .replace(/<\/?[^>]+(>|$)/g, "") // Hapus semua tag HTML
      .replace(/&hellip;/g, "..."); // Ganti simbol ke teks biasa
  }

  return {
    id: wpPost.slug, // Menggunakan slug sebagai ID dinamis di Next.js URL
    title: wpPost.title.rendered,
    excerpt: excerptText,
    content: wpPost.content.rendered, // Berisi tag HTML konten artikel
    date: formattedDate,
    image: imageUrl,
    category: categoryName,
    objectPosition: "50% 50%", // Default posisi gambar (bisa dirubah nanti)
  };
}

/**
 * Mengambil data khusus Halaman Beranda (Home) yang berisi field ACF untuk Hero Section
 */
export async function getHomePageData() {
  // Asumsi halaman utama di WP diberi slug 'home' atau 'beranda'. Kita bisa cek dua-duanya atau default ke 'home'.
  const data = await fetchAPI("/pages", "slug=home");
  
  if (data && data.length > 0 && data[0].acf) {
    const acf = data[0].acf;
    return {
      tagline: acf.hero_tagline || null,
      title_line_1: acf.hero_title_line_1 || null,
      title_line_2: acf.hero_title_line_2 || null, // Untuk teks abu-abu
      description: acf.hero_description || null,
      // Array gambar ACF Gallery biasanya mengembalikan array of objects
      images: acf.hero_images && Array.isArray(acf.hero_images)
        ? acf.hero_images.map(img => img.url || img)
        : null,
      // Jika marquee dipisahkan koma
      clients: acf.client_marquee ? acf.client_marquee.split(',').map(c => c.trim()) : null
    };
  }
  return null;
}

/**
 * Mengambil daftar artikel dari struktur independen (Custom Post Type).
 * 100% GRATIS dengan plugin CPT UI.
 * cptSlug adalah URL base REST (misal: "gallery", "services").
 */
export async function getCPTPosts(cptSlug, perPage = 10) {
  try {
    // Tarik (fetch) semua post pada tipe khusus tersebut
    const data = await fetchAPI(`/${cptSlug}`, `_embed&per_page=${perPage}`);
    return data;
  } catch (error) {
    console.error(`Gagal mengambil data CPT ${cptSlug}:`, error);
    return [];
  }
}

