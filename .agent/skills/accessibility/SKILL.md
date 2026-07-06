---
name: accessibility
description: Apply accessibility rules (RGAA 4, WCAG 2.1 AA) when writing or reviewing this Nuxt blog's pages and recipe content — `app/**/*.vue` (Vue templates + scoped CSS) and `content/recettes/**/*.md`. Use when adding or editing pages/components, writing recipe markdown, or asked to audit a11y, fix accessibility issues, check WCAG/RGAA compliance, add ARIA, fix keyboard navigation, or improve screen reader support.
---

# Accessibility (RGAA 4 / WCAG 2.1 AA)

Scope: this skill applies to `app/**/*.vue` (Vue single-file components: template + scoped `<style>`) and `content/recettes/**/*.md` (recipe markdown rendered via `@nuxt/content`'s `ContentRenderer`). Skip config files (`nuxt.config.ts`, `content.config.ts`) and generated code.

Goal: keep this small family recipe blog usable with keyboard and screen readers. There is **no automated accessibility test suite** in this repo (no Playwright, no axe-core, no `test:ui` script) — verification is manual (see bottom of this file). If a real a11y regression risk is introduced, consider proposing an automated check rather than assuming one already runs.

## Project architecture

- **Stack**: Nuxt 4 + Nuxt Content v3 + native CSS (**no Tailwind, no CSS framework, no component library**). Fonts: Playfair Display (headings, `--font-serif`) + Lato (body, `--font-sans`).
- **Single theme**: one light cream/brown/gold palette defined as CSS custom properties in `app/app.vue`'s global `<style>` block (`:root { --cream, --brown, --gold, --text, --text-muted, --border, ... }`). There is no dark mode toggle — no need to test two themes.
- **Pages**: `app/pages/index.vue` (home, category filter + card grid) and `app/pages/recettes/[slug].vue` (single recipe). No shared layout file or reusable component library yet — each page is a self-contained `.vue` file with `<script setup>`, `<template>`, and scoped `<style>`.
- **Content**: 37 recipes in `content/recettes/*.md`, each with zod-validated frontmatter (`title`, `subtitle`, `author`, `category`, `servings`, `slug`) defined in `content.config.ts`, and a markdown body starting at `## Ingrédients` / `## Préparation`.
- **Data fetching**: `useAsyncData` + `queryCollection('recettes')`. Recipe body is rendered with `<ContentRenderer :value="recette" class="prose" />`.
- **Navigation**: `NuxtLink` for all internal links (recipe cards, back link). `NuxtRouteAnnouncer` is mounted in `app/app.vue` — this is Nuxt's built-in live region that announces route/page-title changes to screen readers on client-side navigation; don't duplicate this behavior manually.
- **Language**: all UI strings and recipe content are French. `nuxt.config.ts` does **not** currently set `app.head.htmlAttrs.lang` — flag this if you touch `nuxt.config.ts` (RGAA 8.3 requires `<html lang="fr">`).

## Known gaps in the current codebase (don't copy these patterns)

- **`.categories` in `index.vue` is a `<nav>` wrapping category *filter buttons*** (they mutate local state, they don't navigate to a new URL). RGAA 12 landmarks are for navigation menus; a filter toolbar should be a plain `<div>`/`role="group"` with an accessible label (e.g. `aria-label="Filtrer par catégorie"`), not `<nav>`. Don't extend the current `<nav>` usage to other filter-style controls — use a group pattern instead.
- **No `.sr-only` utility class exists yet.** If you add an icon-only control (there are none today — all buttons/links have visible text), add a `.sr-only` class to `app/app.vue`'s global styles rather than inventing an ad-hoc one-off.
- **No skip link exists.** The site has a single `<main>` per page but no "Aller au contenu principal" link. Fine for now (simple layout, few interactive elements before content), but add one if the header/nav grows more complex.
- **Links have no non-color distinction by default.** `app/app.vue` sets `a { color: var(--gold); text-decoration: none; }` with underline only on `:hover`. Combined with the contrast issue below, this means links in body text are only distinguishable by (weak) color today. If you add prose links, prefer default underline or another persistent visual cue.
- **`--gold` (`#c4945a`) on white/cream fails contrast at normal text sizes** — measured ≈2.7:1 against `#ffffff`/`#faf8f3`, below even WCAG AA's 4.5:1 for body text. It's used today for the default link color, `.card-category`, `.card-author`, and `.recipe-category`. Don't introduce new body text or small UI labels in `--gold` on a light background without darkening it or pairing it with an icon/underline. `--text-muted` (`#7a6055`) on `--cream` measures ≈5.6:1 — passes AA but not AAA, treat it as the AA-safe muted color, not an AAA one.

## How to use this skill

1. Identify which RGAA themes the file touches (images, links, headings, dynamic widgets, etc.) — most recipe pages only touch headings, links, lists, and color/contrast (themes 1, 6, 9, 10).
2. Apply the relevant rules from the checklist below, using the **Vue/Nuxt conventions** in this file (not React/JSX patterns).
3. Reuse the CSS custom properties already defined in `app/app.vue` (`var(--text)`, `var(--text-muted)`, `var(--border)`, etc.) instead of hardcoding colors, so contrast stays centrally controllable.
4. Before declaring the task done, run the manual verification steps at the bottom of this file.

## The rules that matter most here

### 1. Images need a relevant text alternative (RGAA 1)

No recipe currently has images, but this is likely to change (there's a source PDF of scanned family recipes in the repo root).

```vue
<!-- ❌ filename as alt -->
<img src="/images/brownie.jpg" alt="brownie.jpg">

<!-- ❌ missing alt -->
<img src="/images/brownie.jpg">

<!-- ✅ informative: describe what the photo shows, not the filename -->
<img src="/images/brownie.jpg" alt="Brownie coupé en carrés, cœur fondant au chocolat">

<!-- ✅ purely decorative -->
<img src="/images/divider.svg" alt="" aria-hidden="true">
```

In recipe markdown (`content/recettes/*.md`):

```md
<!-- ❌ -->
![photo](/images/brownie.jpg)

<!-- ✅ -->
![Brownie coupé en carrés, posé sur un plat blanc](/images/brownie.jpg)
```

### 2. Links must have an explicit accessible name (RGAA 6)

```vue
<!-- ❌ ambiguous out of context -->
<NuxtLink to="/recettes/brownie">Voir</NuxtLink>

<!-- ✅ the whole card is one NuxtLink whose text content (category, title, subtitle, author)
     already forms an explicit accessible name — this is the existing pattern in index.vue, keep it -->
<NuxtLink :to="`/recettes/${recette.slug}`" class="card">
  <span class="card-category">{{ categoryLabel[recette.category] }}</span>
  <h2 class="card-title">{{ recette.title }}</h2>
  <p class="card-author">— {{ recette.author }}</p>
</NuxtLink>

<!-- ✅ explicit back link, as used in [slug].vue -->
<NuxtLink to="/">← Toutes les recettes</NuxtLink>
```

Never use "ici" / "cliquez ici" / a bare URL as link text.

### 3. Use `<button>` for actions and `NuxtLink`/`<a href>` for navigation (RGAA 7)

`index.vue`'s category filter buttons already do this correctly — keep mirroring it:

```vue
<!-- ✅ action that changes in-page state → <button> -->
<button
  v-for="cat in categories"
  :key="cat.key"
  type="button"
  :class="['cat-btn', { active: activeCategory === cat.key }]"
  @click="activeCategory = cat.key"
>
  {{ cat.label }}
</button>
```

Always set `type="button"` on non-submit buttons (there are no forms in this project today, but this prevents accidental `type="submit"` if one is added later).

### 4. One `<h1>` per page, no level skips (RGAA 9)

The page's `<h1>` comes from the recipe/section title rendered by the page component (`.header-title` in `index.vue`, `.recipe-title` in `[slug].vue`). Recipe markdown bodies must **start at `##`**:

```md
<!-- ❌ would create a second h1 on the recipe page -->
# Ingrédients

<!-- ✅ matches the existing convention in every content/recettes/*.md file -->
## Ingrédients
## Préparation
```

Don't skip a level (`##` straight to `####`) inside a recipe body.

### 5. Forms (RGAA 11)

No forms exist in this project yet. If one is added (e.g. a search box, a contact form), every field needs a `<label for>`/`id` pair — never a `placeholder` alone — and `required` fields must be marked with the `required` attribute.

### 6. Color & contrast (RGAA 3, 10)

Target **WCAG 2.1 AA**: 4.5:1 for normal text, 3:1 for large text (≥18.66px bold or ≥24px) and UI components/icons. See the "Known gaps" section above for the two measured failures in the current palette (`--gold` on light backgrounds).

```css
/* ❌ new hardcoded color, bypasses the shared palette and unverified contrast */
.new-thing { color: #c9a06a; }

/* ✅ reuse an existing, purpose-named variable from app/app.vue */
.new-thing { color: var(--text-muted); }
```

Never convey meaning by color alone. When adding or changing a color in `app/app.vue` or a page's scoped `<style>`, verify contrast at https://webaim.org/resources/contrastchecker/ against every background it can appear on (white cards, `--cream` page background, `--brown` header/topbar).

### 7. Keyboard accessibility & visible focus (RGAA 7, 10, 12)

None of the current components override `outline`, so native focus rings still work — keep it that way.

```css
/* ❌ do not do this without a replacement */
.cat-btn:focus { outline: none; }

/* ✅ if you need a custom focus style, replace it visibly */
.cat-btn:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}
```

- Never use a positive `tabindex`.
- Tab order should follow the DOM/visual order — the current pages need no manual reordering.

### 8. Declare the language (RGAA 8)

`nuxt.config.ts` does not set `app.head.htmlAttrs.lang` today. If you touch `nuxt.config.ts`, add:

```ts
app: {
  head: {
    htmlAttrs: { lang: 'fr' },
    // ...
  },
},
```

All content here is French, so no inline `lang` switches are expected inside recipes.

### 9. Landmarks & document structure (RGAA 9, 12)

Current landmark structure per page:

```vue
<header class="site-header">…</header>   <!-- or .topbar / .recipe-header on the recipe page -->
<main class="main">…</main>              <!-- or the recipe <article> -->
<footer class="site-footer">…</footer>
```

- Keep exactly one `<main>` (or main-equivalent primary content region) per page.
- Do not reuse `<nav>` for non-navigational controls — see "Known gaps" above regarding `.categories`.
- Use `<ul>`/`<li>` for the ingredient lists rendered from markdown (already the case via `ContentRenderer`'s `.prose ul`) — don't flatten card grids or ingredient lists into plain `<div>`s.

### 10. Dynamic content (RGAA 7, 10)

- The category filter in `index.vue` re-renders `.grid` client-side with no `aria-live` region announcing the result count. This is a minor gap (moderate severity) — if you touch this filter, consider whether the result count should be announced (`aria-live="polite"`), especially since there's no visible "N recettes" count today to make the change obvious anyway.
- Respect motion preferences for any animation you add:

```css
@media (prefers-reduced-motion: reduce) {
  .animated-thing { animation: none; transition: none; }
}
```

## Severity cheat sheet (use when reviewing)

**Critical** — blocks users with disabilities:
- Missing `alt` on an informative image.
- A `<div>`/`<span>` used as a button or link instead of `<button>`/`NuxtLink`.
- Removed focus outline with no replacement.
- Body text contrast below 4.5:1 (e.g. don't add more `--gold`-on-light-background text).

**Serious** — degrades the experience significantly:
- Missing `<html lang="fr">` (currently missing — flag if touching `nuxt.config.ts`).
- Skipped heading levels or a second `<h1>` in a recipe body.
- Link text like "ici" / "cliquez" / a bare URL.

**Moderate** — fix as part of normal hygiene:
- `<nav>` used for a non-navigational filter/toolbar (current `.categories` pattern — don't replicate elsewhere).
- Filtered/updated content with no `aria-live` announcement.
- Animation that doesn't respect `prefers-reduced-motion`.

## Verification before declaring done

There is no `pnpm test:ui` / axe / Playwright setup in this repo. Verify manually:

1. **Keyboard**: `npm run dev`, then `Tab` through the changed page. Every interactive element (category buttons, recipe cards, back link) receives focus in visual order with a visible focus ring; `Enter`/`Space` activates it.
2. **Screen reader spot-check**: if you changed navigation or added a widget, confirm with VoiceOver/NVDA (or the browser's accessibility tree inspector) that the accessible name matches the visible text.
3. **Zoom**: check the page at 200% browser zoom — no clipped or overlapping text (recipe titles use `clamp()`, so this is usually fine, but verify after layout changes).
4. **Contrast**: for any new or changed color, check it against every background it can appear on at https://webaim.org/resources/contrastchecker/ (target 4.5:1 normal text / 3:1 large text & UI components).
5. **Markdown headings**: render the recipe locally and confirm there is exactly one visible `<h1>` (the page title) and the body starts at `<h2>`.

## References

- RGAA criteria (French, authoritative): https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/ — full local reference in `REFERENCE.md` in this same skill folder.
- WCAG 2.1 quick reference: https://www.w3.org/WAI/WCAG21/quickref/
- Contrast checker: https://webaim.org/resources/contrastchecker/