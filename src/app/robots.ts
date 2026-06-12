import { MetadataRoute } from "next";

function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (env && !env.includes("localhost") && env.startsWith("https://")) {
    return env.replace(/\/$/, "");
  }
  return "https://sandaltreebysk.com";
}

const siteUrl = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
