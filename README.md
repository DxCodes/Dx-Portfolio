# heyitsdhruv.com

My personal portfolio, built with Next.js 16 (App Router, Cache Components, React Compiler), Tailwind CSS v4 and Motion.

## Getting started

Requires Node 20.9+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Editing content

All copy, projects and social links live in [`data/site.ts`](data/site.ts). To show the lanyard
portrait card in the hero, drop an image in `public/` and set `site.portrait` (e.g. `"/portrait.jpg"`).

## Contact form

The form posts to a Server Action ([`app/actions/contact.ts`](app/actions/contact.ts)) that sends
mail through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set
`RESEND_API_KEY`. Without a key, the form shows a mailto fallback instead.

Each visitor can send one message every 5 minutes (tracked by IP and by email). On Vercel, add
an Upstash Redis store so the limit is shared across serverless instances; without it the limit
lives in memory ([`lib/rate-limit.ts`](lib/rate-limit.ts)).

## Scripts

| Script              | What it does          |
| ------------------- | --------------------- |
| `pnpm dev`          | Start the dev server  |
| `pnpm build`        | Production build      |
| `pnpm lint`         | ESLint                |
| `pnpm typecheck`    | TypeScript, no emit   |
| `pnpm format`       | Format with Prettier  |
| `pnpm format:check` | Check formatting (CI) |

## Deployment

Deployed on Vercel. If you self-host, enable the `sharp` build in `pnpm-workspace.yaml`
so `next/image` can optimize images.
