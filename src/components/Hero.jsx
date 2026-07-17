import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Text3DFlip from './Text3DFlip';
import TextGenerateEffect from './TextGenerateEffect';
import './Hero.css';

let profileSrc = null;
try { profileSrc = new URL('../assets/profile.jpg', import.meta.url).href; } catch (_) {}


/* ── Ripple hook ── */
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const addRipple = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
  }, []);
  return [ripples, addRipple];
}

const Hero = () => {
  const [imgError, setImgError] = useState(false);

  const photoRef = useRef(null);
  const [primaryRipples, addPrimaryRipple] = useRipple();
  const [resumeRipples,  addResumeRipple]  = useRipple();

  /* Mouse-follow tilt for photo */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handlePhotoMouseMove = (e) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handlePhotoMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.13 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="hero-section">
      {/* Subtle code watermark */}
      <div className="code-bg" aria-hidden="true">
        <pre><code>{`const developer = {\n  name: "Ritam Jana",\n  passion: "Coding",\n  goal: "Top Tech SWE",\n  status: "Building impact"\n};`}</code></pre>
      </div>

      <div className="hero-content container">
        <motion.div
          className="hero-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── PHOTO (top, centered) ── */}
          <motion.div
            className="hero-photo-wrap"
            variants={itemVariants}
          >
            <motion.div
              ref={photoRef}
              className="hero-photo-ring"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
            >
              {/* Ambient glow */}
              <div className="hero-photo-glow" />

              {/* Orbiting dots */}
              <span className="hero-orbit-dot hero-orbit-dot-1" />
              <span className="hero-orbit-dot hero-orbit-dot-2" />
              <span className="hero-orbit-dot hero-orbit-dot-3" />

              <div className="hero-photo-inner">
                {profileSrc && !imgError ? (
                  <img
                    src={profileSrc}
                    alt="RITAM JANA"
                    className="hero-photo"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="hero-photo-placeholder">
                    <span style={{ fontSize: '4rem' }}>👨‍💻</span>
                    <span>Ritam Jana</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div
              className="hero-photo-badge"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="badge-dot" />
              Available for Opportunities
            </motion.div>
          </motion.div>

          {/* ── NAME ── */}
          <motion.div variants={itemVariants} className="hero-name-wrap">
            <p className="greeting">// Hello World, I'm</p>
            <Text3DFlip
              className="name"
              flipTextClassName="text-gradient"
              rotateDirection="top"
              staggerFrom="center"
            >
              RITAM JANA
            </Text3DFlip>
          </motion.div>

          {/* ── TEXT GENERATE EFFECT (role tagline) ── */}
          <motion.div variants={itemVariants}>
            <TextGenerateEffect
              words="Competitive Programmer · Aspiring SWE · AI Engineer · Problem Solver"
              className="hero-tge"
              duration={0.6}
              delay={0.12}
              filter={true}
            />
          </motion.div>

          {/* ── DESCRIPTION ── */}
          <motion.p className="description" variants={itemVariants}>
            I'm a Computer Science Engineering student passionate about programming,
            data structures, and real-world applications. Currently focused on
            mastering algorithms and system design to become a software engineer
            at a top tech company.
          </motion.p>

          {/* ── BUTTONS ── */}
          <motion.div className="hero-buttons" variants={itemVariants}>
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={addPrimaryRipple}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {primaryRipples.map(r => (
                <span key={r.id} className="btn-ripple" style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
              ))}
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
            <a
              href="/resume.pdf"
              download="Ritam_Jana_Resume.pdf"
              className="btn btn-resume"
              onClick={addResumeRipple}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {resumeRipples.map(r => (
                <span key={r.id} className="btn-ripple" style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
              ))}
              <Download size={16} />
              Resume
            </a>
          </motion.div>

          {/* ── SOCIALS ── */}
          <motion.div className="hero-socials" variants={itemVariants}>
            {[
              { href: 'https://github.com/Ritaam',                          icon: <FaGithub size={18} />,  label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/ritam-jana-b90382310/', icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
              { href: 'mailto:ritamjana6969@gmail.com',                     icon: <Mail size={18} />,       label: 'Email' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="social-icon"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <a href="#profile" aria-label="Scroll down">
          <ChevronDown size={28} className="bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
