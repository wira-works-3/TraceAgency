"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryData } from "@/data/gallery";

const STORAGE_KEY = "traceagency_admin_draft_v1";

const defaultDraft = {
  hero: {
    badge: "Agency SPG & USHER",
    titleLine1: "Perkuat Event Anda",
    titleLine2: "dengan Talent Terbaik",
    description:
      "Kami menyediakan SPG/SPB, Usher, MC, dan Talent profesional untuk mensukseskan setiap event Anda",
    primaryCtaLabel: "Layanan Kami",
    secondaryCtaLabel: "Hubungi Kami",
    clients: [
      "Big Hersman",
      "Armani Exchange",
      "Pertamina",
      "BEI / IDX",
      "BCA",
      "Digibank",
      "Grab",
      "Orangtua Group",
      "Mayora",
      "Teh Pucuk Harum",
      "Pepsico",
      "Hush Puppies",
      "AEON Mall",
      "Richs",
      "Tigac",
      "Blackjack",
      "UPPF",
      "Oumier",
      "UBS Gold",
      "CNI",
      "ADIDAS",
      "Moist Diane",
      "Lalamove",
      "Honda",
      "Yamaha",
      "Indofood",
      "Dekson",
      "CS Food",
      "LPKN",
      "Djarum",
      "Mandiri",
      "Xiaomi",
      "Maybank",
      "Tolak Angin",
      "Ecova",
      "Aqua",
      "VinFast",
      "GoPay",
      "Phillips",
      "Hikvision",
      "Manulife",
      "Allianz",
    ],
    images: [
      "/Usher/Usher-1.jpg",
      "/SPG/SPG-6.JPG",
      "/SPG/SPG-1.JPG",
      "/SPG/SPG-3.jpg",
      "/Usher/Usher-2.JPG",
      "/Usher/Usher-4.JPG",
    ],
  },
  about: {
    description:
      "Trace agency menyediakan talent event seperti SPG/SPB, Usher, dan MC. Tim kami sudah berpengalaman dan profesional sehingga kami siap membantu dan membuat event menjadi lebih hidup dan berkesan.",
    highlights: {
      pillLabel: "Sorotan",
      headingLine1: "Angka di balik",
      headingLine2: "kesuksesan",
      items: [
        { value: 300, suffix: "+", label: "Kolaborasi Brand" },
        { value: 500, suffix: "+", label: "Project Selesai" },
        { value: 8000, suffix: "+", label: "Talent Profesional" },
        { value: 98, suffix: "%", label: "Client Retention Rate" },
      ],
    },
  },
  servicesSection: {
    pillLabel: "Solusi Kami",
    headingLine1: "Mengubah acara",
    headingLine2: "menjadi pengalaman berkesan",
    ctaLabel: "Konsultasi Sekarang",
    detailCtaLabel: "Detail Layanan",
    services: [
      {
        title: "SPG & SPB",
        tags: ["Promosi penjualan", "Duta merek"],
        description:
          "Sales Promotion Girl & Boy profesional untuk meningkatkan brand awareness dan penjualan produk Anda. Kami melatih talent untuk memahami produk Anda sepenuhnya.",
        images: ["/SPG/SPG-1.JPG", "/SPG/SPG-2.JPG", "/SPG/SPG-3.jpg", "/SPG/SPG-4.JPG", "/SPG/SPG-5.JPG"],
      },
      {
        title: "Usher",
        tags: ["Penyambut tamu", "Tamu VIP"],
        description:
          "Penyambutan tamu yang elegan dan profesional untuk memastikan event Anda berjalan lancar. First impression yang tak terlupakan untuk tamu VIP Anda.",
        images: ["/Usher/Usher-1.jpg", "/Usher/Usher-2.JPG", "/Usher/Usher-3.JPG", "/Usher/Usher-4.JPG", "/Usher/Usher-5.JPG"],
      },
      {
        title: "Master of Ceremony",
        tags: ["Gathering", "Meeting"],
        description:
          "MC berpengalaman yang siap menghidupkan suasana dan mengendalikan jalannya acara. Fleksibel untuk berbagai jenis event dari formal hingga kasual.",
        images: ["/MC/MC-1.jpg"],
      },
      {
        title: "Model & Talent",
        tags: ["Pemotretan", "TVC", "Sosmed"],
        description:
          "Model photoshoot, video komersial, dan talent berbakat untuk kebutuhan kampanye kreatif brand Anda. Wajah representatif untuk berbagai konsep visual.",
        images: ["/Talent/Talent-1.JPG"],
      },
    ],
  },
  gallery: {
    sideLabel: "Proyek, sorotan, acara",
    headingLine1: "Partner Event",
    headingLine2: "Profesional dan Terpercaya",
    items: 6,
    itemsData: galleryData,
  },
  videoShowcase: {
    pillLabel: "Galeri",
    heading: "Diari visual kami",
    description: "Lihat dokumentasi event melalui koleksi foto dan highlight dari tim kami.",
    categories: [
      {
        key: "spg",
        label: "SPG",
        images: [
          "/SPG/SPG-1.JPG",
          "/SPG/SPG-2.JPG",
          "/SPG/SPG-3.jpg",
          "/SPG/SPG-4.JPG",
          "/SPG/SPG-5.JPG",
          "/SPG/SPG-6.JPG",
          "/SPG/SPG-7.JPG",
          "/SPG/SPG-8.JPG",
        ],
      },
      {
        key: "usher",
        label: "USHER",
        images: [
          "/Usher/Usher-1.jpg",
          "/Usher/Usher-2.JPG",
          "/Usher/Usher-3.JPG",
          "/Usher/Usher-4.JPG",
          "/Usher/Usher-5.JPG",
          "/Usher/Usher-6.JPG",
          "/Usher/Usher-7.jpg",
          "/Usher/Usher-8.JPG",
          "/Usher/Usher-9.jpg",
          "/Usher/Usher-10.jpg",
          "/Usher/Usher-11.jpg",
          "/Usher/Usher-12.jpg",
          "/Usher/Usher-13.JPG",
          "/Usher/Usher-14.jpg",
          "/Usher/Usher-15.jpg",
          "/Usher/Usher-16.jpg",
        ],
      },
      {
        key: "mc",
        label: "MC",
        images: ["/MC/MC-1.jpg"],
      },
      {
        key: "talent",
        label: "TALENT",
        images: ["/Talent/Talent-1.JPG"],
      },
    ],
  },
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function splitLines(value) {
  return String(value ?? "")
    .split(/\r?\n|,/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminPage() {
  const [device, setDevice] = useState("desktop");
  const [openSection, setOpenSection] = useState("hero");
  const previewFrameRef = useRef(null);
  const ARTICLE_BLOCK_KEYS = useMemo(
    () => ["excerpt", "intro", "servicesTitle", "services", "reasonsTitle", "reasons", "cta", "whatsappLabel"],
    []
  );
  const [draft, setDraft] = useState(defaultDraft);
  const [hasLoadedLocalDraft, setHasLoadedLocalDraft] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [heroDbStatus, setHeroDbStatus] = useState({ state: "idle", message: "" });
  const [heroUploadStatus, setHeroUploadStatus] = useState({ state: "idle", message: "" });
  const [aboutDbStatus, setAboutDbStatus] = useState({ state: "idle", message: "" });
  const [servicesDbStatus, setServicesDbStatus] = useState({ state: "idle", message: "" });
  const [servicesUploadStatus, setServicesUploadStatus] = useState({ state: "idle", message: "", serviceIdx: null });
  const [galleryDbStatus, setGalleryDbStatus] = useState({ state: "idle", message: "" });
  const [galleryUploadStatus, setGalleryUploadStatus] = useState({ state: "idle", message: "", itemIdx: null });
  const [videoShowcaseDbStatus, setVideoShowcaseDbStatus] = useState({ state: "idle", message: "" });
  const [videoShowcaseUploadStatus, setVideoShowcaseUploadStatus] = useState({
    state: "idle",
    message: "",
    categoryIdx: null,
  });
  const [articlesDbStatus, setArticlesDbStatus] = useState({ state: "idle", message: "" });
  const [articleUploadStatus, setArticleUploadStatus] = useState({ state: "idle", message: "" });
  const [articleDrag, setArticleDrag] = useState({ list: null, index: null });
  const [articleBlockDragIndex, setArticleBlockDragIndex] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articleMode, setArticleMode] = useState("create");
  const [articleForm, setArticleForm] = useState({
    originalId: "",
    id: "",
    title: "",
    excerpt: "",
    date: "",
    image: "",
    category: "",
    objectPosition: "",
    intro: "",
    servicesTitle: "",
    services: [""],
    reasonsTitle: "",
    reasons: [""],
    cta: "",
    whatsappLabel: "",
    contentOrder: ["excerpt", "intro", "servicesTitle", "services", "reasonsTitle", "reasons", "cta", "whatsappLabel"],
  });

  const slugify = useCallback((value) => {
    return String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }, []);

  const normalizeArticleBlockOrder = useCallback(
    (value) => {
      const input = Array.isArray(value) ? value.map((v) => String(v)) : [];
      const filtered = input.filter((k) => ARTICLE_BLOCK_KEYS.includes(k));
      const unique = Array.from(new Set(filtered));
      const merged = [...unique, ...ARTICLE_BLOCK_KEYS.filter((k) => !unique.includes(k))];
      return merged;
    },
    [ARTICLE_BLOCK_KEYS]
  );

  const setFormFromArticle = useCallback((article) => {
    const dateInput = article?.date ? String(article.date).slice(0, 10) : "";
    const content = article?.content && typeof article.content === "object" ? article.content : null;
    const contentOrder = normalizeArticleBlockOrder(content?.order);

    setArticleForm({
      originalId: String(article?.id ?? ""),
      id: String(article?.id ?? ""),
      title: String(article?.title ?? ""),
      excerpt: String(article?.excerpt ?? ""),
      date: dateInput,
      image: String(article?.image ?? ""),
      category: String(article?.category ?? ""),
      objectPosition: String(article?.objectPosition ?? ""),
      intro: String(content?.intro ?? article?.excerpt ?? ""),
      servicesTitle: String(content?.servicesTitle ?? "Layanan Kami berupa:"),
      services: Array.isArray(content?.services) ? content.services.map((s) => String(s)) : [""],
      reasonsTitle: String(content?.reasonsTitle ?? "Kenapa Harus Pilih Kami?"),
      reasons: Array.isArray(content?.reasons) ? content.reasons.map((s) => String(s)) : [""],
      cta: String(content?.cta ?? ""),
      whatsappLabel: String(content?.whatsappLabel ?? "WhatsApp: +62 851-9164-1608"),
      contentOrder,
    });
  }, [normalizeArticleBlockOrder]);

  const resetArticleForm = useCallback(() => {
    setArticleMode("create");
    setArticleForm({
      originalId: "",
      id: "",
      title: "",
      excerpt: "",
      date: "",
      image: "",
      category: "",
      objectPosition: "",
      intro: "",
      servicesTitle: "",
      services: [""],
      reasonsTitle: "",
      reasons: [""],
      cta: "",
      whatsappLabel: "",
      contentOrder: ["excerpt", "intro", "servicesTitle", "services", "reasonsTitle", "reasons", "cta", "whatsappLabel"],
    });
  }, []);

  const moveArrayItem = useCallback((arr, fromIndex, toIndex) => {
    const next = Array.isArray(arr) ? [...arr] : [];
    const from = Number(fromIndex);
    const to = Number(toIndex);
    if (!Number.isInteger(from) || !Number.isInteger(to)) return next;
    if (from < 0 || to < 0 || from >= next.length || to >= next.length) return next;
    if (from === to) return next;
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next.length ? next : [""];
  }, []);

  const insertArrayItemAfter = useCallback((arr, index, value) => {
    const next = Array.isArray(arr) ? [...arr] : [];
    const i = Number(index);
    if (!Number.isInteger(i) || i < -1 || i >= next.length) return [...next, value];
    next.splice(i + 1, 0, value);
    return next.length ? next : [""];
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return;
      const mergedHero = { ...defaultDraft.hero, ...(parsed.hero ?? {}) };
      const mergedAboutHighlights = {
        ...defaultDraft.about.highlights,
        ...(parsed.about?.highlights ?? {}),
        items: Array.isArray(parsed.about?.highlights?.items)
          ? parsed.about.highlights.items
          : defaultDraft.about.highlights.items,
      };
      const mergedAbout = { ...defaultDraft.about, ...(parsed.about ?? {}), highlights: mergedAboutHighlights };
      const mergedServicesSection = {
        ...defaultDraft.servicesSection,
        ...(parsed.servicesSection ?? {}),
        services: Array.isArray(parsed.servicesSection?.services)
          ? parsed.servicesSection.services
          : defaultDraft.servicesSection.services,
      };
      const mergedGallery = {
        ...defaultDraft.gallery,
        ...(parsed.gallery ?? {}),
        itemsData: Array.isArray(parsed.gallery?.itemsData) ? parsed.gallery.itemsData : defaultDraft.gallery.itemsData,
      };
      const parsedVsCategories = parsed.videoShowcase?.categories;
      const normalizedVsCategories = Array.isArray(parsedVsCategories)
        ? parsedVsCategories.every((c) => c && typeof c === "object" && "key" in c)
          ? parsedVsCategories
          : parsedVsCategories.every((c) => typeof c === "string")
            ? defaultDraft.videoShowcase.categories.map((c, idx) => ({
                ...c,
                label: String(parsedVsCategories[idx] ?? c.label),
              }))
            : defaultDraft.videoShowcase.categories
        : defaultDraft.videoShowcase.categories;

      const mergedVideoShowcase = {
        ...defaultDraft.videoShowcase,
        ...(parsed.videoShowcase ?? {}),
        categories: normalizedVsCategories,
      };
      setDraft({
        ...defaultDraft,
        ...parsed,
        hero: mergedHero,
        about: mergedAbout,
        servicesSection: mergedServicesSection,
        gallery: mergedGallery,
        videoShowcase: mergedVideoShowcase,
      });
    } catch {
      return;
    } finally {
      setHasLoadedLocalDraft(true);
    }
  }, []);

  const loadArticles = useCallback(async () => {
    setArticlesDbStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/admin/articles");
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setArticlesDbStatus({ state: "error", message: data?.error ?? "Gagal memuat artikel." });
        return;
      }
      setArticles(Array.isArray(data.articles) ? data.articles : []);
      setArticlesDbStatus({ state: "idle", message: "" });
    } catch {
      setArticlesDbStatus({ state: "error", message: "Gagal memuat artikel." });
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalDraft) return;
    loadArticles();
  }, [hasLoadedLocalDraft, loadArticles]);

  const loadAboutFromDatabase = useCallback(async () => {
    setAboutDbStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/admin/about");
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setAboutDbStatus({ state: "error", message: data?.error ?? "Gagal memuat." });
        return;
      }

      const about = data.about;
      if (!about) {
        setAboutDbStatus({ state: "idle", message: "" });
        return;
      }

      setDraft((current) => {
        const next = structuredClone(current);
        next.about = {
          ...next.about,
          description: String(about.description ?? next.about?.description ?? ""),
          highlights: about.highlights && typeof about.highlights === "object" ? about.highlights : next.about?.highlights,
        };
        return next;
      });
      setAboutDbStatus({ state: "idle", message: "" });
    } catch {
      setAboutDbStatus({ state: "error", message: "Gagal memuat." });
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalDraft) return;
    loadAboutFromDatabase();
  }, [hasLoadedLocalDraft, loadAboutFromDatabase]);

  const loadServicesFromDatabase = useCallback(async () => {
    setServicesDbStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setServicesDbStatus({ state: "error", message: data?.error ?? "Gagal memuat." });
        return;
      }
      const saved = data.services;
      if (!saved) {
        setServicesDbStatus({ state: "idle", message: "" });
        return;
      }
      setDraft((current) => {
        const next = structuredClone(current);
        const incoming = Array.isArray(saved.services) ? saved.services : [];
        next.servicesSection = {
          ...next.servicesSection,
          pillLabel: String(saved.pillLabel ?? next.servicesSection?.pillLabel ?? ""),
          headingLine1: String(saved.headingLine1 ?? next.servicesSection?.headingLine1 ?? ""),
          headingLine2: String(saved.headingLine2 ?? next.servicesSection?.headingLine2 ?? ""),
          ctaLabel: String(saved.ctaLabel ?? next.servicesSection?.ctaLabel ?? ""),
          detailCtaLabel: String(saved.detailCtaLabel ?? next.servicesSection?.detailCtaLabel ?? ""),
          services: incoming.length
            ? incoming.map((svc, idx) => ({
                ...(next.servicesSection?.services?.[idx] ?? defaultDraft.servicesSection.services[idx] ?? {}),
                title: String(svc?.title ?? ""),
                tags: Array.isArray(svc?.tags) ? svc.tags.map((t) => String(t)).filter(Boolean) : [],
                description: String(svc?.description ?? ""),
                images: Array.isArray(svc?.images) ? svc.images.map((i) => String(i)).filter(Boolean) : [],
              }))
            : next.servicesSection.services,
        };
        return next;
      });
      setServicesDbStatus({ state: "idle", message: "" });
    } catch {
      setServicesDbStatus({ state: "error", message: "Gagal memuat." });
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalDraft) return;
    loadServicesFromDatabase();
  }, [hasLoadedLocalDraft, loadServicesFromDatabase]);

  const loadGalleryFromDatabase = useCallback(async () => {
    setGalleryDbStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setGalleryDbStatus({ state: "error", message: data?.error ?? "Gagal memuat." });
        return;
      }
      const saved = data.gallery;
      if (!saved) {
        setGalleryDbStatus({ state: "idle", message: "" });
        return;
      }

      setDraft((current) => {
        const next = structuredClone(current);
        const itemsData = Array.isArray(saved.itemsData) ? saved.itemsData : [];
        next.gallery = {
          ...next.gallery,
          sideLabel: String(saved.sideLabel ?? next.gallery?.sideLabel ?? ""),
          headingLine1: String(saved.headingLine1 ?? next.gallery?.headingLine1 ?? ""),
          headingLine2: String(saved.headingLine2 ?? next.gallery?.headingLine2 ?? ""),
          items: Number.isFinite(Number(saved.items)) ? Number(saved.items) : next.gallery?.items ?? 0,
          itemsData: itemsData.length ? itemsData : next.gallery?.itemsData,
        };
        return next;
      });
      setGalleryDbStatus({ state: "idle", message: "" });
    } catch {
      setGalleryDbStatus({ state: "error", message: "Gagal memuat." });
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalDraft) return;
    loadGalleryFromDatabase();
  }, [hasLoadedLocalDraft, loadGalleryFromDatabase]);

  const loadVideoShowcaseFromDatabase = useCallback(async () => {
    setVideoShowcaseDbStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/admin/video-showcase");
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setVideoShowcaseDbStatus({ state: "error", message: data?.error ?? "Gagal memuat." });
        return;
      }
      const saved = data.videoShowcase;
      if (!saved) {
        setVideoShowcaseDbStatus({ state: "idle", message: "" });
        return;
      }

      setDraft((current) => {
        const next = structuredClone(current);
        const savedCats = Array.isArray(saved.categories) ? saved.categories : [];
        const savedByKey = new Map(
          savedCats
            .map((c) => ({
              key: String(c?.key ?? ""),
              label: String(c?.label ?? ""),
              images: Array.isArray(c?.images) ? c.images.map((s) => String(s)).filter(Boolean) : [],
            }))
            .filter((c) => c.key)
            .map((c) => [c.key, c])
        );

        const currentCats = Array.isArray(next.videoShowcase?.categories) ? next.videoShowcase.categories : [];
        next.videoShowcase = {
          ...next.videoShowcase,
          pillLabel: String(saved.pillLabel ?? next.videoShowcase?.pillLabel ?? ""),
          heading: String(saved.heading ?? next.videoShowcase?.heading ?? ""),
          description: String(saved.description ?? next.videoShowcase?.description ?? ""),
          categories: currentCats.map((c) => {
            const key = String(c?.key ?? "");
            const override = savedByKey.get(key);
            if (!override) return c;
            return {
              ...c,
              label: override.label || String(c?.label ?? ""),
              images: override.images,
            };
          }),
        };
        return next;
      });

      setVideoShowcaseDbStatus({ state: "idle", message: "" });
    } catch {
      setVideoShowcaseDbStatus({ state: "error", message: "Gagal memuat." });
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalDraft) return;
    loadVideoShowcaseFromDatabase();
  }, [hasLoadedLocalDraft, loadVideoShowcaseFromDatabase]);

  const saveArticle = useCallback(async () => {
    setArticlesDbStatus({ state: "saving", message: "" });

    const originalId = String(articleForm.originalId ?? "").trim();
    const id = String(articleForm.id ?? "").trim();
    const title = String(articleForm.title ?? "").trim();
    const excerpt = String(articleForm.excerpt ?? "").trim();
    const image = String(articleForm.image ?? "").trim();
    const category = String(articleForm.category ?? "").trim();
    const objectPosition = String(articleForm.objectPosition ?? "").trim();
    const dateInput = String(articleForm.date ?? "").trim();

    const contentServices = Array.isArray(articleForm.services)
      ? articleForm.services.map((s) => String(s).trim()).filter(Boolean)
      : [];
    const contentReasons = Array.isArray(articleForm.reasons)
      ? articleForm.reasons.map((s) => String(s).trim()).filter(Boolean)
      : [];
    const order = normalizeArticleBlockOrder(articleForm.contentOrder);
    const contentObj = {
      intro: String(articleForm.intro ?? ""),
      servicesTitle: String(articleForm.servicesTitle ?? ""),
      services: contentServices,
      reasonsTitle: String(articleForm.reasonsTitle ?? ""),
      reasons: contentReasons,
      cta: String(articleForm.cta ?? ""),
      whatsappLabel: String(articleForm.whatsappLabel ?? ""),
      order,
    };
    const content = contentObj;

    if (!id || !title || !excerpt || !image || !category) {
      setArticlesDbStatus({ state: "error", message: "Field wajib: id, title, excerpt, image, category." });
      return;
    }

    const payload = {
      id,
      title,
      excerpt,
      image,
      category,
      objectPosition: objectPosition || null,
      content,
      date: dateInput ? new Date(dateInput).toISOString() : null,
    };

    try {
      const isCreate = articleMode === "create";
      const isRename = !isCreate && originalId && originalId !== id;

      if (isRename) {
        const createRes = await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const createData = await createRes.json().catch(() => null);
        if (!createRes.ok || !createData?.ok) {
          setArticlesDbStatus({ state: "error", message: createData?.error ?? "Gagal menyimpan artikel." });
          return;
        }

        const delRes = await fetch(`/api/admin/articles/${encodeURIComponent(originalId)}`, { method: "DELETE" });
        const delData = await delRes.json().catch(() => null);
        if (!delRes.ok || !delData?.ok) {
          setArticlesDbStatus({
            state: "error",
            message: delData?.error ?? "Artikel tersimpan, tapi gagal hapus ID lama.",
          });
          await loadArticles();
          return;
        }
        setArticleForm((c) => ({ ...c, originalId: id }));
      } else {
        const url = isCreate ? "/api/admin/articles" : `/api/admin/articles/${encodeURIComponent(id)}`;
        const method = isCreate ? "POST" : "PUT";
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          setArticlesDbStatus({ state: "error", message: data?.error ?? "Gagal menyimpan artikel." });
          return;
        }
        if (!isCreate) {
          setArticleForm((c) => ({ ...c, originalId: id }));
        }
      }

      await loadArticles();
      setArticlesDbStatus({ state: "saved", message: "Artikel tersimpan." });
      window.setTimeout(() => setArticlesDbStatus({ state: "idle", message: "" }), 2000);
      if (isCreate) resetArticleForm();
    } catch {
      setArticlesDbStatus({ state: "error", message: "Gagal menyimpan artikel." });
    }
  }, [articleForm, articleMode, loadArticles, normalizeArticleBlockOrder, resetArticleForm]);

  const deleteArticle = useCallback(
    async (id) => {
      const confirmed = window.confirm("Hapus artikel ini?");
      if (!confirmed) return;
      setArticlesDbStatus({ state: "deleting", message: "" });
      try {
        const res = await fetch(`/api/admin/articles/${encodeURIComponent(id)}`, { method: "DELETE" });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          setArticlesDbStatus({ state: "error", message: data?.error ?? "Gagal menghapus artikel." });
          return;
        }
        await loadArticles();
        setArticlesDbStatus({ state: "saved", message: "Artikel dihapus." });
        window.setTimeout(() => setArticlesDbStatus({ state: "idle", message: "" }), 2000);
        if (articleMode === "edit" && articleForm.id === id) {
          resetArticleForm();
        }
      } catch {
        setArticlesDbStatus({ state: "error", message: "Gagal menghapus artikel." });
      }
    },
    [articleForm.id, articleMode, loadArticles, resetArticleForm]
  );

  useEffect(() => {
    if (!isDirty) return;
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        setIsDirty(false);
        setLastSavedAt(new Date());
      } catch {
        return;
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [draft, isDirty]);

  useEffect(() => {
    if (!hasLoadedLocalDraft) return;
    let cancelled = false;
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data?.ok) return;
        if (!data?.hero) return;
        const hero = data.hero;
        setDraft((current) => ({
          ...current,
          hero: {
            ...current.hero,
            badge: hero.badge ?? current.hero.badge,
            titleLine1: hero.titleLine1 ?? current.hero.titleLine1,
            titleLine2: hero.titleLine2 ?? current.hero.titleLine2,
            description: hero.description ?? current.hero.description,
            primaryCtaLabel: hero.primaryCtaLabel ?? current.hero.primaryCtaLabel,
            secondaryCtaLabel: hero.secondaryCtaLabel ?? current.hero.secondaryCtaLabel,
            clients: Array.isArray(hero.clients) ? hero.clients : current.hero.clients,
            images: Array.isArray(hero.images) ? hero.images : current.hero.images,
          },
        }));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [hasLoadedLocalDraft]);

  const heroPreviewPayload = useMemo(() => {
    return {
      badge: draft.hero.badge,
      titleLine1: draft.hero.titleLine1,
      titleLine2: draft.hero.titleLine2,
      description: draft.hero.description,
      primaryCtaLabel: draft.hero.primaryCtaLabel,
      secondaryCtaLabel: draft.hero.secondaryCtaLabel,
      clients: Array.isArray(draft.hero.clients) ? draft.hero.clients : splitLines(draft.hero.clients),
      images: Array.isArray(draft.hero.images) ? draft.hero.images : splitLines(draft.hero.images),
    };
  }, [
    draft.hero.badge,
    draft.hero.titleLine1,
    draft.hero.titleLine2,
    draft.hero.description,
    draft.hero.primaryCtaLabel,
    draft.hero.secondaryCtaLabel,
    draft.hero.clients,
    draft.hero.images,
  ]);

  const aboutPreviewPayload = useMemo(() => {
    return {
      description: String(draft.about?.description ?? ""),
      highlights: draft.about?.highlights ?? null,
    };
  }, [draft.about?.description, draft.about?.highlights]);

  const servicesPreviewPayload = useMemo(() => {
    const services = Array.isArray(draft.servicesSection?.services)
      ? draft.servicesSection.services
      : defaultDraft.servicesSection.services;

    return {
      pillLabel: String(draft.servicesSection?.pillLabel ?? ""),
      headingLine1: String(draft.servicesSection?.headingLine1 ?? ""),
      headingLine2: String(draft.servicesSection?.headingLine2 ?? ""),
      ctaLabel: String(draft.servicesSection?.ctaLabel ?? ""),
      detailCtaLabel: String(draft.servicesSection?.detailCtaLabel ?? ""),
      services: services.map((s) => ({
        title: String(s?.title ?? ""),
        tags: Array.isArray(s?.tags) ? s.tags.map((t) => String(t)).filter(Boolean) : [],
        description: String(s?.description ?? ""),
        images: Array.isArray(s?.images) ? s.images.map((i) => String(i)).filter(Boolean) : [],
      })),
    };
  }, [
    draft.servicesSection?.pillLabel,
    draft.servicesSection?.headingLine1,
    draft.servicesSection?.headingLine2,
    draft.servicesSection?.ctaLabel,
    draft.servicesSection?.detailCtaLabel,
    draft.servicesSection?.services,
  ]);

  const galleryPreviewPayload = useMemo(() => {
    const itemsData = Array.isArray(draft.gallery?.itemsData)
      ? draft.gallery.itemsData
      : defaultDraft.gallery.itemsData;

    return {
      sideLabel: String(draft.gallery?.sideLabel ?? ""),
      headingLine1: String(draft.gallery?.headingLine1 ?? ""),
      headingLine2: String(draft.gallery?.headingLine2 ?? ""),
      items: clamp(Number(draft.gallery?.items ?? itemsData.length), 0, 99),
      itemsData: itemsData.map((it, idx) => ({
        id: Number(it?.id ?? idx + 1),
        src: String(it?.src ?? ""),
        srcDesktop: it?.srcDesktop ? String(it.srcDesktop) : null,
        srcMobile: it?.srcMobile ? String(it.srcMobile) : null,
        label: String(it?.label ?? ""),
        desc: String(it?.desc ?? ""),
      })),
    };
  }, [draft.gallery?.sideLabel, draft.gallery?.headingLine1, draft.gallery?.headingLine2, draft.gallery?.items, draft.gallery?.itemsData]);

  const videoShowcasePreviewPayload = useMemo(() => {
    const categories = Array.isArray(draft.videoShowcase?.categories)
      ? draft.videoShowcase.categories
      : defaultDraft.videoShowcase.categories;

    return {
      pillLabel: String(draft.videoShowcase?.pillLabel ?? ""),
      heading: String(draft.videoShowcase?.heading ?? ""),
      description: String(draft.videoShowcase?.description ?? ""),
      categories: categories
        .map((c, idx) => ({
          key: String(c?.key ?? defaultDraft.videoShowcase.categories[idx]?.key ?? ""),
          label: String(c?.label ?? ""),
          images: Array.isArray(c?.images) ? c.images.map((s) => String(s)).filter(Boolean) : [],
        }))
        .filter((c) => c.key),
    };
  }, [draft.videoShowcase?.pillLabel, draft.videoShowcase?.heading, draft.videoShowcase?.description, draft.videoShowcase?.categories]);

  const postPreviewMessage = useCallback(() => {
    const win = previewFrameRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      {
        type: "TA_ADMIN_PREVIEW",
        hero: heroPreviewPayload,
        about: aboutPreviewPayload,
        services: servicesPreviewPayload,
        gallery: galleryPreviewPayload,
        videoShowcase: videoShowcasePreviewPayload,
      },
      window.location.origin
    );
  }, [aboutPreviewPayload, galleryPreviewPayload, heroPreviewPayload, servicesPreviewPayload, videoShowcasePreviewPayload]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      postPreviewMessage();
    }, 120);
    return () => window.clearTimeout(t);
  }, [postPreviewMessage]);

  const previewWidthClass = useMemo(() => {
    if (device === "mobile") return "w-[390px]";
    if (device === "tablet") return "w-[820px]";
    return "w-full";
  }, [device]);

  const previewScale = useMemo(() => {
    if (device === "mobile") return 0.92;
    if (device === "tablet") return 0.94;
    return 1;
  }, [device]);

  const savedLabel = useMemo(() => {
    if (isDirty) return "Menyimpan...";
    if (!lastSavedAt) return "Belum tersimpan";
    const hh = String(lastSavedAt.getHours()).padStart(2, "0");
    const mm = String(lastSavedAt.getMinutes()).padStart(2, "0");
    return `Tersimpan ${hh}:${mm}`;
  }, [isDirty, lastSavedAt]);

  const updateDraft = (path, value) => {
    setDraft((current) => {
      const next = structuredClone(current);
      let cursor = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = value;
      return next;
    });
    setIsDirty(true);
  };

  const setHeroImages = (updater) => {
    setDraft((current) => {
      const next = structuredClone(current);
      const currentImages = Array.isArray(next.hero.images) ? next.hero.images : splitLines(next.hero.images);
      next.hero.images = updater(currentImages);
      return next;
    });
    setIsDirty(true);
  };

  const isUploadUrl = (value) => {
    const url = String(value ?? "").trim();
    return url === "/uploads" || url.startsWith("/uploads/");
  };

  const uploadHeroFiles = async (files) => {
    const list = Array.from(files ?? []);
    if (!list.length) return;

    setHeroUploadStatus({ state: "uploading", message: "" });
    const nextUrls = [];

    for (const file of list) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok || !data?.url) {
          setHeroUploadStatus({ state: "error", message: data?.error ?? "Gagal upload gambar." });
          continue;
        }
        nextUrls.push(String(data.url));
      } catch {
        setHeroUploadStatus({ state: "error", message: "Gagal upload gambar." });
      }
    }

    if (nextUrls.length) {
      setHeroImages((current) => Array.from(new Set([...current, ...nextUrls])).filter(Boolean));
      setHeroUploadStatus({ state: "saved", message: "Gambar ditambahkan." });
      window.setTimeout(() => setHeroUploadStatus({ state: "idle", message: "" }), 1500);
    } else {
      setHeroUploadStatus((current) => (current.state === "error" ? current : { state: "idle", message: "" }));
    }
  };

  const deleteHeroImage = async (url) => {
    const target = String(url ?? "").trim();
    if (!target) return;
    if (!isUploadUrl(target)) {
      setHeroImages((current) => current.filter((u) => u !== target));
      setHeroUploadStatus({ state: "saved", message: "Gambar dihapus." });
      window.setTimeout(() => setHeroUploadStatus({ state: "idle", message: "" }), 1500);
      return;
    }
    setHeroUploadStatus({ state: "deleting", message: "" });
    try {
      const res = await fetch("/api/admin/uploads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setHeroUploadStatus({ state: "error", message: data?.error ?? "Gagal menghapus gambar." });
        return;
      }
      setHeroImages((current) => current.filter((u) => u !== target));
      setHeroUploadStatus({ state: "saved", message: "Gambar dihapus." });
      window.setTimeout(() => setHeroUploadStatus({ state: "idle", message: "" }), 1500);
    } catch {
      setHeroUploadStatus({ state: "error", message: "Gagal menghapus gambar." });
    }
  };

  const setServiceImages = (serviceIdx, updater) => {
    setDraft((current) => {
      const next = structuredClone(current);
      const services = Array.isArray(next.servicesSection?.services)
        ? next.servicesSection.services
        : defaultDraft.servicesSection.services;
      const resolved = services.map((svc) => ({
        ...svc,
        tags: Array.isArray(svc?.tags) ? svc.tags : splitLines(svc?.tags),
        images: Array.isArray(svc?.images) ? svc.images : splitLines(svc?.images),
      }));
      const target = resolved[serviceIdx];
      if (!target) return next;
      target.images = updater(Array.isArray(target.images) ? target.images : []);
      next.servicesSection.services = resolved;
      return next;
    });
    setIsDirty(true);
  };

  const uploadServiceFiles = async (serviceIdx, files) => {
    const list = Array.from(files ?? []);
    if (!list.length) return;

    setServicesUploadStatus({ state: "uploading", message: "", serviceIdx });
    const nextUrls = [];

    for (const file of list) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok || !data?.url) {
          setServicesUploadStatus({ state: "error", message: data?.error ?? "Gagal upload gambar.", serviceIdx });
          continue;
        }
        nextUrls.push(String(data.url));
      } catch {
        setServicesUploadStatus({ state: "error", message: "Gagal upload gambar.", serviceIdx });
      }
    }

    if (nextUrls.length) {
      setServiceImages(serviceIdx, (current) => Array.from(new Set([...current, ...nextUrls])).filter(Boolean));
      setServicesUploadStatus({ state: "saved", message: "Gambar ditambahkan.", serviceIdx });
      window.setTimeout(() => setServicesUploadStatus({ state: "idle", message: "", serviceIdx: null }), 1500);
    } else {
      setServicesUploadStatus((current) =>
        current.state === "error" ? current : { state: "idle", message: "", serviceIdx: null }
      );
    }
  };

  const deleteServiceImage = async (serviceIdx, url) => {
    const target = String(url ?? "").trim();
    if (!target) return;
    if (!isUploadUrl(target)) {
      setServiceImages(serviceIdx, (current) => current.filter((u) => u !== target));
      setServicesUploadStatus({ state: "saved", message: "Gambar dihapus.", serviceIdx });
      window.setTimeout(() => setServicesUploadStatus({ state: "idle", message: "", serviceIdx: null }), 1500);
      return;
    }

    setServicesUploadStatus({ state: "deleting", message: "", serviceIdx });
    try {
      const res = await fetch("/api/admin/uploads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setServicesUploadStatus({ state: "error", message: data?.error ?? "Gagal menghapus gambar.", serviceIdx });
        return;
      }
      setServiceImages(serviceIdx, (current) => current.filter((u) => u !== target));
      setServicesUploadStatus({ state: "saved", message: "Gambar dihapus.", serviceIdx });
      window.setTimeout(() => setServicesUploadStatus({ state: "idle", message: "", serviceIdx: null }), 1500);
    } catch {
      setServicesUploadStatus({ state: "error", message: "Gagal menghapus gambar.", serviceIdx });
    }
  };

  const setGalleryItemSrc = (itemIdx, src) => {
    updateDraft(["gallery", "itemsData", itemIdx, "src"], src);
  };

  const uploadGalleryItemFile = async (itemIdx, files) => {
    const list = Array.from(files ?? []);
    const file = list[0];
    if (!file) return;

    const currentSrc = String(draft.gallery?.itemsData?.[itemIdx]?.src ?? "").trim();
    setGalleryUploadStatus({ state: "uploading", message: "", itemIdx });

    try {
      if (currentSrc && isUploadUrl(currentSrc)) {
        await fetch("/api/admin/uploads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: currentSrc }),
        }).catch(() => {});
      }

      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok || !data?.url) {
        setGalleryUploadStatus({ state: "error", message: data?.error ?? "Gagal upload gambar.", itemIdx });
        return;
      }
      setGalleryItemSrc(itemIdx, String(data.url));
      setGalleryUploadStatus({ state: "saved", message: "Gambar tersimpan.", itemIdx });
      window.setTimeout(() => setGalleryUploadStatus({ state: "idle", message: "", itemIdx: null }), 1500);
    } catch {
      setGalleryUploadStatus({ state: "error", message: "Gagal upload gambar.", itemIdx });
    }
  };

  const deleteGalleryItemImage = async (itemIdx) => {
    const currentSrc = String(draft.gallery?.itemsData?.[itemIdx]?.src ?? "").trim();
    if (!currentSrc) return;

    if (!isUploadUrl(currentSrc)) {
      setGalleryItemSrc(itemIdx, "");
      setGalleryUploadStatus({ state: "saved", message: "Gambar dihapus.", itemIdx });
      window.setTimeout(() => setGalleryUploadStatus({ state: "idle", message: "", itemIdx: null }), 1500);
      return;
    }

    setGalleryUploadStatus({ state: "deleting", message: "", itemIdx });
    try {
      const res = await fetch("/api/admin/uploads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentSrc }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setGalleryUploadStatus({ state: "error", message: data?.error ?? "Gagal menghapus gambar.", itemIdx });
        return;
      }
      setGalleryItemSrc(itemIdx, "");
      setGalleryUploadStatus({ state: "saved", message: "Gambar dihapus.", itemIdx });
      window.setTimeout(() => setGalleryUploadStatus({ state: "idle", message: "", itemIdx: null }), 1500);
    } catch {
      setGalleryUploadStatus({ state: "error", message: "Gagal menghapus gambar.", itemIdx });
    }
  };

  const setVideoShowcaseCategoryImages = (categoryIdx, updater) => {
    setDraft((current) => {
      const next = structuredClone(current);
      const categories = Array.isArray(next.videoShowcase?.categories) ? next.videoShowcase.categories : [];
      const resolved = categories.map((cat) => ({
        ...cat,
        images: Array.isArray(cat?.images) ? cat.images : splitLines(cat?.images),
      }));
      const target = resolved[categoryIdx];
      if (!target) return next;
      target.images = updater(Array.isArray(target.images) ? target.images : []);
      next.videoShowcase.categories = resolved;
      return next;
    });
    setIsDirty(true);
  };

  const uploadVideoShowcaseFiles = async (categoryIdx, files) => {
    const list = Array.from(files ?? []);
    if (!list.length) return;

    setVideoShowcaseUploadStatus({ state: "uploading", message: "", categoryIdx });
    const nextUrls = [];

    for (const file of list) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok || !data?.url) {
          setVideoShowcaseUploadStatus({
            state: "error",
            message: data?.error ?? "Gagal upload gambar.",
            categoryIdx,
          });
          continue;
        }
        nextUrls.push(String(data.url));
      } catch {
        setVideoShowcaseUploadStatus({ state: "error", message: "Gagal upload gambar.", categoryIdx });
      }
    }

    if (nextUrls.length) {
      setVideoShowcaseCategoryImages(categoryIdx, (current) =>
        Array.from(new Set([...current, ...nextUrls])).filter(Boolean)
      );
      setVideoShowcaseUploadStatus({ state: "saved", message: "Gambar ditambahkan.", categoryIdx });
      window.setTimeout(
        () => setVideoShowcaseUploadStatus({ state: "idle", message: "", categoryIdx: null }),
        1500
      );
    } else {
      setVideoShowcaseUploadStatus((current) =>
        current.state === "error" ? current : { state: "idle", message: "", categoryIdx: null }
      );
    }
  };

  const deleteVideoShowcaseImage = async (categoryIdx, url) => {
    const target = String(url ?? "").trim();
    if (!target) return;

    if (!isUploadUrl(target)) {
      setVideoShowcaseCategoryImages(categoryIdx, (current) => current.filter((u) => u !== target));
      setVideoShowcaseUploadStatus({ state: "saved", message: "Gambar dihapus.", categoryIdx });
      window.setTimeout(
        () => setVideoShowcaseUploadStatus({ state: "idle", message: "", categoryIdx: null }),
        1500
      );
      return;
    }

    setVideoShowcaseUploadStatus({ state: "deleting", message: "", categoryIdx });
    try {
      const res = await fetch("/api/admin/uploads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setVideoShowcaseUploadStatus({
          state: "error",
          message: data?.error ?? "Gagal menghapus gambar.",
          categoryIdx,
        });
        return;
      }
      setVideoShowcaseCategoryImages(categoryIdx, (current) => current.filter((u) => u !== target));
      setVideoShowcaseUploadStatus({ state: "saved", message: "Gambar dihapus.", categoryIdx });
      window.setTimeout(
        () => setVideoShowcaseUploadStatus({ state: "idle", message: "", categoryIdx: null }),
        1500
      );
    } catch {
      setVideoShowcaseUploadStatus({ state: "error", message: "Gagal menghapus gambar.", categoryIdx });
    }
  };

  const toggleSection = (sectionKey) => {
    setOpenSection((current) => (current === sectionKey ? null : sectionKey));
  };

  const uploadArticleImage = async (files) => {
    const list = Array.from(files ?? []);
    const file = list[0];
    if (!file) return;

    const currentUrl = String(articleForm.image ?? "").trim();
    setArticleUploadStatus({ state: "uploading", message: "" });

    try {
      if (currentUrl && isUploadUrl(currentUrl)) {
        await fetch("/api/admin/uploads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: currentUrl }),
        }).catch(() => {});
      }

      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok || !data?.url) {
        setArticleUploadStatus({ state: "error", message: data?.error ?? "Gagal upload gambar." });
        return;
      }
      setArticleForm((c) => ({ ...c, image: String(data.url) }));
      setArticleUploadStatus({ state: "saved", message: "Gambar tersimpan." });
      window.setTimeout(() => setArticleUploadStatus({ state: "idle", message: "" }), 1500);
    } catch {
      setArticleUploadStatus({ state: "error", message: "Gagal upload gambar." });
    }
  };

  const deleteArticleImage = async () => {
    const currentUrl = String(articleForm.image ?? "").trim();
    if (!currentUrl) return;

    if (!isUploadUrl(currentUrl)) {
      setArticleForm((c) => ({ ...c, image: "" }));
      setArticleUploadStatus({ state: "saved", message: "Gambar dihapus." });
      window.setTimeout(() => setArticleUploadStatus({ state: "idle", message: "" }), 1500);
      return;
    }

    setArticleUploadStatus({ state: "deleting", message: "" });
    try {
      const res = await fetch("/api/admin/uploads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setArticleUploadStatus({ state: "error", message: data?.error ?? "Gagal menghapus gambar." });
        return;
      }
      setArticleForm((c) => ({ ...c, image: "" }));
      setArticleUploadStatus({ state: "saved", message: "Gambar dihapus." });
      window.setTimeout(() => setArticleUploadStatus({ state: "idle", message: "" }), 1500);
    } catch {
      setArticleUploadStatus({ state: "error", message: "Gagal menghapus gambar." });
    }
  };

  const saveHeroToDatabase = async () => {
    setHeroDbStatus({ state: "saving", message: "" });
    try {
      const payload = {
        badge: draft.hero.badge,
        titleLine1: draft.hero.titleLine1,
        titleLine2: draft.hero.titleLine2,
        description: draft.hero.description,
        primaryCtaLabel: draft.hero.primaryCtaLabel,
        secondaryCtaLabel: draft.hero.secondaryCtaLabel,
        clients: Array.isArray(draft.hero.clients) ? draft.hero.clients : splitLines(draft.hero.clients),
        images: Array.isArray(draft.hero.images) ? draft.hero.images : splitLines(draft.hero.images),
      };
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setHeroDbStatus({ state: "error", message: data?.error ?? "Gagal menyimpan." });
        return;
      }
      setHeroDbStatus({ state: "saved", message: "Tersimpan ke database." });
      window.setTimeout(() => setHeroDbStatus({ state: "idle", message: "" }), 2000);
    } catch {
      setHeroDbStatus({ state: "error", message: "Gagal menyimpan." });
    }
  };

  const saveAboutToDatabase = async () => {
    setAboutDbStatus({ state: "saving", message: "" });
    try {
      const payload = {
        description: String(draft.about?.description ?? ""),
        highlights: draft.about?.highlights ?? null,
      };
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setAboutDbStatus({ state: "error", message: data?.error ?? "Gagal menyimpan." });
        return;
      }
      try {
        new BroadcastChannel("ta_admin").postMessage({ type: "about_saved" });
      } catch {
        return;
      }
      setAboutDbStatus({ state: "saved", message: "Tersimpan ke database." });
      window.setTimeout(() => setAboutDbStatus({ state: "idle", message: "" }), 2000);
    } catch {
      setAboutDbStatus({ state: "error", message: "Gagal menyimpan." });
    }
  };

  const saveServicesToDatabase = async () => {
    setServicesDbStatus({ state: "saving", message: "" });
    try {
      const services = Array.isArray(draft.servicesSection?.services)
        ? draft.servicesSection.services
        : defaultDraft.servicesSection.services;

      const payload = {
        pillLabel: String(draft.servicesSection?.pillLabel ?? ""),
        headingLine1: String(draft.servicesSection?.headingLine1 ?? ""),
        headingLine2: String(draft.servicesSection?.headingLine2 ?? ""),
        ctaLabel: String(draft.servicesSection?.ctaLabel ?? ""),
        detailCtaLabel: String(draft.servicesSection?.detailCtaLabel ?? ""),
        services: services.map((svc) => ({
          title: String(svc?.title ?? ""),
          tags: Array.isArray(svc?.tags) ? svc.tags.map((t) => String(t)).filter(Boolean) : splitLines(svc?.tags),
          description: String(svc?.description ?? ""),
          images: Array.isArray(svc?.images) ? svc.images.map((i) => String(i)).filter(Boolean) : splitLines(svc?.images),
        })),
      };

      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setServicesDbStatus({ state: "error", message: data?.error ?? "Gagal menyimpan." });
        return;
      }
      try {
        new BroadcastChannel("ta_admin").postMessage({ type: "services_saved" });
      } catch {
        return;
      }
      setServicesDbStatus({ state: "saved", message: "Tersimpan ke database." });
      window.setTimeout(() => setServicesDbStatus({ state: "idle", message: "" }), 2000);
    } catch {
      setServicesDbStatus({ state: "error", message: "Gagal menyimpan." });
    }
  };

  const saveGalleryToDatabase = async () => {
    setGalleryDbStatus({ state: "saving", message: "" });
    try {
      const itemsData = Array.isArray(draft.gallery?.itemsData) ? draft.gallery.itemsData : defaultDraft.gallery.itemsData;
      const payload = {
        sideLabel: String(draft.gallery?.sideLabel ?? ""),
        headingLine1: String(draft.gallery?.headingLine1 ?? ""),
        headingLine2: String(draft.gallery?.headingLine2 ?? ""),
        items: clamp(Number(draft.gallery?.items ?? itemsData.length), 0, 99),
        itemsData: itemsData.map((it, idx) => ({
          id: Number(it?.id ?? idx + 1),
          src: String(it?.src ?? ""),
          srcDesktop: it?.srcDesktop ? String(it.srcDesktop) : null,
          srcMobile: it?.srcMobile ? String(it.srcMobile) : null,
          label: String(it?.label ?? ""),
          desc: String(it?.desc ?? ""),
        })),
      };

      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setGalleryDbStatus({ state: "error", message: data?.error ?? "Gagal menyimpan." });
        return;
      }
      try {
        new BroadcastChannel("ta_admin").postMessage({ type: "gallery_saved" });
      } catch {
        return;
      }
      setGalleryDbStatus({ state: "saved", message: "Tersimpan ke database." });
      window.setTimeout(() => setGalleryDbStatus({ state: "idle", message: "" }), 2000);
    } catch {
      setGalleryDbStatus({ state: "error", message: "Gagal menyimpan." });
    }
  };

  const saveVideoShowcaseToDatabase = async () => {
    setVideoShowcaseDbStatus({ state: "saving", message: "" });
    try {
      const categories = Array.isArray(draft.videoShowcase?.categories) ? draft.videoShowcase.categories : [];
      const payload = {
        pillLabel: String(draft.videoShowcase?.pillLabel ?? ""),
        heading: String(draft.videoShowcase?.heading ?? ""),
        description: String(draft.videoShowcase?.description ?? ""),
        categories: categories.map((c) => ({
          key: String(c?.key ?? ""),
          label: String(c?.label ?? ""),
          images: Array.isArray(c?.images) ? c.images.map((s) => String(s)).filter(Boolean) : splitLines(c?.images),
        })),
      };

      const res = await fetch("/api/admin/video-showcase", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setVideoShowcaseDbStatus({ state: "error", message: data?.error ?? "Gagal menyimpan." });
        return;
      }
      try {
        new BroadcastChannel("ta_admin").postMessage({ type: "video_showcase_saved" });
      } catch {
        return;
      }
      setVideoShowcaseDbStatus({ state: "saved", message: "Tersimpan ke database." });
      window.setTimeout(() => setVideoShowcaseDbStatus({ state: "idle", message: "" }), 2000);
    } catch {
      setVideoShowcaseDbStatus({ state: "error", message: "Gagal menyimpan." });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">
                Admin Panel
              </div>
              <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight uppercase">
                Editor Konten
              </h1>
              <div className="mt-2 text-sm text-text-secondary">{savedLabel}</div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-full border border-border bg-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => setDevice("desktop")}
                  className={
                    device === "desktop"
                      ? "h-10 px-4 text-sm font-bold bg-foreground text-background"
                      : "h-10 px-4 text-sm font-semibold text-foreground hover:bg-foreground/10 transition-colors"
                  }
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("tablet")}
                  className={
                    device === "tablet"
                      ? "h-10 px-4 text-sm font-bold bg-foreground text-background"
                      : "h-10 px-4 text-sm font-semibold text-foreground hover:bg-foreground/10 transition-colors"
                  }
                >
                  Tablet
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("mobile")}
                  className={
                    device === "mobile"
                      ? "h-10 px-4 text-sm font-bold bg-foreground text-background"
                      : "h-10 px-4 text-sm font-semibold text-foreground hover:bg-foreground/10 transition-colors"
                  }
                >
                  Mobile
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  try {
                    window.localStorage.removeItem(STORAGE_KEY);
                  } catch {
                    return;
                  }
                  setDraft(defaultDraft);
                  setIsDirty(false);
                  setLastSavedAt(null);
                }}
                className="h-10 px-4 rounded-full border border-border bg-surface text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
              >
                Reset Draft
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await fetch("/api/admin/logout", { method: "POST" });
                  } finally {
                    window.location.assign("/admin/login");
                  }
                }}
                className="h-10 px-4 rounded-full border border-border bg-background text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 min-w-0">
            <div className="rounded-3xl border border-border bg-surface p-4 md:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">
                    Preview
                  </div>
                  <div className="mt-1 text-sm text-text-secondary">
                    Preview ini ikut berubah saat kamu edit form (tanpa harus menekan simpan).
                  </div>
                </div>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 px-4 rounded-full border border-border bg-background text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors shrink-0"
                >
                  Buka Website
                </a>
              </div>

              <div className="w-full overflow-auto">
                <div className={`mx-auto ${previewWidthClass}`}>
                  <div
                    className="rounded-2xl overflow-hidden border border-border bg-background shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
                    style={{ transform: `scale(${previewScale})`, transformOrigin: "top center" }}
                  >
                    <div className="h-[72vh] min-h-[560px]">
                      <iframe
                        title="Website Preview"
                        src="/"
                        ref={previewFrameRef}
                        onLoad={postPreviewMessage}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5 min-w-0">
            <div className="rounded-3xl border border-border bg-surface p-4 md:p-6">
              <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">
                Form Editor
              </div>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight">Konten</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Layout admin sudah siap. Nanti saat konek MySQL, field ini tinggal dihubungkan ke API.
              </p>

              <div className="mt-6 space-y-6">
                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "hero"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("hero");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("hero");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Hero</div>
                      <div className="mt-1 text-xs text-text-secondary">Edit heading dan deskripsi utama.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="text-xs text-text-secondary">
                        {heroDbStatus.state === "saving"
                          ? "Menyimpan..."
                          : heroDbStatus.state === "saved"
                            ? "Tersimpan ke database."
                            : heroDbStatus.state === "error"
                              ? heroDbStatus.message || "Gagal menyimpan."
                              : ""}
                      </div>
                      <button
                        type="button"
                        onClick={saveHeroToDatabase}
                        disabled={heroDbStatus.state === "saving"}
                        className="h-10 px-4 rounded-full border border-border bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        Simpan Hero
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Badge
                      </label>
                      <input
                        value={draft.hero.badge}
                        onChange={(e) => updateDraft(["hero", "badge"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Judul Baris 1
                      </label>
                      <input
                        value={draft.hero.titleLine1}
                        onChange={(e) => updateDraft(["hero", "titleLine1"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Judul Baris 2
                      </label>
                      <input
                        value={draft.hero.titleLine2}
                        onChange={(e) => updateDraft(["hero", "titleLine2"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={draft.hero.description}
                        onChange={(e) => updateDraft(["hero", "description"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Label Tombol 1
                      </label>
                      <input
                        value={draft.hero.primaryCtaLabel}
                        onChange={(e) => updateDraft(["hero", "primaryCtaLabel"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Label Tombol 2
                      </label>
                      <input
                        value={draft.hero.secondaryCtaLabel}
                        onChange={(e) => updateDraft(["hero", "secondaryCtaLabel"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Nama Perusahaan (pisahkan dengan koma atau baris baru)
                      </label>
                      <textarea
                        value={(Array.isArray(draft.hero.clients) ? draft.hero.clients : splitLines(draft.hero.clients)).join("\n")}
                        onChange={(e) => updateDraft(["hero", "clients"], splitLines(e.target.value))}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                        rows={6}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Gambar Hero
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {(Array.isArray(draft.hero.images) ? draft.hero.images : splitLines(draft.hero.images)).map(
                          (url, idx) => (
                            <div
                              key={`${url}-${idx}`}
                              className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border bg-surface"
                            >
                              <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
                              <button
                                type="button"
                                onClick={() => deleteHeroImage(url)}
                                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                aria-label="Hapus"
                              >
                                ×
                              </button>
                            </div>
                          )
                        )}

                        <label className="h-24 w-24 rounded-2xl border border-dashed border-border bg-background/40 flex items-center justify-center text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              uploadHeroFiles(e.target.files);
                              e.target.value = "";
                            }}
                          />
                          Tambah
                        </label>
                      </div>

                      {heroUploadStatus.state === "uploading" ? (
                        <div className="mt-3 text-xs text-text-secondary">Mengunggah...</div>
                      ) : heroUploadStatus.state === "deleting" ? (
                        <div className="mt-3 text-xs text-text-secondary">Menghapus...</div>
                      ) : heroUploadStatus.state === "error" ? (
                        <div className="mt-3 text-xs text-red-400">{heroUploadStatus.message || "Terjadi error."}</div>
                      ) : heroUploadStatus.state === "saved" ? (
                        <div className="mt-3 text-xs text-green-400">{heroUploadStatus.message || "Berhasil."}</div>
                      ) : null}
                    </div>
                  </div>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "about"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("about");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("about");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Tentang Kami</div>
                      <div className="mt-1 text-xs text-text-secondary">Edit paragraf deskripsi.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-text-secondary">
                          {aboutDbStatus.state === "loading"
                            ? "Memuat..."
                            : aboutDbStatus.state === "saving"
                              ? "Menyimpan..."
                              : aboutDbStatus.state === "saved"
                                ? aboutDbStatus.message || "Berhasil."
                                : aboutDbStatus.state === "error"
                                  ? aboutDbStatus.message || "Terjadi error."
                                  : ""}
                        </div>
                        <button
                          type="button"
                          onClick={saveAboutToDatabase}
                          disabled={aboutDbStatus.state === "saving"}
                          className="h-10 px-4 rounded-full border border-border bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          Simpan Tentang Kami
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                          Deskripsi
                        </label>
                        <textarea
                          value={draft.about?.description ?? ""}
                          onChange={(e) => updateDraft(["about", "description"], e.target.value)}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                          rows={6}
                        />
                      </div>

                      <div className="pt-2 border-t border-border/60">
                        <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                          Sorotan
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                              Label Badge
                            </label>
                            <input
                              value={draft.about?.highlights?.pillLabel ?? ""}
                              onChange={(e) => updateDraft(["about", "highlights", "pillLabel"], e.target.value)}
                              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                              type="text"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                Judul Baris 1
                              </label>
                              <input
                                value={draft.about?.highlights?.headingLine1 ?? ""}
                                onChange={(e) => updateDraft(["about", "highlights", "headingLine1"], e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                type="text"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                Judul Baris 2 (Highlight)
                              </label>
                              <input
                                value={draft.about?.highlights?.headingLine2 ?? ""}
                                onChange={(e) => updateDraft(["about", "highlights", "headingLine2"], e.target.value)}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                type="text"
                              />
                            </div>
                          </div>

                          {(Array.isArray(draft.about?.highlights?.items) ? draft.about.highlights.items : []).map(
                            (item, idx) => (
                              <div key={idx} className="rounded-2xl border border-border bg-background/40 p-4">
                                <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                                  Item {idx + 1}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                      Angka
                                    </label>
                                    <input
                                      value={item?.value ?? ""}
                                      onChange={(e) =>
                                        updateDraft(
                                          ["about", "highlights", "items", idx, "value"],
                                          Number(e.target.value || 0)
                                        )
                                      }
                                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                      type="number"
                                      min={0}
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                      Suffix
                                    </label>
                                    <select
                                      value={item?.suffix ?? ""}
                                      onChange={(e) =>
                                        updateDraft(["about", "highlights", "items", idx, "suffix"], e.target.value)
                                      }
                                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                    >
                                      <option value="">(Kosong)</option>
                                      <option value="+">+</option>
                                      <option value="%">%</option>
                                    </select>
                                  </div>

                                  <div className="sm:col-span-1">
                                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                      Label
                                    </label>
                                    <input
                                      value={item?.label ?? ""}
                                      onChange={(e) =>
                                        updateDraft(["about", "highlights", "items", idx, "label"], e.target.value)
                                      }
                                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "services"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("services");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("services");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Solusi Kami</div>
                      <div className="mt-1 text-xs text-text-secondary">Edit judul, CTA, dan list layanan.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="text-xs text-text-secondary">
                        {servicesDbStatus.state === "loading"
                          ? "Memuat..."
                          : servicesDbStatus.state === "saving"
                            ? "Menyimpan..."
                            : servicesDbStatus.state === "saved"
                              ? servicesDbStatus.message || "Berhasil."
                              : servicesDbStatus.state === "error"
                                ? servicesDbStatus.message || "Terjadi error."
                                : ""}
                      </div>
                      <button
                        type="button"
                        onClick={saveServicesToDatabase}
                        disabled={servicesDbStatus.state === "saving"}
                        className="h-10 px-4 rounded-full border border-border bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        Simpan Solusi Kami
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                          Label Badge
                        </label>
                        <input
                          value={draft.servicesSection?.pillLabel ?? ""}
                          onChange={(e) => updateDraft(["servicesSection", "pillLabel"], e.target.value)}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                          type="text"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                            Judul Baris 1
                          </label>
                          <input
                            value={draft.servicesSection?.headingLine1 ?? ""}
                            onChange={(e) => updateDraft(["servicesSection", "headingLine1"], e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                            Judul Baris 2 (Highlight)
                          </label>
                          <input
                            value={draft.servicesSection?.headingLine2 ?? ""}
                            onChange={(e) => updateDraft(["servicesSection", "headingLine2"], e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                            Label Tombol (Header)
                          </label>
                          <input
                            value={draft.servicesSection?.ctaLabel ?? ""}
                            onChange={(e) => updateDraft(["servicesSection", "ctaLabel"], e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                            Label Tombol (Detail)
                          </label>
                          <input
                            value={draft.servicesSection?.detailCtaLabel ?? ""}
                            onChange={(e) => updateDraft(["servicesSection", "detailCtaLabel"], e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border/60">
                        <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                          Layanan
                        </div>
                        {(Array.isArray(draft.servicesSection?.services) ? draft.servicesSection.services : []).map(
                          (service, idx) => (
                            <div key={idx} className="rounded-2xl border border-border bg-background/40 p-4">
                              <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                                Item {idx + 1}
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                    Judul
                                  </label>
                                  <input
                                    value={service?.title ?? ""}
                                    onChange={(e) =>
                                      updateDraft(["servicesSection", "services", idx, "title"], e.target.value)
                                    }
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                    type="text"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                    Tags (pisahkan dengan koma atau baris baru)
                                  </label>
                                  <textarea
                                    value={(Array.isArray(service?.tags) ? service.tags : splitLines(service?.tags)).join("\n")}
                                    onChange={(e) =>
                                      updateDraft(["servicesSection", "services", idx, "tags"], splitLines(e.target.value))
                                    }
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                                    rows={3}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                    Deskripsi
                                  </label>
                                  <textarea
                                    value={service?.description ?? ""}
                                    onChange={(e) =>
                                      updateDraft(["servicesSection", "services", idx, "description"], e.target.value)
                                    }
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                                    rows={4}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                    Gambar
                                  </label>
                                  <div className="flex flex-wrap gap-3">
                                    {(Array.isArray(service?.images) ? service.images : splitLines(service?.images)).map(
                                      (url, imgIdx) => (
                                        <div
                                          key={`${url}-${imgIdx}`}
                                          className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border bg-surface"
                                        >
                                          <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
                                          <button
                                            type="button"
                                            onClick={() => deleteServiceImage(idx, url)}
                                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                            aria-label="Hapus"
                                          >
                                            ×
                                          </button>
                                        </div>
                                      )
                                    )}

                                    <label className="h-24 w-24 rounded-2xl border border-dashed border-border bg-background/40 flex items-center justify-center text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => {
                                          uploadServiceFiles(idx, e.target.files);
                                          e.target.value = "";
                                        }}
                                      />
                                      Tambah
                                    </label>
                                  </div>

                                  {servicesUploadStatus.serviceIdx === idx && servicesUploadStatus.state === "uploading" ? (
                                    <div className="mt-3 text-xs text-text-secondary">Mengunggah...</div>
                                  ) : servicesUploadStatus.serviceIdx === idx && servicesUploadStatus.state === "deleting" ? (
                                    <div className="mt-3 text-xs text-text-secondary">Menghapus...</div>
                                  ) : servicesUploadStatus.serviceIdx === idx && servicesUploadStatus.state === "error" ? (
                                    <div className="mt-3 text-xs text-red-400">{servicesUploadStatus.message || "Terjadi error."}</div>
                                  ) : servicesUploadStatus.serviceIdx === idx && servicesUploadStatus.state === "saved" ? (
                                    <div className="mt-3 text-xs text-green-400">{servicesUploadStatus.message || "Berhasil."}</div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "gallery"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("gallery");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("gallery");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Gallery</div>
                      <div className="mt-1 text-xs text-text-secondary">Atur judul, label kecil, dan item galeri.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="text-xs text-text-secondary">
                        {galleryDbStatus.state === "loading"
                          ? "Memuat..."
                          : galleryDbStatus.state === "saving"
                            ? "Menyimpan..."
                            : galleryDbStatus.state === "saved"
                              ? galleryDbStatus.message || "Berhasil."
                              : galleryDbStatus.state === "error"
                                ? galleryDbStatus.message || "Terjadi error."
                                : ""}
                      </div>
                      <button
                        type="button"
                        onClick={saveGalleryToDatabase}
                        disabled={galleryDbStatus.state === "saving"}
                        className="h-10 px-4 rounded-full border border-border bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        Simpan Gallery
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Label Kecil (Kiri)
                      </label>
                      <input
                        value={draft.gallery.sideLabel ?? ""}
                        onChange={(e) => updateDraft(["gallery", "sideLabel"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Heading Baris 1
                      </label>
                      <input
                        value={draft.gallery.headingLine1}
                        onChange={(e) => updateDraft(["gallery", "headingLine1"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Heading Baris 2
                      </label>
                      <input
                        value={draft.gallery.headingLine2}
                        onChange={(e) => updateDraft(["gallery", "headingLine2"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Jumlah Item Ditampilkan
                      </label>
                      <input
                        value={draft.gallery.items}
                        onChange={(e) =>
                          updateDraft(
                            ["gallery", "items"],
                            clamp(Number(e.target.value || 0), 0, 99)
                          )
                        }
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="number"
                        min={0}
                        max={99}
                      />
                    </div>

                    <div className="pt-2 border-t border-border/60">
                      <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                        Item Galeri
                      </div>
                      {(Array.isArray(draft.gallery?.itemsData) ? draft.gallery.itemsData : []).map((item, idx) => (
                        <div key={idx} className="rounded-2xl border border-border bg-background/40 p-4">
                          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                            Item {idx + 1}
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                Gambar
                              </label>
                              <div className="flex flex-wrap gap-3">
                                {item?.src ? (
                                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border bg-surface">
                                    <img src={item.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                                    <button
                                      type="button"
                                      onClick={() => deleteGalleryItemImage(idx)}
                                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                      aria-label="Hapus"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ) : null}

                                <label className="h-24 w-24 rounded-2xl border border-dashed border-border bg-background/40 flex items-center justify-center text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      uploadGalleryItemFile(idx, e.target.files);
                                      e.target.value = "";
                                    }}
                                  />
                                  {item?.src ? "Ganti" : "Tambah"}
                                </label>
                              </div>

                              {galleryUploadStatus.itemIdx === idx && galleryUploadStatus.state === "uploading" ? (
                                <div className="mt-3 text-xs text-text-secondary">Mengunggah...</div>
                              ) : galleryUploadStatus.itemIdx === idx && galleryUploadStatus.state === "deleting" ? (
                                <div className="mt-3 text-xs text-text-secondary">Menghapus...</div>
                              ) : galleryUploadStatus.itemIdx === idx && galleryUploadStatus.state === "error" ? (
                                <div className="mt-3 text-xs text-red-400">{galleryUploadStatus.message || "Terjadi error."}</div>
                              ) : galleryUploadStatus.itemIdx === idx && galleryUploadStatus.state === "saved" ? (
                                <div className="mt-3 text-xs text-green-400">{galleryUploadStatus.message || "Berhasil."}</div>
                              ) : null}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Label
                                </label>
                                <input
                                  value={item?.label ?? ""}
                                  onChange={(e) => updateDraft(["gallery", "itemsData", idx, "label"], e.target.value)}
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Deskripsi Singkat
                                </label>
                                <input
                                  value={item?.desc ?? ""}
                                  onChange={(e) => updateDraft(["gallery", "itemsData", idx, "desc"], e.target.value)}
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "videoShowcase"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("videoShowcase");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("videoShowcase");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Video Showcase</div>
                      <div className="mt-1 text-xs text-text-secondary">Atur judul, deskripsi, kategori, dan foto.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-text-secondary">
                          {videoShowcaseDbStatus.state === "loading"
                            ? "Memuat..."
                            : videoShowcaseDbStatus.state === "saving"
                              ? "Menyimpan..."
                              : videoShowcaseDbStatus.state === "saved"
                                ? videoShowcaseDbStatus.message || "Berhasil."
                                : videoShowcaseDbStatus.state === "error"
                                  ? videoShowcaseDbStatus.message || "Terjadi error."
                                  : ""}
                        </div>
                        <button
                          type="button"
                          onClick={saveVideoShowcaseToDatabase}
                          disabled={videoShowcaseDbStatus.state === "saving"}
                          className="h-10 px-4 rounded-full border border-border bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          Simpan Video Showcase
                        </button>
                      </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Label Badge
                      </label>
                      <input
                        value={draft.videoShowcase.pillLabel ?? ""}
                        onChange={(e) => updateDraft(["videoShowcase", "pillLabel"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Judul
                      </label>
                      <input
                        value={draft.videoShowcase.heading}
                        onChange={(e) => updateDraft(["videoShowcase", "heading"], e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={draft.videoShowcase.description}
                        onChange={(e) =>
                          updateDraft(["videoShowcase", "description"], e.target.value)
                        }
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="pt-2 border-t border-border/60">
                      <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                        Kategori & Foto
                      </div>
                      {(Array.isArray(draft.videoShowcase?.categories) ? draft.videoShowcase.categories : []).map(
                        (cat, idx) => (
                          <div key={cat?.key ?? idx} className="rounded-2xl border border-border bg-background/40 p-4">
                            <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                              {String(cat?.key ?? `Kategori ${idx + 1}`)}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Label Tombol
                                </label>
                                <input
                                  value={cat?.label ?? ""}
                                  onChange={(e) =>
                                    updateDraft(["videoShowcase", "categories", idx, "label"], e.target.value)
                                  }
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Foto
                                </label>
                                <div className="flex flex-wrap gap-3">
                                  {(Array.isArray(cat?.images) ? cat.images : splitLines(cat?.images)).map((url, imgIdx) => (
                                    <div
                                      key={`${url}-${imgIdx}`}
                                      className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border bg-surface"
                                    >
                                      <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
                                      <button
                                        type="button"
                                        onClick={() => deleteVideoShowcaseImage(idx, url)}
                                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                        aria-label="Hapus"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}

                                  <label className="h-24 w-24 rounded-2xl border border-dashed border-border bg-background/40 flex items-center justify-center text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      className="hidden"
                                      onChange={(e) => {
                                        uploadVideoShowcaseFiles(idx, e.target.files);
                                        e.target.value = "";
                                      }}
                                    />
                                    Tambah
                                  </label>
                                </div>

                                {videoShowcaseUploadStatus.categoryIdx === idx &&
                                videoShowcaseUploadStatus.state === "uploading" ? (
                                  <div className="mt-3 text-xs text-text-secondary">Mengunggah...</div>
                                ) : videoShowcaseUploadStatus.categoryIdx === idx &&
                                  videoShowcaseUploadStatus.state === "deleting" ? (
                                  <div className="mt-3 text-xs text-text-secondary">Menghapus...</div>
                                ) : videoShowcaseUploadStatus.categoryIdx === idx &&
                                  videoShowcaseUploadStatus.state === "error" ? (
                                  <div className="mt-3 text-xs text-red-400">
                                    {videoShowcaseUploadStatus.message || "Terjadi error."}
                                  </div>
                                ) : videoShowcaseUploadStatus.categoryIdx === idx &&
                                  videoShowcaseUploadStatus.state === "saved" ? (
                                  <div className="mt-3 text-xs text-green-400">
                                    {videoShowcaseUploadStatus.message || "Berhasil."}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "articles"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("articles");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("articles");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Artikel</div>
                      <div className="mt-1 text-xs text-text-secondary">Tambah, edit, dan hapus artikel.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="text-xs text-text-secondary">
                        {articlesDbStatus.state === "loading"
                          ? "Memuat..."
                          : articlesDbStatus.state === "saving"
                            ? "Menyimpan..."
                            : articlesDbStatus.state === "deleting"
                              ? "Menghapus..."
                              : articlesDbStatus.state === "saved"
                                ? articlesDbStatus.message || "Berhasil."
                                : articlesDbStatus.state === "error"
                                  ? articlesDbStatus.message || "Terjadi error."
                                  : ""}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={loadArticles}
                          className="h-10 px-4 rounded-full border border-border bg-background text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                        >
                          Refresh
                        </button>
                        <button
                          type="button"
                          onClick={resetArticleForm}
                          className="h-10 px-4 rounded-full border border-border bg-surface text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                        >
                          Artikel Baru
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-7">
                        <div className="rounded-2xl border border-border bg-background/40 p-4">
                          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                            {articleMode === "edit" ? "Edit Artikel" : "Tambah Artikel"}
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  ID (slug)
                                </label>
                                <input
                                  value={articleForm.id}
                                  onChange={(e) =>
                                    setArticleForm((c) => ({ ...c, id: slugify(e.target.value) }))
                                  }
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                  placeholder="contoh: jakarta"
                                />
                                {articleMode === "edit" && articleForm.originalId && articleForm.originalId !== articleForm.id ? (
                                  <div className="mt-2 text-xs text-text-secondary">
                                    ID lama: <span className="font-semibold">{articleForm.originalId}</span> (akan dipindahkan saat simpan)
                                  </div>
                                ) : null}
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Tanggal
                                </label>
                                <input
                                  value={articleForm.date}
                                  onChange={(e) => setArticleForm((c) => ({ ...c, date: e.target.value }))}
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="date"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                Judul
                              </label>
                              <input
                                value={articleForm.title}
                                onChange={(e) =>
                                  setArticleForm((c) => {
                                    const nextTitle = e.target.value;
                                    const next = { ...c, title: nextTitle };
                                    if (articleMode === "create" && !String(c.id || "").trim()) {
                                      next.id = slugify(nextTitle);
                                    }
                                    return next;
                                  })
                                }
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                type="text"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Kategori
                                </label>
                                <input
                                  value={articleForm.category}
                                  onChange={(e) => setArticleForm((c) => ({ ...c, category: e.target.value }))}
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  Object Position
                                </label>
                                <input
                                  value={articleForm.objectPosition}
                                  onChange={(e) =>
                                    setArticleForm((c) => ({ ...c, objectPosition: e.target.value }))
                                  }
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                  placeholder='contoh: 50% 20%'
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                Gambar Artikel
                              </label>
                              <div className="flex flex-wrap gap-3 items-start">
                                {articleForm.image ? (
                                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border bg-surface">
                                    <img src={articleForm.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                                    <button
                                      type="button"
                                      onClick={deleteArticleImage}
                                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                      aria-label="Hapus"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ) : null}

                                <label className="h-24 w-24 rounded-2xl border border-dashed border-border bg-background/40 flex items-center justify-center text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      uploadArticleImage(e.target.files);
                                      e.target.value = "";
                                    }}
                                  />
                                  {articleForm.image ? "Ganti" : "Tambah"}
                                </label>
                              </div>

                              {articleUploadStatus.state === "uploading" ? (
                                <div className="mt-3 text-xs text-text-secondary">Mengunggah...</div>
                              ) : articleUploadStatus.state === "deleting" ? (
                                <div className="mt-3 text-xs text-text-secondary">Menghapus...</div>
                              ) : articleUploadStatus.state === "error" ? (
                                <div className="mt-3 text-xs text-red-400">{articleUploadStatus.message || "Terjadi error."}</div>
                              ) : articleUploadStatus.state === "saved" ? (
                                <div className="mt-3 text-xs text-green-400">{articleUploadStatus.message || "Berhasil."}</div>
                              ) : null}

                              <div className="mt-3">
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                  URL Manual (opsional)
                                </label>
                                <input
                                  value={articleForm.image}
                                  onChange={(e) => setArticleForm((c) => ({ ...c, image: e.target.value }))}
                                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                  type="text"
                                  placeholder="/uploads/xxx.jpg atau /SPG/SPG-1.JPG"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                                Konten Artikel (Drag & Drop)
                              </label>

                              <div className="space-y-4">
                                {(Array.isArray(articleForm.contentOrder) ? articleForm.contentOrder : []).map(
                                  (blockKey, blockIndex) => {
                                    const label =
                                      blockKey === "excerpt"
                                        ? "Excerpt"
                                        : blockKey === "intro"
                                          ? "Intro"
                                          : blockKey === "servicesTitle"
                                            ? "Judul Layanan"
                                            : blockKey === "services"
                                              ? "List Layanan"
                                              : blockKey === "reasonsTitle"
                                                ? "Judul Alasan"
                                                : blockKey === "reasons"
                                                  ? "List Alasan"
                                                  : blockKey === "cta"
                                                    ? "CTA"
                                                    : "Label WhatsApp";

                                    return (
                                      <div
                                        key={`${blockKey}-${blockIndex}`}
                                        className="rounded-2xl border border-border bg-background/40 p-4"
                                        onDragOver={(e) => {
                                          if (!Number.isInteger(articleBlockDragIndex)) return;
                                          e.preventDefault();
                                          e.dataTransfer.dropEffect = "move";
                                        }}
                                        onDrop={(e) => {
                                          if (!Number.isInteger(articleBlockDragIndex)) return;
                                          e.preventDefault();
                                          const from = articleBlockDragIndex;
                                          const to = blockIndex;
                                          setArticleForm((c) => ({
                                            ...c,
                                            contentOrder: moveArrayItem(c.contentOrder, from, to),
                                          }));
                                          setArticleBlockDragIndex(null);
                                        }}
                                      >
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                          <div className="flex items-center gap-2">
                                            <button
                                              type="button"
                                              draggable
                                              onDragStart={(e) => {
                                                e.dataTransfer.effectAllowed = "move";
                                                setArticleBlockDragIndex(blockIndex);
                                              }}
                                              onDragEnd={() => setArticleBlockDragIndex(null)}
                                              className="h-9 w-9 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-sm font-bold cursor-grab active:cursor-grabbing"
                                              aria-label="Drag"
                                            >
                                              ≡
                                            </button>
                                            <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">
                                              {label}
                                            </div>
                                          </div>
                                        </div>

                                        {blockKey === "excerpt" ? (
                                          <textarea
                                            value={articleForm.excerpt}
                                            onChange={(e) => setArticleForm((c) => ({ ...c, excerpt: e.target.value }))}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                                            rows={3}
                                          />
                                        ) : blockKey === "intro" ? (
                                          <textarea
                                            value={articleForm.intro}
                                            onChange={(e) => setArticleForm((c) => ({ ...c, intro: e.target.value }))}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                                            rows={3}
                                          />
                                        ) : blockKey === "servicesTitle" ? (
                                          <input
                                            value={articleForm.servicesTitle}
                                            onChange={(e) => setArticleForm((c) => ({ ...c, servicesTitle: e.target.value }))}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                            type="text"
                                          />
                                        ) : blockKey === "services" ? (
                                          <>
                                            <div className="flex items-center justify-end gap-2 mb-3">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setArticleForm((c) => ({
                                                    ...c,
                                                    services: [...(Array.isArray(c.services) ? c.services : []), ""],
                                                  }))
                                                }
                                                className="h-9 px-3 rounded-full border border-border bg-surface text-foreground text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
                                              >
                                                Tambah
                                              </button>
                                            </div>
                                            <div className="space-y-2">
                                              {(Array.isArray(articleForm.services) ? articleForm.services : []).map((v, i) => (
                                                <div
                                                  key={i}
                                                  className="flex items-center gap-2"
                                                  onDragOver={(e) => {
                                                    if (articleDrag.list !== "services") return;
                                                    e.preventDefault();
                                                    e.dataTransfer.dropEffect = "move";
                                                  }}
                                                  onDrop={(e) => {
                                                    if (articleDrag.list !== "services") return;
                                                    e.preventDefault();
                                                    const from = articleDrag.index;
                                                    const to = i;
                                                    setArticleForm((c) => ({
                                                      ...c,
                                                      services: moveArrayItem(c.services, from, to),
                                                    }));
                                                    setArticleDrag({ list: null, index: null });
                                                  }}
                                                >
                                                  <button
                                                    type="button"
                                                    draggable
                                                    onDragStart={(e) => {
                                                      e.dataTransfer.effectAllowed = "move";
                                                      setArticleDrag({ list: "services", index: i });
                                                    }}
                                                    onDragEnd={() => setArticleDrag({ list: null, index: null })}
                                                    className="h-10 w-10 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-sm font-bold cursor-grab active:cursor-grabbing"
                                                    aria-label="Drag"
                                                  >
                                                    ≡
                                                  </button>
                                                  <input
                                                    value={v}
                                                    onChange={(e) =>
                                                      setArticleForm((c) => {
                                                        const next = Array.isArray(c.services) ? [...c.services] : [];
                                                        next[i] = e.target.value;
                                                        return { ...c, services: next };
                                                      })
                                                    }
                                                    className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                                    type="text"
                                                  />
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setArticleForm((c) => ({
                                                        ...c,
                                                        services: insertArrayItemAfter(c.services, i, ""),
                                                      }))
                                                    }
                                                    className="h-10 w-10 rounded-full border border-border bg-surface text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                                    aria-label="Tambah"
                                                  >
                                                    +
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setArticleForm((c) => {
                                                        const next = Array.isArray(c.services)
                                                          ? c.services.filter((_, idx) => idx !== i)
                                                          : [];
                                                        return { ...c, services: next.length ? next : [""] };
                                                      })
                                                    }
                                                    className="h-10 w-10 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                                    aria-label="Hapus"
                                                  >
                                                    ×
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          </>
                                        ) : blockKey === "reasonsTitle" ? (
                                          <input
                                            value={articleForm.reasonsTitle}
                                            onChange={(e) => setArticleForm((c) => ({ ...c, reasonsTitle: e.target.value }))}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                            type="text"
                                          />
                                        ) : blockKey === "reasons" ? (
                                          <>
                                            <div className="flex items-center justify-end gap-2 mb-3">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setArticleForm((c) => ({
                                                    ...c,
                                                    reasons: [...(Array.isArray(c.reasons) ? c.reasons : []), ""],
                                                  }))
                                                }
                                                className="h-9 px-3 rounded-full border border-border bg-surface text-foreground text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
                                              >
                                                Tambah
                                              </button>
                                            </div>
                                            <div className="space-y-2">
                                              {(Array.isArray(articleForm.reasons) ? articleForm.reasons : []).map((v, i) => (
                                                <div
                                                  key={i}
                                                  className="flex items-center gap-2"
                                                  onDragOver={(e) => {
                                                    if (articleDrag.list !== "reasons") return;
                                                    e.preventDefault();
                                                    e.dataTransfer.dropEffect = "move";
                                                  }}
                                                  onDrop={(e) => {
                                                    if (articleDrag.list !== "reasons") return;
                                                    e.preventDefault();
                                                    const from = articleDrag.index;
                                                    const to = i;
                                                    setArticleForm((c) => ({
                                                      ...c,
                                                      reasons: moveArrayItem(c.reasons, from, to),
                                                    }));
                                                    setArticleDrag({ list: null, index: null });
                                                  }}
                                                >
                                                  <button
                                                    type="button"
                                                    draggable
                                                    onDragStart={(e) => {
                                                      e.dataTransfer.effectAllowed = "move";
                                                      setArticleDrag({ list: "reasons", index: i });
                                                    }}
                                                    onDragEnd={() => setArticleDrag({ list: null, index: null })}
                                                    className="h-10 w-10 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-sm font-bold cursor-grab active:cursor-grabbing"
                                                    aria-label="Drag"
                                                  >
                                                    ≡
                                                  </button>
                                                  <input
                                                    value={v}
                                                    onChange={(e) =>
                                                      setArticleForm((c) => {
                                                        const next = Array.isArray(c.reasons) ? [...c.reasons] : [];
                                                        next[i] = e.target.value;
                                                        return { ...c, reasons: next };
                                                      })
                                                    }
                                                    className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                                    type="text"
                                                  />
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setArticleForm((c) => ({
                                                        ...c,
                                                        reasons: insertArrayItemAfter(c.reasons, i, ""),
                                                      }))
                                                    }
                                                    className="h-10 w-10 rounded-full border border-border bg-surface text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                                    aria-label="Tambah"
                                                  >
                                                    +
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setArticleForm((c) => {
                                                        const next = Array.isArray(c.reasons)
                                                          ? c.reasons.filter((_, idx) => idx !== i)
                                                          : [];
                                                        return { ...c, reasons: next.length ? next : [""] };
                                                      })
                                                    }
                                                    className="h-10 w-10 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center text-lg leading-none"
                                                    aria-label="Hapus"
                                                  >
                                                    ×
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          </>
                                        ) : blockKey === "cta" ? (
                                          <textarea
                                            value={articleForm.cta}
                                            onChange={(e) => setArticleForm((c) => ({ ...c, cta: e.target.value }))}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                                            rows={3}
                                          />
                                        ) : (
                                          <input
                                            value={articleForm.whatsappLabel}
                                            onChange={(e) => setArticleForm((c) => ({ ...c, whatsappLabel: e.target.value }))}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                                            type="text"
                                          />
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={saveArticle}
                                disabled={articlesDbStatus.state === "saving" || articlesDbStatus.state === "deleting"}
                                className="h-10 px-4 rounded-full border border-border bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                              >
                                Simpan Artikel
                              </button>
                              {articleMode === "edit" ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => deleteArticle(articleForm.originalId || articleForm.id)}
                                    disabled={articlesDbStatus.state === "saving" || articlesDbStatus.state === "deleting"}
                                    className="h-10 px-4 rounded-full border border-border bg-background text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                  >
                                    Hapus
                                  </button>
                                  <a
                                    href={`/artikel/${articleForm.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-10 px-4 rounded-full border border-border bg-surface text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors inline-flex items-center"
                                  >
                                    Buka
                                  </a>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <div className="rounded-2xl border border-border bg-background/40 p-4">
                          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-3">
                            Daftar Artikel
                          </div>
                          <div className="space-y-2 max-h-[520px] overflow-auto pr-1">
                            {articles.length ? (
                              articles.map((a) => (
                                <div key={a.id} className="rounded-xl border border-border bg-background px-4 py-3">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <div className="text-sm font-bold text-foreground truncate">{a.title}</div>
                                      <div className="mt-1 text-xs text-text-secondary">
                                        <span className="font-semibold">{a.id}</span>
                                        {a.category ? ` • ${a.category}` : ""}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setArticleMode("edit");
                                          setFormFromArticle(a);
                                        }}
                                        className="h-9 px-3 rounded-full border border-border bg-surface text-foreground text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => deleteArticle(a.id)}
                                        className="h-9 px-3 rounded-full border border-border bg-background text-foreground text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
                                      >
                                        Hapus
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-text-secondary">Belum ada artikel.</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>

                <details
                  className="group rounded-2xl border border-border bg-background overflow-hidden"
                  open={openSection === "draftJson"}
                >
                  <summary
                    className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection("draftJson");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSection("draftJson");
                      }
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-wide uppercase">Draft (JSON)</div>
                      <div className="mt-1 text-xs text-text-secondary">Mode advanced untuk edit cepat.</div>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-text-secondary transition-transform group-open:rotate-180" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <textarea
                      value={JSON.stringify(draft, null, 2)}
                      onChange={(e) => {
                        try {
                          const next = JSON.parse(e.target.value);
                          setDraft(next);
                          setIsDirty(true);
                        } catch {
                          setIsDirty(true);
                        }
                      }}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all font-mono text-xs leading-relaxed resize-none"
                      rows={10}
                      spellCheck={false}
                    />
                    <div className="mt-3 text-xs text-text-secondary">
                      Nantinya data ini yang akan di-save ke MySQL (draft/publish).
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
