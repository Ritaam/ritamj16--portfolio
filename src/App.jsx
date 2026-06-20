import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import CodingProfiles from './components/CodingProfiles';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Background from './components/Background';
import useScrollReveal from './components/useScrollReveal';
import './App.css';

function App() {
  // Attach scroll-reveal observer to all .reveal* elements in the DOM
  useScrollReveal();

  return (
    <div className="app-container">
      <Background />
      <Navbar />

      <main>
        {/* Hero has its own entrance animations — no reveal wrapper needed */}
        <Hero />

        <div className="reveal"><About /></div>
        <div className="reveal" data-delay="60"><Skills /></div>
        <div className="reveal" data-delay="60"><CodingProfiles /></div>
        <div className="reveal" data-delay="60"><Projects /></div>
        <div className="reveal" data-delay="60"><Experience /></div>
        <div className="reveal" data-delay="60"><Achievements /></div>
        <div className="reveal" data-delay="60"><Contact /></div>
      </main>

      <footer className="footer" style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
        <p>Built with React &amp; Vanilla CSS by Ritam Jana.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Inspired by Apple aesthetics.</p>
      </footer>
    </div>
  );
}

export default App;
