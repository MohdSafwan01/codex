import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{
        background: 'var(--color-parchment)',
        color: 'var(--color-ink)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--color-ochre), var(--color-gold))',
                }}
              >
                <BookOpen size={18} color="#0d0b08" strokeWidth={2.5} />
              </div>
              <span
                className="text-xl tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
              >
                Codex
              </span>
            </div>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ opacity: 0.6, fontFamily: 'var(--font-body)' }}
            >
              A curated collection of digital knowledge products.
              Ebooks, notes, and PDFs worth owning.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <h4
                className="text-xs mb-4 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)', opacity: 0.5 }}
              >
                Navigate
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'Collection' },
                  { to: '/dashboard', label: 'Library' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm no-underline transition-colors duration-200"
                    style={{
                      color: 'var(--color-ink)',
                      opacity: 0.7,
                      fontFamily: 'var(--font-body)',
                    }}
                    data-cursor="button"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4
                className="text-xs mb-4 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)', opacity: 0.5 }}
              >
                Cloud Services
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  'MongoDB Atlas (DBaaS)',
                  'Cloudinary (Storage)',
                  'Vercel (PaaS)',
                  'Render (IaaS/PaaS)',
                ].map(item => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{ opacity: 0.5, fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-8 flex items-center justify-between text-xs"
          style={{
            borderTop: '1px solid var(--color-mist)',
            fontFamily: 'var(--font-mono)',
            opacity: 0.5,
          }}
        >
          <span>© 2026 Codex. CCCL Lab · Experiment 11.</span>
          <span>Knowledge Worth Owning.</span>
        </div>
      </div>
    </footer>
  );
}
