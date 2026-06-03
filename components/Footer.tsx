import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-[--bg-soft] mt-12 scroll-mt-24"
    >
      {/* Premium top edge — edge-fading hairline + faint accent glow (no hard rule) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-strong) 18%, rgba(129,140,248,0.45) 50%, var(--border-strong) 82%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[680px] max-w-full h-28 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(129,140,248,0.12), transparent 70%)",
        }}
      />

      <div className="container-pp py-14 sm:py-20 relative">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Logo
                size={36}
                wordmarkClassName="text-[--text] font-semibold tracking-tight text-lg"
              />
            </div>
            <p className="text-sm text-[--text-2] leading-relaxed max-w-sm">
              Türkiye'nin işletmelere özel AI otomasyon stüdyosu. Emlak ve
              turizm sektöründe uzmanlaşmış chatbot'lar, sesli AI agent'lar ve
              özel otomasyonlar.
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-[--text-3] mb-5">
              Hizmetler
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#services"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  Emlak Chatbot
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  Sesli AI Agent
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  Otel Chatbot
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  QR Oda Asistanı
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  Özel Otomasyon
                </a>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-[--text-3] mb-5">
              Şirket
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#process"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  Süreç
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  S.S.S.
                </a>
              </li>
              <li>
                <a
                  href="#iletisim"
                  className="text-[--text-2] hover:text-[--text] transition-colors"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-[--text-3] mb-5">
              İletişim
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@promptoragent.com"
                  className="text-[--text-2] hover:text-[--accent] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="12"
                      height="10"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M2 5l6 4 6-4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                  </svg>
                  hello@promptoragent.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[--text-2]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 14s5-3.5 5-7a5 5 0 10-10 0c0 3.5 5 7 5 7z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="8"
                    cy="7"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
                <span>İzmir, Türkiye</span>
              </li>
              <li className="flex items-center gap-2 text-[--text-2]">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-[--text-3] text-xs">
                  Şu an müsaitiz
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/promptoragent.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[--surface] border border-[--border] flex items-center justify-center text-[--text-2] hover:text-[--accent] hover:border-[--accent] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="12"
                    height="12"
                    rx="3.2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="2.6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <circle cx="11.5" cy="4.5" r="0.7" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Soft fading divider */}
        <div
          aria-hidden
          className="mt-14 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--border) 25%, var(--border) 75%, transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[--text-3]">
          <div className="font-mono">
            © {new Date().getFullYear()} Promptora AI Agents. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-5 font-mono">
            <a href="#" className="hover:text-[--text-2] transition-colors">
              KVKK Aydınlatma
            </a>
            <a href="#" className="hover:text-[--text-2] transition-colors">
              Gizlilik
            </a>
            <a href="#" className="hover:text-[--text-2] transition-colors">
              Sözleşme
            </a>
          </div>
        </div>

        {/* Soft fading divider */}
        <div
          aria-hidden
          className="mt-14 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--border-subtle) 30%, var(--border-subtle) 70%, transparent)",
          }}
        />

        {/* Big brand text decoration */}
        <div className="pt-10 overflow-hidden">
          <div
            aria-hidden
            className="text-[clamp(4rem,18vw,15rem)] font-semibold leading-[0.9] tracking-tight bg-gradient-to-b from-[--surface-3] via-[--surface-2] to-transparent bg-clip-text text-transparent select-none whitespace-nowrap"
          >
            PROMPTORA
          </div>
        </div>
      </div>
    </footer>
  );
}
