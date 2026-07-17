import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const KANAL: Record<string, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  inbound_arama: "Gelen Arama",
  outbound_arama: "Giden Arama",
  reklam_formu: "Reklam",
  manuel: "Manuel",
};

export default async function ConversationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select("id, kanal, baslangic, ozet, niyet, sonuc, leads(ad_soyad, telefon)")
    .order("baslangic", { ascending: false })
    .limit(50);

  const konusmalar = data ?? [];

  return (
    <>
      <header className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight">Konuşmalar</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-faint)" }}>
          AI ajanlarının müşterilerle yaptığı görüşmeler
        </p>
      </header>

      {konusmalar.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-[13px]" style={{ color: "var(--text-faint)" }}>
            Henüz konuşma yok. Bot müşterilerle konuştukça özetler burada birikecek.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {konusmalar.map((k) => {
            const lead = k.leads as unknown as { ad_soyad?: string; telefon?: string } | null;
            return (
              <div key={k.id as string} className="card card-hover p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[14px] font-medium">{lead?.ad_soyad || "İsimsiz"}</span>
                  <span className="badge" style={{ background: "var(--card)", color: "var(--text-dim)", borderColor: "var(--border)" }}>
                    {KANAL[k.kanal as string] ?? k.kanal}
                  </span>
                  <span className="text-[11.5px] ml-auto" style={{ color: "var(--text-faint)" }}>
                    {new Date(k.baslangic as string).toLocaleString("tr-TR", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {(k.ozet as string) || "Özet henüz çıkarılmadı."}
                </p>
                {(k.niyet || k.sonuc) && (
                  <div className="flex gap-3 mt-2.5 text-[11.5px]" style={{ color: "var(--text-faint)" }}>
                    {k.niyet ? <span>🎯 {k.niyet as string}</span> : null}
                    {k.sonuc ? <span>✓ {k.sonuc as string}</span> : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
