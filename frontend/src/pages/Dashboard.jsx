import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/effects/ScrollReveal';
import MagneticButton from '../components/effects/MagneticButton';
import { Download } from 'lucide-react';
import api from '../lib/api';

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) { navigate('/login'); return; }
    document.body.style.backgroundColor = 'var(--color-ink)';
    api.get('/orders/my-purchases').then(r => setPurchases(r.data.purchases || [])).catch(() => {}).finally(() => setLoading(false));
    return () => { document.body.style.backgroundColor = ''; };
  }, [isAuthenticated, authLoading, navigate]);

  const handleDownload = async (productId) => {
    try {
      const res = await api.get(`/download/${productId}`);
      window.open(res.data.downloadUrl, '_blank');
    } catch { alert('Download failed. Please try again.'); }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

  if (authLoading) return <div className="min-h-screen" style={{ background: 'var(--color-ink)' }} />;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--color-ink)', color: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto">
        {/* User Header */}
        <ScrollReveal animation="slide-up">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: 'linear-gradient(135deg, var(--color-ochre), var(--color-gold))', color: 'var(--color-ink)', fontFamily: 'var(--font-mono)' }}>
              {initials}
            </div>
            <div>
              <h1 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>Welcome back, {user?.name?.split(' ')[0] || 'Reader'}</h1>
              <p className="text-sm" style={{ opacity: 0.5, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{user?.email}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section Label */}
        <ScrollReveal animation="clip-reveal" delay={100}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px" style={{ background: 'var(--color-ochre)' }} />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}>Library</span>
          </div>
          <h2 className="text-4xl mb-12" style={{ fontFamily: 'var(--font-heading)' }}>Your Collection</h2>
        </ScrollReveal>

        {/* Products Grid */}
        {purchases.length === 0 ? (
          <ScrollReveal animation="scale-in" delay={200}>
            <div className="text-center py-24 rounded-2xl" style={{ background: 'rgba(245,239,224,0.04)', border: '1px solid rgba(245,239,224,0.08)' }}>
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Your library is empty</h3>
              <p className="text-sm mb-8" style={{ opacity: 0.5, maxWidth: '400px', margin: '0 auto' }}>
                Browse our curated collection and add your first digital knowledge product.
              </p>
              <MagneticButton variant="primary" onClick={() => navigate('/products')}>Browse Collection</MagneticButton>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((product, i) => (
              <ScrollReveal key={product._id} animation="flip-in" delay={i * 100}>
                <div className="exhibit-frame rounded-lg overflow-hidden" style={{ background: 'rgba(245,239,224,0.05)' }}>
                  <img src={product.coverImageUrl} alt={product.title} className="w-full h-40 object-cover"
                    onError={e => { e.target.src = `https://picsum.photos/seed/${product._id}/800/600`; }} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-category">{product.category}</span>
                      <span className="badge-category badge-owned">Owned</span>
                    </div>
                    <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{product.title}</h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ opacity: 0.6 }}>{product.description}</p>
                    <button onClick={() => handleDownload(product._id)} className="glow-pulse w-full py-3 rounded-md flex items-center justify-center gap-2 border-none text-sm font-bold uppercase tracking-wider"
                      style={{ background: 'linear-gradient(135deg, var(--color-ochre), var(--color-ochre-dark))', color: 'var(--color-ink)', fontFamily: 'var(--font-mono)' }} data-cursor="button">
                      <Download size={16} /> Download
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
