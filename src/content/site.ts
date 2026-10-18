/**
 * ALL WEBSITE TEXT LIVES IN THIS FILE.
 * Edit the values below and the whole site updates.
 *
 * Images: put photos in /public/images/... and write the path, e.g. "/images/programs/2019-nallur.jpg".
 * Leave an image as "" to show the drum-pattern placeholder.
 */

export const site = {
  schoolName: "Nallai Kurukshetram",
  schoolNameTamil: "நல்லை குருஷேத்திரம்",
  guruName: "Sinniah Thurairajah",
  guruTitle: "Mridangam artist and teacher",
  location: "Jaffna, Sri Lanka",
  tagline:
    "Mridangam performance and teaching rooted in the Carnatic tradition of Jaffna.",
  // Show the admin (lock) icon in the menu. Set to false once the site is finished;
  // the admin page will still be at yoursite.com/admin.
  showAdminLink: false,
  // The "Concerts and other programmes" gallery on the programmes page (and on the home page).
  // false = hidden for now; set to true once real programme photos are added.
  showOtherProgrammes: false,
  // Website credit in the footer
  developer: { name: "Codearson", url: "https://codearson.com" },
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
    { value: "46", label: "years of musical journey" },
    { value: "5,500+", label: "students trained" },
    { value: "25+", label: "arangetrams accompanied" },
    { value: "610+", label: "Kalavithagars accompanied" },
    // Shown on the biography page only (the home page shows the first four)
    { value: "100+", label: "dance arangetrams as principal accompanist" },
  ],
};

export const biography = {
  intro:
    "Sinniah Thurairajah has spent 46 years on a musical journey with the mridangam. In that time he has trained more than 5,500 students, accompanied well over a hundred arangetrams, and served the North Ceylon Oriental Music Society (NCOMS) as chief examiner since 1991.",
  paragraphs: [
    "He served for some years as an assistant lecturer and as a music teacher in schools, retiring after completing his service.",
    "He is a life member of the North Ceylon Oriental Music Society (NCOMS), has served on its committee, and was its treasurer for three years. Since 1991 he has been chief examiner for its Grade 1 to Grade 6 examinations.",
    "In NCOMS teacher-grade dance performances he has accompanied more than 610 Kalavithagars on the mridangam. He has played for more than 25 violin, veena and vocal arangetrams, and has been the principal accompanist for more than a hundred dance arangetrams. His mridangam can also be heard on more than 25 recordings made for Tamil temples in Sri Lanka.",
    "He has accompanied many singers from India. Notable among these are his performances with Muthu Kandasamy Desikar, and the three years in which he accompanied singers visiting from India at the Vallalar Kalaiyarangam in Jaffna.",
    "He has presented more than 12 of his own students in their mridangam arangetrams; these students now live in India, London and Australia. Every year at Thannumai Pravaagam, the annual event of Nallai Kurukshetram, he brings 60 to 70 students to the stage. Over his 46-year journey with the mridangam he has trained more than 5,500 students.",
  ],
  // Highlights: a number and what it stands for.
  highlights: [
    { value: "1991", text: "Chief examiner for NCOMS Grade 1–6 examinations, from 1991 to today." },
    { value: "610+", text: "Kalavithagars accompanied on the mridangam in NCOMS teacher-grade dance performances." },
    { value: "25+", text: "Violin, veena and vocal arangetrams accompanied." },
    { value: "100+", text: "Dance arangetrams as principal accompanist." },
    { value: "12+", text: "Students presented in their own mridangam arangetrams, now in India, London and Australia." },
    { value: "25+", text: "Temple recordings from Sri Lanka featuring his mridangam." },
    { value: "60–70", text: "Students brought to the stage every year at Thannumai Pravaagam." },
  ],
  // Positions he has held.
  positions: [
    "Life member, NCOMS",
    "Committee member, NCOMS",
    "Treasurer, NCOMS (three years)",
    "Chief examiner, Grade 1–6 examinations (1991 to today)",
    "Assistant lecturer and school music teacher (retired)",
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
  backCover?: string;
  available?: boolean; // false = shown as "not available at present"
}[] = [
  {
    title: "Pallavi Maalai",
    titleTamil: "பல்லவி மாலை",
    year: "",
    language: "Tamil",
    description:
      "The structures of 27 pallavis, written out with their swara, sahitya and jathi patterns in all three speeds and in tisra.",
    cover: "/images/books/pallavi-maalai-front.jpg",
    backCover: "/images/books/pallavi-maalai-back.jpg",
  },
  {
    title: "Alarippu",
    titleTamil: "அலாரிப்பு",
    year: "",
    language: "Tamil",
    description:
      "Drawing on the whole system of talas (the seven talas, the 35 talas, 54 rare talas, the 108 talas and the chapu talas), he chose 50 talas and set the alarippu dance form in each of them, in three speeds.",
    cover: "/images/books/alarippu-front.jpg",
    backCover: "/images/books/alarippu-back.jpg",
  },
  {
    title: "Grade 1 and 2 lessons (recordings)",
    titleTamil: "தரம் 1, 2 பாடங்கள் (ஒலிப்பதிவுகள்)",
    year: "",
    language: "Tamil",
    available: false,
    description:
      "For NCOMS Grade 1 and 2 examinations: practical explanations of each lesson, the lessons recited aloud, and the same lessons played on the mridangam.",
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
  { title: "Thannumai Pravaagam – students of Nallai Kurukshetram", youtubeId: "i_eNZsBlrS4", note: "Annual student concert, 31 August" },
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
  { q: "Are exams offered?", a: "Yes. He prepares students for the NCOMS grade examinations, for which he has been chief examiner (Grades 1–6) since 1991. Ask about this when you book." },
  { q: "How do I book?", a: "Fill in the form on the classes page. It opens WhatsApp with your details, and he will reply to confirm a time." },
];

// Mridangam arangetrams of his own students. Newest first on the page (sorted by date).
// date: "YYYY-MM-DD", or "" if not known. Photos go in /public/images/arangetrams/.
export const studentArangetrams: {
  student: string;
  studentTa: string;
  date: string;
  place: string;
  placeTa: string;
  image: string;
  image2?: string;
}[] = [
  {
    student: "Tharmalingam Amalan",
    studentTa: "தர்மலிங்கம் அமலன்",
    date: "2023-06-03",
    place: "Ilangai Vendhan Kalai Kalloori, Neeraviyadi, Jaffna",
    placeTa: "இலங்கை வேந்தன் கலைக்கல்லூரி, நீராவியடி, யாழ்ப்பாணம்",
    image: "/images/arangetrams/amalan-1.jpg",
  },
  {
    student: "Thivakarakkurukkal Jeyakeetha Sarma",
    studentTa: "திவாகரக்குருக்கள் ஜெயகீத சர்மா",
    date: "2023-03-12",
    place: "Ilangai Vendhan Kalai Kalloori, Neeraviyadi, Jaffna",
    placeTa: "இலங்கை வேந்தன் கலைக்கல்லூரி, நீராவியடி, யாழ்ப்பாணம்",
    image: "/images/arangetrams/jeyakeetha-1.jpg",
  },
  {
    student: "Thilakshana Ravindran",
    studentTa: "திலக்ஷனா ரவீந்திரன்",
    date: "2019-06-30",
    place: "Presented by Nallai Kurukshetram",
    placeTa: "நல்லை குருஷேத்திரம் வழங்கிய அரங்கேற்றம்",
    image: "/images/arangetrams/thilakshana-1.jpg",
  },
  {
    student: "Kalavithagar Tharmarajah Thuvaragan",
    studentTa: "கலாவித்தகர் தருமராஜா துவாரகன்",
    date: "2016-02-28",
    place: "Veerasingam Hall, Jaffna",
    placeTa: "வீரசிங்கம் மண்டபம், யாழ்ப்பாணம்",
    image: "/images/arangetrams/thuvaragan-1.jpg",
    image2: "/images/arangetrams/thuvaragan-2.jpg",
  },
  {
    student: "Jegathas Lehinaswin Senthi",
    studentTa: "ஜெகதாஸ் லெஹினஸ்வின்சேந்தி",
    date: "",
    place: "Student of Sri Akilandeswari Arulaga Fine Arts College",
    placeTa: "ஸ்ரீ அகிலாண்டேஸ்வரி அருளக நுண்கலைக்கல்லூரி மாணவன்",
    image: "/images/arangetrams/jegathas-1.jpg",
    image2: "/images/arangetrams/jegathas-2.jpg",
  },
];
