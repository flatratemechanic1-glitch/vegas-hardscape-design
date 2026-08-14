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
