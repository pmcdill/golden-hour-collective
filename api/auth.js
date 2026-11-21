// Step 1 of "Log in with GitHub" for the /admin page: sends the visitor to GitHub.
// Needs the Vercel environment variable GITHUB_OAUTH_ID (from a GitHub OAuth App).
const crypto = require("crypto");

module.exports = function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  if (!clientId) {
    res.status(500).setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.send("The admin login is not set up yet (GITHUB_OAUTH_ID is missing).");
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const state = crypto.randomBytes(16).toString("hex");
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", "https://" + host + "/api/callback");
  url.searchParams.set("scope", "public_repo");
  url.searchParams.set("state", state);

  res.setHeader("Set-Cookie", "oauth_state=" + state + "; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600");
  res.setHeader("Cache-Control", "no-store");
  res.writeHead(302, { Location: url.toString() });
  res.end();
};
