import services from "@/app/_data/services.json";

export function ServicesGrid({ title, description }: { title: string; description?: string }) {
  return (
    <section className="space-y-8 pb-24">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Services</p>
        <h2 className="text-3xl font-bold text-secondary">{title}</h2>
        {description && <p className="text-slate-600">{description}</p>}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="card p-6">
            <h3 className="text-xl font-semibold text-secondary">{service.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
