import type { Metadata } from "next";
import Script from "next/script";
import products from "@/app/_data/products.json";
import { ProductsShowcase } from "@/sections/ProductsShowcase";
import { PricingTable } from "@/sections/PricingTable";

export const metadata: Metadata = {
  title: "Products",
  description: "Simple tools that power your stack with subscriptions for support, security, and backup.",
  alternates: {
    canonical: "/products"
  },
  openGraph: {
    title: "Atlas IT Solutions Products",
    description: "Simple tools that power your stack with subscriptions for support, security, and backup.",
    url: "/products"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.atlasitsolutions.example" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.atlasitsolutions.example/products" }
  ]
};

const productJsonLd = products.map((product) => {
  const numericPriceMatch = product.price.match(/\d+/);
  const numericPrice = numericPriceMatch ? Number(numericPriceMatch[0]) : undefined;

  const offers: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: "EUR",
    description: product.price,
    availability: "https://schema.org/InStock",
    url: `https://www.atlasitsolutions.example/products#${product.slug}`
  };

  if (typeof numericPrice === "number" && !Number.isNaN(numericPrice)) {
    offers.price = numericPrice;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Atlas IT Solutions"
    },
    offers
  };
});

export default function ProductsPage() {
  return (
    <>
      <Script id="breadcrumbs-products" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="products-jsonld" type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </Script>
      <section className="space-y-6 pb-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Products</p>
        <h1 className="text-4xl font-bold text-secondary">Simple tools that power your stack.</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Subscriptions cover day-to-day operations while one-time engagements tackle deeper assessments and roadmap planning.
        </p>
      </section>
      <ProductsShowcase
        title="Subscriptions & one-time audits"
        intro="Buy-now tools give you unlimited support, managed security, and audit insights without the procurement friction."
      />
      <PricingTable headline="Pricing table" subheadline="Choose the tier that reflects today’s needs—upgrade anytime." />
    </>
  );
}
