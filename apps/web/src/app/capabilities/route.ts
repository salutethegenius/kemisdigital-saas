import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "capabilities",
    title: "Capabilities — Payments, Portals & Platform Engineering",
    description:
      "KemisDigital builds payment infrastructure, business portals, systems integration, and production-ready platforms for Bahamian and Caribbean companies.",
    path: "/capabilities",
  });
}
