# Histoires sans queue ni tête

Un recueil d'histoires inventées à la maison, à partir d'un dessin.
Le site est publié avec GitHub Pages : <https://clauderossi.github.io/histoires-sans-queue-ni-tete/>

## Lancer le site sur son ordinateur

Il faut Node.js 22 ou plus récent.

```bash
npm install
npm run dev
```

Le site s'ouvre sur <http://localhost:4321/histoires-sans-queue-ni-tete/> et se recharge à chaque modification.

## Ajouter une histoire

Une histoire, c'est un dossier dans `src/content/histoires/` : un fichier `index.md` et ses images à côté.

1. Créer le dossier :

   ```bash
   npm run nouvelle -- "Le titre de l'histoire"
   ```

2. Déposer les photos dans le dossier créé, puis les préparer (taille réduite, métadonnées retirées) :

   ```bash
   npm run photos -- src/content/histoires/le-titre-de-l-histoire
   ```

3. Compléter `index.md` : l'en-tête décrit l'histoire, le texte s'écrit en dessous.
4. Vérifier le résultat avec `npm run dev`.
5. Passer `brouillon` à `false` (ou supprimer la ligne), puis pousser sur `main` : le site se met à jour tout seul.

### Les champs de l'en-tête

| Champ | Obligatoire | Rôle |
| --- | --- | --- |
| `titre` | oui | Le titre de l'histoire. |
| `date` | oui | La date de l'histoire (`AAAA-MM-JJ`). Elle fixe l'ordre et le numéro dans le recueil. |
| `resume` | non | Une ou deux phrases affichées sur la page d'accueil. |
| `dessin` | non | Le prénom de la personne qui a dessiné. |
| `texte` | non | Le prénom de la personne qui a écrit. |
| `couverture` | non | L'image affichée sur la page d'accueil. |
| `couvertureAlt` | non | La description de cette image, pour les personnes qui ne la voient pas. |
| `cases` | non | Les cases de la bande dessinée, dans l'ordre : `image`, `alt`, `legende`. |
| `manuscrit` | non | Les photos des pages manuscrites : `image`, `alt`. |
| `brouillon` | non | `true` pour préparer une histoire sans la publier. |

Les chemins d'images sont relatifs au dossier de l'histoire, par exemple `./case-1.jpg`.
Une faute dans l'en-tête ou une image introuvable arrête la construction du site avec un message qui dit où regarder.

### Les cases de la bande dessinée

Une case peut être une photo d'un dessin (`.jpg`, `.png`) ou un dessin vectoriel (`.svg`).
Le format 3 × 2 (par exemple 1200 × 800 px) donne le meilleur résultat : une image d'une autre proportion est recadrée au centre.
Pour remplacer une case par un nouveau dessin, il suffit de changer le chemin `image` de la case.

### La ponctuation

Les espaces devant `! ? ; :` et à l'intérieur des guillemets `« »` deviennent insécables à la construction du site (voir `src/lib/typo.mjs`).
On peut donc écrire le texte avec des espaces ordinaires.

## Publier sur GitHub Pages

À faire une seule fois :

1. Créer sur GitHub un dépôt public nommé `histoires-sans-queue-ni-tete`, sans README ni licence.
2. Envoyer le projet :

   ```bash
   git init -b main
   git add .
   git commit -m "Première histoire : Snif-Snif, le chien renifleur"
   git remote add origin git@github.com:ClaudeROSSI/histoires-sans-queue-ni-tete.git
   git push -u origin main
   ```

3. Dans le dépôt, ouvrir **Settings > Pages** et choisir **GitHub Actions** comme source.

Ensuite, chaque `git push` sur `main` reconstruit et publie le site (voir `.github/workflows/deploy.yml`).

Si le dépôt porte un autre nom, ou si le compte change, il faut adapter `site` et `base` dans `astro.config.mjs`,
ainsi que le lien du pied de page dans `src/layouts/Base.astro`.

## Avant de publier une photo

Le dépôt est public, et son historique aussi : un fichier supprimé plus tard reste consultable.

- Lancer `npm run photos` sur le dossier : la commande retire la position GPS et les autres métadonnées.
- Vérifier ce qu'on voit autour de la feuille (courrier, écran, visage).
- Ne mettre que des prénoms.

## Organisation du projet

```
src/
  content/histoires/   une histoire par dossier
  content.config.ts    la liste des champs autorisés
  pages/               la page d'accueil et la page d'une histoire
  layouts/Base.astro   l'habillage commun
  components/          l'emblème et l'affichage des images
  styles/global.css    les couleurs, les polices, la mise en page
  lib/                 les liens, le tri des histoires, la typographie
scripts/               les commandes « nouvelle » et « photos »
```
