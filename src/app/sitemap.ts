import { MetadataRoute } from "next";

// Never fall back to localhost — always use the real production domain.
// If NEXT_PUBLIC_SITE_URL is set but still points to localhost (e.g. during
// a Vercel build where the env var was misconfigured), override it.
function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (env && !env.includes("localhost") && env.startsWith("https://")) {
    return env.replace(/\/$/, ""); // strip trailing slash
  }
  return "https://sandaltreebysk.com";
}

const siteUrl = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
