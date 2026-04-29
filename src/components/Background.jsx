import React from 'react';
import Silk from './Silk';
import './Background.css';

const Background = () => (
  <div className="bg-root" aria-hidden="true">
    <Silk
      speed={4}
      scale={1}
      color="#0b4941ff"
      noiseIntensity={1.5}
      rotation={0}
    />
    {/* Subtle dot-grid overlay on top of Silk */}
    <div className="bg-grid" />
    {/* Colour tint overlays so the silk stays dark but has accent glow */}
    <div className="bg-tint bg-tint-cyan" />
    <div className="bg-tint bg-tint-purple" />
  </div>
);

export default Background;
