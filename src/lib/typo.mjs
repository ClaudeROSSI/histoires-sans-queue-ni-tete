// Typographie française : pas de retour à la ligne avant « ! ? ; : » ni à
// l'intérieur des guillemets. On remplace l'espace ordinaire par une espace
// insécable, pour pouvoir écrire les histoires sans y penser.
const FINE = ' '; // espace fine insécable
const INSECABLE = ' ';

/** Pour un texte brut : titre, résumé, légende. */
export function espaces(texte) {
  return texte
    .replace(/ +([!?;]+)/g, `${FINE}$1`)
    .replace(/ +:/g, `${INSECABLE}:`)
    .replace(/« +/g, `«${INSECABLE}`)
    .replace(/ +»/g, `${INSECABLE}»`);
}

/** Pour du HTML : seul le texte entre les balises est modifié. */
export function espacesHtml(html) {
  return html.replace(/>([^<]+)</g, (_, texte) => `>${espaces(texte)}<`);
}
