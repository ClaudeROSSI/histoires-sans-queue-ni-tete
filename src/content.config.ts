import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une histoire = un dossier dans src/content/histoires/, avec un index.md
// et ses images à côté. Voir le README pour le détail des champs.
const histoires = defineCollection({
  loader: glob({ base: './src/content/histoires', pattern: '*/index.md' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      date: z.coerce.date(),
      resume: z.string().optional(),
      dessin: z.string().optional(),
      texte: z.string().optional(),
      couverture: image().optional(),
      couvertureAlt: z.string().default(''),
      cases: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            legende: z.string(),
          }),
        )
        .default([]),
      manuscrit: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          }),
        )
        .default([]),
      brouillon: z.boolean().default(false),
    }),
});

export const collections = { histoires };
