import { useCallback, useRef } from 'react';

export function use3DTilt(maxDeg = 12) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxDeg;
    const rotateY = ((x - centerX) / centerX) * maxDeg;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update shine position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    el.style.setProperty('--shine-x', `${shineX}%`);
    el.style.setProperty('--shine-y', `${shineY}%`);
  }, [maxDeg]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
      if (el) el.style.transition = 'transform 0.1s ease-out';
    }, 500);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.1s ease-out';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
