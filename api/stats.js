// Returns view statistics for the admin dashboard. Only people with write access to the
// GitHub repo (the same people who can log in to /admin) can read it.
const { pipeline } = require("./_redis");

const REPO = "pmcdill/golden-hour-collective";

async function canWrite(token) {
  if (!token) return false;
  const r = await fetch("https://api.github.com/repos/" + REPO, {
    headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "User-Agent": "ocean-tones-stats" }
  });
  if (!r.ok) return false;
  const j = await r.json();
  return !!(j.permissions && (j.permissions.push || j.permissions.admin));
}

function lastDays(n) {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Pacific/Honolulu" });
  const out = [];
  for (let i = n - 1; i >= 0; i--) out.push(fmt.format(new Date(Date.now() - i * 86400000)));
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const send = (code, body) => { res.statusCode = code; res.end(JSON.stringify(body)); };

  const m = /^Bearer (.+)$/.exec(String(req.headers.authorization || ""));
  try {
    if (!(await canWrite(m && m[1]))) return send(401, { error: "login" });
  } catch (e) { return send(502, { error: "github" }); }

  const days = Math.min(Math.max(parseInt((req.query && req.query.days) || "30", 10) || 30, 1), 90);
  const dates = lastDays(days);

  let results;
  try {
    results = await pipeline(dates.flatMap((d) => [["GET", "pv:" + d], ["PFCOUNT", "uv:" + d], ["HGETALL", "geo:" + d]]));
  } catch (e) {
    return send(503, { error: "storage", detail: e.message });
  }

  const series = [], places = {}, countries = {};
  let views = 0, visitors = 0;
  dates.forEach((date, i) => {
    const v = parseInt(results[i * 3], 10) || 0;
    const u = parseInt(results[i * 3 + 1], 10) || 0;
    const g = results[i * 3 + 2] || [];
    views += v; visitors += u;
    series.push({ date, views: v, visitors: u });
    for (let k = 0; k + 1 < g.length; k += 2) {
      const [cc, city] = g[k].split("|");
      const n = parseInt(g[k + 1], 10) || 0;
      countries[cc] = (countries[cc] || 0) + n;
      const key = city ? city + ", " + cc : cc;
      places[key] = (places[key] || 0) + n;
    }
  });
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  send(200, {
    days, views, visitors, series,
    countries: top(countries, 8).map(([code, views]) => ({ code, views })),
    places: top(places, 10).map(([name, views]) => ({ name, views }))
  });
};
