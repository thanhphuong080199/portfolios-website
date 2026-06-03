---
name: radix-primitives-vs-themes
description: Difference between @radix-ui/react-* (Primitives) and @radix-ui/themes (Themes) — when to use each
metadata:
  type: reference
---

## Radix Primitives vs Radix Themes

### `@radix-ui/react-*` — Radix Primitives
Individual headless packages, **no styles, no layout**. Only behavior:
- State (open/closed, checked, selected)
- ARIA attributes
- Keyboard navigation
- Focus management

Each component is a separate install:
```bash
pnpm add @radix-ui/react-accordion
pnpm add @radix-ui/react-dialog
```

You own all CSS. Use when you have existing custom styles you want to keep.

### `@radix-ui/themes` — Radix Themes
A full design system built ON TOP of Primitives. Adds:
- Layout: `Box`, `Flex`, `Grid`, `Container`, `Section`
- Typography: `Text`, `Heading`
- Pre-styled components: `Button`, `Card`, `Dialog`, `Badge`, `Link`
- CSS design tokens: `--accent-*`, `--gray-*`, `--color-background`
- Dark/light switching via `<Theme appearance="dark|light">`

Single install covers everything:
```bash
pnpm add @radix-ui/themes
```

### Rule of thumb
- Use **Primitives** when you want behavior only and own your styles
- Use **Themes** when you want a full design system + theme switching
- They are compatible — you can use both (Themes wraps Primitives internally)

### In this project
`@radix-ui/react-accordion` (Primitive) is installed for WhatIDo.
`@radix-ui/themes` migration is planned — see [[radix-themes-migration]].
