"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const steps = [
  {
    num: "01",
    title: "Keşif Görüşmesi",
    duration: "30 dakika",
    desc: "İşletmenizi anlıyoruz. Hangi kanallardan müşteri geliyor, en çok hangi sorunla karşılaşıyorsunuz, hangi süreçleri otomatize etmek istiyorsunuz — hepsini detaylıca konuşuyoruz. Çıktı: size özel çözüm yol haritası.",
    output: "Çözüm önerisi + teklif",
  },
  {
    num: "02",
    title: "Tasarım & Onay",
    duration: "3-5 gün",
    desc: "İşletmenizin tonu, müşteri kitlesi, mevcut sistemleriniz (CRM, takvim, rezervasyon) ile entegrasyon planı çıkartıyoruz. Bot persona'sı, konuşma akışı, fail-safe senaryoları detaylı şekilde tasarlanır.",
    output: "Tasarım dokümanı + AI persona",
  },
  {
    num: "03",
    title: "Geliştirme",
    duration: "2-3 hafta",
    desc: "n8n + OpenAI + Cal.com + Telegram + WhatsApp Business API + Evolution API + Supabase ile özel altyapınızı kuruyoruz. Veritabanı, API entegrasyonları, AI tool'ları, hot lead bildirimleri — hepsi profesyonel kalitede.",
    output: "Çalışan sistem + dokümantasyon",
  },
  {
    num: "04",
    title: "Test & Eğitim",
    duration: "3-5 gün",
    desc: "Sistem canlıya alınmadan önce 50+ senaryoyla test ediyoruz. Edge case'leri, dil sapmalarını, beklenmedik durumları yakalıyoruz. Sonra ekibinizle 1 saatlik canlı eğitim seansı düzenliyoruz.",
    output: "Stable sistem + ekip eğitimi",
  },
  {
    num: "05",
    title: "Lansman & Optimizasyon",
    duration: "Sürekli",
    desc: "Sistem canlıya alınır. İlk hafta yakın takipte oluyoruz, gerçek müşteri etkileşimleriyle sistemi rafine ediyoruz. Aylık performans görüşmeleri ile yeni özellikler ve iyileştirmeler ekliyoruz.",
    output: "Performans raporu + iyileştirmeler",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll<HTMLElement>("[data-step]");
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-30px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target.querySelectorAll("[data-step]"), {
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: stagger(100),
              duration: 800,
              ease: "out(3)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-24 sm:py-32 relative">
      <div className="container-pp">
        <div ref={sectionRef}>
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="eyebrow mb-5">
              <span className="eyebrow-dot" />
              Çalışma Sürecimiz
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-5 leading-[1.1]">
              <span className="text-display">İlk konuşmadan canlı</span>
              <br />
              <span className="text-accent italic font-normal">
                sisteme 4 hafta.
              </span>
            </h2>
            <p className="text-[--text-2] text-base sm:text-lg leading-relaxed mt-5">
              Belirsizlik yok. Her aşamada ne aldığınızı, ne zaman aldığınızı
              biliyorsunuz. Sürpriz fatura, gecikmeli teslim, "şunu da yapacağız"
              denilen şeyler yok.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[1.5rem] sm:left-[2rem] top-0 bottom-0 w-px bg-gradient-to-b from-[--accent] via-[--border] to-transparent opacity-50" />

            <ol className="space-y-10 sm:space-y-14">
              {steps.map((step, i) => (
                <li
                  key={step.num}
                  data-step
                  className="relative flex gap-5 sm:gap-8 pl-0"
                >
                  {/* Number circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[--surface] border border-[--border] flex items-center justify-center font-mono text-sm sm:text-base text-[--accent] relative z-10">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-px h-12 sm:h-20 bg-[--border]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-3 pb-2 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <h3 className="text-xl sm:text-2xl font-semibold text-[--text] tracking-tight">
                        {step.title}
                      </h3>
                      <span className="font-mono text-xs text-[--text-3] code-chip">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-[--text-2] text-base leading-relaxed mb-4 max-w-2xl">
                      {step.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-[--text-3]">
                      <svg
                        className="w-4 h-4 text-[--accent]"
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
                      <span className="font-mono text-xs">
                        Çıktı: {step.output}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
