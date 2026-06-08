---
name: feedback-radix-props-over-css
description: User prefers Radix component props (weight, justify, align, gap) over CSS whenever a matching prop exists
metadata:
  type: feedback
---

When working with `@radix-ui/themes` components, always check if a Radix prop covers the CSS property first — only fall back to CSS if no prop matches.

**Why:** User explicitly said "I dont really want to use css, in Radix we have property on component, let check if we can use property instead of css, just use css when not any property match."

**How to apply:**
- `font-weight` → `weight="medium|bold|light"` on Heading/Text
- `justify-content` → `justify="between|center|start|end"` on Flex
- `align-items` → `align="center|start|end"` on Flex
- `gap` → `gap="1|2|3|4"` on Flex/Box (when value matches a Radix spacing token)
- Exact pixel values with no token → `style={{ ... }}` prop on the component
- Responsive rules (`max-height`, `max-width`) and animations → CSS only (Radix responsive system doesn't support `max-height`)
- Complex selectors, pseudo-elements, hover → CSS only
