import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Impano Initiative Funds — Nourishing Futures, Empowering Children",
  description:
    "We are young changemakers dedicated to helping children from underprivileged backgrounds receive food at school, study in safety, and build a brighter future.",
  keywords: [
    "Impano",
    "Initiative",
    "Funds",
    "children",
    "school meals",
    "Rwanda",
    "nonprofit",
    "charity",
    "education",
    "nutrition",
  ],
  openGraph: {
    title: "Impano Initiative Funds",
    description:
      "Nourishing futures — ensuring no child goes to school hungry.",
    type: "website",
  },
};

import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <CustomCursor />
          <ScrollProgress />
          <NoiseOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
