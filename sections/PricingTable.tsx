import pricing from "@/app/_data/pricing.json";

export function PricingTable({ headline, subheadline }: { headline: string; subheadline?: string }) {
  return (
    <section className="space-y-8 pb-24">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pricing</p>
        <h2 className="text-3xl font-bold text-secondary">{headline}</h2>
        {subheadline && <p className="text-slate-600">{subheadline}</p>}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {pricing.map((plan) => (
          <div key={plan.name} className="card flex h-full flex-col justify-between p-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-secondary">{plan.name}</h3>
              <p className="text-sm text-slate-600">{plan.description}</p>
              <p className="text-2xl font-bold text-secondary">{plan.price}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-6 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Talk to sales
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
