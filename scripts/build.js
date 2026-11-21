#!/usr/bin/env node
// Builds the site into ./public from index.template.html and the files in ./content.
// The content files are edited through the admin page at /admin (Decap CMS), so this
// script is what turns those edits into the finished page. If a content file is
// invalid it throws, which makes Vercel keep serving the previous good version.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public");

let sharp = null;
try { sharp = require("sharp"); } catch (e) { console.warn("sharp is not installed; photos will be used as uploaded."); }

const readJSON = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hashOf = (file) => crypto.createHash("md5").update(fs.readFileSync(path.join(ROOT, file))).digest("hex").slice(0, 8);
const cleanPath = (p) => String(p || "").replace(/^\/+/, "");

// ---------- videos ----------
function youtubeId(url) {
  const s = String(url || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = /(?:[?&]v=|youtu\.be\/|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/.exec(s);
  return m ? m[1] : null;
}
const embedUrl = (id) => "https://www.youtube.com/embed/" + id + "?rel=0&cc_load_policy=0";

// ---------- songs ----------
const GENRES = ["top40", "dance", "soul", "rock", "latin", "folk"];
const sortKey = (s) => String(s || "").replace(/^the\s+/i, "").toLowerCase();

// ---------- photos ----------
async function preparePhoto(rel, maxWidth) {
  const src = cleanPath(rel);
  const abs = path.join(ROOT, src);
  if (!src || !fs.existsSync(abs)) {
    console.warn("Photo not found: " + rel);
    return { src, width: null, height: null };
  }
  if (!sharp || !/\.(jpe?g|png|webp)$/i.test(src)) return { src, width: null, height: null };
  try {
    const meta = await sharp(abs).rotate().metadata();
    const size = fs.statSync(abs).size;
    if (meta.width <= maxWidth && size <= 700 * 1024 && (meta.orientation || 1) === 1) {
      return { src, width: meta.width, height: meta.height };
    }
    const id = crypto.createHash("md5").update(fs.readFileSync(abs)).digest("hex").slice(0, 8);
    const name = path.basename(src).replace(/\.[^.]+$/, "") + "-" + id + ".jpg";
    const outDir = path.join(OUT, "assets", "optimized");
    fs.mkdirSync(outDir, { recursive: true });
    const info = await sharp(abs).rotate().resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(path.join(outDir, name));
    console.log("Resized " + src + " -> assets/optimized/" + name + " (" + Math.round(info.size / 1024) + " KB)");
    return { src: "assets/optimized/" + name, width: info.width, height: info.height };
  } catch (e) {
    console.warn("Could not resize " + src + ": " + e.message);
    return { src, width: null, height: null };
  }
}

// ---------- reviews ----------
const STARS = [0, 1, 2, 3, 4].map((i) => '<span style="--i:' + i + '">★</span>').join("");
function reviewHtml(r, i) {
  return [
    '      <div class="tilt-wrap reveal" style="--d:' + (i % 3) + '">',
    '      <figure class="testimonial-card">',
    '        <div class="stars" role="img" aria-label="5 out of 5 stars">' + STARS + "</div>",
    "        <blockquote>“" + esc(r.quote).replace(/&quot;/g, '"') + "”</blockquote>",
    "        <figcaption>— " + esc(r.name) + "</figcaption>",
    "      </figure>",
    "      </div>"
  ].join("\n");
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name), b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

async function main() {
  const photos = readJSON("content/photos.json");
  const videosIn = (readJSON("content/videos.json").videos || []);
  const songsIn = (readJSON("content/songs.json").songs || []);
  const reviewsIn = (readJSON("content/reviews.json").reviews || []);

  const videos = [];
  videosIn.forEach((v, i) => {
    const id = youtubeId(v.url);
    if (!id) { console.warn("Skipping video " + (i + 1) + ": not a YouTube link (" + v.url + ")"); return; }
    videos.push({ id, title: String(v.title || "Video " + (videos.length + 1)).trim() });
  });
  if (!videos.length) throw new Error("content/videos.json has no valid YouTube links.");

  const songs = songsIn
    .map((s) => ({ artist: String(s.artist || "").trim(), title: String(s.title || "").trim(), genre: s.genre }))
    .filter((s, i) => {
      const ok = s.title && s.artist && GENRES.includes(s.genre);
      if (!ok) console.warn("Skipping song " + (i + 1) + " (needs a title, artist and genre).");
      return ok;
    })
    .sort((a, b) => sortKey(a.artist).localeCompare(sortKey(b.artist), "en") || sortKey(a.title).localeCompare(sortKey(b.title), "en"));
  if (!songs.length) throw new Error("content/songs.json has no valid songs.");

  const reviews = reviewsIn.filter((r) => r && r.quote && r.name);
  if (!reviews.length) throw new Error("content/reviews.json has no reviews.");

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of ["style.css", "script.js"]) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
  copyDir(path.join(ROOT, "assets"), path.join(OUT, "assets"));
  copyDir(path.join(ROOT, "admin"), path.join(OUT, "admin"));

  const hero = await preparePhoto(photos.hero_image, 2000);
  const about = await preparePhoto(photos.about_image, 2000);

  const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
  const siteData = JSON.stringify({ songs, videos })
    .replace(/</g, "\\u003c")
    .split(LS).join("\\u2028")
    .split(PS).join("\\u2029");

  const tokens = {
    HERO_IMAGE: esc(hero.src),
    ABOUT_IMAGE: esc(about.src),
    ABOUT_ALT: esc(photos.about_alt || "Ocean Tones Collective"),
    ABOUT_DIMS: about.width ? ' width="' + about.width + '" height="' + about.height + '"' : "",
    FIRST_VIDEO_SRC: embedUrl(videos[0].id),
    FIRST_VIDEO_TITLE: esc(videos[0].title),
    REVIEWS: reviews.map(reviewHtml).join("\n"),
    SITE_DATA: siteData
  };

  let html = fs.readFileSync(path.join(ROOT, "index.template.html"), "utf8");
  html = html.replace(/\{\{HASH:([^}]+)\}\}/g, (_, f) => hashOf(f));
  html = html.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => {
    if (!(k in tokens)) throw new Error("Unknown placeholder " + m + " in index.template.html");
    return tokens[k];
  });
  fs.writeFileSync(path.join(OUT, "index.html"), html);

  console.log("Built public/: " + songs.length + " songs, " + videos.length + " videos, " + reviews.length + " reviews.");
}

main().catch((e) => { console.error("Build failed: " + e.message); process.exit(1); });
