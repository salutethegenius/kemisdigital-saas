import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal — VerityOS Managed Pitch Sheet",
  description: "Internal sales document for VerityOS Managed. Not for public distribution.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalV1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
