/**
 * GROQ queries for the blog. Centralized here so both pages and the
 * generateStaticParams helper share one source of truth.
 *
 * Shape notes:
 *   - `mainImage` is projected with `asset->` so the image-url builder can
 *     consume it; alt is required at the schema level.
 *   - `categories[]->{title, slug}` flattens the references for cards.
 *   - `seo` and `faqs` are projected as raw nested objects, used by the
 *     metadata function and JSON-LD injection on /blog/[slug].
 */

export const postsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->,
      alt,
      hotspot
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->,
      alt,
      hotspot
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    body,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl
    },
    faqs[] {
      question,
      answer
    },
    "author": *[_type == "author"][0] {
      name,
      bio,
      image { asset->, alt }
    }
  }
`;

export const latestPostsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->,
      alt,
      hotspot
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const relatedPostsQuery = /* groq */ `
  *[_type == "post" && slug.current != $slug && defined(slug.current)]
    | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage {
        asset->,
        alt,
        hotspot
      },
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
`;

export const allPostSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`;
