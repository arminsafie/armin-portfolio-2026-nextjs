"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Could not reach the server. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-line-dim bg-panel/40 p-8"
      >
        <div className="mb-6 flex items-center gap-2 text-paper">
          <Lock className="h-4 w-4 text-amber" />
          <p className="font-mono text-xs uppercase tracking-[0.15em]">Admin Access</p>
        </div>

        <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full border border-line-dim bg-ink px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-blue"
        />

        {error && (
          <p className="mt-3 text-sm text-amber" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full border border-amber bg-amber/10 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-amber transition-colors hover:bg-amber/20 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
