# Page Design Spec — Trace Agency Landing Page (Desktop-First)

## Global Styles (Design Tokens)
- Theme: Dark, photo-centric.
- Background: `#0B0F14` (page), `#0F1620` (surface), border `rgba(255,255,255,0.08)`.
- Text: primary `#EAF0F7`, secondary `rgba(234,240,247,0.72)`.
- Accent: `#7C5CFF` (CTA), hover brighten + subtle glow.
- Typography: Display (48–64px), H2 (32–40px), body (16–18px), caption (12–14px).
- Buttons: primary filled (accent), secondary outline; hover: translateY(-1px) + shadow.
- Motion (framer-motion): section reveal on scroll (fade+slide), hover micro-interactions, lightbox open/close with scale+fade.

## Meta Information
- Title: “Trace Agency — Visual Storytelling & Creative Production”
- Description: “Trace Agency menghadirkan produksi visual, branding, dan kampanye kreatif—lihat portofolio kami dan konsultasikan kebutuhanmu.”
- Open Graph: `og:title`, `og:description`, `og:image` (URL placeholder Unsplash), `og:type=website`.

## Page Layout & Structure
- Layout system: Hybrid CSS Grid + Flex.
  - Container: max-width 1200–1280px, padding 24–32px.
  - Sections: stacked vertical, spacing 80–120px (desktop).
  - Responsive: turun ke 16–20px padding; grid kolom berkurang bertahap.
- Primary pattern: top nav + hero full-bleed, lalu section bertumpuk; Gallery menjadi fokus utama dengan masonry.

## Page: Landing Page ( / )

### 1) Header (Sticky)
- Left: Logo “Trace Agency”.
- Center/Right: anchor links: About, Services, Gallery, Artikel, Kontak.
- Right: CTA “Konsultasi” (primary).
- Interaction: active section highlight; mobile berubah jadi menu drawer (ikon).

### 2) Hero (Full-bleed)
- Background: 1 foto Unsplash besar (placeholder), overlay gradient gelap untuk kontras.
- Content (left-aligned desktop):
  - Headline kuat (value proposition).
  - Subheadline 1–2 baris.
  - CTA utama “Lihat Galeri” (scroll ke Gallery) + CTA sekunder “Hubungi Kami”.
- Motion: headline stagger reveal; CTA hover scale 1.02.

### 3) About
- Grid 2 kolom desktop:
  - Kolom kiri: narasi singkat + 3 bullet keunggulan.
  - Kolom kanan: kolase 2–3 foto Unsplash (ratio bervariasi), rounded 16px.
- Motion: reveal saat masuk viewport.

### 4) Services
- H2 + deskripsi singkat.
- Grid kartu 3 kolom desktop (turun 2/1 kolom di layar kecil).
- Service Card:
  - Ikon lucide-react (24–28px), judul, deskripsi 2–3 baris.
  - Hover: elevasi + border accent halus.

### 5) Carousel Portofolio (Gaya Contoh, Local Images)
- Tujuan: menggantikan section “Memorable Experiences” (dihapus) dengan carousel portofolio gaya seperti contoh gambar.
- Sumber konten: gambar lokal (bukan CDN) yang di-loop per kategori: **SPG → Usher → MC → Talent → kembali ke SPG**.
  - Setiap kategori memiliki list gambar; carousel berpindah antar item dan terus loop.
- Layout:
  - Desktop: area carousel utama (gambar aktif) + panel preview “Next” di sisi kanan (atau kartu overlay di kanan bawah) menampilkan thumbnail + label item berikutnya.
  - Struktur pakai CSS Grid: 2 kolom (main 8fr, preview 4fr) dengan gap 24px.
- Komponen & interaksi:
  - Slide Utama: gambar besar dengan overlay gradient; teks label kategori + judul singkat (opsional) di kiri bawah.
  - Tombol **Prev/Next**: floating, sisi kiri/kanan slide; area klik 44px; hover glow accent.
  - **Preview Next Item**: selalu terlihat; klik preview = lompat ke item tersebut.
  - Loop behavior: Next dari item terakhir kembali ke item pertama; Prev dari item pertama ke item terakhir.
- Motion:
  - Transisi slide: 250–350ms ease (slide/opacity) + subtle scale.
  - Preview: hover lift + border accent.

### 6) Artikel (Teaser)
- Featured article row: cover besar kiri + teks kanan (judul, ringkasan, meta tanggal).
- List cards: 3 kartu artikel ringkas.
- Aksi: tombol “Baca Selengkapnya” tetap sebagai placeholder (tanpa page baru untuk MVP).

### 7) Kontak
- Split layout desktop:
  - Kiri: teks ajakan + info kontak singkat (email/WA placeholder).
  - Kanan: form card.
- Form fields (wajib): Nama, Email/WhatsApp, Pesan/Kebutuhan.
- States: idle, loading, success, error (copy singkat).

### 8) Footer
- 3 kolom: brand blurb, quick links (anchor), social links.
- Bottom bar: copyright.
