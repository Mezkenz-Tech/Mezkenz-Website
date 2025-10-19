import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import posts from "@/app/_data/blog.json";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = posts.find((entry) => entry.slug === params.slug);
  if (!post) {
    return {
      title: "Post not found"
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date
    },
    twitter: {
      title: post.title,
      description: post.excerpt
    }
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find((entry) => entry.slug === params.slug);
  if (!post) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.atlasitsolutions.example" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.atlasitsolutions.example/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.atlasitsolutions.example/blog/${post.slug}` }
    ]
  };

  return (
    <>
      <Script id={`breadcrumbs-blog-${post.slug}`} type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <article className="max-w-3xl pb-24">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
        <h1 className="mt-2 text-4xl font-bold text-secondary">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
        <div className="mt-8 space-y-8 text-base leading-relaxed text-slate-700">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold text-secondary">{section.heading}</h2>
              <p className="mt-3 text-base text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
