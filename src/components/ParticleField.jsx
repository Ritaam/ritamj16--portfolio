import { useRef, useEffect, useCallback } from 'react';

const PARTICLE_COUNT = 45;
const COLORS = [
  [0, 240, 255],    // cyan
  [138, 43, 226],   // purple
  [100, 180, 255],  // soft blue
  [255, 45, 91],    // pink accent
  [200, 200, 255],  // pale lavender
];

// Pre-bake a small offscreen glow sprite (reused for all particles)
function createGlowSprite(r, g, g2, b, opacity) {
  const size = 24;
  const oc = document.createElement('canvas');
  oc.width = size; oc.height = size;
  const ctx = oc.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${r},${g2},${b},${opacity})`);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return oc;
}

function createParticle(width, height) {
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
  const opacity = 0.2 + Math.random() * 0.3;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.2 - 0.04,
    color: `rgba(${r},${g},${b},${opacity})`,
    sprite: createGlowSprite(r, g, g, b, opacity * 0.4),
    pulseSpeed: 0.4 + Math.random() * 1.2,
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
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener('resize', handleResize);

    const spriteSize = 24;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        const pulse = Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset);
        const currentRadius = p.radius * (0.7 + 0.3 * pulse);

        p.x += p.vx + Math.sin(timeRef.current * 0.4 + p.pulseOffset) * 0.08;
        p.y += p.vy + Math.cos(timeRef.current * 0.25 + p.pulseOffset) * 0.04;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw pre-baked glow sprite (cheap: just an image copy)
        const glowSize = currentRadius * 8;
        ctx.globalAlpha = 0.6;
        ctx.drawImage(p.sprite, p.x - glowSize / 2, p.y - glowSize / 2, glowSize, glowSize);
        ctx.globalAlpha = 1;

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(resizeTimer);
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
