/**
 * What can be edited in the admin page, and how each form looks.
 * Shared by the admin forms (browser) and the save handler (server).
 */

export type FieldType = "text" | "textarea" | "date" | "checkbox" | "select" | "image" | "pdf" | "youtube" | "url";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  hint?: string;
};

export type CollectionDef = {
  label: string; // tab name
  singular: string; // "post", "programme" …
  folder: string; // upload folder
  titleField: string;
  subtitle: (item: Record<string, unknown>) => string;
  fields: Field[];
};

export const PROGRAM_CATEGORIES = ["Concert", "Temple festival", "Student recital", "Abroad", "Workshop", "Other"];
export const LESSON_LEVELS = ["Beginner", "Intermediate", "Advanced", "All levels"];

export const SCHEMA: Record<"posts" | "programs" | "books" | "lessonFiles" | "videos", CollectionDef> = {
  posts: {
    label: "Posts",
    singular: "post",
    folder: "posts",
    titleField: "title",
    subtitle: (i) => `${i.date}${i.pinned ? " · pinned" : ""}`,
    fields: [
      { name: "title", label: "Title", type: "text", required: true, hint: "For example: Navarathri classes start on 3 October" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "body", label: "Message", type: "textarea", required: true },
      { name: "image", label: "Photo or poster (optional)", type: "image" },
      { name: "pinned", label: "Keep at the top of the list", type: "checkbox" },
    ],
  },
  programs: {
    label: "Programmes",
    singular: "programme",
    folder: "programs",
    titleField: "title",
    subtitle: (i) => `${i.place}, ${i.year}`,
    fields: [
      { name: "title", label: "Programme name", type: "text", required: true },
      { name: "place", label: "Place", type: "text", required: true },
      { name: "year", label: "Year", type: "text", required: true, hint: "For example: 2024" },
      { name: "category", label: "Type", type: "select", options: PROGRAM_CATEGORIES, required: true },
      { name: "image", label: "Photo", type: "image" },
      { name: "link", label: "Link (optional)", type: "url", hint: "A YouTube video, Facebook post or news article about this programme" },
    ],
  },
  books: {
    label: "Books",
    singular: "book",
    folder: "books",
    titleField: "title",
    subtitle: (i) => `${i.year}${i.language ? ", " + i.language : ""}`,
    fields: [
      { name: "title", label: "Title (English)", type: "text", required: true },
      { name: "titleTamil", label: "Title (Tamil, optional)", type: "text" },
      { name: "year", label: "Year published", type: "text", required: true },
      { name: "language", label: "Language", type: "text", hint: "For example: Tamil and English" },
      { name: "pages", label: "Pages (optional)", type: "text", hint: "For example: 120 pages" },
      { name: "description", label: "About the book", type: "textarea", required: true },
      { name: "cover", label: "Cover photo", type: "image" },
      { name: "pdf", label: "PDF to download (optional)", type: "pdf", hint: "Only add this if the book should be free to download" },
    ],
  },
  lessonFiles: {
    label: "Lesson PDFs",
    singular: "lesson",
    folder: "lessons",
    titleField: "title",
    subtitle: (i) => String(i.level ?? ""),
    fields: [
      { name: "title", label: "Lesson title", type: "text", required: true },
      { name: "level", label: "Level", type: "select", options: LESSON_LEVELS, required: true },
      { name: "description", label: "Short description (optional)", type: "textarea" },
      { name: "file", label: "Lesson PDF", type: "pdf", required: true },
    ],
  },
  videos: {
    label: "Videos",
    singular: "video",
    folder: "videos",
    titleField: "title",
    subtitle: (i) => String(i.note ?? ""),
    fields: [
      { name: "title", label: "Video title", type: "text", required: true },
      { name: "youtubeId", label: "YouTube link", type: "youtube", required: true, hint: "Paste the link from YouTube's Share button" },
      { name: "note", label: "Short note (optional)", type: "text", hint: "For example: Concert recording, Lesson video" },
    ],
  },
};
