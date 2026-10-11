import { defineConfig } from 'astro/config';

// Adresse du site : https://clauderossi.github.io/histoires-sans-queue-ni-tete/
// Si le dépôt est renommé, `base` doit porter le nouveau nom.
export default defineConfig({
  site: 'https://clauderossi.github.io',
  base: '/histoires-sans-queue-ni-tete',
  trailingSlash: 'always',
});
