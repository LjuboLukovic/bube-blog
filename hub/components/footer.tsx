import React from "react";

export function Footer() {
  return (
    <footer className="mt-8 mb-4 text-center text-sm text-muted-foreground">
      <p>
        {"© 2025 Ljubo"} |{" "}
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}
