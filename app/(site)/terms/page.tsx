import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Master service terms for Atlas IT Solutions engagements.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl space-y-6 pb-24 text-base leading-relaxed text-slate-600">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-secondary">Terms of Service</h1>
        <p>
          By partnering with Atlas IT Solutions you agree to the scope, billing cadence, and service levels detailed in your statement of work. Monthly services renew automatically unless cancelled with 30 days notice.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-secondary">Service Level</h2>
        <p>
          Helpdesk response targets are under one business hour with 24/7 escalation for critical incidents. Maintenance windows are communicated at least five days in advance.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-secondary">Liability</h2>
        <p>
          Atlas IT Solutions maintains professional indemnity and cyber liability insurance. Our liability is limited to fees paid in the preceding three months.
        </p>
      </section>
    </article>
  );
}
