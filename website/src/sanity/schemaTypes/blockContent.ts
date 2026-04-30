/**
 * Block (Portable Text) content schema for post bodies.
 * Standard styles + inline images + code blocks + an optional simple table.
 *
 * AEO note: H2 anchors auto-generated from headings power the Table of
 * Contents component on /blog/[slug]; that component lives client-side.
 */
import { defineArrayMember, defineField, defineType } from "@sanity/types";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code Block",
      type: "object",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          initialValue: "text",
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 8,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineArrayMember({
      name: "simpleTable",
      title: "Table",
      type: "object",
      fields: [
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              name: "row",
              fields: [
                {
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
});

export default blockContent;
