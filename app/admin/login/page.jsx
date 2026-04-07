"use client";

import { useMemo, useState } from "react";

export default function AdminLoginPage() {
  const defaultEmail = useMemo(
    () => process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "Traceagencys@gmail.com",
    []
  );
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const raw = await res.text();
      const data = (() => {
        try {
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      })();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        const fallback = `HTTP ${res.status} ${res.statusText}`.trim() || "Gagal login.";
        setError(data?.error ?? fallback);
        return;
      }
      window.location.assign("/admin");
    } catch {
      setStatus("error");
      setError("Gagal login.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
        <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">
            Admin Panel
          </div>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">Login</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Masuk untuk mengelola konten website.
          </p>

          {status === "error" && error ? (
            <div className="mt-5 text-sm text-red-200 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                type="email"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Masuk..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
