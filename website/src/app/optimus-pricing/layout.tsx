import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

/**
 * /optimus-pricing layout: hosts the metadata for the client-component page.
 * This is an internal sales tool. It is DELETED before launch.
 * robots: noindex / nofollow per build spec.
 */

export function generateMetadata(): Metadata {
  return {
    title: "Optimus Pricing Tool",
    description:
      "Internal sales presentation tool for Optimus Business Solutions website packages.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function OptimusPricingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
