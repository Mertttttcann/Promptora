"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // === Sequential reveal — simple and reliable ===

    if (eyebrowRef.current) {
      animate(eyebrowRef.current, {
        opacity: [0, 1],
        translateY: [12, 0],
        scale: [0.96, 1],
        duration: 700,
        delay: 200,
        ease: "out(3)",
      });
    }

    if (headlineRef.current) {
      animate(headlineRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1300,
        delay: 350,
        ease: "out(4)",
      });
    }

    if (subRef.current) {
      animate(subRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1100,
        delay: 850,
        ease: "out(3)",
      });
    }

    if (ctaRef.current) {
      animate(ctaRef.current.children, {
        translateY: [16, 0],
        opacity: [0, 1],
        delay: (_el: HTMLElement, i: number) => 1050 + i * 80,
        duration: 800,
        ease: "out(3)",
      });
    }

    if (trustRef.current) {
      animate(trustRef.current, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 800,
        delay: 1300,
        ease: "out(3)",
      });
    }

    if (visualRef.current) {
      animate(visualRef.current, {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.94, 1],
        filter: ["blur(12px)", "blur(0px)"],
        duration: 1600,
        delay: 700,
        ease: "out(4)",
      });
    }

    // === Ambient orbs ===
    if (orbARef.current) {
      animate(orbARef.current, {
        translateX: [0, 40, -25, 0],
        translateY: [0, -25, 35, 0],
        duration: 20000,
        ease: "inOut(2)",
        loop: true,
      });
    }

    if (orbBRef.current) {
      animate(orbBRef.current, {
        translateX: [0, -30, 25, 0],
        translateY: [0, 30, -20, 0],
        duration: 24000,
        ease: "inOut(2)",
        loop: true,
      });
    }

    // === Parallax ===
    const onScroll = () => {
      const y = window.scrollY;
      if (visualRef.current) {
        visualRef.current.style.transform = `translateY(${y * 0.06}px)`;
      }
      if (orbARef.current) {
        orbARef.current.style.opacity = `${Math.max(0.2, 1 - y / 700)}`;
      }
      if (orbBRef.current) {
        orbBRef.current.style.opacity = `${Math.max(0.2, 1 - y / 900)}`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div
        ref={orbARef}
        aria-hidden
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129, 140, 248, 0.22), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orbBRef}
        aria-hidden
        className="absolute top-20 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(192, 132, 252, 0.16), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black, transparent 70%)",
        }}
      />

      <div className="container-pp relative">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex justify-center mb-8 opacity-0"
        >
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            AI Otomasyon Stüdyosu
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-center text-[clamp(2.4rem,7.5vw,5.8rem)] leading-[1.02] tracking-[-0.03em] font-semibold max-w-5xl mx-auto opacity-0"
        >
          <span className="text-display">İşletmenizin AI ekibini</span>
          <br />
          <span className="text-accent italic font-normal">
            biz kuruyoruz.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-center text-[--text-2] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mt-7 opacity-0"
        >
          Emlak ve turizm sektörüne özel WhatsApp & Instagram & telefon
          asistanları, sesli AI agent'lar ve özel otomasyon sistemleri. 7/24
          çalışan, hata yapmayan, kayıp lead bırakmayan dijital ekibinizi 4
          haftada teslim ediyoruz.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10"
        >
          <a
            href="#iletisim"
            className="btn btn-primary opacity-0"
          >
            <span>Demo iste</span>
            <svg className="btn-arrow w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m0 0L8 3m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#services" className="btn btn-ghost opacity-0">
            Hizmetleri keşfet
          </a>
        </div>

        {/* Trust signal */}
        <div
          ref={trustRef}
          className="flex items-center justify-center gap-3 mt-12 text-sm text-[--text-3] opacity-0"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[--bg]"
                style={{
                  background: `linear-gradient(135deg, hsl(${
                    230 + i * 20
                  }, 70%, 60%), hsl(${250 + i * 15}, 70%, 50%))`,
                }}
              />
            ))}
          </div>
          <span>
            Türkiye'de <span className="text-[--text]">10+ işletmeye</span> AI
            otomasyon kurduk
          </span>
        </div>

        {/* Visual / agent preview card */}
        <div
          ref={visualRef}
          className="mt-16 max-w-4xl mx-auto opacity-0"
        >
          <div className="card-pp p-6 sm:p-8 relative">
            {/* Top window bar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[--border]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3D3D3D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3D3D3D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3D3D3D]" />
                </div>
                <span className="ml-3 font-mono text-xs text-[--text-3]">
                  promptora_agent.live
                </span>
              </div>
              <span className="status-pill status-running">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Active
              </span>
            </div>

            {/* Conversation preview */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-[--surface-3] flex items-center justify-center text-[--text-3] text-xs flex-shrink-0 mt-0.5">
                  AY
                </div>
                <div className="flex-1">
                  <span className="text-[--text-3] text-xs">Ayşe Demir</span>
                  <p className="text-[--text-2] mt-0.5">
                    Bostanlı'da 3+1 satılık daire arıyorum
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#818CF8] to-[#C084FC] flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">P</span>
                </div>
                <div className="flex-1">
                  <span className="text-[--accent] text-xs">
                    Promptora Agent
                  </span>
                  <p className="text-[--text] mt-0.5">
                    Bostanlı'da 3 ilan buldum. Bütçe aralığınız var mı?
                  </p>
                  <div className="flex gap-1.5 mt-2.5 flex-wrap">
                    <span className="code-chip">
                      <span className="text-[#4ADE80]">●</span>{" "}
                      searchListings
                    </span>
                    <span className="code-chip">
                      <span className="text-[#4ADE80]">●</span> saveLead
                    </span>
                    <span className="code-chip">
                      <span className="text-[--accent]">●</span> sendLocation
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start opacity-60">
                <div className="w-6 h-6 rounded-full bg-[--surface-3] flex items-center justify-center text-[--text-3] text-xs flex-shrink-0 mt-0.5">
                  AY
                </div>
                <div className="flex-1">
                  <span className="text-[--text-3] text-xs">yazıyor...</span>
                </div>
              </div>
            </div>

            {/* Glow under card */}
            <div className="absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-[--accent] to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
