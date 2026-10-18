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
  defaultOn?: boolean; // checkbox ticked when adding a new item
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

export const SCHEMA: Record<"posts" | "programs" | "arangetrams" | "books" | "lessonFiles" | "videos", CollectionDef> = {
  posts: {
    label: "Posts",
    singular: "post",
    folder: "posts",
    titleField: "title",
    subtitle: (i) => `${i.date}${i.pinned ? " · pinned" : ""}`,
    fields: [
      { name: "titleTa", label: "Title in Tamil (தலைப்பு)", type: "text", hint: "Shown when the site is in Tamil. For example: நவராத்திரி வகுப்புகள் ஒக்டோபர் 3 முதல்" },
      { name: "title", label: "Title in English", type: "text", required: true, hint: "For example: Navarathri classes start on 3 October" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "bodyTa", label: "Message in Tamil (செய்தி)", type: "textarea" },
      { name: "body", label: "Message in English", type: "textarea", required: true },
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
      { name: "titleTa", label: "Programme name in Tamil (நிகழ்ச்சியின் பெயர்)", type: "text" },
      { name: "title", label: "Programme name in English", type: "text", required: true },
      { name: "placeTa", label: "Place in Tamil (இடம்)", type: "text" },
      { name: "place", label: "Place in English", type: "text", required: true },
      { name: "year", label: "Year", type: "text", required: true, hint: "For example: 2024" },
      { name: "category", label: "Type", type: "select", options: PROGRAM_CATEGORIES, required: true },
      { name: "image", label: "Photo", type: "image" },
      { name: "link", label: "Link (optional)", type: "url", hint: "A YouTube video, Facebook post or news article about this programme" },
    ],
  },
  arangetrams: {
    label: "Student arangetrams",
    singular: "arangetram",
    folder: "arangetrams",
    titleField: "student",
    subtitle: (i) => String(i.date || "date not known"),
    fields: [
      { name: "studentTa", label: "Student's name in Tamil (மாணவர் பெயர்)", type: "text", hint: "For example: தர்மலிங்கம் அமலன்" },
      { name: "student", label: "Student's name in English", type: "text", required: true, hint: "For example: Tharmalingam Amalan" },
      { name: "date", label: "Date of the arangetram", type: "date", hint: "Leave empty if not known" },
      { name: "placeTa", label: "Place in Tamil (இடம்)", type: "text" },
      { name: "place", label: "Place in English", type: "text" },
      { name: "image", label: "Photo or invitation", type: "image", required: true },
      { name: "image2", label: "Second photo (optional)", type: "image" },
    ],
  },
  books: {
    label: "Books",
    singular: "book",
    folder: "books",
    titleField: "title",
    subtitle: (i) => `${i.year}${i.language ? ", " + i.language : ""}`,
    fields: [
      { name: "titleTamil", label: "Title in Tamil (நூலின் பெயர்)", type: "text" },
      { name: "title", label: "Title in English", type: "text", required: true },
      { name: "year", label: "Year published (optional)", type: "text" },
      { name: "languageTa", label: "Language, in Tamil (மொழி)", type: "text", hint: "For example: தமிழ் மற்றும் ஆங்கிலம்" },
      { name: "language", label: "Language, in English", type: "text", hint: "For example: Tamil and English" },
      { name: "pagesTa", label: "Pages, in Tamil (optional)", type: "text", hint: "For example: 120 பக்கங்கள்" },
      { name: "pages", label: "Pages, in English (optional)", type: "text", hint: "For example: 120 pages" },
      { name: "descriptionTa", label: "About the book, in Tamil (நூல் பற்றி)", type: "textarea" },
      { name: "description", label: "About the book, in English", type: "textarea", required: true },
      { name: "available", label: "Available to order (shows an order button)", type: "checkbox", defaultOn: true },
      { name: "cover", label: "Front cover photo", type: "image" },
      { name: "backCover", label: "Back cover photo (optional)", type: "image" },
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
      { name: "titleTa", label: "Lesson title in Tamil (பாடத்தின் பெயர்)", type: "text" },
      { name: "title", label: "Lesson title in English", type: "text", required: true },
      { name: "level", label: "Level", type: "select", options: LESSON_LEVELS, required: true },
      { name: "descriptionTa", label: "Short description in Tamil (optional)", type: "textarea" },
      { name: "description", label: "Short description in English (optional)", type: "textarea" },
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
      { name: "titleTa", label: "Video title in Tamil (தலைப்பு)", type: "text" },
      { name: "title", label: "Video title in English", type: "text", required: true },
      { name: "youtubeId", label: "YouTube link", type: "youtube", required: true, hint: "Paste the link from YouTube's Share button" },
      { name: "noteTa", label: "Short note in Tamil (optional)", type: "text", hint: "For example: கச்சேரிப் பதிவு" },
      { name: "note", label: "Short note in English (optional)", type: "text", hint: "For example: Concert recording, Lesson video" },
    ],
  },
};
