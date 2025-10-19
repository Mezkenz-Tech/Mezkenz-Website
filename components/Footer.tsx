import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50/60 py-10">
      <div className="container-responsive grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-secondary">Atlas IT Solutions</p>
          <p className="text-sm text-slate-600">
            Reliable managed IT, security, and cloud services that keep teams productive and protected.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-secondary">Navigate</p>
          <ul className="space-y-1 text-slate-600">
            <li><Link href="/services" className="hover:text-primary">Services</Link></li>
            <li><Link href="/products" className="hover:text-primary">Products</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-secondary">Contact</p>
          <p className="text-slate-600">hello@atlasitsolutions.example</p>
          <p className="text-slate-600">+353 1 555 1234</p>
          <p className="text-slate-600">Dublin & Remote (EU/UK/US)</p>
        </div>
      </div>
      <div className="container-responsive mt-6 flex flex-col gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Atlas IT Solutions. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary">Privacy</Link>
          <Link href="/terms" className="hover:text-primary">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
