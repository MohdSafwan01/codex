import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.left = `${mouseX - 4}px`;
        dot.style.top = `${mouseY - 4}px`;
      }

      if (textEl) {
        textEl.style.left = `${mouseX + 24}px`;
        textEl.style.top = `${mouseY - 8}px`;
      }
    };

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState(target.dataset.cursor);
      } else if (e.target.closest('button, a, [role="button"]')) {
        setCursorState('button');
      } else {
        setCursorState('default');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const ringClass = cursorState === 'card' ? 'hover-card' :
                    cursorState === 'button' ? 'hover-button' : '';

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${ringClass}`} />
      <div ref={textRef} className={`cursor-text ${cursorState === 'card' ? 'visible' : ''}`}>
        View
      </div>
    </>
  );
}
