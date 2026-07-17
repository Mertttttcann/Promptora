import { createClient } from "@/lib/supabase/server";
import LeadsTable from "@/components/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lead_ozet")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <header className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight">Lead&apos;ler</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--text-faint)" }}>
          Reklamlardan ve WhatsApp&apos;tan gelen tüm müşteriler
        </p>
      </header>

      <LeadsTable leads={data ?? []} />
    </>
  );
}
