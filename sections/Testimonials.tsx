import testimonials from "@/app/_data/testimonials.json";

export function Testimonials() {
  return (
    <section className="space-y-8 pb-24">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Testimonials</p>
        <h2 className="text-3xl font-bold text-secondary">Teams that trust Atlas IT Solutions</h2>
        <p className="text-slate-600">From fast-moving startups to established agencies, we keep devices secure and people productive.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.quote} className="card h-full p-6">
            <p className="text-sm text-slate-600">“{testimonial.quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-secondary">
              {testimonial.author}
              <span className="block text-xs font-normal text-slate-500">{testimonial.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
