import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.atlasitsolutions.example";
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
