import { useCallback, useRef } from 'react';

export function useMagneticEffect(strength = 0.3) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxDistance = 60;

    if (distance < maxDistance) {
      el.style.transform = `translate(${distX * strength}px, ${distY * strength}px)`;
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
