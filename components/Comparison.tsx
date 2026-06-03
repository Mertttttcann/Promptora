"use client";

import { useEffect, useRef, useState } from "react";

type Metric = { icon: React.ReactNode; label: string; value: string };

const PhoneIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
    <path
      d="M5.5 2.5l1.2 2.6-1.3 1.1a7 7 0 003.4 3.4l1.1-1.3 2.6 1.2v2.3c0 .6-.5 1-1.1.9C7.6 12.4 3.6 8.4 2.7 3.6c-.1-.6.3-1.1.9-1.1h1.9z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);
const ClockIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 5v3l2 1.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
const UsersIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
    <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M2.5 13c0-2 1.6-3.3 3.5-3.3S9.5 11 9.5 13"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M10.5 9.8c1.6.1 3 1.3 3 3.2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
const MoneyIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
    <path
      d="M8 2.5v11M10.5 5c-.4-.9-1.4-1.4-2.5-1.4-1.5 0-2.6.8-2.6 2 0 2.8 5.2 1.6 5.2 4.4 0 1.2-1.2 2-2.7 2-1.2 0-2.2-.5-2.6-1.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const without: Metric[] = [
  { icon: PhoneIcon, label: "Kaçırılan Çağrı Oranı", value: "%35" },
  { icon: ClockIcon, label: "Ortalama Bekleme Süresi", value: "8+ dk" },
  { icon: UsersIcon, label: "Müşteri Kaybı Oranı", value: "%28" },
  { icon: MoneyIcon, label: "Aylık Kayıp", value: "₺50K+" },
];

const withAI: Metric[] = [
  { icon: PhoneIcon, label: "Çağrı Karşılama Oranı", value: "%99" },
  { icon: ClockIcon, label: "Ortalama Yanıt Süresi", value: "3 sn" },
  { icon: UsersIcon, label: "Müşteri Memnuniyeti", value: "%94" },
  { icon: MoneyIcon, label: "Aylık Tasarruf", value: "₺35K+" },
];

function CompareCard({
  tone,
  badge,
  title,
  subtitle,
  metrics,
  trend,
  shown,
  index,
}: {
  tone: "danger" | "success";
  badge: string;
  title: string;
  subtitle: string;
  metrics: Metric[];
  trend: React.ReactNode;
  shown: boolean;
  index: number;
}) {
  const isDanger = tone === "danger";
  const c = isDanger
    ? {
        accent: "#F87171",
        glow: "rgba(239,68,68,0.14)",
        border: "rgba(239,68,68,0.22)",
        rowBg: "rgba(239,68,68,0.05)",
        rowBorder: "rgba(239,68,68,0.12)",
        iconBg: "rgba(239,68,68,0.10)",
      }
    : {
        accent: "#4ADE80",
        glow: "rgba(34,197,94,0.14)",
        border: "rgba(34,197,94,0.22)",
        rowBg: "rgba(34,197,94,0.05)",
        rowBorder: "rgba(34,197,94,0.12)",
        iconBg: "rgba(34,197,94,0.10)",
      };

  return (
    <div
      className="relative rounded-3xl p-7 sm:p-9 bg-[--surface] overflow-hidden"
      style={{
        border: `1px solid ${c.border}`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(36px)",
        transition:
          "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${index * 140}ms`,
      }}
    >
      {/* Tone glow */}
      <div
        aria-hidden
        className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.glow}, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: c.iconBg, color: c.accent }}
          >
            {trend}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[--text] tracking-tight">
              {title}
            </h3>
            <p
              className="text-xs sm:text-sm font-mono mt-0.5"
              style={{ color: c.accent }}
            >
              {badge}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-xl px-4 py-3.5"
              style={{
                background: c.rowBg,
                border: `1px solid ${c.rowBorder}`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(14px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${300 + index * 140 + i * 70}ms`,
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: c.accent }}>{m.icon}</span>
                <span className="text-sm text-[--text-2]">{m.label}</span>
              </div>
              <span
                className="text-base sm:text-lg font-semibold tabular-nums tracking-tight"
                style={{ color: c.accent }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <p className="sr-only">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(root);

    // Safety net: reveal even if the observer never fires
    // (instant-scroll / hash navigation / off-screen mount).
    const fallback = window.setTimeout(() => setShown(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="karsilastirma" className="py-24 sm:py-32 relative scroll-mt-24">
      <div className="container-pp" ref={ref}>
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-20">
          <span className="eyebrow mb-5">
            <span className="eyebrow-dot" />
            Verilerle Kanıtlanmış
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-5 leading-[1.1]">
            <span className="text-display">AI Asistan Kullanan</span>{" "}
            <span className="text-accent italic font-normal pr-[3px]">vs</span>{" "}
            <span className="text-display">Kullanmayan</span>
          </h2>
          <p className="text-[--text-2] text-base sm:text-lg leading-relaxed mt-5">
            Rakamlar her şeyi anlatıyor. AI destekli müşteri hizmetleri ile
            farkı görün.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          <CompareCard
            tone="danger"
            index={0}
            shown={shown}
            badge="Geleneksel Yöntemler"
            title="AI Kullanmayan İşletmeler"
            subtitle="AI kullanmayan işletmelerin tipik performans göstergeleri"
            metrics={without}
            trend={
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M3 7l6 6 4-4 8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 17v-5h-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <CompareCard
            tone="success"
            index={1}
            shown={shown}
            badge="AI Destekli Çözümler"
            title="AI Kullanan İşletmeler"
            subtitle="Promptora AI çözümleri kullanan işletmelerin performansı"
            metrics={withAI}
            trend={
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M3 17l6-6 4 4 8-8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 7v5h-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
