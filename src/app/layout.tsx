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
const siteName = "Sandal Tree by SK";
const defaultTitle = "Sandal Tree by SK — Luxury Banquet Hall & Wedding Venue";
const defaultDesc =
  "Sandal Tree by SK is a premier luxury banquet hall in Delhi NCR offering grand spaces for weddings, receptions, engagements, corporate events, and birthday celebrations. Book your dream event today.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDesc,
  keywords: [
    "Sandal Tree by SK",
    "luxury banquet hall Delhi",
    "wedding venue Delhi NCR",
    "banquet hall Ghaziabad",
    "reception hall",
    "engagement ceremony venue",
    "corporate event venue Delhi",
    "birthday party hall",
    "luxury wedding venue",
    "premium banquet hall",
    "event venue near me",
    "wedding hall booking",
    "party hall Delhi",
    "anniversary celebration venue",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Event Venue",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDesc,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sandal Tree by SK — Luxury Banquet Hall and Wedding Venue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sandaltreebysk",
    creator: "@sandaltreebysk",
    title: defaultTitle,
    description: defaultDesc,
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
  verification: {
    // Add your Google Search Console / Bing verification codes here when available
    // google: "your-google-verification-code",
  },
};

// Schema.org structured data — LocalBusiness + EventVenue
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["EventVenue", "LocalBusiness"],
    "@id": `${siteUrl}/#venue`,
    name: siteName,
    alternateName: "Sandal Tree Banquet Hall",
    description:
      "A premier luxury banquet hall and event venue in Delhi NCR offering grand spaces for weddings, receptions, engagements, corporate events, birthdays, and anniversaries.",
    url: siteUrl,
    telephone: "+91-XXXXX-XXXXX",
    email: "info@sandaltreebysk.com",
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    image: [`${siteUrl}/og-image.jpg`, `${siteUrl}/favicon.jpg`],
    logo: `${siteUrl}/favicon.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.65295458315419,
      longitude: 77.32270977485058,
    },
    hasMap: "https://maps.app.goo.gl/igwQWRRDBFBV8LFb6",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Catering", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bridal Suite", value: true },
      { "@type": "LocationFeatureSpecification", name: "AV Equipment", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    ],
    maximumAttendeeCapacity: 1000,
    sameAs: [
      "https://instagram.com/sandaltreebysk",
      "https://maps.app.goo.gl/igwQWRRDBFBV8LFb6",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/contact`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Book an Event" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: defaultDesc,
    publisher: { "@id": `${siteUrl}/#venue` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/gallery?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
];

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
