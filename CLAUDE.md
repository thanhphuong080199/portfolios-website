# Portfolio repository notes

This is Thanh Phuong Le's bilingual portfolio. It is a React + TypeScript application built with Vite. The published page is a single-page site in `src/App.tsx`.

## Source of truth

- Professional experience: user-provided CV. Do not invent employers, metrics, dates, or confidential client names.
- Personal projects: public repositories under [thanhphuong080199](https://github.com/thanhphuong080199).
- Contact details and portrait: directly supplied by the user.
- English and Vietnamese copy: `src/i18n/locales/en.json` and `vi.json`. Keep their structures aligned.

## Implementation

- Theme variables live in `src/App.css`. `data-theme` on the document root controls both themes.
- Theme and language choices are stored in browser storage and should remain usable when storage is unavailable.
- Navigation uses section anchors. Avoid adding a router unless there is a real second page.
- Public assets are under `public/`; the portrait is the only profile image used by the site.

## Checks

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm lint
```

The GitHub Pages workflow deploys the production build from `main`. Vite uses relative asset paths.
