import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Home, User, Code2, Terminal, Briefcase, Award, Mail, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './NotchNavbar.css';

/* ─── Nav configuration ─────────────────────────────── */
const NAV_LEFT = [
  { label: 'Home',     href: '#home',         icon: Home },
  { label: 'About',    href: '#about',         icon: User },
  { label: 'Skills',   href: '#skills',        icon: Code2 },
  { label: 'Coding',   href: '#coding',        icon: Terminal },
];

const NAV_RIGHT = [
  { label: 'Projects',     href: '#projects',     icon: LayoutGrid },
  { label: 'Experience',   href: '#experience',   icon: Briefcase },
  { label: 'Achievements', href: '#achievements', icon: Award },
  { label: 'Contact',      href: '#contact',      icon: Mail },
];

const ALL_LINKS = [...NAV_LEFT, ...NAV_RIGHT];
const SECTION_IDS = ALL_LINKS.map(l => l.href.slice(1));

/* ─── NavLink ───────────────────────────────────────── */
function NavLink({ href, icon: Icon, label, isActive, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`notch-nav-link${isActive ? ' active' : ''}`}
    >
      <Icon className="notch-nav-icon" />
      <span>{label}</span>
      {isActive && (
        <motion.span
          className="notch-active-pill"
          layoutId="notch-active"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  );
}

/* ─── Logo ──────────────────────────────────────────── */
function Logo({ onClick }) {
  return (
    <a href="#home" className="notch-logo" onClick={onClick} aria-label="Home">
      <span className="text-gradient">&lt;RJ /&gt;</span>
    </a>
  );
}

/* ─── NotchNavbar ───────────────────────────────────── */
export default function NotchNavbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [isVisible,      setIsVisible]      = useState(true);
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection,  setActiveSection]  = useState('home');
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const y         = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    setIsScrolled(y > 50);
    setIsVisible(!(y > 120 && y > lastScrollY.current));
    lastScrollY.current = y;

    let current = SECTION_IDS[0];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        className="notch-header"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isVisible ? 'all' : 'none' }}
      >
        {/* ── Scroll progress ── */}
        <div className="notch-progress-bar">
          <div className="notch-progress-fill" style={{ width: `${scrollProgress}%` }} />
        </div>

        {/* ═══════ LEFT SIDE-BAR ═══════ */}
        <div className={`notch-sidebar notch-sidebar-left${isScrolled ? ' scrolled' : ''}`} />

        {/* ═══════ NOTCH BODY ═══════ */}
        <div className={`notch-body${isScrolled ? ' scrolled' : ''}`}>
          {/* Left curved corner */}
          <div className="notch-corner notch-corner-left">
            <svg className="notch-corner-svg" viewBox="0 0 50 64" preserveAspectRatio="none">
              <path
                d="M0 0 H50 V64 C25 64 25 40 0 40 Z"
                className="notch-corner-fill"
              />
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" className="notch-corner-line" />
            </svg>
          </div>

          {/* ── Content area ── */}
          <div className="notch-content">
            {/* Desktop left nav */}
            <nav className="notch-desktop-nav notch-desktop-nav-left">
              {NAV_LEFT.map(item => (
                <NavLink
                  key={item.label}
                  {...item}
                  isActive={activeSection === item.href.slice(1)}
                  onClick={e => handleClick(e, item.href)}
                />
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="notch-mobile-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  ><X size={18} /></motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  ><Menu size={18} /></motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Center logo */}
            <Logo onClick={e => handleClick(e, '#home')} />

            {/* Desktop right nav */}
            <nav className="notch-desktop-nav notch-desktop-nav-right">
              {NAV_RIGHT.map(item => (
                <NavLink
                  key={item.label}
                  {...item}
                  isActive={activeSection === item.href.slice(1)}
                  onClick={e => handleClick(e, item.href)}
                />
              ))}
            </nav>

            {/* Mobile placeholder (right side balance) */}
            <div className="notch-mobile-spacer" />
          </div>

          {/* Right curved corner */}
          <div className="notch-corner notch-corner-right">
            <svg className="notch-corner-svg" viewBox="0 0 50 64" preserveAspectRatio="none">
              <path
                d="M0 0 H50 V40 C25 40 25 64 0 64 Z"
                className="notch-corner-fill"
              />
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" className="notch-corner-line" />
            </svg>
          </div>
        </div>

        {/* ═══════ RIGHT SIDE-BAR ═══════ */}
        <div className={`notch-sidebar notch-sidebar-right${isScrolled ? ' scrolled' : ''}`} />
      </motion.header>

      {/* ═══════ MOBILE DRAWER ═══════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="notch-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="notch-drawer glass-panel"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul>
                {ALL_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                  >
                    <a
                      href={link.href}
                      className={`notch-drawer-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                      onClick={e => handleClick(e, link.href)}
                    >
                      <link.icon size={16} className="notch-drawer-icon" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
