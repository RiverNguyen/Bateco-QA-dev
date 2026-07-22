# Bateco-QuocAn

Website frontend **Bateco Quốc An** — Next.js App Router, i18n (`vi` / `en`), tích hợp CMS / Rank Math SEO.

## Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** + shadcn/ui (Radix)
- **next-intl** — đa ngôn ngữ
- **GSAP** — scroll / animation
- **react-hook-form** + **zod** — form
- ESLint + Prettier
- `output: 'standalone'` — deploy Docker / VPS

## Getting started

```bash
git clone git@github-bateco:hieudam-bateco/Bateco-QA.git
cd Bateco-QA

pnpm install

# tạo .env.local (xem Environment bên dưới)
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Environment

Tạo `.env.local` ở root:

```env
NEXT_PUBLIC_DOMAIN=https://example.com
NEXT_PUBLIC_CMS=https://cms.example.com
NEXT_PUBLIC_API=https://cms.example.com/wp-json
```

| Biến                 | Mục đích                   |
| -------------------- | -------------------------- |
| `NEXT_PUBLIC_DOMAIN` | Domain site (SEO / schema) |
| `NEXT_PUBLIC_CMS`    | URL WordPress / CMS        |
| `NEXT_PUBLIC_API`    | Base REST API              |

## Scripts

```bash
pnpm dev              # development
pnpm build            # lint + format + production build
pnpm start            # chạy bản build
pnpm lint             # eslint
pnpm lint:fix        # eslint --fix
pnpm format           # prettier --write
pnpm format:check     # prettier --check

ANALYZE=true pnpm build   # phân tích bundle
```

## Cấu trúc

```text
src/
  app/                 # App Router ([locale], layouts, robots)
  components/          # UI / shared
  configs/             # env, routes, endpoints
  fetches/             # CMS, Rank Math, CF7
  i18n/                # next-intl (routing / request / navigation)
  lib/                 # utils (cn, …)
  services/            # service layer
  utils/               # helpers (scroll, metadata, …)
  proxy.ts             # next-intl middleware (Next 16)
messages/              # vi.json, en.json
public/                # static assets
```

## Tính năng chính

- Routing theo locale: `/` (vi mặc định), `/en`, …
- Fetch CMS + Rank Math metadata / schema
- Contact Form 7 helper
- Scroll helpers (window + container) — GSAP
- Bundle analyzer (`@next/bundle-analyzer`)

## Notes

- Package manager: **pnpm**
- Path alias: `@/*` → `src/*`
- Locale config: `src/i18n/routing.ts`
- Strict Mode đang tắt trong `next.config.ts` (tiện GSAP / animation)
