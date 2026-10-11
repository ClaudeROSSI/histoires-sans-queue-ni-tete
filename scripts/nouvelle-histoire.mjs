#!/usr/bin/env node
// Crée le dossier d'une nouvelle histoire, avec un index.md à compléter.
//   npm run nouvelle -- "Le titre de l'histoire"
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const titre = process.argv.slice(2).join(' ').trim();
if (!titre) {
  console.error('Il manque le titre. Exemple : npm run nouvelle -- "Le chat qui avait peur des souris"');
  process.exit(1);
}

const slug = titre
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const dossier = join('src', 'content', 'histoires', slug);
try {
  await access(dossier);
  console.error(`Le dossier ${dossier} existe déjà. Choisis un autre titre ou complète celui-ci.`);
  process.exit(1);
} catch {
  // le dossier n'existe pas : on peut le créer
}

const aujourdhui = new Date().toISOString().slice(0, 10);
const modele = `---
titre: ${JSON.stringify(titre)}
date: ${aujourdhui}
resume: ""
dessin: ""
# Tant que brouillon vaut true, l'histoire est visible avec « npm run dev »
# mais elle n'est pas publiée sur le site.
brouillon: true

# Dépose les images dans ce dossier, puis retire les « # » des lignes utiles.
# couverture: ./couverture.jpg
# couvertureAlt: Une phrase qui décrit le dessin.
# cases:
#   - image: ./case-1.jpg
#     alt: Une phrase qui décrit la case.
#     legende: Le texte affiché sous la case.
# manuscrit:
#   - image: ./manuscrit-1.jpg
#     alt: Première page du manuscrit.
---

Le texte de l'histoire s'écrit ici. Une ligne vide sépare deux paragraphes.
`;

await mkdir(dossier, { recursive: true });
await writeFile(join(dossier, 'index.md'), modele, 'utf8');
console.log(`Histoire créée : ${join(dossier, 'index.md')}`);
console.log('Ajoute les images dans ce dossier, complète le fichier, puis lance « npm run dev ».');
