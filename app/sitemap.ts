import type { MetadataRoute } from "next";
import products from "@/app/_data/products.json";
import posts from "@/app/_data/blog.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.atlasitsolutions.example";
  const staticPages = ["", "services", "products", "about", "contact", "blog"].map((path) => ({
    url: `${baseUrl}/${path}`.replace(/\/$/, ""),
    lastModified: new Date()
  }));

  const productEntries = products.map((product) => ({
    url: `${baseUrl}/products#${product.slug}`,
    lastModified: new Date()
  }));

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [...staticPages, ...productEntries, ...blogEntries];
}
