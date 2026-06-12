import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { PageLoader } from "@/components/layout/page-loader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sandaltreebysk.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  title: {
    default: "Sandal Tree by SK — Luxury Banquet Hall & Event Venue",
    template: "%s | Sandal Tree by SK",
  },
  description:
    "Experience timeless elegance at Sandal Tree by SK — a premier luxury banquet hall and event venue for weddings, receptions, engagements, and corporate events.",
  keywords: [
    "banquet hall",
    "wedding venue",
    "reception hall",
    "event venue",
    "Sandal Tree by SK",
    "luxury wedding",
    "premium event space",
    "engagement ceremony venue",
    "corporate event venue",
  ],
  authors: [{ name: "Sandal Tree by SK" }],
  creator: "Sandal Tree by SK",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Sandal Tree by SK",
    title: "Sandal Tree by SK — Luxury Banquet Hall & Event Venue",
    description:
      "Experience timeless elegance at Sandal Tree by SK — a premier luxury banquet hall and event venue for weddings, receptions, and corporate events.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sandal Tree by SK — Luxury Banquet Hall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandal Tree by SK — Luxury Banquet Hall & Event Venue",
    description:
      "Experience timeless elegance at Sandal Tree by SK — a premier luxury banquet hall and event venue.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Sandal Tree by SK",
  description:
    "A premier luxury banquet hall for weddings, receptions, engagements, corporate events, and all celebrations.",
  url: siteUrl,
  telephone: "+91XXXXXXXXXX",
  email: "info@sandaltreebysk.com",
  sameAs: ["https://instagram.com/sandaltreebysk"],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Catering", value: true },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <PageLoader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
