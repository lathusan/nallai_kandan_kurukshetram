// Serves files uploaded from the admin page (photos and PDFs).
import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/uploads";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const full = path.resolve(UPLOAD_DIR, ...parts);
  const type = TYPES[path.extname(full).toLowerCase()];
  if (!type || !full.startsWith(UPLOAD_DIR + path.sep)) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(full);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        "Content-Length": String(data.length),
        // file names are unique, so browsers can keep them for a long time
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        ...(type === "application/pdf" ? { "Content-Disposition": `inline; filename="${path.basename(full)}"` } : {}),
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
