# Portfolio Website — CLAUDE.md

## Project Overview

This is the personal portfolio website of **Redoyanul Haque**, an AI & Full-Stack Developer from Bangladesh. It is a React + TypeScript SPA built with Vite and deployed on Vercel.

**Live features:**
- Animated 3D character model (Three.js, desktop-only) that tracks mouse cursor
- Single-page portfolio with sections: Landing, About, What I Do, Career, Work, Tech Stack, CTA, Contact
- `/myworks` page: detailed project gallery
- `/play` page: interactive chess game (vs custom RedxChess engine) + AI chat (Groq LLaMA-3.3-70B, impersonating the developer)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 5 |
| 3D Rendering | Three.js 0.168, @react-three/fiber, @react-three/drei |
| Animations | GSAP 3 (ScrollTrigger, timelines), Lenis (smooth scroll) |
| Routing | React Router DOM v7 |
| Chess | chess.js (rules/validation), custom WASM engine (`redoxchess.js/.wasm`) |
| AI Chat | Groq API (`llama-3.3-70b-versatile`) via serverless `api/chat.js` |
| Analytics | @vercel/analytics, @vercel/speed-insights |
| Deployment | Vercel (SPA rewrites + security headers in `vercel.json`) |

---

## Project Structure

```
/
├── api/
│   └── chat.js              # Vercel serverless function — proxies Groq API calls
├── public/
│   ├── models/
│   │   ├── character.glb    # 3D character model (Three.js GLB)
│   │   └── char_enviorment.hdr  # HDR lighting map
│   ├── draco/               # Draco decoder for compressed 3D geometry
│   ├── redoxchess.js/.wasm  # Custom chess engine (C++ compiled to WASM)
│   ├── images/              # Project screenshots, tech icons, profile photo
│   └── video/               # Background video
├── src/
│   ├── config.ts            # Central data store: developer info, projects, skills, social links, career
│   ├── App.tsx              # Router — 3 routes: /, /myworks, /play
│   ├── main.tsx             # React entry point
│   ├── components/
│   │   ├── Character/       # Three.js 3D character scene (desktop only)
│   │   │   ├── Scene.tsx    # Canvas setup, camera, renderer, animation loop
│   │   │   └── utils/       # character.ts, lighting.ts, mouseUtils.ts, animationUtils.ts, decrypt.ts
│   │   ├── styles/          # Per-component CSS files
│   │   ├── utils/
│   │   │   ├── GsapScroll.ts   # GSAP ScrollTrigger animations for all sections
│   │   │   ├── initialFX.ts    # Entry animations (runs after loading screen)
│   │   │   └── splitText.ts    # Text splitting utility for character-by-character animations
│   │   ├── MainContainer.tsx   # Root layout: Cursor + Navbar + SocialIcons + all sections
│   │   ├── Landing.tsx      # Hero section — developer name + title
│   │   ├── About.tsx        # About section
│   │   ├── WhatIDo.tsx      # Skills/services section
│   │   ├── Career.tsx       # Experience timeline
│   │   ├── Work.tsx         # Featured projects grid
│   │   ├── TechStackNew.tsx # Tech stack marquee
│   │   ├── CallToAction.tsx # CTA section
│   │   ├── Contact.tsx      # Contact links + footer
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── SocialIcons.tsx  # Floating social media icons
│   │   ├── Cursor.tsx       # Custom cursor (desktop)
│   │   └── Loading.tsx      # Loading screen with progress bar
│   ├── context/
│   │   └── LoadingProvider.tsx  # Context for 3D model load progress; skips loading on mobile
│   ├── pages/
│   │   ├── MyWorks.tsx      # Full project gallery page
│   │   └── Play.tsx         # Chess game + AI chat page (largest file, ~24KB)
│   ├── data/
│   │   └── boneData.ts      # Bone/skeleton data for 3D character animations
│   └── utils/
│       ├── redoxchessEngine.ts  # TypeScript wrapper around the WASM chess engine
│       └── textSplitter.ts     # Text animation utilities
├── vercel.json              # SPA rewrites + security headers (nosniff, X-Frame-Options, XSS)
├── vite.config.ts           # Manual chunks: three, react-three, gsap, vendor; terser minification
├── tsconfig.app.json        # TypeScript config
└── .env.example             # Required env var: GROQ_API_KEY
```

---

## Key Architecture Patterns

### All content lives in `src/config.ts`
Developer info, all projects, career history, social links, and skill descriptions are exported as a single `config` object. Every section component imports from here — changing content means changing only this file.

### 3D Character is desktop-only
`MainContainer.tsx` gates the `<CharacterModel />` (passed as `children`) behind `isDesktopView && !isMobile`. On mobile, a static photo from `public/images/mypicnbg.png` is shown instead. The `LoadingProvider` also skips the loading screen on mobile.

### Character model is encrypted
The 3D model file is stored as `public/models/character.enc` and decrypted client-side in `src/components/Character/utils/decrypt.ts`. The actual `.glb` is also present in the repo.

### Serverless AI chat
`api/chat.js` is a Vercel serverless function that forwards requests to Groq's OpenAI-compatible API. The `GROQ_API_KEY` env var must be set in Vercel. The system prompt instructs the LLM to role-play as Redoyanul Haque.

### GSAP animations
- `src/components/utils/initialFX.ts` — entrance animations that run after the 3D model loads (or immediately on mobile)
- `src/components/utils/GsapScroll.ts` — ScrollTrigger-based reveal animations for each section
- Each section component also sets up its own GSAP timeline in `useEffect`

### Build optimization
`vite.config.ts` splits output into manual chunks (`three`, `react-three`, `gsap`, `vendor`) to enable parallel browser loading of large libraries. Console/debugger statements are stripped in production.

---

## Development Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Dev server (http://localhost:5173, also exposed on LAN via --host)
pnpm build         # TypeScript check + Vite build
pnpm preview       # Preview production build locally
pnpm lint          # ESLint
```

## Environment Variables

```
GROQ_API_KEY=      # Required for the AI chat feature on /play page
```

Set this in `.env.local` for local dev, or in Vercel project settings for deployment.

---

## Deployment

Deployed on **Vercel**. `vercel.json` configures:
- SPA fallback: all routes except `/api/*` rewrite to `/index.html`
- Security headers on all responses: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `X-XSS-Protection`, `Referrer-Policy`

The `api/` directory is automatically picked up by Vercel as serverless functions.
