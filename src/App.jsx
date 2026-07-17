import React, { useState, useEffect, Suspense, lazy } from 'react';
import SpotlightNavbar from './components/SpotlightNavbar';
import Hero from './components/Hero';
import ProfileCard from './components/ProfileCard';
import Background from './components/Background';
import CursorGlow from './components/CursorGlow';
import useScrollReveal from './components/useScrollReveal';

const SolarSystem = lazy(() => import('./components/SolarSystem'));
const CodingProfiles = lazy(() => import('./components/CodingProfiles'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));

import './App.css';

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
        border: 'none',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        zIndex: 500,
        cursor: 'none',
        boxShadow: 'var(--glow-cyan)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      ↑
    </button>
  );
}

function App() {
  useScrollReveal();

  return (
    <div className="app-container">
      <CursorGlow />
      <Background />
      <SpotlightNavbar />

      <main>
        <Hero />
        <div className="reveal"><ProfileCard /></div>
        <Suspense fallback={<div style={{ minHeight: '30vh' }}></div>}><SolarSystem /></Suspense>
        <div className="reveal" data-delay="60"><Suspense fallback={<div style={{ minHeight: '30vh' }}></div>}><CodingProfiles /></Suspense></div>
        <div className="reveal" data-delay="60"><Suspense fallback={<div style={{ minHeight: '30vh' }}></div>}><Projects /></Suspense></div>
        <div className="reveal" data-delay="60"><Suspense fallback={<div style={{ minHeight: '30vh' }}></div>}><Experience /></Suspense></div>
        <div className="reveal" data-delay="60"><Suspense fallback={<div style={{ minHeight: '30vh' }}></div>}><Achievements /></Suspense></div>
        <div className="reveal" data-delay="60"><Suspense fallback={<div style={{ minHeight: '30vh' }}></div>}><Contact /></Suspense></div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2.5rem 2rem',
        borderTop: '1px solid rgba(0,229,255,0.08)',
        background: 'rgba(5,8,22,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: 'var(--font-space)',
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '0.6rem',
        }}>
          <span className="text-gradient">&lt;RJ /&gt;</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Built with React &amp; Tailwind CSS by{' '}
          <span style={{ color: 'var(--cyan)' }}>Ritam Jana</span>.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.4rem' }}>
          Designed for impact. Engineered for precision.
        </p>
      </footer>

      <BackToTop />
    </div>
  );
}

export default App;
