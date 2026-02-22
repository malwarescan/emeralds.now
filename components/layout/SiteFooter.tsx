import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--abyssal)] border-t border-[rgba(201,162,39,0.24)] py-14 sm:py-20">
      <div className="rail">
        <div className="top-divider mb-10 h-px w-full bg-[rgba(201,162,39,0.22)]" />
        <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="mb-4 font-serif text-sm font-normal text-[var(--cream)]">
              Collections
            </p>
            <ul className="space-y-3 text-[0.8125rem] text-[var(--cream)]/80">
              <li><Link href="/collections/rings" className="hover:text-[var(--cream)] transition-colors">Rings</Link></li>
              <li><Link href="/collections/earrings" className="hover:text-[var(--cream)] transition-colors">Earrings</Link></li>
              <li><Link href="/collections/pendants" className="hover:text-[var(--cream)] transition-colors">Pendants</Link></li>
              <li><Link href="/collections/bracelets" className="hover:text-[var(--cream)] transition-colors">Bracelets</Link></li>
              <li><Link href="/collections/chains" className="hover:text-[var(--cream)] transition-colors">Chains</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="mb-4 font-serif text-sm font-normal text-[var(--cream)]">
              Expertise
            </p>
            <ul className="space-y-3 text-[0.8125rem] text-[var(--cream)]/80">
              <li><Link href="/education/how-to-verify-colombian-emerald" className="hover:text-[var(--cream)] transition-colors">Verify an emerald</Link></li>
              <li><Link href="/education/emerald-treatments-explained" className="hover:text-[var(--cream)] transition-colors">Treatments</Link></li>
              <li><Link href="/education/emerald-care-guide" className="hover:text-[var(--cream)] transition-colors">Care guide</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="mb-4 font-serif text-sm font-normal text-[var(--cream)]">
              Services
            </p>
            <ul className="space-y-3 text-[0.8125rem] text-[var(--cream)]/80">
              <li><Link href="/concierge" className="hover:text-[var(--cream)] transition-colors">Concierge</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--cream)] transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="mb-4 font-serif text-sm font-normal text-[var(--cream)]">
              Contact
            </p>
            <ul className="space-y-3 text-[0.8125rem] text-[var(--cream)]/80">
              <li className="leading-relaxed">Bogotá & Medellín, Colombia</li>
              <li><a href="https://www.instagram.com/muzem_emeralds/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--cream)] transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-14 text-center text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--cream)]/60">
          Official online store for Muzem Emeralds.
        </p>
      </div>
    </footer>
  );
}
