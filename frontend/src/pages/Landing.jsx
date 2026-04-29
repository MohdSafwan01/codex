import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/effects/MagneticButton';
import ScrollReveal from '../components/effects/ScrollReveal';
import ProductCard3D from '../components/effects/ProductCard3D';
import MarqueeStrip from '../components/layout/MarqueeStrip';
import { useCountUp } from '../hooks/useCountUp';
import api from '../lib/api';

// Sample products for when backend is not connected
const fallbackProducts = [
  {
    _id: '1', title: 'The Systems Design Playbook', description: 'A comprehensive guide to designing scalable distributed systems.', price: 349, category: 'Ebook',
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: '2', title: 'DSA Patterns: 50 Must-Know', description: 'Master the 50 most frequently asked DSA patterns in tech interviews.', price: 149, category: 'Notes',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: '3', title: 'Machine Learning, Visually', description: 'Learn machine learning through stunning visual explanations.', price: 199, category: 'PDF',
    coverImageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
];

function HeroWord({ word, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200 + index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <span className="inline-block overflow-hidden mr-4">
      <span className={`word-reveal ${visible ? 'visible' : ''}`}>
        {word}
      </span>
    </span>
  );
}

function StatItem({ value, label, suffix = '' }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-bold count-up"
        style={{ color: 'var(--color-ochre)' }}
      >
        {count}{suffix}
      </div>
      <div
        className="mt-2 text-sm uppercase tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', opacity: 0.5, fontSize: '0.7rem' }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Landing() {
  const [featured, setFeatured] = useState(fallbackProducts);
  const [subtextVisible, setSubtextVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Fetch featured products
    api.get('/products')
      .then(res => {
        if (res.data.length > 0) setFeatured(res.data.slice(0, 3));
      })
      .catch(() => { /* use fallback */ });

    // Show subtext after headline animation
    const timer = setTimeout(() => setSubtextVisible(true), 1200);

    // Scroll color shift
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const progress = Math.min(scrollY / (windowH * 1.5), 1);

      // Interpolate from ink to parchment
      document.body.style.backgroundColor = progress > 0.5
        ? 'var(--color-parchment)'
        : 'var(--color-ink)';
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.backgroundColor = '';
    };
  }, []);

  const heroWords = ['Knowledge', 'Worth', 'Owning.'];

  return (
    <div>
      {/* ── HERO SECTION ──────────────────────────────── */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative"
        style={{ background: 'var(--color-ink)' }}
      >
        {/* Background grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-ochre))',
          }}
        />

        <div className="text-center max-w-4xl relative z-10">
          {/* Tagline */}
          <ScrollReveal delay={0}>
            <div
              className="mb-8 text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}
            >
              ✦ A Curated Digital Collection ✦
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-8"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-cream)' }}
          >
            {heroWords.map((word, i) => (
              <HeroWord key={word} word={word} index={i} />
            ))}
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-12 transition-all duration-700"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-cream)',
              opacity: subtextVisible ? 0.6 : 0,
              transform: subtextVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Curated ebooks, notes, and guides for the ambitious learner.
            Every product is handpicked. Every download is instant.
          </p>

          {/* CTAs */}
          <div
            className="flex items-center justify-center gap-4 flex-wrap transition-all duration-700"
            style={{
              opacity: subtextVisible ? 1 : 0,
              transform: subtextVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '200ms',
            }}
          >
            <Link to="/products">
              <MagneticButton variant="primary">Browse Collection</MagneticButton>
            </Link>
            <MagneticButton variant="ghost" onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </MagneticButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream)', opacity: 0.3 }}
          >
            Scroll
          </span>
          <div
            className="w-px h-12"
            style={{
              background: 'linear-gradient(to bottom, var(--color-ochre), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── FEATURED SECTION ─────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-parchment)' }}
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="clip-reveal">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ background: 'var(--color-ochre)' }} />
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}
              >
                Featured
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={100}>
            <h2
              className="text-4xl md:text-5xl mb-16"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-ink)',
              }}
            >
              Exhibit Hall
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <ScrollReveal key={product._id} animation="flip-in" delay={i * 150}>
                <ProductCard3D product={product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="slide-up" delay={400}>
            <div className="text-center mt-16">
              <Link to="/products">
                <MagneticButton variant="ghost">
                  <span style={{ color: 'var(--color-ink)' }}>View Full Collection →</span>
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 px-6"
        style={{ background: 'var(--color-ink)' }}
      >
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="clip-reveal">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ background: 'var(--color-ochre)' }} />
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}
              >
                Process
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={100}>
            <h2
              className="text-4xl md:text-5xl mb-20"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-cream)',
              }}
            >
              How It Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Browse',
                desc: 'Explore our curated collection of digital knowledge products — ebooks, notes, and comprehensive guides.',
              },
              {
                step: '02',
                title: 'Purchase',
                desc: 'Add items to your cart and complete the checkout. Secure payment processing with instant confirmation.',
              },
              {
                step: '03',
                title: 'Download',
                desc: 'Access your library anytime. Instant downloads via secure signed URLs. Your knowledge, forever.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} animation="slide-up" delay={i * 200}>
                <div className="relative">
                  <div
                    className="text-7xl font-bold mb-6"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-ochre)',
                      opacity: 0.15,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-2xl mb-4"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-cream)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-cream)', opacity: 0.6 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{
          background: 'var(--color-ink-light)',
          borderTop: '1px solid rgba(232, 224, 213, 0.08)',
          borderBottom: '1px solid rgba(232, 224, 213, 0.08)',
        }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={6} label="Products" suffix="+" />
          <StatItem value={1200} label="Downloads" suffix="+" />
          <StatItem value={98} label="Satisfaction" suffix="%" />
          <StatItem value={24} label="Instant Access" suffix="h" />
        </div>
      </section>
    </div>
  );
}
