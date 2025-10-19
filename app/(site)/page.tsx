import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/sections/Hero";
import { ServicesGrid } from "@/sections/ServicesGrid";
import { ProductsShowcase } from "@/sections/ProductsShowcase";
import { PricingTable } from "@/sections/PricingTable";
import { Testimonials } from "@/sections/Testimonials";
import { FAQ } from "@/sections/FAQ";
import { CTA } from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Reliable IT, Ready When You Are.",
  description:
    "Managed support, cloud migrations, and cybersecurity tailored for small and mid-sized teams with same-day onboarding.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Reliable IT, Ready When You Are.",
    description:
      "Managed support, cloud migrations, and cybersecurity tailored for small and mid-sized teams with same-day onboarding.",
    url: "/"
  },
  twitter: {
    title: "Reliable IT, Ready When You Are.",
    description:
      "Managed support, cloud migrations, and cybersecurity tailored for small and mid-sized teams with same-day onboarding."
  }
};

const highlights = ["Same-day onboarding", "24/7 monitoring", "Fixed monthly cost"];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Atlas IT Solutions",
  url: "https://www.atlasitsolutions.example",
  logo: "https://www.atlasitsolutions.example/og-image.svg",
  sameAs: [
    "https://www.linkedin.com/company/atlas-it-solutions",
    "https://twitter.com/atlasitsolutions"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@atlasitsolutions.example",
    telephone: "+35315551234",
    areaServed: "EU"
  }
};

export default function HomePage() {
  return (
    <>
      <Script id="organization-jsonld" type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </Script>
      <Hero highlights={highlights} socialProof="Trusted by 150+ devices across 30 clients" />
      <ServicesGrid title="End-to-end IT you can set and forget." />
      <ProductsShowcase title="Simple tools that power your stack." intro="Subscriptions and projects designed for clarity and quick adoption." />
      <PricingTable headline="Pricing that scales with your team" subheadline="Pick a tier that matches today’s headcount and upgrade as you grow." />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
