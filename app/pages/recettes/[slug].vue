<script setup lang="ts">
const route = useRoute()

const { data: recette } = await useAsyncData(
  `recette-${route.params.slug}`,
  () =>
    queryCollection('recettes')
      .where('slug', '=', route.params.slug as string)
      .first(),
)

if (!recette.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Recette introuvable',
    fatal: true,
  })
}

useSeoMeta({
  title: `${recette.value.title} — Le Clos Joie`,
  description: recette.value.subtitle,
})

const categoryLabel: Record<string, string> = {
  entree: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
  accompagnement: 'Accompagnement',
}
</script>

<template>
  <div class="page">
    <nav class="topbar">
      <NuxtLink to="/" class="back-link">
        ← Toutes les recettes
      </NuxtLink>
      <span class="topbar-name">Le Clos Joie</span>
    </nav>

    <main v-if="recette">
      <article>
        <header class="recipe-header">
          <span class="recipe-category">{{ categoryLabel[recette.category] }}</span>
          <h1 class="recipe-title">{{ recette.title }}</h1>
          <p v-if="recette.subtitle" class="recipe-subtitle">{{ recette.subtitle }}</p>
          <div class="recipe-meta">
            <span class="recipe-author">{{ recette.author }}</span>
            <span v-if="recette.servings" class="recipe-servings">· {{ recette.servings }} personnes</span>
          </div>
        </header>

        <div class="recipe-body">
          <ContentRenderer :value="recette" class="prose" />
        </div>
      </article>
    </main>

    <footer class="site-footer">
      <OrnamentGarland class="footer-garland" />
      <p>Noël 2015 · Famille Rouault</p>
      <p class="footer-credits">Idée originale : Hélène Rouault · Design du livre : Bruno Nguyen</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: var(--brown);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 2rem;
}

.back-link {
  color: var(--gold-light);
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: white;
  text-decoration: none;
}

.topbar-name {
  font-family: var(--font-serif), serif;
  font-style: italic;
  color: rgba(255,255,255,0.65);
  font-size: 1rem;
}

.recipe-header {
  text-align: center;
  padding: 3.5rem 1.5rem 2.5rem;
  border-bottom: 1px solid var(--border);
  background: white;
}

.recipe-category {
  font-family: var(--font-caps), serif;
  font-size: 1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-text);
  display: block;
  margin-bottom: 1rem;
}

.recipe-title {
  font-family: var(--font-script), serif;
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  color: var(--brown);
  max-width: 700px;
  margin: 0 auto 1rem;
}

.recipe-subtitle {
  font-family: var(--font-serif), serif;
  font-style: italic;
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.recipe-meta {
  font-size: 1rem;
  color: var(--text-muted);
}

.recipe-author {
  font-style: italic;
  font-weight: 400;
  color: var(--gold-text);
}

.recipe-servings {
  margin-left: 0.25rem;
}

.recipe-body {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  flex: 1;
}

.site-footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--border);
  font-size: 1rem;
  color: var(--text-muted);
  font-family: var(--font-serif), serif;
  font-style: italic;
  margin-top: auto;
}

.footer-credits {
  margin-top: 0.4rem;
  font-size: 1rem;
}

.footer-garland {
  display: block;
  margin: 0 auto 0.5rem;
}
</style>

<style>
.prose h2 {
  font-family: var(--font-serif), serif;
  font-size: 1.25rem;
  color: var(--brown);
  margin: 2rem 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}

.prose h3 {
  font-family: var(--font-serif), serif;
  font-size: 1.05rem;
  color: var(--brown-light);
  margin: 1.5rem 0 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.prose ul {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
}

.prose ul li {
  padding: 0.3rem 0 0.3rem 1.5rem;
  position: relative;
  border-bottom: 1px solid var(--cream-dark);
  font-size: 1rem;
}

.prose ul li::before {
  content: '·';
  position: absolute;
  left: 0.4rem;
  color: var(--gold);
  font-size: 1.2rem;
  line-height: 1.5;
}

.prose strong {
  font-weight: 400;
  color: var(--brown);
}
</style>
