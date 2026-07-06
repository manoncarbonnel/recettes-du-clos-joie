<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>

<style>
:root {
  --cream: #faf8f3;
  --cream-dark: #f0ebe0;
  --brown: #2c1810;
  --brown-light: #5c3d2e;
  --gold: #c4945a;
  --gold-light: #e8c9a0;
  --gold-text: #6f4b20;
  --text: #3a2a1f;
  --text-muted: #644f46;
  --border: #ddd0c0;
  --font-serif: 'EB Garamond', Georgia, serif;
  --font-script: 'Pinyon Script', cursive;
  --font-caps: 'Cinzel', Georgia, serif;
  --radius: 4px;
  --max-width: 1100px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 20px;
  scroll-behavior: smooth;
}

body {
  background-color: var(--cream);
  color: var(--text);
  font-family: var(--font-serif), serif;
  font-weight: 400;
  line-height: 1.7;
  min-height: 100vh;
}

a {
  color: var(--gold-text);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1, h2, h3 {
  font-family: var(--font-serif), serif;
  font-weight: 400;
  line-height: 1.3;
  color: var(--brown);
}
</style>
