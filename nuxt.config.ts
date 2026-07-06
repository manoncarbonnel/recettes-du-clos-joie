export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Le Clos Joie — Recettes de la Famille Rouault',
      meta: [
        {
          name: 'description',
          content:
            'Les recettes ancestrales et délicieuses de la famille Rouault, depuis 1939.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Pinyon+Script&display=swap',
        },
      ],
    },
  },
})
