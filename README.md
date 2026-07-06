# Le Clos Joie — Recettes de la Famille Rouault

Blog de recettes familiales numérisant *Les recettes délicieuses et ancestrales de la Famille Rouault*, un livre compilé par Hélène pour Noël 2015. « Le Clos Joie » est le lieu de rassemblement familial qui donne son nom au site.

37 recettes (entrées, plats, accompagnements, desserts) transmises par Mamyleine, Hélène, Emmanuelle, Isabelle et Mémé Bonhomme.

## Stack

- [Nuxt 4](https://nuxt.com) + [Nuxt Content v3](https://content.nuxt.com) (contenu en markdown, schéma validé par Zod)
- CSS natif — pas de Tailwind ni de librairie de composants
- [Biome](https://biomejs.dev) pour le lint/format
- [Playwright](https://playwright.dev) + [axe-core](https://github.com/dequelabs/axe-core) pour les tests d'accessibilité
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) pour les audits performance/a11y/best-practices

## Setup

```bash
npm install
```

## Développement

```bash
npm run dev
```

Site disponible sur `http://localhost:3000`.

## Build & production

```bash
npm run build      # build de production
npm run generate   # génération statique
npm run preview    # prévisualiser le build localement
```

## Qualité

```bash
npm run lint            # vérifie le code avec Biome
npm run format           # formate le code avec Biome
npm run test:a11y        # tests d'accessibilité Playwright + axe-core
npm run test:lighthouse  # audits Lighthouse (perf, a11y, best-practices)
```

## Structure

- `content/recettes/*.md` — les recettes, en markdown avec frontmatter (`title`, `subtitle`, `author`, `category`, `servings`, `slug`)
- `content.config.ts` — schéma de la collection `recettes`
- `app/pages/index.vue` — accueil : recherche, filtres par catégorie, grille de recettes
- `app/pages/recettes/[slug].vue` — page d'une recette
- `app/components/OrnamentGarland.vue` — élément décoratif SVG
- `tests/a11y.spec.ts` — tests d'accessibilité

## Crédits

Idée originale : Hélène Rouault · Design du livre original : Bruno Nguyen
