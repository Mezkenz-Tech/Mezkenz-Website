import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  highlights: string[];
  socialProof: string;
}

export function Hero({ highlights, socialProof }: HeroProps) {
  return (
    <section className="grid gap-12 pb-24 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Atlas IT Solutions
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Reliable IT, Ready When You Are.
          </h1>
          <p className="text-lg text-slate-600">
            Managed support, cloud migrations, and cybersecurity—built for small and mid-sized teams.
          </p>
          <p className="text-base text-slate-600">
            Same-day onboarding, 24/7 monitoring, and fixed monthly costs keep your environment stable while your people focus on work.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
          >
            Book a Free Consult
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            View Pricing
          </Link>
        </div>
        <ul className="flex flex-wrap gap-3 text-sm font-medium text-secondary">
          {highlights.map((item) => (
            <li key={item} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{socialProof}</p>
      </div>
      <div className="relative">
        <div className="gradient-border rounded-3xl">
          <div className="card relative overflow-hidden rounded-3xl border-none p-6">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" aria-hidden="true" />
            <Image
              src="/images/hero-illustration.svg"
              alt="Illustration of secure cloud infrastructure"
              width={400}
              height={320}
              className="h-auto w-full"
              priority
            />
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p className="font-semibold text-secondary">Atlas Control Center</p>
              <p>Monitor endpoints, tickets, and compliance posture in one dashboard built for hybrid teams.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
