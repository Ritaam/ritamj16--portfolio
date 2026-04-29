import React from 'react';
import Stack from './Stack';
import './Achievements.css';

import ach1 from '../assets/achievements/ach1.jpg';
import ach2 from '../assets/achievements/ach2.jpg';
import ach3 from '../assets/achievements/ach3.jpg';
// Add more: import ach4 from '../assets/achievements/ach4.jpg';

const cardImages = [ach1, ach2, ach3];

const cards = cardImages.map((src, i) => (
  <img
    key={i}
    src={src}
    alt={`Achievement ${i + 1}`}
    className="card-image"
  />
));

const Achievements = () => (
  <section id="achievements" className="achievements-section">
    <div className="container">
      <p className="section-label">Milestones &amp; Recognition</p>
      <h2 className="section-title">
        My <span className="text-gradient">Achievements</span>
      </h2>

      <div className="ach-layout">
        {/* Left: Stack card widget */}
        <div className="ach-stack-wrap">
          <Stack
            cards={cards}
            randomRotation
            sensitivity={180}
            sendToBackOnClick
            autoplay
            autoplayDelay={2500}
            pauseOnHover
            animationConfig={{ stiffness: 220, damping: 22 }}
          />
        </div>

        {/* Right: info panel */}
        <div className="ach-info glass-panel">
          <h3 className="ach-info-title">🏆 Highlights</h3>
          <ul className="ach-list">
            <li>Competitive programming contests &amp; rankings</li>
            <li>Hackathon awards &amp; certifications</li>
            <li>Academic recognitions &amp; project honours</li>
          </ul>
          <p className="ach-hint">
            Drag the card or click it to flip through achievements.<br/>
            Cards cycle automatically every 2.5s.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Achievements;
