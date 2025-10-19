import type { Metadata } from "next";
import Script from "next/script";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your headcount, apps, and pain points. We’ll propose a right-sized plan for your environment.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact Atlas IT Solutions",
    description:
      "Tell us about your headcount, apps, and pain points. We’ll propose a right-sized plan for your environment.",
    url: "/contact"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.atlasitsolutions.example" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.atlasitsolutions.example/contact" }
  ]
};

export default function ContactPage() {
  return (
    <>
      <Script id="breadcrumbs-contact" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <section className="space-y-6 pb-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</p>
        <h1 className="text-4xl font-bold text-secondary">Let’s talk about your environment</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Tell us your headcount, core apps, and pain points. We’ll propose a right-sized plan.
        </p>
      </section>
      <div className="grid gap-10 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="order-2 space-y-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-8 lg:order-1">
          <h2 className="text-xl font-semibold text-secondary">What happens next</h2>
          <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-600">
            <li>We review your submission and confirm a consult slot within one business day.</li>
            <li>A solutions lead joins the call to scope devices, apps, and security requirements.</li>
            <li>You receive a tailored plan with deliverables, onboarding timeline, and pricing.</li>
          </ol>
        </div>
        <div className="order-1 rounded-3xl border border-slate-200 p-8 shadow-sm lg:order-2">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
