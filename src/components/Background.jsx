import React, { useEffect, useRef } from 'react';
import Silk from './Silk';
import ParticleField from './ParticleField';
import './Background.css';

const Background = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.background = `radial-gradient(
        600px circle at ${e.clientX}px ${e.clientY}px,
        rgba(0, 229, 255, 0.04) 0%,
        rgba(124, 58, 237, 0.03) 30%,
        transparent 70%
      )`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="bg-root" aria-hidden="true">
      {/* Base layer: animated Silk shader */}
      <Silk speed={3} scale={1.2} color="#0a0a1aff" noiseIntensity={1.5} rotation={0} />

      {/* Floating particle canvas */}
      <ParticleField />

      {/* Animated aurora gradient orbs — new palette */}
      <div className="aurora-container">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
        <div className="aurora-orb aurora-orb-5" />
      </div>

      {/* Pulsing accent glow sources */}
      <div className="glow-source glow-source-cyan" />
      <div className="glow-source glow-source-purple" />
      <div className="glow-source glow-source-mid" />

      {/* Perspective grid overlay */}
      <div className="bg-perspective-grid" />

      {/* Subtle dot-grid overlay */}
      <div className="bg-grid" />

      {/* Mouse spotlight */}
      <div ref={spotlightRef} className="bg-spotlight" />

      {/* Cinematic noise grain */}
      <div className="bg-noise" />

      {/* Vignette */}
      <div className="bg-vignette" />
    </div>
  );
};

export default Background;
