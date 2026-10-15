/** Saving and removing uploaded files (photos and PDFs). */
import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { STORAGE_DIR, newId } from "./store";

export const UPLOAD_DIR = path.join(STORAGE_DIR, "uploads");

const KINDS = {
  image: {
    types: { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as Record<string, string>,
    maxBytes: 10 * 1024 * 1024,
    label: "a JPG, PNG or WebP photo up to 10 MB",
  },
  pdf: {
    types: { "application/pdf": "pdf" } as Record<string, string>,
    maxBytes: 30 * 1024 * 1024,
    label: "a PDF up to 30 MB",
  },
};

export class UploadError extends Error {}

/** Checks the file's real contents (not just its name), then saves it with a new random name. */
export async function saveUpload(file: File, kind: keyof typeof KINDS, folder: string) {
  const rule = KINDS[kind];
  const ext = rule.types[file.type];
  if (!ext) throw new UploadError(`"${file.name}" isn't ${rule.label}.`);
  if (file.size > rule.maxBytes) throw new UploadError(`"${file.name}" is too large. Use ${rule.label}.`);

  const buf = Buffer.from(await file.arrayBuffer());
  const sig = buf.subarray(0, 12);
  const ok =
    (ext === "jpg" && sig[0] === 0xff && sig[1] === 0xd8) ||
    (ext === "png" && sig.subarray(0, 4).toString("hex") === "89504e47") ||
    (ext === "webp" && sig.subarray(0, 4).toString() === "RIFF" && sig.subarray(8, 12).toString() === "WEBP") ||
    (ext === "pdf" && sig.subarray(0, 4).toString() === "%PDF");
  if (!ok) throw new UploadError(`"${file.name}" doesn't look like ${rule.label}.`);

  const safeFolder = folder.replace(/[^a-z-]/gi, "");
  const dir = path.join(UPLOAD_DIR, safeFolder);
  await fs.mkdir(dir, { recursive: true });
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "file";
  const name = `${base}-${newId()}.${ext}`;
  await fs.writeFile(path.join(dir, name), buf);
  return `/uploads/${safeFolder}/${name}`;
}

/** Deletes a previously uploaded file. Ignores anything that isn't in the uploads folder. */
export async function removeUpload(url: string) {
  if (!url || !url.startsWith("/uploads/")) return;
  const full = path.resolve(UPLOAD_DIR, url.slice("/uploads/".length));
  if (!full.startsWith(UPLOAD_DIR + path.sep)) return;
  await fs.unlink(full).catch(() => {});
}
