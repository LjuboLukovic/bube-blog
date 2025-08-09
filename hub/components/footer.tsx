import { BLOG_URL } from "@/lib/constants";
import React from "react";

export function Footer() {
  return (
    <footer className="mt-8 mb-4 text-center text-sm text-muted-foreground">
      <p>
        {"© 2025"} |{" "}
        <a href={`${BLOG_URL}/privacy.html`} className="hover:underline">
          Politika privatnosti
        </a>
      </p>
    </footer>
  );
}
