// Le site est servi dans un sous-dossier (voir `base` dans astro.config.mjs) :
// tous les liens internes passent par ici pour porter le bon préfixe.
const racine = import.meta.env.BASE_URL.replace(/\/$/, '');

export const lien = (chemin = '/') => `${racine}${chemin}`;
