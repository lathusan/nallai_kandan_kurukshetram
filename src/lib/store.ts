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
import { promises as fs, constants as fsConstants } from "fs";
import path from "path";
import crypto from "crypto";
import { programs as samplePrograms, books as sampleBooks, videos as sampleVideos, studentArangetrams } from "@/content/site";
import { programsTa, booksTa, videosTa } from "@/content/site.ta";

export const STORAGE_DIR = path.join(process.cwd(), "storage");
const CONTENT_FILE = path.join(STORAGE_DIR, "content.json");

// Fields ending in "Ta" hold the Tamil version (optional; English is shown if empty).
export type Post = {
  id: string;
  title: string;
  titleTa?: string;
  body: string;
  bodyTa?: string;
  date: string; // YYYY-MM-DD
  image: string;
  pinned: boolean;
};

export type Program = {
  id: string;
  title: string;
  titleTa?: string;
  place: string;
  placeTa?: string;
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
  languageTa?: string;
  pagesTa?: string;
  description: string;
  descriptionTa?: string;
  cover: string;
  backCover?: string;
  pdf: string;
  available?: boolean; // can be ordered (missing = yes)
};

export type LessonFile = {
  id: string;
  title: string;
  titleTa?: string;
  level: string;
  description: string;
  descriptionTa?: string;
  file: string;
};

export type Video = {
  id: string;
  title: string;
  titleTa?: string;
  youtubeId: string;
  note: string;
  noteTa?: string;
};

export type Arangetram = {
  id: string;
  student: string;
  studentTa?: string;
  date: string;
  place: string;
  placeTa?: string;
  image: string;
  image2?: string;
};

export type Content = {
  posts: Post[];
  programs: Program[];
  arangetrams: Arangetram[];
  books: Book[];
  lessonFiles: LessonFile[];
  videos: Video[];
};

export const COLLECTIONS = ["posts", "programs", "arangetrams", "books", "lessonFiles", "videos"] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export const newId = () => crypto.randomBytes(6).toString("hex");

function seed(): Content {
  return {
    posts: [
      {
        id: newId(),
        title: "New mridangam classes begin on Vijayadashami",
        titleTa: "விஜய தசமி அன்று புதிய மிருதங்க வகுப்புகள்",
        body: "New mridangam classes will begin at Nallai Kurukshetram on Vijayadashami, Tuesday 20 October 2026, at 2.00 pm.\n\nFor details: 28/16 Manaltharai Lane (Sami Amma Lane), Kantharmadam, Jaffna. Phone: 077 429 9724.\n\nThank you.",
        bodyTa: "நல்லை குருஷேத்திரத்தில் 20/10/2026 செவ்வாய்க்கிழமை விஜய தசமி அன்று பிற்பகல் 2.00 மணிக்குப் புதிய மிருதங்க நாள் வகுப்புகள் நடைபெறும்.\n\n(தொடர்புகளிற்கு – 28/16 மணல் தரை ஒழுங்கை (சாமி அம்மா ஒழுங்கை), கந்தர்மடம், யாழ்ப்பாணம். தொலைபேசி எண்: 0774299724)\n\nநன்றி.",
        date: "2026-10-16",
        image: "/images/posts/saraswathy.jpg",
        pinned: true,
      },
      {
        id: newId(),
        title: "Welcome to our new website",
        titleTa: "எமது புதிய இணையதளத்துக்கு வரவேற்கிறோம்",
        body: "Class times, programmes and lesson notes will be posted here. Message us on WhatsApp to book a class.",
        bodyTa: "வகுப்பு நேரங்கள், நிகழ்ச்சிகள், பாடக் குறிப்புகள் இங்கே வெளியிடப்படும். வகுப்புக்குப் பதிவுசெய்ய WhatsApp-இல் தொடர்புகொள்ளுங்கள்.",
        date: new Date().toISOString().slice(0, 10),
        image: "",
        pinned: false,
      },
    ],
    programs: samplePrograms.map((p, i) => ({ id: newId(), ...p, ...programsTa[i], link: "" })),
    arangetrams: sampleArangetrams(),
    books: sampleBooks.map((b, i) => ({
      id: newId(),
      title: b.title,
      year: b.year,
      pages: b.pages ?? "",
      language: b.language,
      description: b.description,
      cover: b.cover,
      backCover: b.backCover ?? "",
      pdf: "",
      available: b.available !== false,
      ...booksTa[i],
    })),
    lessonFiles: [],
    videos: sampleVideos.map((v, i) => ({ id: newId(), ...v, ...videosTa[i] })),
  };
}

// The same ids every time, so the list can be edited before it is first saved.
let arangetramSeed: Arangetram[] | null = null;
const sampleArangetrams = () =>
  (arangetramSeed ??= studentArangetrams.map((a) => ({ id: newId(), image2: "", ...a }))).map((a) => ({ ...a }));

/** Newest first; arangetrams without a date go last. */
export function sortArangetrams(list: Arangetram[]) {
  return [...list].sort((a, b) => (b.date || "0").localeCompare(a.date || "0"));
}

// When the host has no disk the site can use (e.g. Cloudflare Workers), the site
// shows the built-in content and the admin page can't save. Kept in memory so the
// same ids are used while this server instance runs.
let fallback: Content | null = null;
let readOnly = false;
const builtIn = () => (fallback ??= seed());

/** False when this host can't save files (admin changes are then disabled). */
export async function canSave() {
  if (readOnly) return false;
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    await fs.access(STORAGE_DIR, fsConstants.W_OK);
    return true;
  } catch {
    readOnly = true;
    return false;
  }
}

export async function readContent(): Promise<Content> {
  let raw: string;
  try {
    raw = await fs.readFile(CONTENT_FILE, "utf8");
  } catch {
    // No saved content yet (first run), or no disk at all.
    const data = builtIn();
    try {
      await writeContent(data);
    } catch {
      readOnly = true;
    }
    return data;
  }
  const data = JSON.parse(raw) as Partial<Content>;
  // make sure every list exists, even if the file is from an older version
  return addSampleTamil({
    posts: data.posts ?? [],
    programs: data.programs ?? [],
    // saved before this section existed: start with the built-in list
    arangetrams: data.arangetrams ?? sampleArangetrams(),
    books: data.books ?? [],
    lessonFiles: data.lessonFiles ?? [],
    videos: data.videos ?? [],
  });
}

/**
 * Content saved before the site had Tamil: give the sample items their Tamil text.
 * Only fills empty Tamil fields on items whose English title still matches a sample.
 */
function addSampleTamil(c: Content): Content {
  const fill = <T extends object>(item: T, extra: object) => {
    const rec = item as Record<string, unknown>;
    for (const [k, v] of Object.entries(extra)) if (!rec[k]) rec[k] = v;
  };
  const seedPost = seed().posts[0];
  for (const p of c.posts) if (p.title === seedPost.title) fill(p, { titleTa: seedPost.titleTa, bodyTa: seedPost.bodyTa });
  samplePrograms.forEach((sp, i) => c.programs.filter((p) => p.title === sp.title).forEach((p) => fill(p, programsTa[i])));
  sampleBooks.forEach((sb, i) => c.books.filter((b) => b.title === sb.title).forEach((b) => fill(b, booksTa[i])));
  sampleVideos.forEach((sv, i) => c.videos.filter((v) => v.title === sv.title).forEach((v) => fill(v, videosTa[i])));
  return c;
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
