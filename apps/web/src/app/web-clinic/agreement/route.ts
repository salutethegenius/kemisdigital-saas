import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "web-clinic-agreement",
    title: "Business Launch Service Agreement — Draft",
    description:
      "Working draft of the KemisDigital Business Launch Service Agreement for the Grand Bahama Web Clinic offer. A signed copy is issued after discovery.",
    path: "/web-clinic/agreement",
  });
}
