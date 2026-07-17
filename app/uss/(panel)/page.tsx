import { createClient } from "@/lib/supabase/server";
import { KanalChart, SicaklikChart, TrendChart } from "@/components/Charts";

export const dynamic = "force-dynamic";

const KANAL_ETIKET: Record<string, string> = {
  reklam_formu: "Reklam",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  inbound_arama: "Gelen Arama",
  outbound_arama: "Giden Arama",
  manuel: "Manuel",
};

export default async function Dashboard() {
  const supabase = await createClient();

  const [{ data: ozet }, { data: randevular }] = await Promise.all([
    supabase.from("lead_ozet").select("*"),
    supabase.from("appointments").select("id, baslangic, durum, lead_id"),
  ]);

  const leadler = ozet ?? [];
  const appts = randevular ?? [];

  // ---- KPI'lar ----
  const toplam = leadler.length;
  const hot = leadler.filter((l) => l.son_sicaklik === "hot").length;

  const simdi = new Date();
  const haftaBasi = new Date(simdi);
  haftaBasi.setDate(simdi.getDate() - simdi.getDay() + 1);
  haftaBasi.setHours(0, 0, 0, 0);
  const buHafta = appts.filter((a) => new Date(a.baslangic) >= haftaBasi).length;

  const kazanilan = leadler.filter((l) => l.durum === "kazanildi").length;
  const donusum = toplam ? Math.round((kazanilan / toplam) * 100) : 0;

  // ---- Kanal dağılımı ----
  const kanalMap = new Map<string, number>();
  leadler.forEach((l) => {
    const k = KANAL_ETIKET[l.kaynak as string] ?? l.kaynak ?? "?";
    kanalMap.set(k, (kanalMap.get(k) ?? 0) + 1);
  });
  const kanalData = [...kanalMap].map(([kanal, adet]) => ({ kanal, adet }));

  // ---- Sıcaklık dağılımı ----
  const sicakMap = new Map<string, number>();
  leadler.forEach((l) => {
    if (!l.son_sicaklik) return;
    sicakMap.set(l.son_sicaklik, (sicakMap.get(l.son_sicaklik) ?? 0) + 1);
  });
  const sicakData = [...sicakMap].map(([ad, adet]) => ({ ad, adet }));

  // ---- 30 günlük trend ----
  const gunler: { gun: string; adet: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const adet = leadler.filter(
      (l) => (l.created_at as string)?.slice(0, 10) === key
    ).length;
    gunler.push({ gun: d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" }), adet });
  }

  // ---- Son aktiviteler ----
  const sonlar = [...leadler]
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, 6);

  return (
    <>
      <header className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight">Dashboard</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-faint)" }}>
          Tüm kanallardan gelen müşteri akışı
        </p>
      </header>

      {/* KPI kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
        <Kpi baslik="Toplam Lead" deger={toplam} renk="var(--accent-2)" />
        <Kpi baslik="Sıcak Lead" deger={hot} renk="var(--hot)" alt={`${toplam ? Math.round((hot / toplam) * 100) : 0}% oranında`} />
        <Kpi baslik="Bu Hafta Randevu" deger={buHafta} renk="var(--warm)" />
        <Kpi baslik="Dönüşüm Oranı" deger={`${donusum}%`} renk="var(--ok)" alt={`${kazanilan} kazanıldı`} />
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 mb-4">
        <div className="card card-hover p-5 lg:col-span-2">
          <Baslik>Kanal bazlı lead dağılımı</Baslik>
          <KanalChart data={kanalData} />
        </div>
        <div className="card card-hover p-5">
          <Baslik>Sıcaklık dağılımı</Baslik>
          <SicaklikChart data={sicakData} />
          <div className="flex justify-center gap-3.5 mt-1">
            {[
              ["hot", "Hot", "var(--hot)"],
              ["warm", "Warm", "var(--warm)"],
              ["cold", "Cold", "var(--cold)"],
            ].map(([k, label, renk]) => (
              <span key={k} className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-dim)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: renk }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        <div className="card card-hover p-5 lg:col-span-2">
          <Baslik>Son 30 günün lead trendi</Baslik>
          <TrendChart data={gunler} />
        </div>

        <div className="card card-hover p-5">
          <Baslik>Son aktiviteler</Baslik>
          {sonlar.length === 0 ? (
            <p className="text-[12.5px] py-8 text-center" style={{ color: "var(--text-faint)" }}>
              Henüz lead yok. İlk müşteri geldiğinde burada görünecek.
            </p>
          ) : (
            <ul className="flex flex-col gap-2.5 mt-1">
              {sonlar.map((l) => (
                <li key={l.id as string} className="flex items-center gap-2.5">
                  <SicaklikRozet s={l.son_sicaklik as string} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] truncate">{(l.ad_soyad as string) || "İsimsiz"}</div>
                    <div className="text-[11px]" style={{ color: "var(--text-faint)" }}>
                      {KANAL_ETIKET[l.kaynak as string] ?? l.kaynak}
                      {l.son_skor != null && ` · ${l.son_skor}/100`}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function Kpi({
  baslik,
  deger,
  renk,
  alt,
}: {
  baslik: string;
  deger: string | number;
  renk: string;
  alt?: string;
}) {
  return (
    <div className="card card-hover p-4">
      <div className="text-[11.5px] font-medium mb-1.5" style={{ color: "var(--text-dim)" }}>
        {baslik}
      </div>
      <div className="text-[26px] font-semibold tracking-tight leading-none" style={{ color: renk }}>
        {deger}
      </div>
      <div className="text-[11px] mt-1.5" style={{ color: "var(--text-faint)" }}>
        {alt ?? " "}
      </div>
    </div>
  );
}

function Baslik({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[13.5px] font-semibold mb-3.5">{children}</h2>;
}

export function SicaklikRozet({ s }: { s?: string }) {
  const map: Record<string, string> = { hot: "badge-hot", warm: "badge-warm", cold: "badge-cold" };
  return (
    <span className={`badge ${map[s ?? "cold"] ?? "badge-cold"}`}>
      {(s ?? "—").toUpperCase()}
    </span>
  );
}
