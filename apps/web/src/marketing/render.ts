import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SITE_URL, SITE_NAME, SITE_OG_IMAGE } from "@/lib/site";
import { turnstileWidgetHtml } from "@/lib/turnstile";

const marketingDir = path.join(process.cwd(), "src", "marketing");

export type MarketingPageId =
  | "home"
  | "products"
  | "capabilities"
  | "process"
  | "work"
  | "contact"
  | "privacy";

export type MarketingPageOptions = {
  id: MarketingPageId;
  title: string;
  description: string;
  path: string;
  scripts?: Array<"home" | "products">;
  preloader?: boolean;
  gpoPopup?: boolean;
  jsonLd?: object | object[];
};

function readMarketing(relPath: string): string {
  return fs.readFileSync(path.join(marketingDir, relPath), "utf8");
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function markActiveNav(html: string, pageId: MarketingPageId): string {
  return html.replace(
    /(<a href="[^"]*" data-nav=")([^"]*)(">)/g,
    (match, prefix, navId, suffix) => {
      if (navId === pageId) {
        return `${prefix}${navId}" aria-current="page${suffix}`;
      }
      return match;
    },
  );
}

export function renderMarketingPage(
  options: MarketingPageOptions,
): NextResponse {
  const {
    id,
    title,
    description,
    path: pagePath,
    scripts = [],
    preloader = false,
    gpoPopup = false,
    jsonLd,
  } = options;

  const canonical = `${SITE_URL}${pagePath === "/" ? "/" : pagePath}`;
  const ogImage = `${SITE_URL}${SITE_OG_IMAGE}`;
  const styles = readMarketing("styles.css");
  const nav = markActiveNav(readMarketing("partials/nav.html"), id);
  const footer = readMarketing("partials/footer.html");
  const body = readMarketing(`pages/${id}.html`);
  const commonJs = readMarketing("scripts/common.js");
  const contactJs = readMarketing("scripts/contact.js");

  let contactSlider = readMarketing("partials/contact-slider.html");
  contactSlider = contactSlider.replace(
    "<!--TURNSTILE_WIDGET-->",
    turnstileWidgetHtml(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  );

  const extraScripts = scripts
    .map((name) => readMarketing(`scripts/${name}.js`))
    .join("\n");

  const jsonLdBlocks = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])
    .map(
      (block) =>
        `<script type="application/ld+json">\n${JSON.stringify(block, null, 2)}\n</script>`,
    )
    .join("\n");

  const bodyClass = preloader ? "" : "instant-nav";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeAttr(title)}</title>
<meta name="description" content="${escapeAttr(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="The Kemis Group of Companies">
<meta name="theme-color" content="#07080A">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.svg">
<link rel="manifest" href="/manifest.json">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${escapeAttr(title)}">
<meta property="og:description" content="${escapeAttr(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escapeAttr(title)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(title)}">
<meta name="twitter:description" content="${escapeAttr(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="twitter:image:alt" content="${escapeAttr(title)}">
${jsonLdBlocks}
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
${styles}
</style>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>

<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

${gpoPopup ? readMarketing("partials/gpo-popup.html") : ""}
${preloader ? readMarketing("partials/preloader.html") : ""}

<div class="grid-overlay"></div>

${nav}

${body}

${footer}

${contactSlider}

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script>
${commonJs}
${contactJs}
${extraScripts}
</script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
