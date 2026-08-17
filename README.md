# Vegas Hardscape Design

Marketing site for Vegas Hardscape Design — hardscape/pool layout design, 3D renderings, and owner's representative consulting in the Las Vegas valley. Built with Next.js 16 (App Router), Tailwind CSS v4, and shadcn.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form sends leads by email through your Google Workspace mailbox (no third-party form service needed). To enable it:

1. Turn on 2-Step Verification on the `reggie@vegashardscapedesign.com` Google account, if it isn't already.
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Copy `.env.example` to `.env.local` and fill in `GMAIL_USER` and `GMAIL_APP_PASSWORD`.
4. When deploying to Vercel, add the same variables under Project Settings → Environment Variables.

Until those are set, form submissions fail with a clear "email is not configured yet" message instead of silently disappearing.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel and connect the `vegashardscapedesign.com` domain.
3. Add the `GMAIL_USER` / `GMAIL_APP_PASSWORD` / `CONTACT_TO_EMAIL` environment variables (see above).
4. Verify `/sitemap.xml` and `/robots.txt` resolve on the live domain, then submit the sitemap in Google Search Console.

### How it actually redeploys day-to-day

Every `git push` to `main` on `github.com/flatratemechanic1-glitch/vegas-hardscape-design` auto-deploys via Vercel's GitHub integration — no manual "deploy" step needed. Confirm this current commit made it live with:

```bash
git log --oneline -1
curl -s https://vegashardscapedesign.com/ | grep -o 'some-unique-string-from-your-latest-change'
```

**If a push doesn't show up on the live site**, the most likely cause is Vercel's GitHub App losing its connection to the repo — this can happen after a GitHub account/ownership change. Check Vercel Dashboard → Project → Settings → Git: if it shows disconnected or points at the wrong repo, reconnect it there (pick `flatratemechanic1-glitch/vegas-hardscape-design` again). As a stopgap while that's broken, you can still trigger a deploy manually from Vercel Dashboard → Deployments → "Redeploy" on the latest commit.
