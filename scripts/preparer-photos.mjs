#!/usr/bin/env node
// Prépare les photos d'un dossier avant de les publier : redresse l'image,
// la ramène à 1600 px au plus et retire toutes les métadonnées (position GPS,
// modèle du téléphone, date). Les fichiers sont remplacés sur place.
//   npm run photos -- src/content/histoires/mon-histoire
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const dossier = process.argv[2];
if (!dossier) {
  console.error('Il manque le dossier. Exemple : npm run photos -- src/content/histoires/mon-histoire');
  process.exit(1);
}

const COTE_MAX = 1600;
const fichiers = (await readdir(dossier)).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (fichiers.length === 0) {
  console.log(`Aucune photo .jpg ou .png dans ${dossier}.`);
  process.exit(0);
}

for (const fichier of fichiers) {
  const chemin = join(dossier, fichier);
  const avant = await readFile(chemin);
  let image = sharp(avant)
    .rotate() // applique l'orientation enregistrée par le téléphone
    .resize({ width: COTE_MAX, height: COTE_MAX, fit: 'inside', withoutEnlargement: true });
  image = extname(fichier).toLowerCase() === '.png' ? image.png() : image.jpeg({ quality: 85, mozjpeg: true });
  const apres = await image.toBuffer(); // sharp n'écrit aucune métadonnée par défaut
  await writeFile(chemin, apres);
  const ko = (n) => `${Math.round(n / 1024)} ko`;
  console.log(`${fichier} : ${ko(avant.length)} → ${ko(apres.length)}`);
}
