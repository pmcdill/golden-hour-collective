# Editing the website

Tim can change the top photos, the YouTube videos, the song list and the reviews at
**https://www.mauiwedding.band/admin**. He signs in with his GitHub account, edits in a simple
form and clicks **Publish**. The site updates by itself in about a minute.

## One-time setup (Paul)

1. **Create a GitHub OAuth App.** GitHub > Settings > Developer settings > OAuth Apps > New OAuth App.
   - Application name: `Ocean Tones admin`
   - Homepage URL: `https://www.mauiwedding.band`
   - Authorization callback URL: `https://www.mauiwedding.band/api/callback` (and optionally `https://mauiwedding.band/api/callback`)
   - After creating it, click **Generate a new client secret**. Keep the Client ID and the secret handy.
2. **Add the two values to Vercel.** Vercel > the `golden-hour-collective` project > Settings > Environment Variables. Add (for Production and Preview):
   - `GITHUB_OAUTH_ID` = the Client ID
   - `GITHUB_OAUTH_SECRET` = the client secret
   Then redeploy (Deployments > the latest one > Redeploy) so the values take effect.
3. **Add Tim to the repo.** GitHub > `pmcdill/golden-hour-collective` > Settings > Collaborators > Add people. Choose Tim's GitHub username and give him **Write** access. He needs to accept the invitation from his email. (If he has no GitHub account yet, it is free at github.com.)

Anyone can reach the login page, but only people you add as collaborators can actually save changes.

## How Tim edits (no code)

1. Go to **https://www.mauiwedding.band/admin** and click **Login with GitHub**. The first time, GitHub asks him to authorize the app. Click Authorize.
2. Pick what to edit from the left menu:
   - **Photos**: the top photo beside the headline and the About photo. Click the photo, choose **Choose different image** > **Upload**.
   - **Videos**: paste YouTube links (use YouTube's Share button). The first one loads first. Drag to reorder.
   - **Song list**: add a song with the **Add** button at the top, or open any song to fix it. The site sorts songs by artist on its own.
   - **Reviews**: add or edit what people said and their name. Type the words only; the site adds the quotation marks and the five stars.
3. Click **Publish** (top right), then **Publish now**. The live site updates in about a minute.

### Tips

- **Photos:** upload the best-quality photo you have. Very large files are shrunk automatically for the site. A wide (landscape) photo works best for the About section.
- **Mistakes:** every change is saved in GitHub's history, so anything can be undone. Ask Paul.
- If a video link is not a real YouTube link, the site quietly skips it. Check the new video shows up after publishing.

## How it works (for developers)

- Content lives in `content/*.json`. `scripts/build.js` combines it with `index.template.html` and writes the finished site to `public/` (Vercel runs this on every deploy). The build resizes large photos and fails, keeping the last good site live, if a content file is invalid.
- `admin/` is Decap CMS (`admin/config.yml` defines the forms). `api/auth.js` and `api/callback.js` handle "Login with GitHub".
- Run locally: `npm install && npm run build`, then serve the `public/` folder.
