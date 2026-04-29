import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, User } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

// ──────────────────────────────────────────────
// Drop your photo at: src/assets/profile.jpg
// If the file doesn't exist yet, a placeholder is shown.
// ──────────────────────────────────────────────
let profileSrc = null;
try {
  profileSrc = new URL('../assets/profile.jpg', import.meta.url).href;
} catch (_) {}

const phrases = [
  "Competitive Programmer",
  "Aspiring Software Engineer",
  "AI Engineer",
  "Problem Solver",
  "Open Source Enthusiast",
];

const headlines = [
  "I build impactful solutions.",
  "I solve hard problems.",
  "I love clean code.",
  "I ship things fast.",
];

const Hero = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [headline, setHeadline] = useState('');
  const [hlIndex, setHlIndex] = useState(0);
  const [hlDeleting, setHlDeleting] = useState(false);

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    const pauseBeforeDelete = 1800;
    const pauseBeforeType = 400;

    let timeout;

    if (!isDeleting && text === current) {
      // Finished typing → pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
    } else if (isDeleting && text === '') {
      // Finished deleting → move to next phrase
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, pauseBeforeType);
    } else {
      // Typing or deleting one character
      timeout = setTimeout(() => {
        setText(isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  // ── Headline typewriter ──────────────────────
  useEffect(() => {
    const current = headlines[hlIndex];
    const speed = hlDeleting ? 35 : 90;
    let timeout;
    if (!hlDeleting && headline === current) {
      timeout = setTimeout(() => setHlDeleting(true), 2200);
    } else if (hlDeleting && headline === '') {
      timeout = setTimeout(() => {
        setHlDeleting(false);
        setHlIndex((p) => (p + 1) % headlines.length);
      }, 350);
    } else {
      timeout = setTimeout(() => {
        setHeadline(hlDeleting
          ? current.substring(0, headline.length - 1)
          : current.substring(0, headline.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [headline, hlDeleting, hlIndex]);

  return (
    <section id="home" className="hero-section">
      {/* Subtle code-snippet watermark */}
      <div className="code-bg">
        <pre><code>{`const developer = {
  name: "Ritam Jana",
  passion: "Coding",
  goal: "Top Tech SWE",
  status: "Building impact"
};`}</code></pre>
      </div>

      <div className="hero-content container">
        {/* ── Left: text ── */}
        <div className="hero-text-area animate-slide-up">
          <p className="greeting">// Hello World, I'm</p>
          <h1 className="name">Ritam Jana.</h1>
          <h2 className="title text-gradient">
            {headline}
            <span className={`headline-cursor ${hlDeleting ? 'cursor-delete' : ''}`}>|</span>
          </h2>

          <div className="typing-container">
            <p className="tagline">
              {text}
              <span className={`cursor ${isDeleting ? 'cursor-delete' : ''}`}>|</span>
            </p>
          </div>

          <p className="description delay-200 animate-slide-up">
            I'm a Computer Science Engineering student passionate about programming,
            data structures, and real-world applications. Currently focused on
            mastering algorithms and system design to become a software engineer
            at a top tech company.
          </p>

          <div className="hero-buttons delay-400 animate-slide-up">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>

          <div className="hero-socials delay-500 animate-fade-in">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:ritam@example.com" className="social-icon">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* ── Right: profile photo ── */}
        <div className="hero-photo-wrap animate-fade-in delay-300">
          <div className="hero-photo-ring">
            <div className="hero-photo-inner">
              {profileSrc && !imgError ? (
                <img
                  src={profileSrc}
                  alt="Ritam Jana"
                  className="hero-photo"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="hero-photo-placeholder">
                  <User size={80} strokeWidth={1} />
                  <span>Add profile.jpg<br />to src/assets/</span>
                </div>
              )}
            </div>
          </div>
          {/* floating badge */}
          <div className="hero-photo-badge">
            <span className="badge-dot" />
            Available for Opportunities
          </div>
        </div>
      </div>

      <div className="scroll-indicator delay-500 animate-fade-in">
        <a href="#about">
          <ChevronDown size={28} className="bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
