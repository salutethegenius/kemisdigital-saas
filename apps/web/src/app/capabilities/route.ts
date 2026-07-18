import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "capabilities",
    title: "Capabilities — Payments, Portals & Integration",
    description:
      "KemisDigital builds payment infrastructure, business portals, and systems integration for Bahamian companies.",
    path: "/capabilities",
  });
}
