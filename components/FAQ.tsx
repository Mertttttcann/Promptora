"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

const faqs = [
  {
    q: "Kurulum ne kadar sürer?",
    a: "Standart projelerde 4 hafta. İlk hafta keşif ve tasarım, sonraki 2 hafta geliştirme, son hafta test ve eğitim. Acil ihtiyaçlarda 2 hafta içinde MVP teslim edebiliriz. Süreyi anlaştığımızda kontrata yazıyoruz, gecikme olursa günlük cezai şart uyguluyoruz.",
  },
  {
    q: "Hangi platformlarla entegre olur?",
    a: "WhatsApp Business API, Instagram DM, Facebook Messenger, Telegram, web chat, telefon (sesli AI), email — hepsi destekli. CRM tarafında: HubSpot, Pipedrive, Zoho, Notion, Airtable, Google Sheets. Otel sistemleri: Opera, Protel, Sirvoy. Takvim: Google Calendar, Cal.com, Outlook. Yeni entegrasyon ihtiyacı çıkarsa kuruyoruz.",
  },
  {
    q: "Müşteri verim güvende mi?",
    a: "Evet. Tüm veriler Türkiye/AB serverlarında (Supabase EU region) şifreli saklanıyor. KVKK Veri Sorumlusu Sicili kayıtlıyız. Müşterilerinizden açık rıza alınmasını otomatize ediyoruz. Sözleşme biterse tüm verinizi export edip teslim ediyoruz, sistemlerimizden silinir.",
  },
  {
    q: "Aylık ücret ne içeriyor?",
    a: "Tek bir paket içinde her şey: hosting (n8n, Supabase, Evolution API), OpenAI / GPT-4 token maliyeti (sınırsız konuşma), ManyChat aboneliği, sürekli bakım, model güncellemeleri (gpt-4 → gpt-5 gibi), 4 saat SLA destek, aylık 30 dk performans görüşmesi, yeni özellik talepleri. Sürpriz fatura yok.",
  },
  {
    q: "İptal politikası nedir?",
    a: "İlk 30 gün performans garantili — hedef lead sayısına ulaşmazsak aylığı tam iade ediyoruz, kontratınız bağlayıcı değil. Sonrasında 30 gün önceden bildirimle iptal — hiçbir cezai şart yok. Yıllık ödeme yaparsanız kalan ay için pro-rata iade.",
  },
  {
    q: "Diğer dilleri destekliyor mu?",
    a: "Evet. Türkçe yanı sıra İngilizce, Rusça, Arapça, Almanca, Fransızca standart pakette dahil. Yabancı turist ağırlıklı oteller için multi-language otomatik (müşterinin dilini algılayıp ona göre cevap veriyor). Daha az kullanılan dil ihtiyacı varsa eklenebilir.",
  },
  {
    q: "Mevcut sistemimizle çakışır mı?",
    a: "Hayır. Promptora mevcut sistemlerinizin ÜZERINE çalışır, yerine geçmez. CRM, takvim, rezervasyon sisteminizi koruyup üzerine AI katmanı ekliyoruz. Sıfırdan kurulum yapmıyorsanız mevcut akışınız bozulmaz, sadece otomatize olur.",
  },
  {
    q: "Yedekleme ve güvenlik nasıl?",
    a: "Tüm veriler günlük otomatik yedekleniyor (3 lokasyona). Sistem %99.9 uptime garantili. Saldırı, ban, kesinti durumunda yedek hesaplara otomatik failover. Ayda 1 güvenlik audit yapılıyor. WhatsApp ban riskine karşı sorumluluk paketi içinde — banlandı, biz yenisini açıyoruz.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>("[data-faq-item]");
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target.querySelectorAll("[data-faq-item]"), {
              opacity: [0, 1],
              translateY: [28, 0],
              delay: stagger(70),
              duration: 800,
              ease: "out(3)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" className="py-24 sm:py-32 relative scroll-mt-24">
      {/* Ambient accent glow behind the list */}
      <div
        aria-hidden
        className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.10), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-pp relative">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left header */}
          <div className="lg:sticky lg:top-32 self-start">
            <span className="eyebrow mb-5">
              <span className="eyebrow-dot" />
              S.S.S.
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-5 leading-[1.1]">
              <span className="text-display">Sıkça sorulan</span>
              <br />
              <span className="text-accent italic font-normal">sorular.</span>
            </h2>
            <p className="text-[--text-2] text-base leading-relaxed mt-5">
              Aklınızda başka soru varsa{" "}
              <a
                href="mailto:hello@promptoragent.com"
                className="text-[--accent] hover:underline"
              >
                hello@promptoragent.com
              </a>{" "}
              adresinden ulaşabilirsiniz. Genelde 4 saat içinde cevap veriyoruz.
            </p>
          </div>

          {/* FAQ List */}
          <div ref={listRef} className="relative">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const isLast = i === faqs.length - 1;
              return (
                <div
                  key={i}
                  data-faq-item
                  className="group relative"
                >
                  {/* Animated left accent rail */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full origin-top transition-all duration-500 ease-out"
                    style={{
                      transform: isOpen ? "scaleY(1)" : "scaleY(0)",
                      background:
                        "linear-gradient(180deg, var(--accent), rgba(192,132,252,0.6))",
                      boxShadow: isOpen
                        ? "0 0 16px rgba(129,140,248,0.55)"
                        : "none",
                      opacity: isOpen ? 1 : 0,
                    }}
                  />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-start gap-4 sm:gap-6 pl-5 sm:pl-8 pr-1 py-6 text-left"
                  >
                    {/* Number */}
                    <span
                      className={`font-mono text-xs mt-1 tracking-widest tabular-nums transition-colors duration-300 ${
                        isOpen
                          ? "text-[--accent]"
                          : "text-[--text-3] group-hover:text-[--text-2]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`flex-1 text-base sm:text-xl font-medium tracking-tight transition-all duration-300 ${
                        isOpen
                          ? "text-[--text] translate-x-0"
                          : "text-[--text-2] group-hover:text-[--text] group-hover:translate-x-1"
                      }`}
                    >
                      {faq.q}
                    </span>

                    {/* Plus / close icon */}
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 transition-all duration-400 ${
                        isOpen
                          ? "bg-[--accent] text-[--bg] rotate-[225deg] shadow-[0_0_20px_rgba(129,140,248,0.5)]"
                          : "bg-[--surface] border border-[--border-strong] text-[--text-2] group-hover:border-[--accent] group-hover:text-[--accent] group-hover:rotate-90"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 3v10M3 8h10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Answer — smooth grid-rows reveal (no fixed height, no clipping) */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-out pl-[3.25rem] sm:pl-[5rem]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[--text-2] text-[0.95rem] leading-relaxed pb-7 pr-6 sm:pr-14 max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </div>

                  {/* Soft fading hairline (not a hard full-width line) */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="block h-px transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent)",
                        opacity: isOpen ? 0.25 : 0.7,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
