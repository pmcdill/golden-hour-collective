// Receives the contact form from the site and forwards it to FormSubmit from the server,
// so browser extensions that block formsubmit.co can't stop inquiries.
const ALIAS = process.env.FORMSUBMIT_ALIAS || "ae9013f98139172fdb408ac3ad6adb61";
const ENDPOINT = "https://formsubmit.co/ajax/" + ALIAS;
const SITE = "https://mauiwedding.band";

const clip = (v, n) => String(v == null ? "" : v).trim().slice(0, n);

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, reason: "method" });
  }

  // Only accept submissions from the site itself.
  const origin = req.headers.origin;
  if (origin) {
    let sameSite = false;
    try { sameSite = new URL(origin).host === req.headers.host; } catch (e) { sameSite = false; }
    if (!sameSite) return res.status(403).json({ ok: false, reason: "origin" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== "object") return res.status(400).json({ ok: false, reason: "invalid" });

  // Honeypot: bots fill the hidden field. Pretend it worked and drop it.
  if (body._honey) return res.status(200).json({ ok: true });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const date = clip(body.date, 120);
  const message = clip(body.message, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, reason: "invalid" });
  }

  const payload = {
    name, email, date, message,
    _subject: "New booking inquiry — Ocean Tones Collective",
    _replyto: email,
    _template: "table",
    _captcha: "false"
  };

  try {
    const up = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": SITE, "Referer": SITE + "/" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000)
    });
    let data = {};
    try { data = await up.json(); } catch (e) { data = {}; }
    if (up.ok && (data.success === true || data.success === "true")) {
      return res.status(200).json({ ok: true });
    }
    console.error("FormSubmit rejected the inquiry", up.status, JSON.stringify(data).slice(0, 300));
    return res.status(502).json({ ok: false, reason: "upstream", status: up.status, detail: clip(data.message, 200) });
  } catch (err) {
    console.error("FormSubmit unreachable", err && err.message);
    return res.status(502).json({ ok: false, reason: "unreachable" });
  }
};
