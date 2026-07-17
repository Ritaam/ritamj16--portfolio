import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Code, Cpu, Target, BookOpen, Zap } from 'lucide-react';
import './About.css';

/* Animated counter hook */
function useCounter(target, isActive, duration = 1800) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/\D/g, ''), 10);
  const suffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isActive, numericTarget, duration]);

  return `${count}${suffix}`;
}

function StatItem({ number, label, isActive }) {
  const display = useCounter(number, isActive);
  return (
    <div className="stat-item">
      <span className="stat-number text-gradient">{display}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const stats = [
    { number: '220+', label: 'DSA Problems Solved' },
    { number: '2+',   label: 'Projects Built' },
    { number: '5+',   label: 'Languages Known' },
  ];

  const traits = [
    { icon: <Target size={22} />,   title: 'Goal-Driven',      desc: 'Aiming for top-tier SWE roles' },
    { icon: <BookOpen size={22} />, title: 'Lifelong Learner',  desc: 'Constantly upskilling in DSA & AI' },
    { icon: <Zap size={22} />,      title: 'Fast Executor',     desc: 'From idea to working code quickly' },
    { icon: <Cpu size={22} />,      title: 'Systems Thinker',   desc: 'Loves low-level & architecture design' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get to know me</p>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        {/* Bio + code mockup */}
        <motion.div
          className="about-top"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="about-bio glass-panel" variants={itemVariants}>
            <p>
              Hey! I'm <strong>Ritam Jana</strong>, a Computer Science Engineering student fueled
              by a deep passion for coding, problem-solving, and building things that matter.
              My journey began with curiosity about how software works under the hood — and that
              curiosity never stopped.
            </p>
            <p>
              I specialize in <strong>Data Structures &amp; Algorithms</strong> and love
              competitive programming. Beyond the competitive side, I'm fascinated by{' '}
              <strong>AI systems</strong>, particularly Graph RAG and LLM-powered applications
              — the bleeding edge of what software can do.
            </p>
            <p>
              My career goal is clear: become a <strong>Software Engineer at a top tech
              company</strong> and ship products that impact millions of users. I'm driven
              by growth, consistency, and an obsession with clean, efficient code.
            </p>

            {/* Animated stats */}
            <div className="about-stats">
              {stats.map((s) => (
                <StatItem key={s.label} number={s.number} label={s.label} isActive={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Code window */}
          <motion.div className="about-code-window glass-panel" variants={itemVariants}>
            <div className="code-window-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="code-filename">ritam.cpp</span>
            </div>
            <div className="code-window-body">
              <pre>
                <code>
                  <span className="ck">#include</span>{' '}
                  <span className="cs">&lt;bits/stdc++.h&gt;</span>{'\n'}
                  <span className="ck">using namespace</span>{' '}
                  <span className="cv">std</span>;{'\n\n'}
                  <span className="ck">struct</span>{' '}
                  <span className="cv">Developer</span>{' {'}
                  {'\n'}
                  {'  '}<span className="cv">string</span>{' '}
                  <span className="cp">name</span>{' = '}
                  <span className="cs">"Ritam Jana"</span>;{'\n'}
                  {'  '}<span className="cv">string</span>{' '}
                  <span className="cp">role</span>{' = '}
                  <span className="cs">"CSE Student"</span>;{'\n'}
                  {'  '}<span className="cv">string</span>{' '}
                  <span className="cp">goal</span>{' = '}
                  <span className="cs">"SWE @ FAANG"</span>;{'\n'}
                  {'  '}<span className="cv">bool</span>{' '}
                  <span className="cp">hardWorker</span>{' = '}
                  <span className="ck">true</span>;{'\n'}
                  {'  '}<span className="cv">vector</span>{'<'}<span className="cv">string</span>{'> '}
                  <span className="cp">passion</span>{' = {'}
                  {'\n'}
                  {'    '}<span className="cs">"Competitive Programming"</span>,{'\n'}
                  {'    '}<span className="cs">"AI Engineering"</span>,{'\n'}
                  {'    '}<span className="cs">"System Design"</span>{'\n'}
                  {'  }'};{''}
                  {'\n'}{'}'};{'\n\n'}
                  <span className="cv">string</span>{' '}
                  <span className="cp">solve</span>(<span className="cv">string</span> problem){' {'}
                  {'\n'}
                  {'  '}<span className="ck">return</span>{' '}
                  <span className="cs">"Optimal Solution ✓"</span>;{'\n'}
                  {'}'}
                  <span className="code-cursor">▊</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </motion.div>

        {/* Trait cards */}
        <motion.div
          className="about-traits"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {traits.map((t) => (
            <motion.div
              key={t.title}
              className="trait-card glass-panel"
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="trait-icon">{t.icon}</div>
              <h4 className="trait-title">{t.title}</h4>
              <p className="trait-desc">{t.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
