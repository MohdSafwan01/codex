import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import MagneticButton from '../effects/MagneticButton';
import PurchaseAnimation from './PurchaseAnimation';
import { useState } from 'react';
import api from '../../lib/api';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showReceipt, setShowReceipt] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      setIsOpen(false);
      window.location.hash = '#/login';
      return;
    }

    setPurchasing(true);
    try {
      const productIds = items.map(item => item._id);
      const res = await api.post('/orders/purchase', { productIds });
      setPurchaseData({
        items,
        total: totalAmount,
        order: res.data.order,
      });
      setShowReceipt(true);
      clearCart();
      setIsOpen(false);
    } catch (err) {
      // Simulate purchase for demo if backend is not connected
      setPurchaseData({
        items: [...items],
        total: totalAmount,
        order: { id: 'demo-' + Date.now(), createdAt: new Date().toISOString() },
      });
      setShowReceipt(true);
      clearCart();
      setIsOpen(false);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md overflow-y-auto transition-transform duration-500"
        style={{
          background: 'var(--color-ink)',
          borderLeft: '1px solid rgba(232, 224, 213, 0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: '1px solid rgba(232, 224, 213, 0.1)' }}
        >
          <h2
            className="text-lg"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-cream)' }}
          >
            Your Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border border-cream/20"
            style={{ color: 'var(--color-cream)' }}
            data-cursor="button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="p-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p
                className="text-lg mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-cream)', opacity: 0.5 }}
              >
                Your cart is empty
              </p>
              <p className="text-sm" style={{ color: 'var(--color-cream)', opacity: 0.3 }}>
                Browse our collection to find something worth owning.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item._id}
                className="flex gap-4 p-3 rounded-lg"
                style={{
                  background: 'rgba(245, 239, 224, 0.05)',
                  border: '1px solid rgba(245, 239, 224, 0.08)',
                }}
              >
                <img
                  src={item.coverImageUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${item._id}/200/200`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-sm font-medium truncate"
                    style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h4>
                  <span
                    className="text-sm font-bold mt-1 block"
                    style={{ color: 'var(--color-ochre)', fontFamily: 'var(--font-mono)' }}
                  >
                    ₹{item.price}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center bg-transparent"
                      style={{ border: '1px solid rgba(245, 239, 224, 0.2)', color: 'var(--color-cream)' }}
                      data-cursor="button"
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      className="text-sm w-6 text-center"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream)' }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center bg-transparent"
                      style={{ border: '1px solid rgba(245, 239, 224, 0.2)', color: 'var(--color-cream)' }}
                      data-cursor="button"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="ml-auto bg-transparent border-none"
                      style={{ color: 'var(--color-burgundy)' }}
                      data-cursor="button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="p-6" style={{ borderTop: '1px solid rgba(232, 224, 213, 0.1)' }}>
            <div className="flex justify-between mb-6">
              <span
                className="text-sm uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream)', opacity: 0.6 }}
              >
                Total
              </span>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-gold)' }}
              >
                ₹{totalAmount}
              </span>
            </div>
            <MagneticButton
              variant="primary"
              className="w-full text-center justify-center"
              onClick={handlePurchase}
              disabled={purchasing}
            >
              {purchasing ? 'Processing...' : 'Simulate Purchase'}
            </MagneticButton>
          </div>
        )}
      </div>

      {/* Purchase Animation */}
      {showReceipt && (
        <PurchaseAnimation
          data={purchaseData}
          onClose={() => {
            setShowReceipt(false);
            setPurchaseData(null);
          }}
        />
      )}
    </>
  );
}
