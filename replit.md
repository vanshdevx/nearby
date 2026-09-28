# Nearby Digital Presence

Nearby is a one-page digital studio website helping cafés, restaurants, and local businesses get found and get seen online.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/nearby-website/src/App.tsx` — single-page site content and interactions
- `artifacts/nearby-website/src/index.css` — visual system, responsive layout, and motion
- `artifacts/nearby-website/public/nearby-logo.png` — supplied Nearby logo
- `artifacts/nearby-website/index.html` — SEO title and metadata

## Architecture decisions

- The website is frontend-only because its CTA and service information do not require persistent application data.
- WhatsApp is the sole conversion path, using the exact provided URL across buttons, phone link, and QR codes.
- The services area is a hash-aware client-side switcher so each service category can be linked directly.

## Product

- Presents Nearby’s digital onboarding, Instagram/content, and creative service offerings.
- Shows the exact provided packages and prices with responsive layouts.
- Provides working anchor navigation, mobile navigation, WhatsApp CTAs, and scannable QR codes.

## User preferences

- Keep the brand minimal, premium, friendly, local, and modern; avoid generic agency patterns.

## Gotchas

- Production builds need the workflow-provided `PORT` and `BASE_PATH` environment variables when run manually.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
