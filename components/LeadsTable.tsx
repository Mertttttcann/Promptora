"use client";

import { useMemo, useState } from "react";

type Lead = {
  id: string;
  ad_soyad: string | null;
  telefon: string | null;
  kaynak: string | null;
  durum: string | null;
  son_skor: number | null;
  son_sicaklik: string | null;
  son_ozet: string | null;
  son_gorusme: string | null;
  created_at: string | null;
};

const KANAL_ETIKET: Record<string, string> = {
  reklam_formu: "Reklam",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  inbound_arama: "Gelen Arama",
  outbound_arama: "Giden Arama",
  manuel: "Manuel",
};

const DURUM_ETIKET: Record<string, string> = {
  yeni: "Yeni",
  iletisimde: "İletişimde",
  randevu: "Randevu",
  kazanildi: "Kazanıldı",
  kaybedildi: "Kaybedildi",
  ilgisiz: "İlgisiz",
};

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [q, setQ] = useState("");
  const [sicaklik, setSicaklik] = useState("hepsi");
  const [durum, setDurum] = useState("hepsi");
  const [secili, setSecili] = useState<Lead | null>(null);

  const filtreli = useMemo(() => {
    return leads.filter((l) => {
      if (sicaklik !== "hepsi" && l.son_sicaklik !== sicaklik) return false;
      if (durum !== "hepsi" && l.durum !== durum) return false;
      if (q) {
        const hay = `${l.ad_soyad ?? ""} ${l.telefon ?? ""}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [leads, q, sicaklik, durum]);

  return (
    <>
      {/* Filtre çubuğu */}
      <div className="flex flex-wrap gap-2.5 mb-3.5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="İsim veya telefon ara…"
          className="rounded-lg px-3.5 py-2 text-[13px] outline-none flex-1 min-w-[200px]"
          style={{ background: "var(--card)", border: "1px solid var(--border-soft)", color: "var(--text)" }}
        />
        <Select value={sicaklik} onChange={setSicaklik} options={[
          ["hepsi", "Tüm sıcaklıklar"], ["hot", "Hot"], ["warm", "Warm"], ["cold", "Cold"],
        ]} />
        <Select value={durum} onChange={setDurum} options={[
          ["hepsi", "Tüm durumlar"],
          ...Object.entries(DURUM_ETIKET),
        ]} />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-soft)" }}>
                {["Ad Soyad", "Telefon", "Kaynak", "Skor", "Durum", "Son Görüşme"].map((h) => (
                  <th
                    key={h}
                    className="text-left font-medium px-4 py-2.5 text-[11.5px] whitespace-nowrap"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtreli.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[13px]" style={{ color: "var(--text-faint)" }}>
                    {leads.length === 0
                      ? "Henüz lead yok. Bot canlıya alınınca müşteriler burada listelenecek."
                      : "Bu filtreye uyan lead yok."}
                  </td>
                </tr>
              )}
              {filtreli.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSecili(l)}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: "1px solid var(--border-soft)" }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">{l.ad_soyad || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--text-dim)" }}>
                    {l.telefon ? `+${l.telefon}` : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--text-dim)" }}>
                    {KANAL_ETIKET[l.kaynak ?? ""] ?? l.kaynak ?? "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Rozet s={l.son_sicaklik} skor={l.son_skor} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--text-dim)" }}>
                    {DURUM_ETIKET[l.durum ?? ""] ?? "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--text-faint)" }}>
                    {l.son_gorusme
                      ? new Date(l.son_gorusme).toLocaleString("tr-TR", {
                          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtreli.length > 0 && (
        <p className="text-[11.5px] mt-2.5" style={{ color: "var(--text-faint)" }}>
          {filtreli.length} lead gösteriliyor
        </p>
      )}

      {/* Detay paneli */}
      {secili && (
        <>
          <div
            className="fixed inset-0 z-30"
            style={{ background: "rgba(0,0,0,0.55)" }}
            onClick={() => setSecili(null)}
          />
          <aside
            className="fixed inset-y-0 right-0 w-full max-w-[420px] z-40 overflow-y-auto p-6"
            style={{ background: "var(--bg-elev)", borderLeft: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-[17px] font-semibold">{secili.ad_soyad || "İsimsiz"}</h2>
                <p className="text-[12.5px] mt-0.5" style={{ color: "var(--text-faint)" }}>
                  {secili.telefon ? `+${secili.telefon}` : "Telefon yok"}
                </p>
              </div>
              <button
                onClick={() => setSecili(null)}
                className="text-[18px] leading-none px-2"
                style={{ color: "var(--text-faint)" }}
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 mb-5">
              <Rozet s={secili.son_sicaklik} skor={secili.son_skor} />
              <span className="badge" style={{ background: "var(--card)", color: "var(--text-dim)", borderColor: "var(--border)" }}>
                {KANAL_ETIKET[secili.kaynak ?? ""] ?? secili.kaynak}
              </span>
              <span className="badge" style={{ background: "var(--card)", color: "var(--text-dim)", borderColor: "var(--border)" }}>
                {DURUM_ETIKET[secili.durum ?? ""] ?? secili.durum}
              </span>
            </div>

            <Bolum baslik="AI Konuşma Özeti">
              {secili.son_ozet || "Henüz özet çıkarılmadı."}
            </Bolum>

            <Bolum baslik="Kayıt Tarihi">
              {secili.created_at
                ? new Date(secili.created_at).toLocaleString("tr-TR")
                : "—"}
            </Bolum>
          </aside>
        </>
      )}
    </>
  );
}

function Bolum({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    <div className="card p-4 mb-3">
      <div className="text-[11px] font-semibold tracking-wide mb-1.5" style={{ color: "var(--text-faint)" }}>
        {baslik.toUpperCase()}
      </div>
      <div className="text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {children}
      </div>
    </div>
  );
}

function Rozet({ s, skor }: { s?: string | null; skor?: number | null }) {
  const map: Record<string, string> = { hot: "badge-hot", warm: "badge-warm", cold: "badge-cold" };
  if (!s) return <span style={{ color: "var(--text-faint)" }}>—</span>;
  return (
    <span className={`badge ${map[s] ?? "badge-cold"}`}>
      {skor != null ? `${skor}` : ""} {s.toUpperCase()}
    </span>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg px-3 py-2 text-[13px] outline-none cursor-pointer"
      style={{ background: "var(--card)", border: "1px solid var(--border-soft)", color: "var(--text-dim)" }}
    >
      {options.map(([v, l]) => (
        <option key={v} value={v} style={{ background: "#14181e" }}>
          {l}
        </option>
      ))}
    </select>
  );
}
