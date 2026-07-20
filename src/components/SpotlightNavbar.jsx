import React, { useEffect, useRef, useState, useCallback } from 'react';
import { animate } from 'framer-motion';
import { Download } from 'lucide-react';
import './SpotlightNavbar.css';

/* ─── Nav items ─────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const SECTION_IDS = NAV_ITEMS.map(i => i.href.slice(1));

export default function SpotlightNavbar({ items = NAV_ITEMS, className = '' }) {
  const navRef       = useRef(null);
  const spotlightX   = useRef(0);
  const ambienceX    = useRef(0);

  const [activeIndex, setActiveIndex]   = useState(0);
  const [hoverX,      setHoverX]        = useState(null);
  const [isVisible,   setIsVisible]     = useState(true);
  const [scrollPct,   setScrollPct]     = useState(0);
  const lastScrollY   = useRef(0);

  /* ── Scroll: hide/show + active section ── */
  const handleScroll = useCallback(() => {
    const y       = window.scrollY;
    const docH    = document.documentElement.scrollHeight - window.innerHeight;

    setScrollPct(docH > 0 ? (y / docH) * 100 : 0);
    setIsVisible(!(y > 120 && y > lastScrollY.current));
    lastScrollY.current = y;

    let current = 0;
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = i;
    });
    setActiveIndex(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Mouse spotlight ── */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty('--spotlight-x', `${x}px`);
    };

    const onLeave = () => {
      setHoverX(null);
      const activeEl = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (!activeEl) return;
      const navRect  = nav.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const targetX  = itemRect.left - navRect.left + itemRect.width / 2;
      animate(spotlightX.current, targetX, {
        type: 'spring', stiffness: 200, damping: 20,
        onUpdate: (v) => {
          spotlightX.current = v;
          nav.style.setProperty('--spotlight-x', `${v}px`);
        },
      });
    };

    nav.addEventListener('mousemove', onMove);
    nav.addEventListener('mouseleave', onLeave);
    return () => {
      nav.removeEventListener('mousemove', onMove);
      nav.removeEventListener('mouseleave', onLeave);
    };
  }, [activeIndex]);

  /* ── Ambience: spring to active item ── */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeEl = nav.querySelector(`[data-index="${activeIndex}"]`);
    if (!activeEl) return;
    const navRect  = nav.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    const targetX  = itemRect.left - navRect.left + itemRect.width / 2;
    animate(ambienceX.current, targetX, {
      type: 'spring', stiffness: 200, damping: 20,
      onUpdate: (v) => {
        ambienceX.current = v;
        nav.style.setProperty('--ambience-x', `${v}px`);
      },
    });
  }, [activeIndex]);

  /* ── Click handler ── */
  const handleClick = (e, item, idx) => {
    e.preventDefault();
    setActiveIndex(idx);
    const el = document.querySelector(item.href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={`sn-wrapper ${className}`}
      style={{
        transform:  isVisible ? 'translateY(0)'    : 'translateY(-120%)',
        opacity:    isVisible ? 1                   : 0,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
      }}
    >
      {/* Scroll progress bar */}
      <div className="sn-progress">
        <div className="sn-progress-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      <div className="sn-bar">
        {/* Logo */}
        <a href="#home" className="sn-logo" onClick={e => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>
          <span className="sn-logo-text">RJ</span>
        </a>

        <nav ref={navRef} className="sn-nav">
          {/* Nav links */}
          <ul className="sn-list">
            {items.map((item, idx) => (
              <li key={idx} className="sn-item">
                <a
                  href={item.href}
                  data-index={idx}
                  onClick={(e) => handleClick(e, item, idx)}
                  className={`sn-link${activeIndex === idx ? ' active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mouse spotlight layer */}
          <div
            className="sn-spotlight"
            style={{ opacity: hoverX !== null ? 1 : 0 }}
          />

          {/* Active ambience line */}
          <div className="sn-ambience" />
        </nav>

        {/* Download Resume CTA */}
        <a
          href="/resume.pdf"
          download="Ritam_Jana_Resume.pdf"
          className="sn-resume-btn"
        >
          <Download size={13} />
          Download Resume
        </a>
      </div>
    </div>
  );
}
