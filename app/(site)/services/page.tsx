import type { Metadata } from "next";
import Script from "next/script";
import services from "@/app/_data/services.json";
import { CTA } from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end IT you can set and forget with managed support, migrations, security, and recovery.",
  alternates: {
    canonical: "/services"
  },
  openGraph: {
    title: "IT Services built for modern teams",
    description: "End-to-end IT you can set and forget with managed support, migrations, security, and recovery.",
    url: "/services"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.atlasitsolutions.example" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.atlasitsolutions.example/services" }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <Script id="breadcrumbs-services" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <section className="space-y-6 pb-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Services</p>
        <h1 className="text-4xl font-bold text-secondary">End-to-end IT you can set and forget.</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          From first device onboarding to quarterly security reviews, Atlas IT Solutions maintains your stack so teams can ship features, not tickets.
        </p>
      </section>
      <div className="grid gap-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="card h-full p-6">
            <h2 className="text-xl font-semibold text-secondary">{service.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{service.description}</p>
          </article>
        ))}
      </div>
      <CTA />
    </>
  );
}
