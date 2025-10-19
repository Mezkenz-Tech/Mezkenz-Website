import Link from "next/link";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-secondary px-8 py-16 text-white shadow-lg">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="text-3xl font-bold">Need a right-sized plan?</h2>
        <p className="text-lg text-slate-200">
          Share your headcount, stack, and goals—we’ll map a rollout that fits your budget and compliance needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-slate-100"
          >
            Get in touch
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Compare plans
          </Link>
        </div>
      </div>
    </section>
  );
}
