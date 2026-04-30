/**
 * Post schema for the blog. Built to satisfy the AEO playbook
 * (market-intel §6): direct first-paragraph answers via excerpt,
 * FAQ schema injection via faqs[], Article schema via the page itself.
 */
import { defineField, defineType } from "@sanity/types";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
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
      name: "excerpt",
      title: "Excerpt",
      description:
        "Short SEO summary, also used as the first-paragraph direct answer for AEO.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      description:
        "Each item renders into the FAQ schema JSON-LD on the post page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(800),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, media, publishedAt }) {
      return {
        title: typeof title === "string" ? title : "Untitled post",
        subtitle:
          typeof publishedAt === "string"
            ? new Date(publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Unscheduled",
        media,
      };
    },
  },
});

export default post;
