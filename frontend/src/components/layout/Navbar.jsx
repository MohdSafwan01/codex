import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, LogOut, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: 'rgba(13, 11, 8, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(232, 224, 213, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 no-underline"
          data-cursor="button"
        >
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
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-cream)',
              fontWeight: 600,
            }}
          >
            Codex
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/products"
            className="no-underline text-sm transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isActive('/products') ? 'var(--color-ochre)' : 'var(--color-cream)',
              opacity: isActive('/products') ? 1 : 0.7,
            }}
            data-cursor="button"
          >
            Collection
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="no-underline text-sm transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive('/dashboard') ? 'var(--color-ochre)' : 'var(--color-cream)',
                  opacity: isActive('/dashboard') ? 1 : 0.7,
                }}
                data-cursor="button"
              >
                Library
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-transparent border-none text-sm transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream)',
                  opacity: 0.7,
                }}
                data-cursor="button"
              >
                <LogOut size={14} />
                Exit
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="no-underline flex items-center gap-2 text-sm transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive('/login') ? 'var(--color-ochre)' : 'var(--color-cream)',
                opacity: isActive('/login') ? 1 : 0.7,
              }}
              data-cursor="button"
            >
              <User size={14} />
              Enter
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 bg-transparent border-none"
            style={{ color: 'var(--color-cream)' }}
            data-cursor="button"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                style={{
                  background: 'var(--color-ochre)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
