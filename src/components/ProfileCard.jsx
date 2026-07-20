import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Code2, Brain, Globe, Cpu } from 'lucide-react';
import './ProfileCard.css';

let profileSrc = null;
try { profileSrc = new URL('../assets/profile.jpg', import.meta.url).href; } catch (_) {}

/* ─── Data ─────────────────────────────────────────── */
const SKILLS = [
  {
    label: 'Programming',
    color: '#00E5FF',
    icon: Code2,
    items: ['C++', 'Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    label: 'AI & ML',
    color: '#A855F7',
    icon: Brain,
    items: ['Machine Learning', 'TensorFlow', 'NumPy', 'Pandas', 'Graph RAG'],
  },
  {
    label: 'Web & Backend',
    color: '#38BDF8',
    icon: Globe,
    items: ['React', 'Node.js', 'Express.js', 'REST APIs', 'Git & GitHub'],
  },
  {
    label: 'Core CS',
    color: '#F89820',
    icon: Cpu,
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
  { issuer: 'Indian Institute of Technology, Kharagpur', title: "National Students' Space Challenge 2025", credId: 'NSSC25/PID25-654250', link: 'https://app.truscholar.io/profile?credId=692d46dfa7f26c822b19f214', issued: 'Dec 2025' },
  { issuer: 'Coursera', title: 'AWS S3 Basics', credId: 'U3FHPWJ4VCHA', link: 'https://coursera.org/verify/U3FHPWJ4VCHA', issued: 'Jul 2025' },
  { issuer: 'Microsoft', title: 'Data Structures and Algorithms', credId: 'UKVARDNXXE8W', link: 'https://www.coursera.org/account/accomplishments/verify/UKVARDNXXE8W', issued: 'Jul 2025' },
  { issuer: 'Microsoft', title: 'Preparing for the AZ-900 Microsoft Azure Fundamentals Exam', credId: 'YTGVLRVGANOE', link: 'https://www.coursera.org/account/accomplishments/verify/YTGVLRVGANOE', issued: 'Jun 2025' },
  { issuer: 'Amazon Web Services (AWS)', title: 'AWS Cloud Practitioner Essentials', credId: 'IQ1UOWHAFPJ1', link: 'https://coursera.org/verify/IQ1UOWHAFPJ1', issued: 'Jun 2025' },
  { issuer: 'Neo4j', title: 'Neo4j Certified Professional', credId: 'fb27cffa-68fd-4622-aafc-beb94b433479', link: 'https://graphacademy.neo4j.com/c/fb27cffa-68fd-4622-aafc-beb94b433479', issued: 'Apr 2025' },
  { issuer: 'United Latino Students Association', title: 'Introduction to Large Language Models', credId: 'U2UBH18XEU4H', link: 'https://coursera.org/verify/U2UBH18XEU4H', issued: 'Apr 2025' },
  { issuer: 'Google Cloud Security', title: 'Introduction to Generative AI', credId: '17FAE5UJR472', link: 'https://coursera.org/verify/17FAE5UJR472', issued: 'Apr 2025' },
];

const ISSUER_COLOR = {
  'Indian Institute of Technology, Kharagpur': '#00A4EF',
  Coursera: '#0056D2',
  Microsoft: '#00A4EF',
  'Amazon Web Services (AWS)': '#FF9900',
  Neo4j: '#018BFF',
  'United Latino Students Association': '#A855F7',
  'Google Cloud Security': '#4285F4',
};

const ISSUER_SHORT = {
  'Indian Institute of Technology, Kharagpur': 'IIT KGP',
  'Amazon Web Services (AWS)': 'AWS',
  'United Latino Students Association': 'ULSA',
  'Google Cloud Security': 'Google Cloud',
};

/* ─── Sub-components ────────────────────────────────── */
function SkillGroup({ label, color, icon: Icon, items, delay }) {
  return (
    <motion.div
      className="pc-skill-group"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="pc-skill-header">
        <span className="pc-skill-icon" style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
          <Icon size={14} style={{ color }} />
        </span>
        <span className="pc-skill-label" style={{ color }}>{label}</span>
      </div>
      <div className="pc-skill-pills">
        {items.map((item) => (
          <span key={item} className="pc-skill-pill" style={{ '--pill-color': color }}>
            {item}
          </span>
        ))}
      </div>
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

function CertCard({ issuer, title, credId, link, issued, delay }) {
  const color = ISSUER_COLOR[issuer] || '#00E5FF';
  const short = ISSUER_SHORT[issuer] || issuer;
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="pc-cert-card"
      style={{ '--cert-color': color }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -2 }}
    >
      <div className="pc-cert-accent" />
      <div className="pc-cert-body">
        <div className="pc-cert-meta">
          <span className="pc-cert-badge" style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
            {short}
          </span>
          {issued && <span className="pc-cert-issued">{issued}</span>}
        </div>
        <p className="pc-cert-title">{title}</p>
        <div className="pc-cert-footer">
          <span className="pc-cert-id">ID: {credId}</span>
          <span className="pc-cert-cta">
            View <ExternalLink size={10} />
          </span>
        </div>
      </div>
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
              <span className="pc-cert-count">{CERTIFICATIONS.length}</span>
            </h3>
            <div className="pc-certs-list">
              {CERTIFICATIONS.map((c, i) => (
                <CertCard key={i} {...c} delay={i * 0.06} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
