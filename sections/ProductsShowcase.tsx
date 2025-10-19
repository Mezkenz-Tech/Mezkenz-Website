import products from "@/app/_data/products.json";
import { ProductCard } from "@/components/ProductCard";

export function ProductsShowcase({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="space-y-8 pb-24">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Products</p>
        <h2 className="text-3xl font-bold text-secondary">{title}</h2>
        {intro && <p className="text-slate-600">{intro}</p>}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.slug} id={product.slug}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
}
