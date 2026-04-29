import { useMagneticEffect } from '../../hooks/useMagneticEffect';

export default function MagneticButton({ children, className = '', variant = 'primary', onClick, ...props }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.3);

  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';

  return (
    <div
      className="magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={ref}
        className={`magnetic-btn ${baseClass} ${className}`}
        onClick={onClick}
        {...props}
      >
        <span>{children}</span>
      </button>
    </div>
  );
}
