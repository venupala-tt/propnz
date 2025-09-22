// lib/contentful-helpers.ts
import { Asset, AssetFile } from "contentful";

/**
 * Safely extract the URL from a Contentful Asset
 */
export function getHeroUrl(heroImage: unknown): string | undefined {
  const asset = heroImage as Asset | undefined;
  const file = asset?.fields?.file as AssetFile | string | undefined;

  if (typeof file === "object" && file?.url) {
    return file.url.startsWith("http") ? file.url : `https:${file.url}`;
  } else if (typeof file === "string") {
    return file.startsWith("http") ? file : `https:${file}`;
  }
  return undefined;
}

/**
 * Ensure title (or any field) is always returned as a string
 */
export function safeString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}
