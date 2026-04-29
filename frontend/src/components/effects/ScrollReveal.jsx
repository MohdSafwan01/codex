import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ScrollReveal({ children, animation = 'slide-up', delay = 0, className = '' }) {
  const ref = useScrollReveal({ delay });

  return (
    <div ref={ref} className={`reveal ${animation} ${className}`} data-delay={delay}>
      {children}
    </div>
  );
}
