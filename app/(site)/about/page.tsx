import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded by IT support leads, Atlas IT Solutions focuses on predictable, proactive support for productive teams.",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "About Atlas IT Solutions",
    description:
      "Founded by IT support leads, Atlas IT Solutions focuses on predictable, proactive support for productive teams.",
    url: "/about"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.atlasitsolutions.example" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.atlasitsolutions.example/about" }
  ]
};

export default function AboutPage() {
  return (
    <>
      <Script id="breadcrumbs-about" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <section className="space-y-6 pb-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">About</p>
        <h1 className="text-4xl font-bold text-secondary">We keep teams productive.</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Founded by IT support leads who’ve onboarded dozens of teams, Atlas IT Solutions focuses on predictable, proactive support. We align tooling, security, and training so your people can focus on work—not tickets.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary">Our approach</h2>
            <p className="mt-3 text-sm text-slate-600">
              Every engagement begins with a roadmap that pairs device management with layered security. We automate repetitive tasks, document runbooks, and deliver insights that leadership can act on.
            </p>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary">Why teams choose us</h2>
            <p className="mt-3 text-sm text-slate-600">
              Clients appreciate predictable billing, deep expertise in Google Workspace and Microsoft 365, and a partner who can collaborate with compliance and finance from day one.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
