import faqs from "@/app/_data/faq.json";

export function FAQ() {
  return (
    <section className="space-y-8 pb-24">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
        <h2 className="text-3xl font-bold text-secondary">Answers to common questions</h2>
        <p className="text-slate-600">If you need more detail, our team is happy to walk through requirements during a consult.</p>
      </div>
      <dl className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="card p-6">
            <dt className="text-lg font-semibold text-secondary">{faq.question}</dt>
            <dd className="mt-2 text-sm text-slate-600">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
