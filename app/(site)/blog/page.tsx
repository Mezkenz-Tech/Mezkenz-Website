import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import posts from "@/app/_data/blog.json";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on security, productivity, and cloud from the Atlas IT Solutions team.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Atlas IT Solutions Blog",
    description: "Guides on security, productivity, and cloud from the Atlas IT Solutions team.",
    url: "/blog"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.atlasitsolutions.example" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.atlasitsolutions.example/blog" }
  ]
};

export default function BlogIndexPage() {
  return (
    <>
      <Script id="breadcrumbs-blog" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <section className="space-y-6 pb-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Blog</p>
        <h1 className="text-4xl font-bold text-secondary">Guides on security, productivity, and cloud.</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Practical advice for IT leads rolling out modern tooling and protecting distributed teams.
        </p>
      </section>
      <div className="grid gap-6 pb-24 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="card p-6">
            <p className="text-xs uppercase tracking-wide text-primary">{new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</p>
            <h2 className="mt-3 text-2xl font-semibold text-secondary">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">{post.readingTime} read</p>
          </article>
        ))}
      </div>
    </>
  );
}
