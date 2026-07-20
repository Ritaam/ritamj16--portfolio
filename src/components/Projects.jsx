import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const BADGE_COLOR = {
  'Full Stack': { bg: 'rgba(0,229,255,0.15)', color: '#00E5FF', border: 'rgba(0,229,255,0.3)' },
  'AI / ML':   { bg: 'rgba(168,85,247,0.15)', color: '#A855F7', border: 'rgba(168,85,247,0.3)' },
  'Web App':   { bg: 'rgba(56,189,248,0.15)', color: '#38BDF8', border: 'rgba(56,189,248,0.3)' },
  'Algorithm': { bg: 'rgba(248,152,32,0.15)', color: '#F89820', border: 'rgba(248,152,32,0.3)' },
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const projects = [
    {
      badge: 'Algorithm',
      title: 'Coin Change Problem Solver',
      description: 'Interactive web app that visualizes the Dynamic Programming approach to the Coin Change problem. Users input custom denominations and see step-by-step solutions.',
      tags: ['React', 'Dynamic Programming', 'Algorithms', 'CSS'],
      github: 'https://github.com/Ritaam',
      external: '#',
      gradient: 'linear-gradient(135deg, #0e1a40, #1a0a3e)',
      accentColor: '#F89820',
    },
    {
      badge: 'AI / ML',
      title: 'Graph RAG System',
      description: 'A sophisticated system enhancing LLM responses via knowledge graphs. Extracts entities and relationships from documents for more accurate, context-aware answers.',
      tags: ['Python', 'LLMs', 'Neo4j', 'NLP'],
      github: 'https://github.com/Ritaam',
      external: '#',
      gradient: 'linear-gradient(135deg, #0e1028, #1a0a3e)',
      accentColor: '#A855F7',
    },
    {
      badge: 'Full Stack',
      title: 'Smart Locker Return System',
      description: 'Java-based system simulating an automated locker return process using multiple design patterns: Strategy, Observer, Builder, Factory, and Chain of Responsibility.',
      tags: ['Java', 'Design Patterns', 'OOP', 'System Architecture'],
      github: 'https://github.com/Ritaam',
      external: '',
      gradient: 'linear-gradient(135deg, #071628, #0a1535)',
      accentColor: '#00E5FF',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const cardVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="projects" className="pj-section" ref={ref}>
      <div className="container">
        {/* Heading */}
        <motion.div
          className="pj-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pj-section-label">| Featured Projects</span>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="pj-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => {
            const badge = BADGE_COLOR[project.badge] || BADGE_COLOR['Full Stack'];
            return (
              <motion.div
                key={index}
                className="pj-card"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                style={{ '--pj-accent': project.accentColor }}
              >
                {/* Preview area */}
                <div className="pj-preview" style={{ background: project.gradient }}>
                  <div className="pj-preview-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}22, transparent 70%)` }} />
                  {/* Fake browser chrome */}
                  <div className="pj-browser-bar">
                    <span className="pj-dot" style={{ background: '#FF5F57' }} />
                    <span className="pj-dot" style={{ background: '#FEBC2E' }} />
                    <span className="pj-dot" style={{ background: '#28C840' }} />
                  </div>
                  <div className="pj-preview-content">
                    <div className="pj-preview-lines">
                      <div className="pj-line" style={{ width: '70%', background: `${project.accentColor}40` }} />
                      <div className="pj-line" style={{ width: '50%', background: `${project.accentColor}28` }} />
                      <div className="pj-line" style={{ width: '85%', background: `${project.accentColor}20` }} />
                      <div className="pj-line" style={{ width: '40%', background: `${project.accentColor}18` }} />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="pj-body">
                  <div className="pj-top-row">
                    <span
                      className="pj-badge"
                      style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}
                    >
                      {project.badge}
                    </span>
                    <div className="pj-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="pj-link-btn">
                          <FaGithub size={16} />
                        </a>
                      )}
                      {project.external && (
                        <a href={project.external} target="_blank" rel="noreferrer" aria-label="Live" className="pj-link-btn">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="pj-title">{project.title}</h3>
                  <p className="pj-desc">{project.description}</p>

                  <ul className="pj-tags">
                    {project.tags.map(tag => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="pj-cta-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="https://github.com/Ritaam" target="_blank" rel="noreferrer" className="pj-cta-btn">
            View All Projects <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
