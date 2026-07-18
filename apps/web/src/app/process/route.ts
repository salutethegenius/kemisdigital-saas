import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "process",
    title: "Process — First Call to Live Platform",
    description:
      "How KemisDigital works: discovery, architecture, build, and launch — weekly deploys and a long-term technical partnership.",
    path: "/process",
  });
}
