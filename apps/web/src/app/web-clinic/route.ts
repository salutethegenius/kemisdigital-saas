import { renderMarketingPage } from "@/marketing/render";
import { SITE_URL } from "@/lib/site";

export async function GET() {
  return renderMarketingPage({
    id: "web-clinic",
    title: "Web Clinic — See Your New Website Before You Buy It",
    description:
      "Grand Bahama Business Launch from KemisDigital. Modern websites and business platforms starting from B$500. No setup fee until you approve the build for launch.",
    path: "/web-clinic",
    scripts: ["web-clinic"],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Grand Bahama Business Launch",
      alternateName: "Web Clinic",
      serviceType: "Website and business platform design",
      description:
        "Modern websites and business platforms for Grand Bahama businesses, starting from B$500. No setup fee until the client approves the build for launch.",
      provider: {
        "@type": "Organization",
        name: "KemisDigital",
        url: SITE_URL,
        email: "frontdesk@kemisdigital.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Freeport",
          addressRegion: "Grand Bahama",
          addressCountry: "BS",
        },
      },
      areaServed: [
        { "@type": "City", name: "Freeport" },
        { "@type": "AdministrativeArea", name: "Grand Bahama" },
        { "@type": "Country", name: "The Bahamas" },
      ],
      url: `${SITE_URL}/web-clinic`,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Grand Bahama Business Launch packages",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Display",
            price: "500",
            priceCurrency: "BSD",
            description:
              "Modern responsive website with up to 5–7 core pages, contact forms, hosting, and support. Monthly platform management from B$125.",
          },
          {
            "@type": "Offer",
            name: "Commerce",
            priceCurrency: "BSD",
            description:
              "Website plus payments, checkout, product or service sales, and confirmations. Setup from B$750 to B$1,000. Monthly management from B$175 to B$250.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "750",
              maxPrice: "1000",
              priceCurrency: "BSD",
            },
          },
          {
            "@type": "Offer",
            name: "Business Platform",
            price: "1500",
            priceCurrency: "BSD",
            description:
              "Custom digital workflow including booking, portals, memberships, and integrations. Monthly management from B$300+.",
          },
        ],
      },
    },
  });
}
