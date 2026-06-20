import React from 'react';
import Silk from './Silk';
import ParticleField from './ParticleField';
import './Background.css';

const Background = () => (
  <div className="bg-root" aria-hidden="true">
    {/* Base layer: animated Silk shader */}
    <Silk
      speed={3}
      scale={1.2}
      color="#292b2eff"
      noiseIntensity={1.8}
      rotation={0}
    />

    {/* Floating particle canvas */}
    <ParticleField />

    {/* Animated aurora gradient orbs */}
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
    <div className="glow-source glow-source-pink" />

    {/* Perspective grid overlay */}
    <div className="bg-perspective-grid" />

    {/* Subtle dot-grid overlay */}
    <div className="bg-grid" />

    {/* Cinematic noise grain */}
    <div className="bg-noise" />

    {/* Vignette darkening around edges */}
    <div className="bg-vignette" />
  </div>
);

export default Background;
