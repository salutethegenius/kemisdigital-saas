/**
 * Centralized site URL configuration.
 *
 * Falls back to the production domain when NEXT_PUBLIC_SITE_URL is not set,
 * so local dev and preview deploys work without extra config while production
 * canonical/OG/sitemap URLs remain correct.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://kemisdigital.com";

export const SITE_NAME = "KemisDigital";
export const SITE_TAGLINE =
  "Software Platforms for Bahamian Business";
export const SITE_DESCRIPTION =
  "KemisDigital designs and builds software platforms for Bahamian businesses — payments, portals, automation, and AI tools on production-ready infrastructure.";
export const SITE_OG_IMAGE = "/og-image.svg";
