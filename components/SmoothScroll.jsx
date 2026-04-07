"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

function destroyLenis() {
  const g = globalThis;
  const lenis = g.__TA_LENIS__;
  const rafId = g.__TA_LENIS_RAF_ID__;

  if (typeof rafId === "number") {
    try {
      cancelAnimationFrame(rafId);
    } catch {
      // noop
    }
  }

  if (lenis) {
    try {
      lenis.destroy();
    } catch {
      // noop
    }
  }

  g.__TA_LENIS__ = null;
  g.__TA_LENIS_RAF_ID__ = null;
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
    document.documentElement.style.scrollBehavior = isAdmin ? "auto" : "smooth";
    document.body.style.scrollBehavior = isAdmin ? "auto" : "smooth";
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    destroyLenis();

    if (isAdmin) {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    globalThis.__TA_LENIS__ = lenis;

    function raf(time) {
      lenis.raf(time);
      globalThis.__TA_LENIS_RAF_ID__ = requestAnimationFrame(raf);
    }

    globalThis.__TA_LENIS_RAF_ID__ = requestAnimationFrame(raf);

    // Memaksa scroll ke atas secara instan saat rute/path berubah
    // lenis.scrollTo(0, { immediate: true }) sangat penting agar Lenis tidak menyimpan
    // posisi scroll dari halaman sebelumnya
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    return () => {
      destroyLenis();
    };
  }, [pathname]); // Akan terpicu ulang setiap kali URL/pathname berubah

  return <>{children}</>;
}
