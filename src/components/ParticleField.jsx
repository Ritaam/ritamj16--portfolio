import { useRef, useEffect, useCallback } from 'react';

const PARTICLE_COUNT = 80;
const COLORS = [
  'rgba(0, 240, 255, ',   // cyan
  'rgba(138, 43, 226, ',  // purple
  'rgba(100, 180, 255, ', // soft blue
  'rgba(255, 45, 91, ',   // pink accent
  'rgba(200, 200, 255, ', // pale lavender
];

function createParticle(width, height) {
  const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
  const opacity = 0.15 + Math.random() * 0.35;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 2.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.25 - 0.05, // gentle upward drift
    color: colorBase + opacity + ')',
    glowColor: colorBase + (opacity * 0.5) + ')',
    pulseSpeed: 0.5 + Math.random() * 2,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

const ParticleField = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const timeRef = useRef(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(w, h)
    );
  }, []);

  useEffect(() => {
    init();
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        // Gentle sinusoidal movement
        const pulse = Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset);
        const currentRadius = p.radius * (0.7 + 0.3 * pulse);

        p.x += p.vx + Math.sin(timeRef.current * 0.5 + p.pulseOffset) * 0.1;
        p.y += p.vy + Math.cos(timeRef.current * 0.3 + p.pulseOffset) * 0.05;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, currentRadius * 4
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleField;
