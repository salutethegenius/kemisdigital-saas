import { SITE_URL } from "@/lib/site";
import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "products",
    title: "Products — KemisDigital KGC Ecosystem",
    description:
      "Six connected products in the KGC ecosystem — KemisPay, LawBey, KemisEMAIL, PileIt, GrandBridge, and KRM Desk — built for Bahamian business.",
    path: "/products",
    scripts: ["products"],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "KemisDigital Product Ecosystem",
      url: `${SITE_URL}/products`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "KemisPay", url: "https://kemispay.com" },
        { "@type": "ListItem", position: 2, name: "LawBey", url: "https://lawbey.com" },
        { "@type": "ListItem", position: 3, name: "KemisEMAIL", url: "https://kemis.email" },
        { "@type": "ListItem", position: 4, name: "PileIt", url: "https://pileit.app" },
        { "@type": "ListItem", position: 5, name: "GrandBridge", url: "https://mygrandbridge.com" },
        { "@type": "ListItem", position: 6, name: "KRM Desk", url: "https://krmdesk.com" },
      ],
    },
  });
}
