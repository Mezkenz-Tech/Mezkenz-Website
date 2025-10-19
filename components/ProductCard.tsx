"use client";

import { useState } from "react";

export interface ProductCardProps {
  name: string;
  type: string;
  description: string;
  includes: string[];
  price: string;
  slug: string;
}

export function ProductCard({ name, type, description, includes, price, slug }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: slug })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message ?? "Success");
      } else {
        setMessage(data.message ?? "Unable to process checkout");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to process checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card flex h-full flex-col justify-between p-6" aria-label={`${name} product`}> 
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{type}</p>
          <h3 className="mt-2 text-xl font-semibold text-secondary">{name}</h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
        <ul className="space-y-2 text-sm text-slate-600">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-lg font-semibold text-secondary">{price}</p>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/70"
        >
          {loading ? "Processing…" : "Buy Now"}
        </button>
        {message && <p className="text-xs text-slate-500" role="status">{message}</p>}
      </div>
    </article>
  );
}
