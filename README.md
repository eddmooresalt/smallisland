# Small Island

A slow, soft dating sim set in Singapore. Swipe, match, and just talk.

## What's in here
```
src/main.jsx           React entry point
src/small-island.jsx   the whole app
public/index.html      HTML shell
build.js               bundles everything into /dist
```

## Deploying (GitHub + Vercel)

1. Push this folder to a new GitHub repo.
2. Go to vercel.com → **Add New → Project** → import that repo.
3. Vercel will detect `vercel.json` and use its build settings automatically — no manual config needed. Click **Deploy**.
4. Every future push to the repo's default branch redeploys automatically.

To update the app later: replace `src/small-island.jsx` with a new version, commit, push. That's it.

## Running locally

```
npm install
npm run build      # bundles to /dist
npx serve dist      # or open dist/index.html directly
```

## Notes

- This is a static site — no server, no database, no API keys baked in. It fits comfortably inside Vercel's free Hobby tier for personal, non-commercial use.
- Live AI replies (if you want them) are configured per-browser inside the app itself: **You tab → how they reply**. Nothing here needs a `.env` file or a Vercel environment variable.
- Progress saves to that browser's local storage. Use **You tab → Backup & restore** to download a real save file you can move between devices.
