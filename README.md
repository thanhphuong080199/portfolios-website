# 3D Developer Portfolio Website

A modern, high-performance developer portfolio built with React, TypeScript, Three.js, GSAP, and WebGL. Features a fully animated 3D character on desktop, smooth scroll animations, an interactive chess game, and an AI chat powered by a language model.

> Forked from [red1-for-hek/portfolio-website](https://github.com/red1-for-hek/portfolio-website) — customized with i18n (English / Vietnamese) support and additional features.

---

## Features

- **3D / WebGL scene** — animated character model (Three.js) that tracks your mouse cursor, desktop only
- **Smooth animations** — GSAP ScrollTrigger reveals + Lenis smooth scroll
- **Multi-language** — English / Vietnamese via react-i18next
- **Interactive chess** — play against the custom RedxChess WASM engine
- **AI chat** — LLM-powered chat (Groq LLaMA-3.3-70B) that role-plays as the developer
- **Responsive** — 3D replaced with a static photo on mobile
- **Fast builds** — Vite with manual chunk splitting for Three.js, GSAP, and vendor libs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 5 |
| 3D Rendering | Three.js 0.168, @react-three/fiber, @react-three/drei |
| Animations | GSAP 3 (ScrollTrigger), Lenis |
| Routing | React Router DOM v7 |
| i18n | react-i18next, i18next |
| Chess | chess.js + custom WASM engine |
| AI Chat | Groq API (llama-3.3-70b-versatile) via Vercel serverless |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install

```bash
pnpm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your key:

```bash
cp .env.example .env.local
```

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

### 4. Run locally

```bash
pnpm dev        # http://localhost:5173
pnpm build      # production build
pnpm preview    # preview production build
pnpm lint       # ESLint
```

---

## Customization

All content is centralized in **`src/config.ts`** — update it to make the portfolio your own:

| What to change | Where |
|---|---|
| Your name, email, location, social links | `src/config.ts` → `developer`, `social`, `contact` |
| Projects list | `src/config.ts` → `projects` |
| Career / experience timeline | `src/config.ts` → `experiences` |
| Skills | `src/config.ts` → `skills` |
| Translation strings (EN / VI) | `src/i18n/locales/en.json`, `src/i18n/locales/vi.json` |
| Profile photo (mobile) | `public/images/mypicnbg.png` |
| Project screenshots | `public/images/` |
| AI chat persona / system prompt | `api/chat.js` |

---

## Project Structure

```
/
├── api/
│   └── chat.js              # Vercel serverless function — proxies Groq API
├── public/
│   ├── models/              # 3D character model (.glb) + HDR lighting
│   ├── draco/               # Draco decoder for compressed geometry
│   ├── redoxchess.js/.wasm  # Custom chess engine (C++ → WASM)
│   ├── images/              # Project screenshots, profile photo
│   └── video/               # Background video
├── src/
│   ├── config.ts            # Central content store
│   ├── i18n/
│   │   └── locales/
│   │       ├── en.json      # English translations
│   │       └── vi.json      # Vietnamese translations
│   ├── components/          # All UI components + GSAP animations
│   ├── pages/
│   │   ├── MyWorks.tsx      # Full project gallery
│   │   └── Play.tsx         # Chess + AI chat
│   └── utils/               # Chess engine wrapper, text utilities
├── vercel.json              # SPA rewrites + security headers
└── vite.config.ts           # Manual chunks, Terser minification
```

---

## Deployment

The project is ready to deploy on **Vercel**:

1. Push your fork to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add `GROQ_API_KEY` in Vercel project settings → Environment Variables
4. Deploy — Vercel auto-detects Vite and picks up `api/` as serverless functions

---

## Credits

Original design and implementation by [Redoyanul Haque](https://github.com/red1-for-hek). This fork adds internationalization (EN/VI), additional features, and personal customizations.

---

## License

MIT — see [LICENSE](LICENSE).
