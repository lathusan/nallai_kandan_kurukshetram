/**
 * Add, edit and delete content from the admin page.
 * POST   /api/admin/<collection>        multipart form: add (no id) or edit (with id)
 * DELETE /api/admin/<collection>?id=…   delete one item (and its uploaded files)
 */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isLoggedIn, sameOrigin } from "@/lib/auth";
import { COLLECTIONS, type CollectionName, canSave, newId, updateContent, youtubeIdFrom } from "@/lib/store";
import { SCHEMA } from "@/lib/schema";
import { removeUpload, saveUpload, UploadError } from "@/lib/uploads";

type Item = Record<string, string | boolean>;

async function guard(req: Request, collection: string) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Request blocked." }, { status: 403 });
  if (!(await isLoggedIn())) return NextResponse.json({ error: "Your login has expired. Log in again." }, { status: 401 });
  if (!COLLECTIONS.includes(collection as CollectionName)) return NextResponse.json({ error: "Unknown section." }, { status: 404 });
  if (!(await canSave())) {
    return NextResponse.json(
      { error: "This hosting can't save changes or uploads yet. Make changes on the computer version of the site for now." },
      { status: 503 },
    );
  }
  return null;
}

export async function POST(req: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const blocked = await guard(req, collection);
  if (blocked) return blocked;
  const name = collection as CollectionName;
  const def = SCHEMA[name];

  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  const values: Item = {};
  const newFiles: string[] = [];

  try {
    for (const field of def.fields) {
      const raw = form.get(field.name);
      if (field.type === "checkbox") {
        values[field.name] = raw === "on" || raw === "true";
      } else if (field.type === "image" || field.type === "pdf") {
        if (raw instanceof File && raw.size > 0) {
          const url = await saveUpload(raw, field.type, def.folder);
          newFiles.push(url);
          values[field.name] = url;
        } else if (form.get(`${field.name}__remove`) === "1") {
          values[field.name] = "";
        }
        // otherwise: keep the existing file (handled below)
      } else if (field.type === "youtube") {
        const ytId = youtubeIdFrom(String(raw ?? ""));
        if (!ytId && field.required) throw new UploadError("That YouTube link wasn't recognised. Copy it from YouTube's Share button.");
        values[field.name] = ytId;
      } else if (field.type === "url") {
        const v = String(raw ?? "").trim();
        if (v && !/^https?:\/\//i.test(v)) throw new UploadError(`${field.label} must start with https://`);
        values[field.name] = v;
      } else {
        const v = String(raw ?? "").trim().slice(0, field.type === "textarea" ? 5000 : 300);
        if (field.options && v && !field.options.includes(v)) throw new UploadError(`Choose a ${field.label.toLowerCase()} from the list.`);
        values[field.name] = v;
      }
    }

    let saved: Item | undefined;
    const oldFiles: string[] = [];
    await updateContent((c) => {
      const list = c[name] as unknown as Item[];
      const existing = id ? list.find((x) => x.id === id) : undefined;
      if (id && !existing) throw new UploadError("That item no longer exists. Refresh the page.");

      for (const field of def.fields) {
        if (field.type !== "image" && field.type !== "pdf") continue;
        if (!(field.name in values)) values[field.name] = existing ? existing[field.name] ?? "" : "";
        else if (existing?.[field.name] && existing[field.name] !== values[field.name]) oldFiles.push(String(existing[field.name]));
        if (field.required && !values[field.name]) throw new UploadError(`Add the ${field.label.toLowerCase()}.`);
      }
      for (const field of def.fields) {
        if (field.required && field.type !== "checkbox" && !values[field.name]) throw new UploadError(`Fill in "${field.label}".`);
      }

      if (existing) {
        Object.assign(existing, values);
        saved = existing;
      } else {
        saved = { id: newId(), ...values };
        list.unshift(saved);
      }
    });
    await Promise.all(oldFiles.map(removeUpload));
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, item: saved });
  } catch (e) {
    await Promise.all(newFiles.map(removeUpload)); // don't leave orphaned uploads behind
    if (e instanceof UploadError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error(e);
    return NextResponse.json({ error: "Couldn't save. Try again." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const blocked = await guard(req, collection);
  if (blocked) return blocked;
  const name = collection as CollectionName;
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const files: string[] = [];
  await updateContent((c) => {
    const list = c[name] as unknown as Item[];
    const i = list.findIndex((x) => x.id === id);
    if (i === -1) return;
    for (const field of SCHEMA[name].fields) {
      if ((field.type === "image" || field.type === "pdf") && list[i][field.name]) files.push(String(list[i][field.name]));
    }
    list.splice(i, 1);
  });
  await Promise.all(files.map(removeUpload));
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
