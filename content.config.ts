import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    recettes: defineCollection({
      type: 'page',
      source: 'recettes/**',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        author: z.string(),
        category: z.enum(['entree', 'plat', 'dessert', 'accompagnement']),
        servings: z.number().optional(),
        slug: z.string(),
      }),
    }),
  },
})
