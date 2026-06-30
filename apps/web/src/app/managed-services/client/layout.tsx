import type { Metadata } from "next";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "VerityOS Managed — Private AI Infrastructure for Bahamian Business",
  description:
    "VerityOS Managed is a fully private, AI-powered knowledge platform deployed on your own hardware. Staff ask questions in plain language and get answers from your own documents — your data never leaves the building.",
  alternates: {
    canonical: "/managed-services/client",
  },
  openGraph: {
    title: "VerityOS Managed — Private AI Infrastructure for Bahamian Business",
    description:
      "A fully private, AI-powered knowledge platform deployed on your own hardware. Your data never leaves the building. Managed end-to-end by The Kemis Group.",
    url: `${SITE_URL}/managed-services/client`,
    siteName: "KemisDigital",
    type: "website",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "VerityOS Managed — Private AI Infrastructure for Bahamian Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VerityOS Managed — Private AI Infrastructure for Bahamian Business",
    description:
      "A fully private, AI-powered knowledge platform deployed on your own hardware. Your data never leaves the building.",
    images: [SITE_OG_IMAGE],
  },
};

export default function ManagedServicesClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
