import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSettingsProvider } from "@/hooks/use-theme-settings";
import { Toaster } from "@/components/ui/toaster";
import data from "@/data.json"; // Import data.json to get initial theme type

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ljubo Lukovic – Hub",
  description: "Online prezentacija - Svi projekti i linkovi na jednom mestu.",
  keywords: [
    "Ljubo Lukovic",
    "ljubo.rs",
    "ljubo",
    "Bube",
    "Hub",
    "projekti",
    "React Srbija",
    "programiranje",
    "sajtovi",
  ],
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ljubo Lukovic – Hub",
      },
    ],
  },
};

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use the 'type' from data.json for the initial defaultTheme
  const initialThemeType = data.themeSettings.type || "system";
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="sr" suppressHydrationWarning className="font-sans">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <GoogleAnalytics gaId={googleAnalyticsId} debugMode={!isProduction} />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={initialThemeType}
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSettingsProvider>
            {children}
            <Toaster />
          </ThemeSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
