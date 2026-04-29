import React from 'react';
import LogoLoop from './LogoLoop';
import {
  SiCplusplus, SiPython, SiJavascript, SiReact,
  SiNodedotjs, SiGit, SiGithub, SiLeetcode,
  SiMysql, SiLinux
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import './Skills.css';

const skillCategories = [
  { title: "Programming", skills: ["C++", "Python", "Java", "JavaScript", "SQL"] },
  { title: "Core CS", skills: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks"] },
  { title: "Tools & Tech", skills: ["Git", "GitHub", "VS Code", "React", "Node.js"] },
  { title: "Concepts", skills: ["Problem Solving", "Competitive Programming", "System Design", "OOP", "Agile"] },
];

const techLogos = [
  { node: <SiCplusplus color="#00599C" />, title: 'C++' },
  { node: <SiPython color="#3776AB" />, title: 'Python' },
  { node: <FaJava color="#f89820" />, title: 'Java' },
  { node: <SiJavascript color="#F7DF1E" />, title: 'JavaScript' },
  { node: <SiReact color="#61DAFB" />, title: 'React' },
  { node: <SiNodedotjs color="#339933" />, title: 'Node.js' },
  { node: <SiGit color="#F05032" />, title: 'Git' },
  { node: <SiGithub color="#ffffff" />, title: 'GitHub' },
  { node: <SiMysql color="#4479A1" />, title: 'MySQL' },
  { node: <SiLinux color="#FCC624" />, title: 'Linux' },
  { node: <SiLeetcode color="#FFA116" />, title: 'LeetCode' },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">02.</span> Technical Arsenal
        </h2>

        {/* Skill category cards */}
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={category.title} className={`skill-card glass-panel delay-${(index + 1) * 100}`}>
              <h3 className="category-title">{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map(skill => (
                  <li key={skill} className="skill-item">
                    <span className="skill-bullet"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* GitHub Contribution Graph Mockup */}
        <div className="github-contribution-mockup glass-panel">
          <h3 className="contribution-title">Consistency &amp; Growth</h3>
          <p className="contribution-desc">Regularly solving DSA problems and building projects.</p>
          <div className="graph-container">
            {Array.from({ length: 52 }).map((_, colIndex) => (
              <div key={colIndex} className="graph-col">
                {Array.from({ length: 7 }).map((_, rowIndex) => {
                  const intensity = Math.floor(Math.random() * 5);
                  return <div key={rowIndex} className={`graph-cell level-${intensity}`}></div>;
                })}
              </div>
            ))}
          </div>
          <div className="graph-legend">
            <span>Less</span>
            <div className="graph-cell level-0"></div>
            <div className="graph-cell level-1"></div>
            <div className="graph-cell level-2"></div>
            <div className="graph-cell level-3"></div>
            <div className="graph-cell level-4"></div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* LogoLoop — scrolling tech icons strip */}
      <div className="skills-logoloop-wrap">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={42}
          gap={56}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Tech stack icons"
        />
      </div>
    </section>
  );
};

export default Skills;
