# AGENT.md

Instructions for AI coding agents working in this repo.

## Project

Family recipe blog ("Le Clos Joie") digitizing a PDF cookbook compiled by Hélène for Christmas 2015. All UI text and recipe content is in **French**. Treat this as a sentimental family project, not a generic app — design choices should reflect that.

## Stack

- Nuxt 4 + Nuxt Content v3, content as markdown in `content/recettes/*.md`
- **No Tailwind, no CSS framework, no component library — native CSS only.** Global theme (colors, fonts) is defined as custom properties in `app/app.vue`'s `<style>` block; reuse `var(--text)`, `var(--text-muted)`, `var(--border)`, etc. instead of hardcoding colors.
- Fonts: Playfair Display (`--font-serif`, headings) + Lato (`--font-sans`, body) — loaded via Google Fonts in `nuxt.config.ts`.
- Single light theme, no dark mode.
- Biome for lint/format (`npm run lint`, `npm run format`).

## Structure

- `content/recettes/*.md` — recipes, frontmatter validated by the Zod schema in `content.config.ts` (`title`, `subtitle`, `author`, `category`, `servings`, `slug`). `category` is one of `entree | plat | accompagnement | dessert`.
- Recipe markdown bodies must start at `## Ingrédients` / `## Préparation` — never `#`, to avoid a second `<h1>` on the recipe page.
- `app/pages/index.vue` — home page (search + category filter + card grid + footer credits)
- `app/pages/recettes/[slug].vue` — single recipe page
- `app/components/OrnamentGarland.vue` — decorative SVG
- Each page is self-contained (`<script setup>` + `<template>` + scoped `<style>`) — no shared layout file yet.

## Accessibility

This project targets **RGAA 4 / WCAG 2.1 AA** (some AAA where feasible). Before editing `app/**/*.vue` or `content/recettes/**/*.md`, read `.agent/skills/accessibility/SKILL.md` — it documents known gaps (e.g. `--gold` contrast on light backgrounds, the `.categories` filter using `<nav>` instead of a group) and the conventions already in place. Don't reintroduce a fixed known gap elsewhere in the codebase.

There **is** now automated a11y coverage: `tests/a11y.spec.ts` (Playwright + axe-core, tags `RGAAv4, wcag2a, wcag2aa, wcag2aaa, wcag21a, wcag21aa`) run via `npm run test:a11y`, plus Lighthouse CI (`npm run test:lighthouse`, config in `.lighthouserc.json`, thresholds: a11y ≥ 0.9, best-practices ≥ 0.9, performance ≥ 0.8). Run these after touching markup, not just the manual checklist in the skill file.

## Before finishing a UI change

1. `npm run lint`
2. `npm run test:a11y` if you touched `app/**/*.vue` or recipe markdown structure
3. Manually check keyboard navigation and focus visibility for any new interactive element

## Conventions

- Links use `NuxtLink`/`<a>`; actions that mutate local state use `<button type="button">` — never a `<div>`/`<span>` standing in for either.
- Never remove a focus outline without providing a visible `:focus-visible` replacement.
