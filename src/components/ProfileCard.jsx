import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import './ProfileCard.css';

let profileSrc = null;
try { profileSrc = new URL('../assets/profile.jpg', import.meta.url).href; } catch (_) {}

/* ─── Data ─────────────────────────────────────────── */
const SKILLS = [
  {
    label: 'Programming',
    color: '#00E5FF',
    items: ['C++', 'Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    label: 'AI & ML',
    color: '#A855F7',
    items: ['Machine Learning', 'TensorFlow', 'NumPy', 'Pandas', 'Graph RAG'],
  },
  {
    label: 'Web & Backend',
    color: '#38BDF8',
    items: ['React', 'Node.js', 'Express.js', 'REST APIs', 'Git & GitHub'],
  },
  {
    label: 'Core CS',
    color: '#F89820',
    items: ['Data Structures', 'Algorithms', 'OS', 'DBMS', 'System Design'],
  },
];

const EXPERIENCE = [
  {
    role: 'Competitive Programmer',
    org: 'LeetCode & Codeforces',
    period: '2022 – Present',
    points: ['220+ DSA problems solved', 'Regular contest participation'],
  },
  {
    role: 'AI / ML Projects',
    org: 'Self-driven',
    period: '2023 – Present',
    points: ['Built Graph RAG system with Neo4j', 'LLM-powered applications'],
  },
  {
    role: 'Full-Stack Projects',
    org: 'Personal',
    period: '2023 – Present',
    points: ['React + Node.js portfolio & apps', 'REST API design & integration'],
  },
];

const CERTIFICATIONS = [
  { issuer: 'IBM',    title: 'Generative AI: Prompt Engineering Basics',      link: '#' },
  { issuer: 'IBM',    title: 'Generative AI: Introduction and Applications',  link: '#' },
  { issuer: 'IBM',    title: 'Generative AI for Software Developers',         link: '#' },
  { issuer: 'Google', title: 'Introduction to AI',                            link: '#' },
  { issuer: 'Google', title: 'Machine Learning Crash Course',                  link: '#' },
  { issuer: 'Meta',   title: 'Introduction to Front-End Development',          link: '#' },
];

const ISSUER_COLOR = {
  IBM:    '#0062FF',
  Google: '#EA4335',
  Meta:   '#0866FF',
  AWS:    '#FF9900',
  Coursera: '#0056D2',
};

/* ─── Sub-components ────────────────────────────────── */
function SkillGroup({ label, color, items, delay }) {
  return (
    <motion.div
      className="pc-skill-group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <p className="pc-skill-label" style={{ color }}>{label}:</p>
      <p className="pc-skill-items">{items.join(', ')}</p>
    </motion.div>
  );
}

function ExpItem({ role, org, period, points, delay }) {
  return (
    <motion.div
      className="pc-exp-item"
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="pc-exp-header">
        <span className="pc-exp-role">{role}</span>
        <span className="pc-exp-period">{period}</span>
      </div>
      <p className="pc-exp-org">{org}</p>
      <ul className="pc-exp-points">
        {points.map((pt, i) => <li key={i}>{pt}</li>)}
      </ul>
    </motion.div>
  );
}

function CertCard({ issuer, title, link, delay }) {
  const color = ISSUER_COLOR[issuer] || '#00E5FF';
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="pc-cert-card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}22` }}
    >
      <div className="pc-cert-top">
        <span className="pc-cert-issuer" style={{ color }}>{issuer}:</span>
        <ExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
      </div>
      <p className="pc-cert-title">{title}</p>
    </motion.a>
  );
}

/* ─── Main component ─────────────────────────────────  */
export default function ProfileCard() {
  return (
    <section id="profile" className="pc-section">
      <div className="container">
        <div className="pc-grid">

          {/* ══ LEFT: Technical Skills ══ */}
          <motion.div
            className="pc-card pc-card-skills"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="pc-card-title">
              <span className="pc-title-bar" /> Technical Skills
            </h3>
            <div className="pc-skills-list">
              {SKILLS.map((s, i) => (
                <SkillGroup key={s.label} {...s} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* ══ CENTER: About + Experience ══ */}
          <div className="pc-center-col">
            {/* About Me */}
            <motion.div
              className="pc-card pc-card-about"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="pc-card-title">
                <span className="pc-title-bar" /> About Me
              </h3>
              <p className="pc-about-text">
                Hey! I'm <strong>Ritam Jana</strong>, a Computer Science Engineering student
                fueled by a deep passion for coding, problem-solving, and building things
                that matter. I specialize in <strong>Data Structures & Algorithms</strong> and
                love competitive programming.
              </p>
              <p className="pc-about-text">
                I'm fascinated by <strong>AI systems</strong> — particularly Graph RAG and
                LLM-powered applications. My career goal is to become a{' '}
                <strong>Software Engineer at a top tech company</strong> and ship products
                that impact millions.
              </p>
              <div className="pc-stats">
                {[
                  { n: '220+', l: 'DSA Problems' },
                  { n: '5+',   l: 'Languages' },
                  { n: '2+',   l: 'Projects' },
                ].map(s => (
                  <div key={s.l} className="pc-stat">
                    <span className="pc-stat-n text-gradient">{s.n}</span>
                    <span className="pc-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              className="pc-card pc-card-exp"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="pc-card-title">
                <span className="pc-title-bar" /> Experience
              </h3>
              <div className="pc-exp-list">
                {EXPERIENCE.map((e, i) => (
                  <ExpItem key={e.role} {...e} delay={i * 0.09} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ══ RIGHT: Certifications ══ */}
          <motion.div
            className="pc-card pc-card-certs"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="pc-card-title">
              <span className="pc-title-bar" />
              <Award size={18} style={{ color: 'var(--cyan)', marginRight: 6 }} />
              Certifications
            </h3>
            <div className="pc-certs-list">
              {CERTIFICATIONS.map((c, i) => (
                <CertCard key={i} {...c} delay={i * 0.07} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
