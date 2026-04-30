/**
 * Barrel export for all Sanity schema types.
 * Pull this into a Studio config (sanity.config.ts) when the Studio is wired.
 */
import { post } from "./post";
import { category } from "./category";
import { author } from "./author";
import { blockContent } from "./blockContent";

export const schemaTypes = [post, category, author, blockContent];

export { post, category, author, blockContent };
