"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/store";
import { SCHEMA, type Field } from "@/lib/schema";
import DrumHead from "@/components/DrumHead";

type Name = keyof typeof SCHEMA;
type Item = Record<string, string | boolean> & { id: string };

const TABS = Object.keys(SCHEMA) as Name[];
const input = "mt-1 w-full rounded border border-wood/25 bg-white px-3 py-2.5 focus:border-wood";

export default function AdminDashboard({ content, canSave = true }: { content: Content; canSave?: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<Name>("posts");
  const [editing, setEditing] = useState<Item | "new" | null>(null);
  const [message, setMessage] = useState("");

  // remember the open tab when the page refreshes
  useEffect(() => {
    try {
      const t = localStorage.getItem("admin-tab") as Name | null;
      if (t && TABS.includes(t)) setTab(t);
    } catch {}
  }, []);
  const choose = (t: Name) => {
    setTab(t);
    setEditing(null);
    setMessage("");
    try { localStorage.setItem("admin-tab", t); } catch {}
  };

  const def = SCHEMA[tab];
  const items = content[tab] as unknown as Item[];

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function remove(item: Item) {
    if (!window.confirm(`Delete "${item[def.titleField]}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/${tab}?id=${encodeURIComponent(item.id)}`, { method: "DELETE" });
    if (res.status === 401) return router.replace("/admin/login");
    setMessage(res.ok ? `Deleted "${item[def.titleField]}".` : "Couldn't delete. Try again.");
    router.refresh();
  }

  return (
    <div>
      <header className="bg-wood-deep text-ash">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <DrumHead className="h-9 w-9" />
            <div className="leading-tight">
              <p className="font-display text-lg">Website admin</p>
              <p className="text-xs text-ash/60">Changes appear on the website straight away</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" target="_blank" className="rounded border border-ash/30 px-3 py-1.5 hover:border-turmeric hover:text-turmeric">
              View website
            </Link>
            <button type="button" onClick={logout} className="rounded px-3 py-1.5 text-ash/70 hover:text-turmeric">
              Log out
            </button>
          </div>
        </div>
        <nav aria-label="Sections" className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex gap-1">
            {TABS.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  onClick={() => choose(t)}
                  aria-current={tab === t ? "page" : undefined}
                  className={`whitespace-nowrap rounded-t px-4 py-2.5 text-sm font-semibold ${
                    tab === t ? "bg-ash text-wood" : "text-ash/75 hover:text-turmeric"
                  }`}
                >
                  {SCHEMA[t].label}
                  <span className="ml-1.5 font-normal opacity-60">{(content[t] as unknown[]).length}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {!canSave && (
          <div role="alert" className="mb-6 rounded border border-turmeric bg-turmeric/15 px-4 py-3 text-wood">
            <p className="font-semibold">Saving is turned off on this hosting.</p>
            <p className="mt-1 text-sm">
              This server has no storage for posts, photos and PDFs, so the website is showing its built-in content.
              Changes made here can't be saved until storage is connected.
            </p>
          </div>
        )}
        {editing ? (
          <ItemForm
            key={editing === "new" ? "new" : editing.id}
            name={tab}
            item={editing === "new" ? null : editing}
            onDone={(msg) => {
              setEditing(null);
              setMessage(msg);
              router.refresh();
            }}
            onCancel={() => setEditing(null)}
            onExpired={() => router.replace("/admin/login")}
          />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl text-wood">{def.label}</h1>
              <button
                type="button"
                onClick={() => { setEditing("new"); setMessage(""); }}
                className="rounded bg-kumkum px-5 py-2.5 font-semibold text-ash hover:bg-kumkum/85"
              >
                Add {def.singular}
              </button>
            </div>
            {message && <p role="status" className="mt-4 rounded bg-[#e3efe6] px-4 py-2.5 text-[#1f5f36]">{message}</p>}

            {items.length === 0 ? (
              <div className="mt-8 rounded border border-dashed border-wood/30 p-10 text-center">
                <p className="text-muted">No {def.label.toLowerCase()} yet.</p>
                <button type="button" onClick={() => setEditing("new")} className="mt-3 font-semibold text-kumkum underline underline-offset-4">
                  Add the first {def.singular}
                </button>
              </div>
            ) : (
              <ul className="mt-6 divide-y divide-ash-dark rounded border border-ash-dark bg-white">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 p-3 sm:p-4">
                    <Thumb item={item} name={tab} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{String(item[def.titleField])}</p>
                      <p className="truncate text-sm text-muted">{def.subtitle(item)}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button type="button" onClick={() => { setEditing(item); setMessage(""); }} className="rounded border border-wood/25 px-3 py-1.5 text-sm font-medium hover:border-wood">
                        Edit
                      </button>
                      <button type="button" onClick={() => remove(item)} className="rounded px-3 py-1.5 text-sm font-medium text-kumkum hover:bg-kumkum/10">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

/** Small preview on the left of each row. */
function Thumb({ item, name }: { item: Item; name: Name }) {
  const img = (item.image || item.cover) as string;
  if (img) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={img} alt="" className="h-12 w-12 shrink-0 rounded object-cover" />;
  }
  if (name === "videos" && item.youtubeId) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`https://img.youtube.com/vi/${item.youtubeId}/default.jpg`} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />;
  }
  const label = name === "lessonFiles" || item.pdf ? "PDF" : name === "posts" ? "Post" : "";
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-ash-dark text-xs font-semibold text-muted">
      {label}
    </span>
  );
}

function ItemForm({
  name,
  item,
  onDone,
  onCancel,
  onExpired,
}: {
  name: Name;
  item: Item | null;
  onDone: (message: string) => void;
  onCancel: () => void;
  onExpired: () => void;
}) {
  const def = SCHEMA[name];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(e.currentTarget);
    if (item) data.set("id", item.id);
    const res = await fetch(`/api/admin/${name}`, { method: "POST", body: data }).catch(() => null);
    setBusy(false);
    if (res?.status === 401) return onExpired();
    const json = await res?.json().catch(() => null);
    if (!res?.ok) {
      setError(json?.error ?? "Couldn't save. Check your connection and try again.");
      return;
    }
    const title = String(data.get(def.titleField) ?? "");
    onDone(item ? `Saved changes to "${title}".` : `Added "${title}".`);
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="max-w-2xl">
      <button type="button" onClick={onCancel} className="text-sm font-semibold text-kumkum underline underline-offset-4">
        Back to {def.label.toLowerCase()}
      </button>
      <h1 className="mt-3 text-3xl text-wood">{item ? `Edit ${def.singular}` : `Add a ${def.singular}`}</h1>

      <div className="mt-6 space-y-5 rounded border border-ash-dark bg-white p-5 sm:p-6">
        {def.fields.map((f) => (
          <FieldInput key={f.name} field={f} value={item?.[f.name]} />
        ))}
      </div>

      {error && <p role="alert" className="mt-4 rounded bg-kumkum/10 px-4 py-2.5 text-kumkum">{error}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} className="rounded bg-kumkum px-6 py-3 font-semibold text-ash hover:bg-kumkum/85 disabled:opacity-60">
          {busy ? "Saving…" : item ? "Save changes" : `Add ${def.singular}`}
        </button>
        <button type="button" onClick={onCancel} className="rounded px-4 py-3 font-medium text-muted hover:text-wood">
          Cancel
        </button>
        {busy && <span className="text-sm text-muted">Uploading files can take a moment.</span>}
      </div>
    </form>
  );
}

function FieldInput({ field: f, value }: { field: Field; value: string | boolean | undefined }) {
  const [remove, setRemove] = useState(false);
  const [preview, setPreview] = useState("");
  const label = (
    <span className="font-medium">
      {f.label}
      {f.required && <span className="text-kumkum"> *</span>}
    </span>
  );
  const hint = f.hint && <span className="mt-1 block text-sm text-muted">{f.hint}</span>;

  switch (f.type) {
    case "textarea":
      return (
        <label className="block">
          {label}
          <textarea name={f.name} rows={6} required={f.required} defaultValue={String(value ?? "")} className={input} />
          {hint}
        </label>
      );
    case "checkbox":
      return (
        <label className="flex items-center gap-3">
          <input type="checkbox" name={f.name} defaultChecked={value === true || (value === undefined && !!f.defaultOn)} className="h-5 w-5 accent-kumkum" />
          <span className="font-medium">{f.label}</span>
        </label>
      );
    case "select":
      return (
        <label className="block">
          {label}
          <select name={f.name} required={f.required} defaultValue={String(value ?? f.options?.[0] ?? "")} className={input}>
            {f.options?.map((o) => <option key={o}>{o}</option>)}
          </select>
          {hint}
        </label>
      );
    case "date":
      return (
        <label className="block">
          {label}
          <input type="date" name={f.name} required={f.required} defaultValue={String(value ?? new Date().toISOString().slice(0, 10))} className={input} />
        </label>
      );
    case "youtube":
      return (
        <label className="block">
          {label}
          <input
            name={f.name}
            required={f.required}
            defaultValue={value ? `https://www.youtube.com/watch?v=${value}` : ""}
            placeholder="https://www.youtube.com/watch?v=…"
            className={input}
          />
          {hint}
        </label>
      );
    case "image":
    case "pdf": {
      const current = typeof value === "string" ? value : "";
      return (
        <div>
          {label}
          {current && !remove && (
            <div className="mt-2 flex items-center gap-3">
              {f.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview || current} alt="" className="h-20 w-20 rounded object-cover" />
              ) : (
                <a href={current} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-kumkum underline underline-offset-4">
                  Open current PDF
                </a>
              )}
              {!f.required && (
                <button type="button" onClick={() => setRemove(true)} className="text-sm text-muted underline underline-offset-4 hover:text-kumkum">
                  Remove
                </button>
              )}
            </div>
          )}
          {remove && <input type="hidden" name={`${f.name}__remove`} value="1" />}
          {!current && preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="mt-2 h-20 w-20 rounded object-cover" />
          )}
          <input
            type="file"
            name={f.name}
            accept={f.type === "image" ? "image/jpeg,image/png,image/webp" : "application/pdf"}
            required={f.required && !current}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && f.type === "image") setPreview(URL.createObjectURL(file));
              setRemove(false);
            }}
            className="mt-2 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-wood file:px-4 file:py-2 file:font-semibold file:text-ash"
          />
          <span className="mt-1 block text-sm text-muted">
            {current ? "Choose a file to replace the current one. " : ""}
            {f.type === "image" ? "JPG, PNG or WebP, up to 10 MB." : "PDF, up to 30 MB."}
          </span>
          {hint}
        </div>
      );
    }
    default:
      return (
        <label className="block">
          {label}
          <input name={f.name} type={f.type === "url" ? "url" : "text"} required={f.required} defaultValue={String(value ?? "")} className={input} />
          {hint}
        </label>
      );
  }
}
