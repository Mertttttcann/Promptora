import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const DURUM: Record<string, [string, string]> = {
  planlandi: ["Planlandı", "var(--warm)"],
  onaylandi: ["Onaylandı", "var(--accent-2)"],
  tamamlandi: ["Tamamlandı", "var(--ok)"],
  iptal: ["İptal", "var(--text-faint)"],
  gelmedi: ["Gelmedi", "var(--hot)"],
};

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("appointments")
    .select("id, baslangic, bitis, durum, notlar, leads(ad_soyad, telefon)")
    .order("baslangic", { ascending: true });

  const randevular = data ?? [];

  return (
    <>
      <header className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight">Randevular</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-faint)" }}>
          WhatsApp botunun ayarladığı keşif görüşmeleri
        </p>
      </header>

      {randevular.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-[13px]" style={{ color: "var(--text-faint)" }}>
            Henüz randevu yok. Bot randevu aldıkça burada ve Cal.com&apos;da görünecek.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {randevular.map((r) => {
            const lead = r.leads as unknown as { ad_soyad?: string; telefon?: string } | null;
            const [etiket, renk] = DURUM[r.durum as string] ?? ["—", "var(--text-faint)"];
            const d = new Date(r.baslangic as string);
            return (
              <div key={r.id as string} className="card card-hover p-4 flex items-center gap-4">
                <div
                  className="rounded-xl px-3 py-2 text-center shrink-0"
                  style={{ background: "var(--bg)", border: "1px solid var(--border-soft)" }}
                >
                  <div className="text-[17px] font-semibold leading-none">
                    {d.toLocaleDateString("tr-TR", { day: "numeric" })}
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: "var(--text-faint)" }}>
                    {d.toLocaleDateString("tr-TR", { month: "short" }).toUpperCase()}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium truncate">
                    {lead?.ad_soyad || "İsimsiz"}
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: "var(--text-faint)" }}>
                    {d.toLocaleString("tr-TR", { weekday: "long", hour: "2-digit", minute: "2-digit" })}
                    {lead?.telefon && ` · +${lead.telefon}`}
                  </div>
                  {r.notlar && (
                    <div className="text-[12px] mt-1 truncate" style={{ color: "var(--text-dim)" }}>
                      🎯 {r.notlar as string}
                    </div>
                  )}
                </div>

                <span className="badge shrink-0" style={{ color: renk, background: "var(--card)", borderColor: "var(--border)" }}>
                  {etiket}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
