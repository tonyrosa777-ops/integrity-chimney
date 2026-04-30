/**
 * Author schema. Defaults to Kevin Fredrickson, the owner-operator.
 * Single-author blog for now; the schema supports adding guest contributors
 * later (for example, a real-estate-attorney guest post).
 */
import { defineField, defineType } from "@sanity/types";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      initialValue: "Kevin Fredrickson",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "image",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.max(400),
    }),
  ],
});

export default author;
