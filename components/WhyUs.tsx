"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 2L4 7v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "KVKK Uyumlu",
    desc: "Tüm sistemlerimiz KVKK'ya tam uyumlu kuruluyor. Müşteri verisi şifreli saklanıyor, opt-in/opt-out yönetimi otomatik.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "7/24 Çalışır",
    desc: "Mesai, hafta sonu, bayram, gece yarısı — fark etmez. AI asistanınız her zaman müşterinizin yanında, hata yapmadan, yorulmadan.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M3 12h18M3 6h18M3 18h18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Türkçe Native",
    desc: "Sadece Türkçe değil — Türk ticari kültürünü, emlakçı pazarını, otelci dilini bilen yapay zekalar. Robotik konuşmuyor, gerçek danışman gibi.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Performans Garantili",
    desc: "İlk 30 gün performans garantili. Hedeflenen lead sayısına ulaşmazsak aylığı tam iade ederiz. Bağlayıcı sözleşme yok.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M21 11.5c0 4.5-4 8.5-9 8.5-1.5 0-3-.4-4.3-1L3 21l2-4.7c-.6-1.3-1-2.8-1-4.3 0-4.5 4-8.5 9-8.5s8 4 8 8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Sürekli Destek",
    desc: "Kurulduktan sonra unutmuyoruz. Aylık performans görüşmesi, 4 saat SLA destek, model güncellemeleri, yeni özellikler — hepsi dahil.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 10h10M7 14h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Verim Sahibi Sizsiniz",
    desc: "Müşteri verisi, konuşma geçmişi, lead bilgileri — hepsi sizin. Sözleşme biterse export ederiz, göndeririz. Vendor lock-in yok.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-reason]");
    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(30px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target.querySelectorAll("[data-reason]"), {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(80),
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
    <section id="neden" className="py-24 sm:py-32 relative scroll-mt-24">
      <div className="container-pp" ref={sectionRef}>
        <div className="max-w-3xl mb-14 sm:mb-20">
          <span className="eyebrow mb-5">
            <span className="eyebrow-dot" />
            Neden Promptora
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-5 leading-[1.1]">
            <span className="text-display">Yazılımcı değil,</span>
            <br />
            <span className="text-accent italic font-normal">
              AI otomasyon danışmanı.
            </span>
          </h2>
          <p className="text-[--text-2] text-base sm:text-lg leading-relaxed mt-5">
            Biz size sistem teslim etmiyoruz — sürekli iyileşen, gelişen, sizinle
            büyüyen bir AI ekibi kuruyoruz. Aylık ücretiniz altyapı + bakım +
            danışmanlık dahil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-14">
          {reasons.map((reason, i) => (
            <div
              key={i}
              data-reason
              className="group relative rounded-2xl p-5 sm:p-6 transition-colors duration-400 ease-out hover:bg-[--surface]/40"
            >
              <div className="w-12 h-12 rounded-xl bg-[--surface] border border-[--border] flex items-center justify-center text-[--accent] mb-5 transition-all duration-400 ease-out group-hover:border-[--accent] group-hover:bg-[--accent-faint] group-hover:-translate-y-0.5 group-hover:shadow-[0_0_28px_-6px_var(--accent-glow)]">
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold text-[--text] mb-2.5 tracking-tight">
                {reason.title}
              </h3>
              <p className="text-sm text-[--text-2] leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
