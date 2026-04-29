import React from 'react';
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
    Icon: SiLeetcode,
    color: '#FFA116',
    bg: 'rgba(255, 161, 22, 0.08)',
    border: 'rgba(255, 161, 22, 0.3)',
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    username: '@ritamj_16',
    url: 'https://codeforces.com/profile/ritamj_16',
    stat: 'Pupil',
    statLabel: 'Current Rank',
    Icon: SiCodeforces,
    color: '#1F8ACB',
    bg: 'rgba(31, 138, 203, 0.08)',
    border: 'rgba(31, 138, 203, 0.3)',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    username: '@top_coder_16',
    url: 'https://www.codechef.com/users/top_coder_16',
    stat: '★★★',
    statLabel: 'Rating',
    Icon: SiCodechef,
    color: '#5B4638',
    bg: 'rgba(91, 70, 56, 0.1)',
    border: 'rgba(91, 70, 56, 0.35)',
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks',
    username: '@your_username',
    url: 'https://auth.geeksforgeeks.org/user/your_username',
    stat: '200+',
    statLabel: 'Problems Solved',
    Icon: SiGeeksforgeeks,
    color: '#2F8D46',
    bg: 'rgba(47, 141, 70, 0.08)',
    border: 'rgba(47, 141, 70, 0.3)',
  },
  {
    id: 'takeuforward',
    name: 'TakeUForward',
    username: '@Ritam07',
    url: 'https://takeuforward.org/profile/Ritam07',
    stat: 'SDE Sheet',
    statLabel: 'In Progress',
    Icon: () => (
      <svg viewBox="0 0 100 100" className="cp-icon" aria-label="TakeUForward">
        <circle cx="50" cy="50" r="50" fill="#000" />
        {/* White F letterform */}
        <rect x="28" y="22" width="10" height="56" rx="3" fill="#fff" />
        <rect x="28" y="22" width="36" height="10" rx="3" fill="#fff" />
        <rect x="28" y="45" width="28" height="9" rx="3" fill="#fff" />
        {/* Orange arrow */}
        <polygon points="68,50 80,40 80,46 95,46 95,54 80,54 80,60" fill="#FF6B35" />
      </svg>
    ),
    color: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.08)',
    border: 'rgba(255, 107, 53, 0.3)',
  },
];

const CodingProfiles = () => (
  <section id="coding" className="coding-section">
    <div className="container">
      <p className="section-label">Where I Compete</p>
      <h2 className="section-title">
        Competitive <span className="text-gradient">Profiles</span>
      </h2>

      <div className="cp-grid">
        {profiles.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer noopener"
            className="cp-card glass-panel"
            style={{
              '--cp-color': p.color,
              '--cp-bg': p.bg,
              '--cp-border': p.border,
            }}
          >
            <div className="cp-accent-bar" />

            <div className="cp-header">
              <div className="cp-icon-wrap">
                <p.Icon className="cp-icon" />
              </div>
              <div>
                <h3 className="cp-name">{p.name}</h3>
                <span className="cp-username">{p.username}</span>
              </div>
            </div>

            <div className="cp-stat-row">
              <span className="cp-stat-value">{p.stat}</span>
              <span className="cp-stat-label">{p.statLabel}</span>
            </div>

            <div className="cp-visit">Visit Profile →</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CodingProfiles;
