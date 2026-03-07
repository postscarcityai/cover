import type { MetadataRoute } from "next"
import { siteConfig } from "@/site.config"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url
  const sitemapUrl = `${baseUrl.replace(/\/$/, "")}/sitemap.xml`

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/", "/admin/", "/dashboard/", "/checkout/", "/private/", "/temp/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/", "/api/", "/admin/", "/dashboard/", "/private/", "/temp/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "YouBot",
          "CCBot",
          "DuckDuckBot",
          "Applebot",
          "Slurp",
        ],
        allow: "/",
      },
      {
        userAgent: ["facebookexternalhit", "Twitterbot", "LinkedInBot"],
        allow: "/",
      },
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
        crawlDelay: 10,
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
        crawlDelay: 10,
      },
      {
        userAgent: "MJ12bot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
        crawlDelay: 10,
      },
    ],
    sitemap: sitemapUrl,
    host: baseUrl.replace(/\/$/, ""),
  }
}
