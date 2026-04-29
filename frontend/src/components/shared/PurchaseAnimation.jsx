import { useEffect, useState } from 'react';

const confettiEmojis = ['📖', '📚', '📄', '✨', '🎓', '💡', '📝', '🔖'];

export default function PurchaseAnimation({ data, onClose }) {
  const [active, setActive] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Trigger entrance
    requestAnimationFrame(() => setActive(true));

    // Spawn confetti
    const pieces = [];
    for (let i = 0; i < 30; i++) {
      pieces.push({
        id: i,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        rotation: Math.random() * 360,
      });
    }
    setConfetti(pieces);

    return () => setConfetti([]);
  }, []);

  const handleClose = () => {
    setActive(false);
    setTimeout(onClose, 400);
  };

  if (!data) return null;

  return (
    <>
      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          {piece.emoji}
        </div>
      ))}

      {/* Receipt Overlay */}
      <div className={`receipt-overlay ${active ? 'active' : ''}`} onClick={handleClose}>
        <div className="receipt-paper" onClick={e => e.stopPropagation()}>
          <div className="receipt-border" />

          {/* Receipt Content */}
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">📖</div>
            <h2
              className="text-xl mb-1"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-ink)' }}
            >
              Purchase Complete!
            </h2>
            <p className="text-sm" style={{ opacity: 0.5, fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
              Order #{data.order?.id?.slice(-8) || 'DEMO'}
            </p>
          </div>

          {/* Divider */}
          <div
            className="my-4"
            style={{ borderTop: '1px dashed var(--color-mist)' }}
          />

          {/* Items */}
          <div className="flex flex-col gap-3">
            {data.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <span
                    className="text-sm block truncate"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink)' }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: 'var(--font-mono)', opacity: 0.5 }}
                  >
                    ×{item.quantity}
                  </span>
                </div>
                <span
                  className="text-sm font-bold ml-4"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}
                >
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            className="my-4"
            style={{ borderTop: '1px dashed var(--color-mist)' }}
          />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span
              className="text-sm uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-mono)', opacity: 0.6 }}
            >
              Total
            </span>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre)' }}
            >
              ₹{data.total}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            className="w-full mt-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider border-none"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-mono)',
            }}
            data-cursor="button"
          >
            Continue Browsing
          </button>

          {/* Timestamp */}
          <p
            className="text-center mt-4 text-xs"
            style={{ fontFamily: 'var(--font-mono)', opacity: 0.3 }}
          >
            {new Date(data.order?.createdAt || Date.now()).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
}
