# Thanh Phuong Le — portfolio

Personal portfolio for a backend-focused software engineer based in Ho Chi Minh City, Vietnam. The content is tailored to senior backend roles and is available in English and Vietnamese.

## Features

- Responsive single-page portfolio with selected production experience and public projects
- Dark and light themes, with the chosen theme saved in browser storage
- English and Vietnamese content, with the chosen language saved in browser storage
- Keyboard-friendly navigation, visible focus states, and reduced-motion support
- No API keys or environment variables required

## Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by Vite. The production checks are:

```bash
pnpm build
pnpm lint
```

## Content

- [`src/App.tsx`](src/App.tsx): page structure, contact links, and public project URLs
- [`src/i18n/locales/en.json`](src/i18n/locales/en.json): English content
- [`src/i18n/locales/vi.json`](src/i18n/locales/vi.json): Vietnamese content
- [`src/App.css`](src/App.css): layout and theme color tokens
- [`public/images/portrait.jpeg`](public/images/portrait.jpeg): user-provided portrait

Career descriptions are based on the user's CV. Public side projects link to the user's own GitHub repositories. Names of non-public clients and employers are intentionally omitted.

## Deploy

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages when `main` is pushed. Vite uses relative asset paths so the build works at the repository's Pages path and at a site root.

## Attribution

This repository began as a fork of [Redoyanul Haque's portfolio](https://github.com/red1-for-hek/portfolio-website). The previous owner’s profile, projects, images, 3D model, and related code have been removed from the published portfolio. See [LICENSE](LICENSE) for license terms.
