import type { Metadata } from "next";
import LinkTree from "@/components/link-tree";

export const metadata: Metadata = {
  title: "Ljubo Lukovic – Hub",
  description: "Online prezentacija - Svi projekti i linkovi na jednom mestu.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 pt-8 bg-secondary">
      <LinkTree />
    </main>
  );
}
