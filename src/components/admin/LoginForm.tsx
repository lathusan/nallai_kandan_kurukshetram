"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const field = "mt-1 w-full rounded border border-wood/25 bg-white px-3 py-2.5 focus:border-wood";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: f.get("username"), password: f.get("password") }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    const data = await res?.json().catch(() => null);
    setError(data?.error ?? "Couldn't reach the website. Check your connection and try again.");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="font-medium">Username</span>
        <input name="username" autoComplete="username" required className={field} />
      </label>
      <label className="block">
        <span className="font-medium">Password</span>
        <input name="password" type="password" autoComplete="current-password" required className={field} />
      </label>
      {error && <p role="alert" className="text-sm text-kumkum">{error}</p>}
      <button type="submit" disabled={busy} className="w-full rounded bg-kumkum px-5 py-3 font-semibold text-ash hover:bg-kumkum/85 disabled:opacity-60">
        {busy ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
