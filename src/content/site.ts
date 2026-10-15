/**
 * ALL WEBSITE TEXT LIVES IN THIS FILE.
 * Edit the values below and the whole site updates.
 *
 * Images: put photos in /public/images/... and write the path, e.g. "/images/programs/2019-nallur.jpg".
 * Leave an image as "" to show the drum-pattern placeholder.
 */

export const site = {
  schoolName: "Nallai Kandan Kurukshetram",
  schoolNameTamil: "நல்லை கந்தன் குருஷேத்திரம்",
  guruName: "Sinniah Thurairajah",
  guruTitle: "Mridangam artist and teacher",
  location: "Jaffna, Sri Lanka",
  tagline:
    "Mridangam performance and teaching rooted in the Carnatic tradition of Jaffna.",
  // Show the admin (lock) icon in the menu. Set to false once the site is finished;
  // the admin page will still be at yoursite.com/admin.
  showAdminLink: true,
  // Background mridangam rhythm. true = starts on the visitor's first click or tap
  // (browsers don't allow sound before that). Visitors can mute it with the speaker button.
  rhythmOnByDefault: true,
  // His full mridangam recording (12 min 50 s), streamed and repeated when it ends.
  // The highlight follows the beat times in src/content/rhythm-beats.json.
  // Leave "" to use the built-in synthesised mridangam instead.
  rhythmAudio: "/audio/mridangam-full.mp3",
  // Volume of the background rhythm, from 0 (silent) to 1 (full).
  rhythmVolume: 0.5,
  // Which beat of the recording is the first beat (sama) of the cycle, 0–7.
  // If "ta" lights up on the wrong stroke, change this number by 1 at a time.
  rhythmFirstBeat: 0,
  // Hero portrait of the guru. Leave "" to show the drum head.
  portrait: "/images/guru/thurairajah.jpg",
  // Second portrait, used on the biography page.
  portraitBio: "/images/guru/thurairajah-2.jpg",

  contact: {
    // WhatsApp number in international format, digits only (94 = Sri Lanka). Example: "94771234567"
    whatsapp: "94774299724",
    phoneDisplay: "+94 77 429 9724",
    // Add an email address here, or leave "" to hide it.
    email: "",
    address: "28/16, Manaltharai Lane, Kantharmadam, Jaffna 40000, Sri Lanka",
    // Paste a Google Maps "Embed a map" src URL here, or leave "" to hide the map.
    mapEmbed:
      "https://www.google.com/maps?q=Manaltharai+Lane,+Kantharmadam,+Jaffna,+Sri+Lanka&output=embed",
    hours: "Monday to Saturday, 8:00 am – 7:00 pm (Sri Lanka time)",
    social: {
      // Leave "" to hide a link.
      youtube: "https://www.youtube.com/@nallaikuruksheththiram",
      facebook: "https://www.facebook.com/thurai.rasa.58",
    },
  },

  // Short facts shown on the home and biography pages.
  facts: [
    { value: "1,000+", label: "concerts and temple programmes" },
    { value: "40+", label: "years on stage" },
    { value: "4", label: "books published" },
    { value: "Hundreds", label: "of students taught" },
  ],
};

export const biography = {
  intro:
    "Born in Jaffna, he began learning the mridangam as a child under the guidance of local masters, accompanying temple festivals before he was a teenager. Over four decades he has played alongside vocalists, violinists and veena artists across Sri Lanka and abroad, and has trained generations of students in the guru–shishya tradition.",
  paragraphs: [
    "Replace this paragraph with the first part of his biography: his family, where he grew up, and how he first came to the instrument.",
    "Use this paragraph for his training: the gurus he studied under, the years of practice, and his arangetram.",
    "This paragraph can cover his performing life: notable concerts, the artists he has accompanied, and the festivals where he plays every year.",
    "Finish with his teaching: why he started the school, how he teaches, and what he hopes his students carry forward.",
  ],
  // A sequence of milestones, oldest first.
  timeline: [
    { year: "1975", text: "Begins mridangam lessons in Jaffna." },
    { year: "1984", text: "Arangetram (debut performance)." },
    { year: "1990", text: "Starts accompanying leading Carnatic vocalists." },
    { year: "1998", text: "Founds Nallai Kandan Kurukshetram." },
    { year: "2010", text: "Publishes his first mridangam lesson book." },
    { year: "2024", text: "Passes 1,000 concerts and temple programmes." },
  ],
  awards: [
    "Replace with an award or title, and the year received",
    "Another honour or recognition",
    "Another honour or recognition",
  ],
};

export type ProgramCategory = "Concert" | "Temple festival" | "Student recital" | "Abroad";

export const programs: {
  title: string;
  place: string;
  year: string;
  category: ProgramCategory;
  image: string;
}[] = [
  { title: "Nallur festival concert", place: "Nallur Kandaswamy Temple, Jaffna", year: "2024", category: "Temple festival", image: "" },
  { title: "Carnatic vocal concert accompaniment", place: "Jaffna Hindu College hall", year: "2024", category: "Concert", image: "" },
  { title: "Annual student recital", place: "Jaffna", year: "2023", category: "Student recital", image: "" },
  { title: "Thiruvaiyaru-style aradhana", place: "Vavuniya", year: "2023", category: "Concert", image: "" },
  { title: "Tamil cultural evening", place: "Toronto, Canada", year: "2022", category: "Abroad", image: "" },
  { title: "Navaratri concert series", place: "Colombo", year: "2022", category: "Concert", image: "" },
  { title: "Temple therthiruvizha", place: "Maviddapuram, Jaffna", year: "2021", category: "Temple festival", image: "" },
  { title: "Student arangetram", place: "Jaffna", year: "2020", category: "Student recital", image: "" },
  { title: "Music festival", place: "Chennai, India", year: "2019", category: "Abroad", image: "" },
];

export const books: {
  title: string;
  titleTamil?: string;
  year: string;
  pages?: string;
  language: string;
  description: string;
  cover: string;
}[] = [
  {
    title: "Mridangam Lessons, Part 1",
    titleTamil: "மிருதங்கப் பாடங்கள் – பகுதி 1",
    year: "2010",
    pages: "120 pages",
    language: "Tamil and English",
    description:
      "The first strokes, hand positions and the basic sollukattu, with exercises for each week of the first year.",
    cover: "",
  },
  {
    title: "Mridangam Lessons, Part 2",
    titleTamil: "மிருதங்கப் பாடங்கள் – பகுதி 2",
    year: "2014",
    pages: "160 pages",
    language: "Tamil and English",
    description:
      "Korvais, mohras and playing in the main talas, for students preparing to accompany songs.",
    cover: "",
  },
  {
    title: "The Rhythm of Nallur",
    year: "2018",
    language: "Tamil",
    description:
      "Notes on the percussion traditions of Jaffna's temple festivals, collected over forty years of playing at them.",
    cover: "",
  },
  {
    title: "My Life with the Mridangam",
    titleTamil: "என் மிருதங்க வாழ்க்கை",
    year: "2023",
    language: "Tamil",
    description: "His autobiography: growing up in Jaffna, his gurus, and a life on the concert stage.",
    cover: "",
  },
];

// Lessons are a real sequence, so they are shown in order.
export const lessons: { title: string; level: string; summary: string }[] = [
  { title: "Holding the instrument and the four basic strokes", level: "Beginner", summary: "Sitting posture, hand shape and the strokes ta, dhi, thom and nam." },
  { title: "Adi tala and the first sollukattu", level: "Beginner", summary: "Keeping the eight-beat cycle with the hand while speaking the syllables." },
  { title: "Speeds: first, second and third kalam", level: "Beginner", summary: "Playing the same pattern at double and quadruple speed without losing the tala." },
  { title: "Farans and simple patterns", level: "Intermediate", summary: "Combining strokes into short phrases that fit inside the cycle." },
  { title: "Korvais and mohras", level: "Intermediate", summary: "Composed endings that land precisely on the first beat." },
  { title: "Accompanying a song", level: "Advanced", summary: "Following the singer, leaving space, and choosing when to fill." },
  { title: "Tani avartanam", level: "Advanced", summary: "Building and performing a solo inside a concert." },
];

// Video references. Use the YouTube video id: the part after "v=" in the link.
export const videos: { title: string; youtubeId: string; note: string }[] = [
  { title: "தண்ணுமைப்பிரவாகம் – students of Nallai Kurukshetram", youtubeId: "i_eNZsBlrS4", note: "Student concert, 31 August" },
  { title: "Tani avartanam in Adi tala", youtubeId: "", note: "Concert recording" },
  { title: "Lesson: the four basic strokes", youtubeId: "", note: "Lesson video" },
  { title: "Korvai demonstration", youtubeId: "", note: "Lesson video" },
];

export const classes: {
  name: string;
  who: string;
  details: string[];
  fee: string;
}[] = [
  {
    name: "Private lessons",
    who: "One student, one guru",
    details: ["45 or 60 minute lessons", "Weekly or twice a week", "Any age, from 6 years"],
    fee: "Contact for fees",
  },
  {
    name: "Small group classes",
    who: "Up to 5 students",
    details: ["60 minute lessons", "Grouped by level", "Weekend batches"],
    fee: "Contact for fees",
  },
  {
    name: "Online lessons",
    who: "Students outside Sri Lanka",
    details: ["Over Zoom or WhatsApp video", "Times arranged across time zones", "Recorded practice notes"],
    fee: "Contact for fees",
  },
  {
    name: "Arangetram preparation",
    who: "Advanced students",
    details: ["Repertoire and tani avartanam", "Rehearsals with vocalist", "Stage guidance"],
    fee: "By arrangement",
  },
];

export const faqs: { q: string; a: string }[] = [
  { q: "Does my child need an instrument for the first lesson?", a: "No. Instruments are available at the school for the first months, and he can advise you on buying one." },
  { q: "What age can students start?", a: "Most students start between 6 and 10, but adults are welcome at any age." },
  { q: "Are exams offered?", a: "Students can be prepared for grade examinations. Ask about this when you book." },
  { q: "How do I book?", a: "Fill in the form on the classes page. It opens WhatsApp with your details, and he will reply to confirm a time." },
];
