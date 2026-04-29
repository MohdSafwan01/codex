import { useState, useEffect } from 'react';
import ProductCard3D from '../components/effects/ProductCard3D';
import ScrollReveal from '../components/effects/ScrollReveal';
import api from '../lib/api';

const fallbackProducts = [
  { _id: '1', title: 'The Systems Design Playbook', description: 'A comprehensive guide to designing scalable distributed systems.', price: 349, category: 'Ebook', coverImageUrl: 'https://picsum.photos/seed/systems-design/800/600' },
  { _id: '2', title: 'DSA Patterns: 50 Must-Know', description: 'Master the 50 most frequently asked DSA patterns in tech interviews.', price: 149, category: 'Notes', coverImageUrl: 'https://picsum.photos/seed/dsa-patterns/800/600' },
  { _id: '3', title: 'Machine Learning, Visually', description: 'Learn ML through stunning visual explanations.', price: 199, category: 'PDF', coverImageUrl: 'https://picsum.photos/seed/ml-visually/800/600' },
  { _id: '4', title: "UI/UX: The Designer's Bible", description: 'The definitive reference for modern interface design.', price: 299, category: 'Ebook', coverImageUrl: 'https://picsum.photos/seed/uiux-bible/800/600' },
  { _id: '5', title: 'Cloud Computing Zero to Hero', description: 'AWS, GCP, Azure, Docker, Kubernetes, and CI/CD pipelines.', price: 99, category: 'Notes', coverImageUrl: 'https://picsum.photos/seed/cloud-hero/800/600' },
  { _id: '6', title: 'Full-Stack React 2026 Guide', description: 'Build production-grade apps with React 19 and Next.js 15.', price: 249, category: 'PDF', coverImageUrl: 'https://picsum.photos/seed/react-2026/800/600' },
];

const categories = ['All', 'Ebook', 'Notes', 'PDF'];

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--color-parchment)';
    api.get('/products').then(r => { if (r.data.length) setProducts(r.data); }).catch(() => {});
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--color-parchment)', color: 'var(--color-ink)' }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="clip-reveal">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px" style={{ background: 'var(--color-ochre)' }} />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}>Collection</span>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="slide-up" delay={100}>
          <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>The Archive</h1>
          <p className="text-lg mb-12" style={{ opacity: 0.6, maxWidth: '500px' }}>Browse our curated selection of digital knowledge.</p>
        </ScrollReveal>
        <ScrollReveal animation="slide-up" delay={200}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div className="flex gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-5 py-2 rounded-full text-sm border-none transition-all" data-cursor="button"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: activeCategory === cat ? 'var(--color-ink)' : 'rgba(13,11,8,0.06)', color: activeCategory === cat ? 'var(--color-cream)' : 'var(--color-ink)' }}>
                  {cat}
                </button>
              ))}
            </div>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="input-editorial w-full md:w-72" style={{ color: 'var(--color-ink)', borderBottomColor: 'var(--color-mist)' }} />
          </div>
        </ScrollReveal>
        <div className="gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filtered.map((product, i) => (
            <ScrollReveal key={product._id} animation="flip-in" delay={i * 100}>
              <ProductCard3D product={product} />
            </ScrollReveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No Products Found</h3>
            <p style={{ opacity: 0.5 }}>Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
