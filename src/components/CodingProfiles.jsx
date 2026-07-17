import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Code2 } from 'lucide-react';
import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiGeeksforgeeks,
} from 'react-icons/si';
import './CodingProfiles.css';

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: '@ritam_16',
    url: 'https://leetcode.com/u/ritam_16/',
    stat: '500+',
    statLabel: 'Problems Solved',
    badge: 'Active',
    Icon: SiLeetcode,
    color: '#FFA116',
    bg: 'rgba(255, 161, 22, 0.06)',
    border: 'rgba(255, 161, 22, 0.25)',
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    username: '@ritamj_16',
    url: 'https://codeforces.com/profile/ritamj_16',
    stat: '1458',
    statLabel: 'Rating',
    badge: 'Specialist',
    Icon: SiCodeforces,
    color: '#1F8ACB',
    bg: 'rgba(31, 138, 203, 0.06)',
    border: 'rgba(31, 138, 203, 0.25)',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    username: '@top_coder_16',
    url: 'https://www.codechef.com/users/top_coder_16',
    stat: '1764',
    statLabel: 'Rating',
    badge: '3★',
    Icon: SiCodechef,
    color: '#5B4638',
    bg: 'rgba(91, 70, 56, 0.1)',
    border: 'rgba(91, 70, 56, 0.35)',
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks',
    username: '@ritamj_16',
    url: 'https://auth.geeksforgeeks.org/user/ritamj_16',
    stat: '200+',
    statLabel: 'Problems Solved',
    badge: 'Active',
    Icon: SiGeeksforgeeks,
    color: '#2F8D46',
    bg: 'rgba(47, 141, 70, 0.06)',
    border: 'rgba(47, 141, 70, 0.25)',
  },
  {
    id: 'takeuforward',
    name: 'TakeUForward',
    username: '@Ritam07',
    url: 'https://takeuforward.org/profile/Ritam07',
    stat: 'SDE Sheet',
    statLabel: 'In Progress',
    badge: 'Learning',
    Icon: () => (
      <svg viewBox="0 0 100 100" className="cp-icon" aria-label="TakeUForward">
        <circle cx="50" cy="50" r="50" fill="#111" />
        <rect x="28" y="22" width="10" height="56" rx="3" fill="#fff" />
        <rect x="28" y="22" width="36" height="10" rx="3" fill="#fff" />
        <rect x="28" y="45" width="28" height="9" rx="3" fill="#fff" />
        <polygon points="68,50 80,40 80,46 95,46 95,54 80,54 80,60" fill="#FF6B35" />
      </svg>
    ),
    color: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.06)',
    border: 'rgba(255, 107, 53, 0.25)',
  },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const CodingProfiles = () => (
  <section id="coding" className="coding-section">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Where I Compete</p>
        <h2 className="section-title">
          Competitive <span className="text-gradient">Profiles</span>
        </h2>
        <p className="cp-subtitle">
          Track my progress across top competitive programming platforms.
        </p>
      </motion.div>

      <motion.div
        className="cp-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {profiles.map((p) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer noopener"
            className="cp-card"
            style={{
              '--cp-color':  p.color,
              '--cp-bg':     p.bg,
              '--cp-border': p.border,
            }}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            {/* Top accent glow bar */}
            <div className="cp-accent-bar" />

            {/* Header: icon + name + badge */}
            <div className="cp-header">
              <div className="cp-icon-wrap">
                <p.Icon className="cp-icon" style={{ color: p.color }} />
              </div>
              <div className="cp-name-block">
                <h3 className="cp-name">{p.name}</h3>
                <span className="cp-username">{p.username}</span>
              </div>
              <span className="cp-badge" style={{ color: p.color, borderColor: p.border, background: p.bg }}>
                {p.badge}
              </span>
            </div>

            {/* Divider */}
            <div className="cp-divider" />

            {/* Stat */}
            <div className="cp-stat-row">
              <span className="cp-stat-value">{p.stat}</span>
              <span className="cp-stat-label">{p.statLabel}</span>
            </div>

            {/* Footer CTA */}
            <div className="cp-footer">
              <Code2 size={13} />
              <span>View Profile</span>
              <ExternalLink size={11} className="cp-ext-icon" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CodingProfiles;
