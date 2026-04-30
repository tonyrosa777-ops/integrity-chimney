import type { Metadata } from "next";
import { GalleryClient } from "./GalleryClient";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Real chimney, masonry, and roofing work across Bow, Concord, Hopkinton, Henniker, Loudon, and Pembroke. Before/after pairs, historic restorations, and Level 2 inspection documentation.",
  openGraph: {
    title: "Gallery | Integrity Chimney Services LLC",
    description:
      "Real chimney, masonry, and roofing work across central New Hampshire. Before/after pairs, historic restorations, and Level 2 inspections.",
  },
};

export default function GalleryPage() {
  return (
    <>
      <GalleryClient />
      <FinalCTA />
    </>
  );
}
