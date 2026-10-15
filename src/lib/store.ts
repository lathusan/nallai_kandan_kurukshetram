/**
 * Content managed from the admin page (posts, programmes, books, lesson PDFs, videos).
 *
 * Saved as JSON in /storage/content.json, with uploaded files in /storage/uploads.
 * The first time the site runs, the file is created from the sample content in
 * src/content/site.ts.
 *
 * Works when the site runs on your own computer or server (npm run dev / npm start).
 * Hosts with read-only disks (e.g. Vercel) need a database/file store instead — see README.
 */
import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { programs as samplePrograms, books as sampleBooks, videos as sampleVideos } from "@/content/site";

export const STORAGE_DIR = path.join(process.cwd(), "storage");
const CONTENT_FILE = path.join(STORAGE_DIR, "content.json");

export type Post = {
  id: string;
  title: string;
  body: string;
  date: string; // YYYY-MM-DD
  image: string;
  pinned: boolean;
};

export type Program = {
  id: string;
  title: string;
  place: string;
  year: string;
  category: string;
  image: string;
  link: string;
};

export type Book = {
  id: string;
  title: string;
  titleTamil: string;
  year: string;
  pages: string;
  language: string;
  description: string;
  cover: string;
  pdf: string;
};

export type LessonFile = {
  id: string;
  title: string;
  level: string;
  description: string;
  file: string;
};

export type Video = {
  id: string;
  title: string;
  youtubeId: string;
  note: string;
};

export type Content = {
  posts: Post[];
  programs: Program[];
  books: Book[];
  lessonFiles: LessonFile[];
  videos: Video[];
};

export const COLLECTIONS = ["posts", "programs", "books", "lessonFiles", "videos"] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export const newId = () => crypto.randomBytes(6).toString("hex");

function seed(): Content {
  return {
    posts: [
      {
        id: newId(),
        title: "Welcome to our new website",
        body: "Class times, programmes and lesson notes will be posted here. Message us on WhatsApp to book a class.",
        date: new Date().toISOString().slice(0, 10),
        image: "",
        pinned: false,
      },
    ],
    programs: samplePrograms.map((p) => ({ id: newId(), ...p, link: "" })),
    books: sampleBooks.map((b) => ({
      id: newId(),
      title: b.title,
      titleTamil: b.titleTamil ?? "",
      year: b.year,
      pages: b.pages ?? "",
      language: b.language,
      description: b.description,
      cover: b.cover,
      pdf: "",
    })),
    lessonFiles: [],
    videos: sampleVideos.map((v) => ({ id: newId(), ...v })),
  };
}

export async function readContent(): Promise<Content> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const data = JSON.parse(raw) as Partial<Content>;
    // make sure every list exists, even if the file is from an older version
    return {
      posts: data.posts ?? [],
      programs: data.programs ?? [],
      books: data.books ?? [],
      lessonFiles: data.lessonFiles ?? [],
      videos: data.videos ?? [],
    };
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    const data = seed();
    await writeContent(data);
    return data;
  }
}

// Writes go one at a time, to a temporary file first, so the file is never half-written.
let queue: Promise<unknown> = Promise.resolve();
export function writeContent(data: Content) {
  const run = async () => {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    const tmp = CONTENT_FILE + "." + newId() + ".tmp";
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
    await fs.rename(tmp, CONTENT_FILE);
  };
  const next = queue.then(run, run);
  queue = next.catch(() => {});
  return next;
}

/** Read, change and save in one step. */
export async function updateContent(change: (c: Content) => void | Promise<void>) {
  let result: Content | undefined;
  const run = async () => {
    const c = await readContent();
    await change(c);
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    const tmp = CONTENT_FILE + "." + newId() + ".tmp";
    await fs.writeFile(tmp, JSON.stringify(c, null, 2), "utf8");
    await fs.rename(tmp, CONTENT_FILE);
    result = c;
  };
  const next = queue.then(run, run);
  queue = next.catch(() => {});
  await next;
  return result!;
}

/** Newest first, pinned posts on top. */
export function sortPosts(posts: Post[]) {
  return [...posts].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date));
}

/** Accepts a YouTube link or a bare id and returns the 11-character id, or "". */
export function youtubeIdFrom(input: string) {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname.endsWith("youtu.be")) return u.pathname.slice(1, 12);
    const v = u.searchParams.get("v");
    if (v) return v.slice(0, 11);
    const m = u.pathname.match(/\/(?:shorts|live|embed)\/([\w-]{11})/);
    if (m) return m[1];
  } catch {}
  return "";
}
