import React from 'react';
import { Terminal, Code, Cpu, Target, BookOpen, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { number: '220+', label: 'DSA Problems Solved' },
    { number: '2+', label: 'Projects Built' },
    { number: '5+', label: 'Languages Known' },
  ];

  const traits = [
    { icon: <Target size={22} />, title: 'Goal-Driven', desc: 'Aiming for top-tier SWE roles' },
    { icon: <BookOpen size={22} />, title: 'Lifelong Learner', desc: 'Constantly upskilling in DSA & AI' },
    { icon: <Zap size={22} />, title: 'Fast Executor', desc: 'From idea to working code quickly' },
    { icon: <Cpu size={22} />, title: 'Systems Thinker', desc: 'Loves low-level & architecture design' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <p className="section-label">Get to know me</p>
        <h2 className="section-title">
          About <span className="text-gradient">Me</span>
        </h2>

        {/* Top: bio + code mockup */}
        <div className="about-top">
          <div className="about-bio glass-panel">
            <p>
              Hey! I'm <strong>Ritam Jana</strong>, a Computer Science Engineering student fueled
              by a deep passion for coding, problem-solving, and building things that matter.
              My journey began with curiosity about how software works under the hood — and that
              curiosity never stopped.
            </p>
            <p>
              I specialize in <strong>Data Structures &amp; Algorithms</strong> and love
              competitive programming. Beyond the competitive side, I'm fascinated by
              <strong> AI systems</strong>, particularly Graph RAG and LLM-powered applications
              — the bleeding edge of what software can do.
            </p>
            <p>
              My career goal is clear: become a <strong>Software Engineer at a top tech
                company</strong> and ship products that impact millions of users. I'm driven
              by growth, consistency, and an obsession with clean, efficient code.
            </p>

            {/* Stats row */}
            <div className="about-stats">
              {stats.map((s) => (
                <div key={s.label} className="stat-item">
                  <span className="stat-number text-gradient">{s.number}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code window */}
          <div className="about-code-window glass-panel">
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
                  {'  }'};<br />
                  {'}'};{'\n\n'}
                  <span className="cv">string</span>{' '}
                  <span className="cp">solve</span>(<span className="cv">string</span> problem){' {'}{'\n'}
                  {'  '}<span className="ck">return</span>{' '}
                  <span className="cs">"Optimal Solution ✓"</span>;{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Bottom: trait cards */}
        <div className="about-traits">
          {traits.map((t) => (
            <div key={t.title} className="trait-card glass-panel">
              <div className="trait-icon">{t.icon}</div>
              <h4 className="trait-title">{t.title}</h4>
              <p className="trait-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
