import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  SiCplusplus, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiGit, SiMysql, SiLinux, SiExpress, SiMongodb, SiPostman,
  SiDocker, SiTailwindcss, SiHtml5, SiCss3,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { Brain } from 'lucide-react';
import './Skills.css';

/* ─── Tab data ────────────────────────────────────── */
const TABS = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { Icon: SiCplusplus,    color: '#00599C', name: 'C++',        level: 'Advanced' },
      { Icon: SiPython,       color: '#3776AB', name: 'Python',     level: 'Advanced' },
      { Icon: FaJava,         color: '#f89820', name: 'Java',       level: 'Intermediate' },
      { Icon: SiJavascript,   color: '#F7DF1E', name: 'JavaScript', level: 'Intermediate' },
      { Icon: SiMysql,        color: '#4479A1', name: 'SQL',        level: 'Advanced' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { Icon: SiReact,        color: '#61DAFB', name: 'React',       level: 'Intermediate' },
      { Icon: SiHtml5,        color: '#E34F26', name: 'HTML5',       level: 'Advanced' },
      { Icon: SiCss3,         color: '#1572B6', name: 'CSS3',        level: 'Advanced' },
      { Icon: SiTailwindcss,  color: '#06B6D4', name: 'Tailwind',    level: 'Intermediate' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { Icon: SiNodedotjs,    color: '#339933', name: 'Node.js',     level: 'Intermediate' },
      { Icon: SiExpress,      color: '#ffffff', name: 'Express.js',  level: 'Intermediate' },
      { Icon: SiMongodb,      color: '#47A248', name: 'MongoDB',     level: 'Beginner' },
      { Icon: SiMysql,        color: '#4479A1', name: 'MySQL',       level: 'Intermediate' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { Icon: SiGit,          color: '#F05032', name: 'Git',         level: 'Advanced' },
      { Icon: SiLinux,        color: '#FCC624', name: 'Linux',       level: 'Intermediate' },
      { Icon: SiPostman,      color: '#FF6C37', name: 'Postman',     level: 'Intermediate' },
      { Icon: SiDocker,       color: '#2496ED', name: 'Docker',      level: 'Beginner' },
    ],
  },
  {
    id: 'corecs',
    label: 'Core CS',
    items: [
      { Icon: () => <span style={{ fontSize: 22, fontWeight: 800, color: '#00E5FF' }}>DSA</span>,  color: '#00E5FF', name: 'Data Structures', level: 'Advanced' },
      { Icon: () => <span style={{ fontSize: 22, fontWeight: 800, color: '#A855F7' }}>ALG</span>,  color: '#A855F7', name: 'Algorithms',      level: 'Advanced' },
      { Icon: () => <span style={{ fontSize: 22, fontWeight: 800, color: '#38BDF8' }}>OS</span>,   color: '#38BDF8', name: 'Oper. Systems',   level: 'Intermediate' },
      { Icon: () => <span style={{ fontSize: 22, fontWeight: 800, color: '#F89820' }}>DBMS</span>, color: '#F89820', name: 'DBMS',            level: 'Intermediate' },
      { Icon: () => <span style={{ fontSize: 22, fontWeight: 800, color: '#4ade80' }}>OOP</span>,  color: '#4ade80', name: 'OOP',             level: 'Advanced' },
    ],
  },
];

const LEVEL_COLOR = {
  'Advanced':     '#00E5FF',
  'Intermediate': '#A855F7',
  'Beginner':     '#F89820',
};

/* ─── Tech Item Card ──────────────────────────────── */
function TechCard({ Icon, color, name, level, delay }) {
  return (
    <motion.div
      className="sk-tech-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: `0 10px 28px ${color}22` }}
      style={{ '--tech-color': color }}
    >
      <div className="sk-tech-icon-wrap" style={{ background: `${color}14`, border: `1px solid ${color}30` }}>
        <Icon />
      </div>
      <span className="sk-tech-name">{name}</span>
      <span className="sk-tech-level" style={{ color: LEVEL_COLOR[level] || '#00E5FF' }}>{level}</span>
    </motion.div>
  );
}

/* ─── Globe SVG decoration ───────────────────────── */
function GlobeDecor() {
  return (
    <svg className="sk-globe" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="110" cy="110" r="100" stroke="rgba(124,58,237,0.25)" strokeWidth="1" />
      <circle cx="110" cy="110" r="70"  stroke="rgba(124,58,237,0.18)" strokeWidth="1" />
      <circle cx="110" cy="110" r="40"  stroke="rgba(0,229,255,0.15)"  strokeWidth="1" />
      {/* Latitude lines */}
      <ellipse cx="110" cy="110" rx="100" ry="35" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
      <ellipse cx="110" cy="110" rx="100" ry="70" stroke="rgba(124,58,237,0.12)" strokeWidth="1" />
      {/* Dots */}
      {[[60,70],[150,90],[120,140],[80,150],[170,60],[40,130]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={i % 2 === 0 ? 'rgba(0,229,255,0.7)' : 'rgba(168,85,247,0.7)'} />
      ))}
      {/* Connection lines */}
      <line x1="60" y1="70"  x2="150" y2="90"  stroke="rgba(124,58,237,0.3)" strokeWidth="0.8" />
      <line x1="150" y1="90" x2="120" y2="140" stroke="rgba(0,229,255,0.25)"  strokeWidth="0.8" />
      <line x1="80" y1="150" x2="170" y2="60"  stroke="rgba(124,58,237,0.2)"  strokeWidth="0.8" />
      <line x1="40" y1="130" x2="120" y2="140" stroke="rgba(0,229,255,0.2)"   strokeWidth="0.8" />
    </svg>
  );
}

/* ─── Main component ──────────────────────────────── */
const Skills = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <section id="skills" className="sk-section" ref={ref}>
      <div className="container">
        {/* Section heading */}
        <motion.div
          className="sk-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="sk-section-label">| My Tech Stack</span>
        </motion.div>

        {/* Two-panel layout */}
        <div className="sk-grid">
          {/* ── Left panel: tabs + cards ── */}
          <motion.div
            className="sk-left"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Tab pills */}
            <div className="sk-tabs" role="tablist">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`sk-tab${activeTab === tab.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tech cards grid */}
            <div className="sk-cards-grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="sk-cards-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentTab?.items.map((item, i) => (
                    <TechCard key={item.name} {...item} delay={i * 0.06} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right panel: quote + globe ── */}
          <motion.div
            className="sk-right"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sk-right-inner">
              <div className="sk-quote-block">
                <p className="sk-quote-text">
                  Always <span className="sk-accent-yellow">learning</span>.{' '}
                  Always <span className="sk-accent-cyan">growing</span>.
                </p>
                <p className="sk-quote-sub">
                  Passionate about DSA, System Design, AI and
                  building products that make a difference.
                </p>
              </div>
              <GlobeDecor />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
