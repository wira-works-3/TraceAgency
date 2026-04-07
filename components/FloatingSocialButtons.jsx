"use client";

import { WHATSAPP_LINK } from "@/lib/whatsapp";
import { usePathname } from "next/navigation";

export default function FloatingSocialButtons() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3 pointer-events-none">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group pointer-events-auto relative w-14 h-14 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 border border-black/5 px-3 py-2 text-xs font-semibold text-black/80 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          WhatsApp
        </span>
        <img
          src="/whatsapp.svg"
          alt="WhatsApp"
          className="w-8 h-8 transition-transform duration-200 group-hover:scale-105"
        />
      </a>

      <a
        href="https://www.instagram.com/sewaspg/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="group pointer-events-auto relative w-14 h-14 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 border border-black/5 px-3 py-2 text-xs font-semibold text-black/80 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Instagram
        </span>
        <img
          src="/Instagram.svg"
          alt="Instagram"
          className="w-8 h-8 transition-transform duration-200 group-hover:scale-105"
        />
      </a>
    </div>
  );
}
