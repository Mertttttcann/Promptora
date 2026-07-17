"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
      return;
    }

    router.push("/uss");
    router.refresh();
  }

  return (
    <main className="relative z-10 min-h-screen grid place-items-center px-5">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div
              className="w-9 h-9 rounded-xl grid place-items-center text-[15px] font-bold"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                boxShadow: "0 4px 20px var(--accent-glow)",
              }}
            >
              P
            </div>
            <span className="text-[19px] font-semibold tracking-tight">
              PROMPTORA <span style={{ color: "var(--accent-2)" }}>AI</span>
            </span>
          </div>
          <p className="text-[13px]" style={{ color: "var(--text-faint)" }}>
            Yönetim paneline giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-7">
          <label className="block mb-4">
            <span className="text-[12px] font-medium" style={{ color: "var(--text-dim)" }}>
              E-posta
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@promptoragent.com"
              className="mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none transition-colors"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </label>

          <label className="block mb-5">
            <span className="text-[12px] font-medium" style={{ color: "var(--text-dim)" }}>
              Şifre
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none transition-colors"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </label>

          {error && (
            <div
              className="mb-4 rounded-lg px-3.5 py-2.5 text-[13px]"
              style={{ background: "var(--hot-bg)", color: "var(--hot)" }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-[14px] font-semibold transition-opacity disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#fff",
              boxShadow: "0 6px 20px -6px var(--accent-glow)",
            }}
          >
            {loading ? "Giriş yapılıyor…" : "Giriş yap"}
          </button>
        </form>
      </div>
    </main>
  );
}
