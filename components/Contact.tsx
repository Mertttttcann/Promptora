"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// Formspree contact form endpoint. Replace by updating this constant
// (then commit + push — Vercel will redeploy automatically).
const FORM_ENDPOINT = "https://formspree.io/f/mdavnjvv";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  company: string;
  phone: string;
  sector: string;
  message: string;
  /** honeypot — must stay empty */
  _website: string;
};

const initial: FormState = {
  name: "",
  company: "",
  phone: "",
  sector: "",
  message: "",
  _website: "",
};

type SelectOption = { value: string; label: string };

/**
 * Theme-aware custom select. Native <select> drops back to OS-default
 * (light) dropdown UI which breaks our dark theme; this replaces it with
 * a fully controlled, accessible, dark-themed listbox.
 */
function SectorSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: SelectOption[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full bg-[--surface-2] border rounded-xl px-4 py-3.5 text-sm transition-all duration-300 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:shadow-[0_0_0_4px_rgba(129,140,248,0.12)] ${
          open
            ? "border-[--accent] bg-[--surface]"
            : "border-[--border-strong] hover:border-[--text-3]"
        }`}
      >
        <span className={selected ? "text-[--text]" : "text-[--text-3]"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180 text-[--accent]" : "text-[--text-3]"
          }`}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-30 left-0 right-0 top-[calc(100%+8px)] rounded-xl overflow-hidden p-1"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow:
              "0 24px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(129,140,248,0.08) inset",
          }}
        >
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  isSelected
                    ? "bg-[--accent]/10 text-[--accent]"
                    : "text-[--text-2] hover:bg-[--surface-2] hover:text-[--text]"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const SECTOR_OPTIONS: SelectOption[] = [
  { value: "Emlak", label: "Emlak" },
  { value: "Otel / Turizm", label: "Otel / Turizm" },
  { value: "Diğer", label: "Diğer" },
];

export default function Contact() {
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot — bots fill hidden field, real users don't
    if (data._website) return;

    if (
      !data.name.trim() ||
      !data.phone.trim() ||
      !data.message.trim()
    ) {
      setStatus("error");
      setErrorMsg("Lütfen ad, telefon ve mesaj alanlarını doldurun.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          phone: data.phone,
          sector: data.sector,
          message: data.message,
          _subject: `Promptora — ${data.sector || "Yeni"} talebi: ${data.name}${data.company ? ` (${data.company})` : ""}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setData(initial);
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(
          j?.error || j?.errors?.[0]?.message || "Gönderilemedi. Lütfen tekrar deneyin."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  const inputCls =
    "w-full bg-[--surface-2] border border-[--border-strong] rounded-xl px-4 py-3.5 text-[--text] placeholder:text-[--text-3] text-sm transition-all duration-300 hover:border-[--text-3] focus:outline-none focus:border-[--accent] focus:bg-[--surface] focus:shadow-[0_0_0_4px_rgba(129,140,248,0.12)]";

  return (
    <section
      id="iletisim"
      className="py-24 sm:py-32 relative scroll-mt-24"
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-full h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(129,140,248,0.10), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-pp relative">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* LEFT — Pitch + guarantees */}
          <div className="lg:pt-8">
            <span className="eyebrow mb-5">
              <span className="eyebrow-dot" />
              Hadi konuşalım
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-5 leading-[1.1]">
              <span className="text-display">Hemen Bize Ulaşın!</span>
              <br />
              <span className="text-accent italic font-normal inline-block pr-[0.18em]">
                Ücretsiz Görüşelim!
              </span>
            </h2>
            <p className="text-[--text-2] text-base sm:text-lg leading-relaxed mt-6 max-w-md">
              30 dakikalık ücretsiz keşif görüşmesi için bilgilerini bırak —
              genelde 4 saat içinde dönüyoruz. Bağlayıcı değil, sadece konuşma.
            </p>

            {/* Guarantee badges */}
            <ul className="mt-10 space-y-3 text-sm font-mono text-[--text-3]">
              {[
                "Performans garantili",
                "4 hafta teslim",
                "KVKK uyumlu",
                "Bağlayıcı sözleşme yok",
              ].map((g) => (
                <li key={g} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-[#4ADE80] flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Form card */}
          <div
            className="group/card relative rounded-3xl p-7 sm:p-9 bg-[--surface] overflow-hidden transition-all duration-500 ease-out hover:border-[--border-strong] focus-within:shadow-[0_24px_80px_-20px_rgba(129,140,248,0.35)]"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Top accent hairline — slightly stronger + breathing animation on hover/focus */}
            <div
              aria-hidden
              className="absolute inset-x-8 top-0 h-px transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100 opacity-80"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(129,140,248,0.65), transparent)",
              }}
            />

            {/* Soft inner accent halo — only visible on focus-within */}
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-44 pointer-events-none opacity-0 group-focus-within/card:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(129,140,248,0.18), transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 text-[#4ADE80]"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[--text] mb-2">
                  Mesajın bize ulaştı 🎯
                </h3>
                <p className="text-[--text-2] text-sm leading-relaxed max-w-sm mx-auto">
                  4 saat içinde sana özel bir cevap yazıyoruz. Bu arada
                  hizmetlerimize tekrar göz at istersen.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-7 text-xs font-mono text-[--text-3] hover:text-[--accent] transition-colors"
                >
                  ← Yeni mesaj yaz
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                {/* honeypot */}
                <input
                  type="text"
                  name="_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data._website}
                  onChange={onChange}
                  className="hidden"
                  aria-hidden
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-mono uppercase tracking-wider text-[--text-3] mb-2 block">
                      Ad Soyad <span className="text-[--accent]">*</span>
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={data.name}
                      onChange={onChange}
                      placeholder="Ahmet Yılmaz"
                      className={inputCls}
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-mono uppercase tracking-wider text-[--text-3] mb-2 block">
                      İşletme Adı
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={data.company}
                      onChange={onChange}
                      placeholder="Royal Emlak / Otel Marin"
                      className={inputCls}
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-mono uppercase tracking-wider text-[--text-3] mb-2 block">
                      Telefon <span className="text-[--accent]">*</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={data.phone}
                      onChange={onChange}
                      placeholder="+90 5XX XXX XX XX"
                      className={inputCls}
                    />
                  </label>

                  <div className="block">
                    <span className="text-xs font-mono uppercase tracking-wider text-[--text-3] mb-2 block">
                      Sektör
                    </span>
                    <SectorSelect
                      value={data.sector}
                      onChange={(v) =>
                        setData((d) => ({ ...d, sector: v }))
                      }
                      placeholder="Seçin"
                      options={SECTOR_OPTIONS}
                    />
                  </div>
                </div>

                <label className="block">
                  <span className="text-xs font-mono uppercase tracking-wider text-[--text-3] mb-2 block">
                    Mesajınız <span className="text-[--accent]">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={data.message}
                    onChange={onChange}
                    placeholder="Çözmek istediğiniz problemi kısaca anlatın..."
                    className={inputCls + " resize-none"}
                  />
                </label>

                {status === "error" && (
                  <p className="text-sm text-[#F87171] font-mono">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    boxShadow:
                      "0 12px 32px -10px rgba(129,140,248,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset",
                  }}
                >
                  <span>
                    {status === "submitting" ? "Gönderiliyor..." : "Gönder"}
                  </span>
                  {status !== "submitting" && (
                    <svg
                      className="btn-arrow w-4 h-4"
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
                  )}
                </button>

                <p className="text-xs text-[--text-3] text-center pt-1">
                  Bilgileriniz sadece size dönüş yapmak için kullanılır. KVKK
                  uyumlu.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
