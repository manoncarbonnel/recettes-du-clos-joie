import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const a11yTags = ['RGAAv4', 'wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa']

test("la page d'accueil ne doit avoir aucune violation d'accessibilité", async ({
  page,
}) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page }).withTags(a11yTags).analyze()

  expect(results.violations).toEqual([])
})

test("une page recette ne doit avoir aucune violation d'accessibilité", async ({
  page,
}) => {
  await page.goto('/')
  await page.locator('.card').first().click()
  await page.waitForURL('/recettes/**')

  const results = await new AxeBuilder({ page }).withTags(a11yTags).analyze()

  expect(results.violations).toEqual([])
})
