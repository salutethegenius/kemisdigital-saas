# Golden Starter — Philosophy & Standards

This repo is the **Verity Application Framework**: the internal platform that generates apps. Every new project should start by cloning this template so setup time is zero and architecture stays consistent.

## Core philosophy

- **Speed of development** — Ship fast with defaults that work.
- **Long-term maintainability** — Clear structure, minimal magic.
- **AI-native integration** — LLMs, embeddings, and vector search are first-class; stubs and env are ready.
- **Deployment sovereignty** — Docker, Vercel, Railway, or your own infra. No lock-in.

Default to **“good enough”** choices that remove decision fatigue. Don’t chase trends.

## Golden default stack

| Layer        | Choice |
|-------------|--------|
| Frontend   | Next.js + TypeScript + Tailwind + Zod |
| Backend    | FastAPI (Python) |
| Auth, DB, Storage | Supabase (Postgres + Auth + Storage) |
| AI         | LLMs (local or API) + embeddings + Qdrant (optional) |
| Infra      | Docker; deploy to AWS / Vercel / Railway as needed |

## What this template includes

- Preconfigured Next.js (App Router, standalone output for small Docker images)
- Supabase auth wired (client, server, middleware, login/signup)
- Basic dashboard with Quick Access (AI Playground, Data Explorer, Settings)
- FastAPI stub under `app/` (health, example route, CORS, optional AI stubs)
- Docker Compose for local dev (web + api; Qdrant optional and documented)
- README with env vars and run steps

**Start new projects by cloning this repo.** Then customize per product.

## Recommended add-ons

These are not included by default but are vetted choices when you need them:

| Category  | Library | Notes |
|-----------|---------|-------|
| Animation | [react-spring](https://www.react-spring.dev/) | Spring-based UI animations for dashboard cards, modals, and page transitions. Install with `npm i @react-spring/web`. |
