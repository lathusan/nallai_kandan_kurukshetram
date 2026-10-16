# Nallai Kurukshetram — website

நல்லை குருஷேத்திரம்

A Next.js website for a mridangam artist and teacher: biography, programme photos,
books, lessons and videos, classes with WhatsApp booking, and contact details.
It works on phones, tablets and computers.

## Run it on your computer

1. Install Node.js (version 20 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:

   ```
   npm install
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

## Languages (Tamil and English)

The site opens in **Tamil**. Visitors switch with the **English / தமிழ்** button in the
menu, and the site remembers their choice.

- English text: `src/content/site.ts`
- Tamil text: `src/content/site.ta.ts` (same items, same order)
- Menu, button and heading wording in both languages: `src/content/ui.ts`
- In the admin page, each item has a Tamil field next to the English one. If the Tamil
  field is left empty, the English text is shown in both languages.

## Change the text

Almost everything is in **`src/content/site.ts`**:

| What | Where in `site.ts` |
|---|---|
| Your father's name, school name, tagline | `site` (top of the file) |
| WhatsApp number, phone, email, address, map | `site.contact` |
| Biography, milestones, honours | `biography` |
| Programme photos | `programs` |
| Books | `books` |
| Lesson path | `lessons` |
| YouTube videos | `videos` |
| Classes and fees | `classes` |
| Questions and answers | `faqs` |

**WhatsApp number:** write it with the country code and no `+` or spaces,
e.g. Sri Lanka `077 123 4567` becomes `"94771234567"`.

## Add photos

1. Copy photos into `public/images/` (folders for `programs`, `books` and `guru` are ready).
2. In `site.ts`, set the path, e.g.

   ```ts
   { title: "Nallur festival concert", ..., image: "/images/programs/nallur-2024.jpg" }
   ```

   For the portrait on the home and biography pages, set `portrait: "/images/guru/portrait.jpg"`.
   For book covers, set `cover: "/images/books/part-1.jpg"`.

Anything left as `""` shows a drum-pattern placeholder (or a typeset cover for books).
JPG photos around 1600px wide are ideal.

## Add videos

Upload to YouTube, then copy the id from the link
(`https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`**) into `youtubeId`.

## How booking works

The form on the Classes page builds a message with the student's details and opens WhatsApp
to your number. The visitor presses send in WhatsApp; nothing is stored on the website.

## Admin page (posts, photos, PDFs, videos)

Open **/admin** (or click the lock icon in the menu) and log in.

- Username: `admin`
- Password: `password`

**Change these before the site goes online.** Create a file called `.env.local` in this folder:

```
ADMIN_USERNAME=choose-a-username
ADMIN_PASSWORD=choose-a-long-password
ADMIN_SECRET=any-long-random-text
```

then restart the site.

From the admin page you can add, edit and delete:

| Section | Shows on |
|---|---|
| Posts (class openings, yearly programme, notices) | Home page and /news |
| Programmes (photo, place, year, link) | /programs and the home page |
| Books (cover photo, details, optional PDF) | /library and the home page |
| Lesson PDFs | /lessons |
| Videos (paste a YouTube link) | /lessons |

Everything you add is saved in the `storage` folder (`storage/content.json` and
`storage/uploads`). **Back up the `storage` folder** — it is your content.

To hide the lock icon once the site is finished, set `showAdminLink: false` in
`src/content/site.ts`. The admin page still works at yoursite.com/admin.

## Put it online

Because the admin page saves files to the `storage` folder, the site needs a host
where it can keep files: a VPS or any Node.js hosting (run `npm run build` then
`npm start`, and keep the `storage` folder between updates).

Vercel's free hosting can't keep uploaded files. To use Vercel, the storage would
need to move to a database and file store (for example Vercel Blob) first.

Static-only option (no admin page) on Vercel:

1. Put this folder in a GitHub repository.
2. Sign in at https://vercel.com with GitHub, choose **Add New → Project**, pick the repository and press **Deploy**.
3. Add your own domain (e.g. `nallaikandan.lk`) under **Settings → Domains**.

## Pages

- `/` home
- `/about` biography
- `/programs` programme photo gallery with filters
- `/library` books
- `/lessons` lesson path and videos
- `/classes` classes and booking form
- `/contact` contact details and map
