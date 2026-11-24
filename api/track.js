// Counts one page view. Called by the site with navigator.sendBeacon.
// Stores only daily totals: views, a hashed unique-visitor marker, and country/city.
// IP addresses are used to make the marker and are never stored.
const crypto = require("crypto");
const { creds, pipeline } = require("./_redis");

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|monitor|curl|wget|python|node-fetch/i;
const KEEP_SECONDS = 400 * 24 * 3600;

function today() {
  // Dates follow Hawaii time so "today" matches the band's day.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Pacific/Honolulu" }).format(new Date());
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.statusCode = 405; return res.end(); }

  try {
    const ua = String(req.headers["user-agent"] || "");
    const prod = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
    if (!prod || !ua || BOT.test(ua) || !creds()) { res.statusCode = 204; return res.end(); }

    // Same-site only, so other sites can't inflate the numbers.
    const host = req.headers["x-forwarded-host"] || req.headers.host || "";
    const origin = req.headers.origin;
    if (origin) { try { if (new URL(origin).host !== host) { res.statusCode = 204; return res.end(); } } catch (e) { res.statusCode = 204; return res.end(); } }

    const day = today();
    const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
    const secret = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    // The marker changes every day, so it can't be used to follow anyone across days.
    const visitor = crypto.createHash("sha256").update(day + "|" + secret + "|" + ip + "|" + ua).digest("hex").slice(0, 32);

    const country = String(req.headers["x-vercel-ip-country"] || "??").toUpperCase().slice(0, 2);
    let city = "";
    try { city = decodeURIComponent(String(req.headers["x-vercel-ip-city"] || "")); } catch (e) { city = ""; }
    city = city.replace(/[|\r\n]/g, " ").slice(0, 60);
    const place = country + "|" + city;

    await pipeline([
      ["INCR", "pv:" + day],
      ["PFADD", "uv:" + day, visitor],
      ["HINCRBY", "geo:" + day, place, 1],
      ["EXPIRE", "pv:" + day, KEEP_SECONDS],
      ["EXPIRE", "uv:" + day, KEEP_SECONDS],
      ["EXPIRE", "geo:" + day, KEEP_SECONDS]
    ]);
  } catch (e) {
    console.error("track failed: " + e.message);
  }
  res.statusCode = 204;
  res.end();
};
