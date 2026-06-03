"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[rgba(10,10,10,0.7)] backdrop-blur-xl"
          : "py-5"
      }`}
    >
      <div className="container-pp">
        <nav className="flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#hero"
            aria-label="Promptora"
            className="group transition-transform duration-500 hover:[&_svg]:scale-110"
          >
            <Logo size={32} />
          </a>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-7 text-sm text-[--text-2]">
            <li>
              <a
                href="#services"
                className="hover:text-[--text] transition-colors"
              >
                Hizmetler
              </a>
            </li>
            <li>
              <a
                href="#process"
                className="hover:text-[--text] transition-colors"
              >
                Süreç
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[--text] transition-colors">
                S.S.S
              </a>
            </li>
          </ul>

          {/* CTA */}
          <a
            href="#iletisim"
            className="btn btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
          >
            <span>İletişim</span>
            <svg
              className="btn-arrow w-3.5 h-3.5"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10m0 0L8 3m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
