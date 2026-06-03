"use client";

import { useEffect, useState } from "react";

const stats = [
  { number: "10+", label: "Aktif işletme" },
  { number: "%100", label: "Cevaplanan mesaj" },
  { number: "8s", label: "Ortalama yanıt" },
  { number: "24/7", label: "Kesintisiz hizmet" },
];

// Duplicated for a seamless -50% loop
const loop = [...stats, ...stats];

export default function TrustBar() {
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <section
      id="trustbar"
      className="relative py-16 sm:py-24 bg-[--bg-soft] overflow-hidden scroll-mt-24"
    >
      {/* Ambient subtle glow */}
      <div
        aria-hidden
        className="orb"
        style={{
          top: "50%",
          left: "50%",
          width: "420px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(129, 140, 248, 0.10), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative">
        <p className="text-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[--text-3] mb-12">
          Türkiye'nin önde gelen işletmeleriyle çalışıyoruz
        </p>

        {/* Continuous left-to-right marquee */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
          }}
        >
          <div
            className="flex w-max items-center"
            style={{
              animation: reduceMotion
                ? undefined
                : "marquee 36s linear infinite",
              animationDirection: "reverse",
              animationPlayState: paused ? "paused" : "running",
              willChange: "transform",
            }}
          >
            {loop.map((stat, i) => (
              <div key={i} className="flex items-center">
                <div className="px-10 sm:px-16 text-center select-none">
                  <div className="text-3xl sm:text-5xl font-semibold tracking-tight">
                    <span className="text-display">{stat.number}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[--text-3] mt-2 font-mono tracking-wide">
                    {stat.label}
                  </div>
                </div>

                {/* Short fading accent separator (not a hard line) */}
                <span
                  aria-hidden
                  className="block w-px h-10 sm:h-12 flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(129,140,248,0.45) 50%, transparent)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
