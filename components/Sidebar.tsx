"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const BASE = "/uss";

const NAV = [
  { href: `${BASE}`, label: "Dashboard", icon: "◧" },
  { href: `${BASE}/leads`, label: "Lead'ler", icon: "◉" },
  { href: `${BASE}/conversations`, label: "Konuşmalar", icon: "◍" },
  { href: `${BASE}/appointments`, label: "Randevular", icon: "◔" },
];

export default function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`${BASE}/login`);
    router.refresh();
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 w-[228px] flex flex-col z-20 px-3 py-5"
      style={{ background: "var(--bg-elev)", borderRight: "1px solid var(--border-soft)" }}
    >
      <div className="flex items-center gap-2.5 px-2.5 mb-7">
        <div
          className="w-8 h-8 rounded-lg grid place-items-center text-[13px] font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            boxShadow: "0 4px 16px var(--accent-glow)",
          }}
        >
          P
        </div>
        <div className="leading-tight">
          <div className="text-[14px] font-semibold tracking-tight">
            PROMPTORA <span style={{ color: "var(--accent-2)" }}>AI</span>
          </div>
          <div className="text-[10px] tracking-[0.12em]" style={{ color: "var(--text-faint)" }}>
            YÖNETİM PANELİ
          </div>
        </div>
      </div>

      <div
        className="text-[10px] font-semibold tracking-[0.12em] px-2.5 mb-2"
        style={{ color: "var(--text-faint)" }}
      >
        MENÜ
      </div>

      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] transition-colors"
              style={{
                background: active ? "var(--card)" : "transparent",
                color: active ? "var(--text)" : "var(--text-dim)",
                border: `1px solid ${active ? "var(--border)" : "transparent"}`,
                fontWeight: active ? 600 : 400,
              }}
            >
              <span style={{ color: active ? "var(--accent-2)" : "var(--text-faint)" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="card p-3 mb-2" style={{ borderRadius: 12 }}>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--ok)", boxShadow: "0 0 8px var(--ok)" }}
            />
            <span className="text-[11.5px] font-medium">Sistem aktif</span>
          </div>
          <div className="text-[10px] tracking-wide" style={{ color: "var(--text-faint)" }}>
            7/24 · KVKK UYUMLU
          </div>
        </div>

        {email && (
          <div className="px-2.5 py-1.5 text-[11px] truncate" style={{ color: "var(--text-faint)" }}>
            {email}
          </div>
        )}
        <button
          onClick={signOut}
          className="w-full text-left rounded-lg px-2.5 py-2 text-[12.5px] transition-colors"
          style={{ color: "var(--text-dim)" }}
        >
          ⏻ Çıkış yap
        </button>
      </div>
    </aside>
  );
}
