import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, MessageCircle, Code2, Rocket, Cpu } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import TextGenerateEffect from './TextGenerateEffect';
import './Hero.css';

let profileSrc = null;
try { profileSrc = new URL('../assets/profile.jpg', import.meta.url).href; } catch (_) {}

/* ── Stats data ── */
const STATS = [
  { icon: Code2,   value: '220+', label: 'DSA Problems' },
  { icon: Rocket,  value: '5+',   label: 'Projects Completed' },
  { icon: Cpu,     value: '2+',   label: 'Years of Learning' },
];

const Hero = () => {
  const [imgError, setImgError] = useState(false);
  const photoRef = useRef(null);

  /* Mouse-follow tilt for photo */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

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
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };
  const rightVariants = {
    hidden:  { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="hero-section">
      {/* Background nebula blobs */}
      <div className="hero-bg-blob hero-bg-blob-1" aria-hidden="true" />
      <div className="hero-bg-blob hero-bg-blob-2" aria-hidden="true" />
      <div className="hero-bg-blob hero-bg-blob-3" aria-hidden="true" />

      <div className="hero-content container">
        {/* ══ LEFT: Text ══ */}
        <motion.div
          className="hero-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hello badge */}
          <motion.div className="hero-hello-badge" variants={itemVariants}>
            <span className="hello-dot" />
            Hello, I'm
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero-name" variants={itemVariants}>
            <span className="hero-name-white">Ritam </span>
            <span className="hero-name-purple">Jana</span>
          </motion.h1>

          {/* Role subtitle — text generate effect */}
          <motion.div className="hero-role-wrap" variants={itemVariants}>
            <TextGenerateEffect
              words="Software Engineer | Competitive Programmer | Problem Solver"
              className="hero-role-tge"
              filter={true}
              duration={0.5}
              delay={0.1}
            />
          </motion.div>

          {/* Description — text generate effect */}
          <motion.div className="hero-desc-wrap" variants={itemVariants}>
            <TextGenerateEffect
              words="I build efficient, scalable and impactful software solutions that solve real world problems."
              className="hero-desc-tge"
              filter={true}
              duration={0.45}
              delay={0.07}
            />
          </motion.div>

          {/* Buttons */}
          <motion.div className="hero-buttons" variants={itemVariants}>
            <a href="#projects" className="btn-hero btn-hero-primary">
              View My Work <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn-hero btn-hero-outline">
              Contact Me <MessageCircle size={15} />
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div className="hero-socials" variants={itemVariants}>
            {[
              { href: 'https://github.com/Ritaam',                          icon: <FaGithub size={18} />,   label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/ritam-jana-b90382310/', icon: <FaLinkedin size={18} />,  label: 'LinkedIn' },
              { href: '#',                                                   icon: <FaTwitter size={18} />,   label: 'Twitter' },
              { href: '#',                                                   icon: <FaInstagram size={18} />, label: 'Instagram' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="hero-social-icon"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ CENTER: Photo ══ */}
        <motion.div
          className="hero-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            ref={photoRef}
            className="hero-photo-ring"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
          >
            {/* Glow layers */}
            <div className="hero-photo-glow-outer" />
            <div className="hero-photo-glow-inner" />

            {/* Orbit rings */}
            <span className="hero-orbit-ring hero-orbit-ring-1" />
            <span className="hero-orbit-ring hero-orbit-ring-2" />

            {/* Orbit dots */}
            <span className="hero-orbit-dot hero-orbit-dot-1" />
            <span className="hero-orbit-dot hero-orbit-dot-2" />
            <span className="hero-orbit-dot hero-orbit-dot-3" />

            {/* Photo inner */}
            <div className="hero-photo-inner">
              {profileSrc && !imgError ? (
                <img
                  src={profileSrc}
                  alt="Ritam Jana"
                  className="hero-photo"
                  loading="eager"
                  decoding="async"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="hero-photo-placeholder">
                  <span style={{ fontSize: '5rem' }}>👨‍💻</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ══ RIGHT: Stats ══ */}
        <motion.div
          className="hero-right"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              className="hero-stat-card"
              variants={rightVariants}
              custom={i}
              whileHover={{ x: -4, boxShadow: '0 8px 32px rgba(0,229,255,0.12)' }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="hero-stat-icon">
                <Icon size={20} />
              </div>
              <div className="hero-stat-body">
                <span className="hero-stat-value">{value}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
