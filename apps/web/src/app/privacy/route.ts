import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "privacy",
    title: "Privacy Policy",
    description:
      "How KemisDigital collects, uses, and protects information shared through kemisdigital.com and our contact and application forms.",
    path: "/privacy",
  });
}
