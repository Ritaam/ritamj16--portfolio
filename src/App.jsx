import React, { useEffect } from 'react';
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
import './App.css';

function App() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          // Add appropriate delays based on the element's order if needed
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Elements to animate on scroll
    const elements = document.querySelectorAll('.section-title, .glass-panel:not(.hero-text-area > .glass-panel)');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });

    // Cleanup
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="app-container">
      <Background />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <CodingProfiles />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      <footer className="footer" style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
        <p>Built with React & Vanilla CSS by Ritam Jana.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Inspired by Apple aesthetics.</p>
      </footer>
    </div>
  );
}

export default App;
