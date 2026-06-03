---
name: radix-themes-migration
description: Full migration plan from raw HTML + Radix Primitives to Radix Themes (Box, Flex, Text, Heading, Link) with dark/light theme switching
metadata:
  type: project
---

## Radix Themes Migration Plan

Goal: migrate the portfolio from raw HTML divs to `@radix-ui/themes` components (Box, Flex, Text, Heading, Link) and replace hardcoded CSS colors with Radix tokens to enable dark/light theme switching.

**Why:** Code readability (semantic components vs divs), maintainability, and theme switching via a single `appearance` prop on `<Theme>`.

**Why:** [[radix-primitives-vs-themes]]

---

## Current state (as of session)

- `@radix-ui/react-accordion` already installed and `WhatIDo.tsx` already migrated to Radix Accordion
- All other components still use raw HTML
- No Radix Themes installed yet

---

## Step 1 — Install and wire up Theme (10 min)

```bash
pnpm add @radix-ui/themes
```

In `src/App.tsx`, wrap everything in `<Theme>`:

```tsx
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

<Theme appearance="dark" accentColor="cyan" grayColor="slate">
  <BrowserRouter>...</BrowserRouter>
</Theme>
```

To add a toggle later, just change `appearance` to a state variable.

---

## Step 2 — Replace JSX in each component (~2 hrs total)

Pattern: `div` → `Box`, `div` with flex/grid → `Flex`/`Grid`, `h*` → `Heading as="h*"`, `p/span` → `Text as="p"`, `a` → `Link`.

**Keep all `className` props unchanged** — GSAP animations target these class names and must not break.

### About.tsx
```tsx
import { Box, Heading, Text } from '@radix-ui/themes';
// div.about-section → Box
// div.about-me → Box
// h3.title → Heading as="h3"
// p.para → Text as="p"
```

### Landing.tsx
```tsx
import { Box, Heading, Text } from '@radix-ui/themes';
// div.landing-section → Box
// div.landing-container → Flex (it's a flex layout)
// div.landing-intro → Box
// h1, h2 → Heading as="h1/h2"
// div.mobile-photo → Box
```

### Career.tsx
```tsx
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
// div.career-section → Box
// div.career-container → Box
// div.career-info → Box
// div.career-info-box → Box
// div.career-info-in → Flex
// h4, h3, h5 → Heading
// p → Text
```

### Work.tsx
```tsx
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
// div.work-section → Box (GSAP pin target — keep className)
// div.work-flex → Flex (GSAP translate target — keep className)
// div.work-box → Box
// h3, h4 → Heading
// p → Text
// Link (react-router) stays as-is — do NOT replace with Radix Link
```

### Contact.tsx
```tsx
import { Box, Flex, Heading, Text, Link } from '@radix-ui/themes';
// div.contact-section → Box
// div.contact-container → Box
// div.contact-flex → Flex
// div.contact-box → Flex (it's flex-direction: column)
// h3, h4, h2, h5 → Heading
// p → Text
// a.contact-social → Link (Radix Link) — adds accessibility
```

### CallToAction.tsx
```tsx
import { Flex } from '@radix-ui/themes';
// div.cta-section → Box
// div.cta-buttons → Flex
// Keep Link (react-router) and <a> as-is — do NOT replace navigation links with Radix Link
```

### WhatIDo.tsx
```tsx
// Accordion already done with @radix-ui/react-accordion
// Replace remaining layout divs:
// div.whatIDO → Box (or Flex — it uses display:flex)
// div.what-box → Box
// div.what-box-in → Box
// div.what-corner → Box
// div.what-content-in → Box
// div.what-content-flex → Flex
// div.what-tags → Box
// h3, h4, h5 inside Accordion.Trigger → keep as raw h3/h4 (inside Radix Trigger)
```

---

## Step 3 — Replace CSS color values with Radix tokens (~3 hrs)

This is what enables light/dark switching. Go through all CSS files and replace:

| Current value | Radix token | Notes |
|---|---|---|
| `var(--accentColor)` | `var(--accent-9)` | Main accent (cyan) |
| `var(--backgroundColor)` | `var(--color-background)` | Page background |
| `color: white` | `color: var(--gray-12)` | High contrast text |
| `rgba(255,255,255,0.15)` | `var(--gray-a3)` | Subtle fill |
| `rgba(255,255,255,0.3)` | `var(--gray-a5)` | Medium fill |
| `#ffffff50` (border) | `var(--gray-a6)` | Subtle border |
| `opacity: 0.3/0.5` on text | `var(--gray-9)` / `var(--gray-10)` | Muted text |

**Do NOT replace** fluid typography — these stay as custom CSS:
```css
font-size: calc(4vw + 25px); /* keep — Radix has no fluid type scale */
```

**CSS files to update (in order of impact):**
1. `About.css` — uses `var(--accentColor)` for h3 color
2. `Contact.css` — uses `var(--accentColor)`, `var(--backgroundColor)`
3. `WhatIDo.css` — uses `var(--accentColor)` (via `do-h2`)
4. `style.css` — uses `var(--accentColor)` for hover links
5. `Landing.css`, `Career.css`, `Work.css`, `CallToAction.css` — check for hardcoded colors
6. `MainContainer` CSS — likely the most hardcoded values

---

## Step 4 — Add theme toggle (30 min)

Create a context or simple state in `App.tsx`:

```tsx
const [appearance, setAppearance] = useState<'dark' | 'light'>('dark');

<Theme appearance={appearance}>
  ...
</Theme>
```

Add a toggle button in `Navbar.tsx` — one line changes the whole site.

---

## Step 5 — Verify GSAP still works (30 min)

Run `pnpm dev` and scroll through all sections. GSAP targets class names on DOM elements — since we're keeping all `className` props, it should work unchanged. Key targets to verify:
- `.work-flex` (horizontal scroll pin)
- `.about-section` (scroll reveal)
- `.career-info-box` (stagger animation)
- `.contact-section`, `.contact-box` (scroll reveal)
- `.what-content-in` (flicker animation)

---

## Key constraints to remember

- `Work.tsx` uses GSAP `.querySelectorAll(".work-box")` and `.querySelector(".work-container")` — these must remain as-is
- React Router `<Link>` and Radix `<Link>` are different — use React Router Link for navigation, Radix Link only for external `<a>` tags
- `Accordion.Trigger` is already a Radix Primitive inside WhatIDo — Radix Themes and Radix Primitives are compatible, no conflict
- The `@radix-ui/themes/styles.css` import may reset some base styles — test after Step 1 before doing anything else

**Why:** If Radix Themes base CSS conflicts with existing styles, deal with it at Step 1 before touching components.
