import { use3DTilt } from '../../hooks/use3DTilt';
import { useCart } from '../../context/CartContext';

export default function ProductCard3D({ product, onView }) {
  const { ref, handleMouseMove, handleMouseLeave, handleMouseEnter } = use3DTilt(12);
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    setIsOpen(true);
  };

  return (
    <div className="card-3d-wrap" data-cursor="card">
      <div
        ref={ref}
        className="card-3d exhibit-frame rounded-lg overflow-hidden bg-ink-light relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={() => onView?.(product)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shine overlay */}
        <div className="card-shine rounded-lg" />

        {/* Cover Image */}
        <div className="card-layer-bg relative overflow-hidden" style={{ height: '200px' }}>
          <img
            src={product.coverImageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${product._id || 'default'}/800/600`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        </div>

        {/* Exhibit Label */}
        <div
          className="card-layer-content p-5"
          style={{
            background: 'var(--color-parchment)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="badge-category">{product.category}</span>

          <h3
            className="mt-3 text-lg leading-tight"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
          >
            {product.title}
          </h3>

          <p
            className="mt-2 text-sm leading-relaxed opacity-70 line-clamp-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span
              className="text-xl font-bold"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-ochre)',
              }}
            >
              ₹{product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-md font-semibold text-sm transition-transform hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#c8852a',
                color: '#0d0b08',
                fontFamily: 'var(--font-mono)'
              }}
              data-cursor="button"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
