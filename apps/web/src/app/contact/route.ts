import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "contact",
    title: "Contact — Start Building with KemisDigital",
    description:
      "Tell us what you're trying to solve. Contact KemisDigital in Nassau to start building your stack — frontdesk@kemisdigital.com.",
    path: "/contact",
  });
}
