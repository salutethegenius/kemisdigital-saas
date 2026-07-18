import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "home",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    path: "/",
    preloader: true,
    gpoPopup: true,
    scripts: ["home"],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/og-image.svg`,
        description:
          "KemisDigital designs and builds software platforms for Bahamian businesses.",
        email: "frontdesk@kemisdigital.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nassau",
          addressCountry: "BS",
        },
        sameAs: [
          "https://kemispay.com",
          "https://verityos.net",
          "https://kemis.email",
          "https://krmdesk.com",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "KemisDigital designs and builds software platforms for Bahamian businesses.",
      },
    ],
  });
}
