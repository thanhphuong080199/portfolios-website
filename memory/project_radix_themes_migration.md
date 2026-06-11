---
name: radix-themes-migration
description: Step-by-step Radix Themes migration progress — tracks what's done and what's next, including bugs fixed and patterns established
metadata:
  type: project
---

## Goal

Migrate portfolio from raw HTML divs to `@radix-ui/themes` (Box, Flex, Text, Heading, Link) and replace hardcoded CSS colors with Radix tokens to enable dark/light theme switching via a single `appearance` prop.

**Why:** Code readability, semantic components, and theme switching.

---

## Progress

### DONE

| Step | File | Notes |
|---|---|---|
| 1 | `App.tsx` | `<Theme appearance="dark" accentColor="cyan" grayColor="slate">` wraps everything; `@radix-ui/themes/styles.css` imported |
| 1 | `App.css` | 3 global Radix overrides added (see Bugs section below) |
| 2a | `WhatIDo.tsx` | Layout divs → Box/Flex; h3/h4/h5 → Heading; p → Text; Accordion named imports (not `import *`) |
| 2b | `About.tsx` | div → Box; h3 → Heading; p → Text |
| 2c | `Landing.tsx` | div → Box; h1/h2/h3 → Heading |
| 2d | `Career.tsx` | div → Box/Flex; all headings/paragraphs → Heading/Text |
| 2e | `Work.tsx` | Full migration + Radix props audit (see Patterns section) |
| 7 | `Contact.tsx` | Box/Flex/Heading/Text; weight props on all headings; `.rt-Heading`/`.rt-Text` selectors in CSS |
| 8 | `CallToAction.tsx` | Box/Flex; `justify="center" wrap="wrap"` on cta-buttons Flex |
| 9 | `TechStackNew.tsx` | Box/Flex/Heading; pyramid/row → Flex direction/justify/wrap props; h2.rt-Heading in CSS |
| 10 | CSS token swap | All `--accentColor` removed; text → `--accent-11`, bg/border → `--accent-9`, rgba → `--accent-aX`; `accentColor="violet"` in App.tsx; `#c2a4ff`/`#aa42ff` tokenized; `#0b080c` in TechStackNew → `var(--backgroundColor)` |
| 10b | Radix prop audit | About: Box→Flex+align; WhatIDo: gap="1" on what-content-flex; TechStackNew: responsive gap on pyramid/rows; CallToAction: responsive direction+gap on cta-buttons; Contact: responsive direction+justify on contact-flex; Work: see-all-works Box→Flex; MyWorks: full Radix migration (Box/Heading/Text) |

### TODO

| Step | File | Notes |
|---|---|---|
| 11 | Theme toggle | State in App.tsx, toggle button in Navbar.tsx |
| 12 | GSAP smoke test | Verify `.work-flex`, `.career-info-box`, `.contact-box`, `.what-content-in` scroll animations still work |

---

## Bugs Fixed (App.css global overrides)

```css
/* Radix Theme wrapper sets background #111113 — conflicts with site's #000 body */
.radix-themes {
  background-color: transparent !important;
}

/* Radix CSS reset forces svg to display:block — breaks inline react-icons */
p svg, a svg, span svg,
h1 svg, h2 svg, h3 svg, h4 svg, h5 svg, h6 svg,
button svg, li svg {
  display: inline;
  vertical-align: middle;
}

/* Radix colors and underlines all <a> */
.radix-themes a:not([class*="rt-"]) {
  color: inherit;
  text-decoration: none;
}
```

---

## Patterns Established

### Radix props > CSS
Use component props instead of CSS wherever possible:
- `weight="medium"` on Heading → removes `font-weight` from CSS
- `justify="between"` on Flex → removes `justify-content` from CSS
- `align="center"` on Flex → removes `align-items` from CSS
- `style={{ textAlign: 'right' }}` on Box → removes anonymous CSS class rules
- Keep CSS for: exact pixel values, `max-height` media queries (Radix has no equivalent), animations, complex selectors

### CSS specificity for Radix Heading
Radix's `.radix-themes .rt-Heading { margin: 0 }` is specificity 0-2-0, which beats `.section h2` (0-1-1).
Fix options:
- Use `h2.rt-Heading` selector in CSS (0-2-1) — wins cleanly
- **Preferred**: wrap in `<Box className="title-wrap">` and put margin on the wrapper — separates concerns entirely

### Margin wrapper pattern (Work.tsx example)
```tsx
<Box className="work-title-wrap">   {/* owns margin via CSS */}
  <Heading as="h2" weight="medium"> {/* no margin — Radix controls it */}
    My <span>Work</span>
  </Heading>
</Box>
```

### React Router Link vs Radix Link
- React Router `<Link to="...">` for internal navigation — NEVER replace with Radix Link
- Radix `<Link>` only for external `<a>` tags (adds accessibility attributes)

---

## Key Constraints

- `Work.tsx` GSAP targets `.work-box`, `.work-container`, `.work-flex` — these classNames must stay
- `Career.tsx` GSAP targets `.career-info-box` — must stay
- `Accordion.Trigger` in WhatIDo is Radix Primitive — compatible with Radix Themes, no conflict
