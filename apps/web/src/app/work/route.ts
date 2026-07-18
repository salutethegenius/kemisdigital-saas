import { renderMarketingPage } from "@/marketing/render";

export async function GET() {
  return renderMarketingPage({
    id: "work",
    title: "Work — Deployed Platforms We've Built",
    description:
      "Case studies from KemisDigital: Grand Bahama Business Directory, Grand Bahama Rewards, BACO Membership Portal, Bahamas Central Securities Depository, and Urban Nassau Rides.",
    path: "/work",
  });
}
