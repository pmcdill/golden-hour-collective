// Step 2 of "Log in with GitHub": GitHub sends the visitor back here with a code.
// We swap it for an access token and hand it to the admin page that opened this window.
// Needs GITHUB_OAUTH_ID and GITHUB_OAUTH_SECRET in the Vercel environment variables.

function page(status, message) {
  const payload = status === "success" ? message : { message };
  const text = "authorization:github:" + status + ":" + JSON.stringify(payload);
  const safe = JSON.stringify(text).replace(/</g, "\\u003c");
  return "<!doctype html><meta charset=\"utf-8\"><title>Signing in…</title><p>Signing you in…</p><script>(function(){" +
    "var msg=" + safe + ";" +
    "function receive(e){window.opener.postMessage(msg,e.origin);window.removeEventListener('message',receive,false);}" +
    "window.addEventListener('message',receive,false);" +
    "window.opener.postMessage('authorizing:github','*');" +
    "})();</script>";
}

function cookie(req, name) {
  const m = new RegExp("(?:^|;\\s*)" + name + "=([^;]+)").exec(req.headers.cookie || "");
  return m ? m[1] : null;
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Set-Cookie", "oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0");

  const { code, state, error, error_description } = req.query || {};
  if (error) return res.status(400).send(page("error", error_description || error));

  const expected = cookie(req, "oauth_state");
  if (!code || !state || !expected || state !== expected) {
    return res.status(400).send(page("error", "The sign-in could not be verified. Please close this window and try again."));
  }

  const id = process.env.GITHUB_OAUTH_ID, secret = process.env.GITHUB_OAUTH_SECRET;
  if (!id || !secret) return res.status(500).send(page("error", "The admin login is not set up yet."));

  try {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const r = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: id, client_secret: secret, code, redirect_uri: "https://" + host + "/api/callback" }),
      signal: AbortSignal.timeout(10000)
    });
    const data = await r.json();
    if (!data.access_token) {
      return res.status(400).send(page("error", data.error_description || "GitHub did not return a token."));
    }
    return res.status(200).send(page("success", { token: data.access_token, provider: "github" }));
  } catch (e) {
    return res.status(502).send(page("error", "Could not reach GitHub. Please try again."));
  }
};
