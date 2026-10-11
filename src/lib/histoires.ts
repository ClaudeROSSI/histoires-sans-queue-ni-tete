import { getCollection, type CollectionEntry } from 'astro:content';

export type Histoire = CollectionEntry<'histoires'> & { numero: number; slug: string };

/** Les histoires dans l'ordre du recueil (la plus ancienne porte le n° 1). */
export async function lireHistoires(): Promise<Histoire[]> {
  const toutes = await getCollection('histoires', ({ data }) =>
    import.meta.env.PROD ? !data.brouillon : true,
  );
  return toutes
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .map((h, i) => ({ ...h, numero: i + 1, slug: h.id.replace(/\/index$/, '') }));
}
