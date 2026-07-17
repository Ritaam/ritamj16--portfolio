import React, { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const dotRef     = useRef(null);
  const glowRef    = useRef(null);
  const mousePos   = useRef({ x: -200, y: -200 });
  const glowPos    = useRef({ x: -200, y: -200 });
  const rafRef     = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't render on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    // Track interactive elements for scaling
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (dotRef.current) dotRef.current.classList.add('cursor-hover');
          if (glowRef.current) glowRef.current.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          if (dotRef.current) dotRef.current.classList.remove('cursor-hover');
          if (glowRef.current) glowRef.current.classList.remove('cursor-hover');
        });
      });
    };
    addHover();

    // Smooth trailing glow
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      glowPos.current.x = lerp(glowPos.current.x, mousePos.current.x, 0.1);
      glowPos.current.y = lerp(glowPos.current.y, mousePos.current.y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Trailing glow blob */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 320,
          height: 320,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          willChange: 'transform',
        }}
        className="cursor-glow-blob"
      />
      {/* Precise dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          background: 'var(--cyan)',
          boxShadow: '0 0 8px var(--cyan), 0 0 20px rgba(0,229,255,0.5)',
          opacity: visible ? 0.9 : 0,
          transition: 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease',
          willChange: 'transform',
        }}
        className="cursor-dot"
      />
      <style>{`
        .cursor-dot.cursor-hover {
          width: 20px !important;
          height: 20px !important;
          background: var(--purple-light) !important;
          box-shadow: 0 0 12px var(--purple-light), 0 0 30px rgba(168,85,247,0.5) !important;
        }
        .cursor-glow-blob.cursor-hover {
          background: radial-gradient(circle, rgba(168,85,247,0.09) 0%, rgba(124,58,237,0.05) 40%, transparent 70%) !important;
        }
      `}</style>
    </>
  );
};

export default CursorGlow;
