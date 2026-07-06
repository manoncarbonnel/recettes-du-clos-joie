<script setup lang="ts">
const { data: recettes } = await useAsyncData('recettes', () =>
  queryCollection('recettes').order('title', 'ASC').all(),
)

const categories = [
  { key: 'all', label: 'Toutes' },
  { key: 'entree', label: 'Entrées' },
  { key: 'plat', label: 'Plats' },
  { key: 'accompagnement', label: 'Accompagnements' },
  { key: 'dessert', label: 'Desserts' },
]

const activeCategory = ref('all')
const searchQuery = ref('')

const filtered = computed(() => {
  const byCategory =
    activeCategory.value === 'all'
      ? recettes.value
      : recettes.value?.filter((r) => r.category === activeCategory.value)

  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return byCategory

  return byCategory?.filter((r) =>
    [r.title, r.subtitle, r.author].some((field) => field?.toLowerCase().includes(query)),
  )
})

const categoryLabel: Record<string, string> = {
  entree: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
  accompagnement: 'Accompagnement',
}
</script>

<template>
  <div>
    <header class="site-header">
      <div class="header-inner">
        <p class="header-since">Depuis 1939</p>
        <h1 class="header-title">Le Clos Joie</h1>
        <p class="header-subtitle">Les Recettes Ancestrales et Délicieuses<br>de la Famille Rouault</p>
        <blockquote class="header-quote">
          « Après un bon dîner, on n'en veut plus à personne, même pas à sa propre famille. »
          <cite>— Oscar Wilde</cite>
        </blockquote>
      </div>
    </header>

    <main class="main">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="search"
          class="search-input"
          placeholder="Rechercher une recette"
          aria-label="Rechercher une recette"
        >
      </div>

      <div class="categories" role="group" aria-label="Filtrer par catégorie">
        <button
          v-for="cat in categories"
          :key="cat.key"
          :class="['cat-btn', { active: activeCategory === cat.key }]"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <p class="results-count" aria-live="polite">
        {{ filtered?.length }} recette{{ (filtered?.length ?? 0) > 1 ? 's' : '' }}
      </p>

      <div class="grid">
        <NuxtLink
          v-for="recette in filtered"
          :key="recette.slug"
          :to="`/recettes/${recette.slug}`"
          class="card"
        >
          <span class="card-category">{{ categoryLabel[recette.category] }}</span>
          <h2 class="card-title">{{ recette.title }}</h2>
          <p v-if="recette.subtitle" class="card-subtitle">{{ recette.subtitle }}</p>
          <p class="card-author">— {{ recette.author }}</p>
        </NuxtLink>
      </div>
    </main>

    <footer class="site-footer">
      <OrnamentGarland class="footer-garland" />
      <p>Noël 2015 · Famille Rouault</p>
      <p class="footer-credits">Idée originale : Hélène Rouault · Design du livre : Bruno Nguyen</p>
    </footer>
  </div>
</template>

<style scoped>
.site-header {
  position: relative;
  background-color: var(--brown);
  color: var(--cream);
  text-align: center;
  padding: 4rem 2rem 3rem;
}


.header-inner {
  max-width: 600px;
  margin: 0 auto;
}

.header-since {
  font-family: var(--font-caps), serif;
  text-transform: uppercase;
  color: var(--gold-light);
  font-size: 1rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.75rem;
}

.header-title {
  font-family: var(--font-script), serif;
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  color: var(--cream);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-family: var(--font-serif), serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--gold-light);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.header-quote {
  border-top: 1px solid rgba(255,255,255,0.15);
  padding-top: 1.5rem;
  font-family: var(--font-serif), serif;
  font-style: italic;
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  max-width: 480px;
  margin: 0 auto;
}

.header-quote cite {
  display: block;
  margin-top: 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--gold-light);
  font-style: normal;
}

.main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
}

.search-bar {
  margin-bottom: 1.25rem;
}

.search-input {
  width: 100%;
  font-family: var(--font-serif), serif;
  font-size: 1rem;
  padding: 0.65rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: white;
  color: var(--text);
}

.search-input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(196, 148, 90, 0.12);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.categories {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.cat-btn {
  font-family: var(--font-caps), serif;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.cat-btn:hover {
  border-color: var(--gold-text);
  color: var(--gold-text);
}

.results-count {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.cat-btn.active {
  background: var(--brown);
  border-color: var(--brown);
  color: var(--cream);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  color: var(--text);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  text-decoration: none;
}

.card:hover {
  border-color: var(--gold);
  box-shadow: 0 4px 20px rgba(196, 148, 90, 0.12);
  transform: translateY(-2px);
  text-decoration: none;
}

.card-category {
  font-family: var(--font-caps), serif;
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-text);
  font-weight: 400;
  margin-bottom: 0.6rem;
}

.card-title {
  font-family: var(--font-script), serif;
  font-size: 2rem;
  color: var(--brown);
  margin-bottom: 0.3rem;
}

.card-subtitle {
  font-family: var(--font-serif), serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.5;
  flex: 1;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-author {
  font-style: italic;
  font-size: 1rem;
  color: var(--gold-text);
  margin-top: auto;
}

.site-footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--border);
  font-size: 1rem;
  color: var(--text-muted);
  font-family: var(--font-serif), serif;
  font-style: italic;
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
