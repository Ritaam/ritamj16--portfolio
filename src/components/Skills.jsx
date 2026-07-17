import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LogoLoop from './LogoLoop';
import {
  SiCplusplus, SiPython, SiJavascript, SiReact,
  SiNodedotjs, SiGit, SiGithub, SiLeetcode,
  SiMysql, SiLinux
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { Code2, Database, Wrench, Lightbulb } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 size={22} />,
    color: 'var(--cyan)',
    skills: ["C++", "Python", "Java", "JavaScript", "SQL"],
  },
  {
    title: "Core CS",
    icon: <Database size={22} />,
    color: 'var(--purple-light)',
    skills: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
  },
  {
    title: "Tools & Tech",
    icon: <Wrench size={22} />,
    color: '#38BDF8',
    skills: ["Git", "GitHub", "VS Code", "React", "Node.js"],
  },
  {
    title: "Concepts",
    icon: <Lightbulb size={22} />,
    color: 'var(--purple)',
    skills: ["Problem Solving", "Competitive Programming", "System Design", "OOP", "Agile"],
  },
];

const techLogos = [
  { node: <SiCplusplus color="#00599C" />, title: 'C++' },
  { node: <SiPython color="#3776AB" />,    title: 'Python' },
  { node: <FaJava color="#f89820" />,       title: 'Java' },
  { node: <SiJavascript color="#F7DF1E" />, title: 'JavaScript' },
  { node: <SiReact color="#61DAFB" />,      title: 'React' },
  { node: <SiNodedotjs color="#339933" />,  title: 'Node.js' },
  { node: <SiGit color="#F05032" />,        title: 'Git' },
  { node: <SiGithub color="#ffffff" />,     title: 'GitHub' },
  { node: <SiMysql color="#4479A1" />,      title: 'MySQL' },
  { node: <SiLinux color="#FCC624" />,      title: 'Linux' },
  { node: <SiLeetcode color="#FFA116" />,   title: 'LeetCode' },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="text-gradient">02.</span> Technical Arsenal
          </h2>
        </motion.div>

        {/* Skill category cards */}
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="skill-card glass-panel"
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ '--cat-color': category.color }}
            >
              <div className="skill-card-header">
                <div className="skill-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3 className="category-title" style={{ color: category.color }}>
                  {category.title}
                </h3>
              </div>
              <ul className="skill-list">
                {category.skills.map((skill, i) => (
                  <li key={skill} className="skill-item">
                    <span className="skill-bullet" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tech logo strip */}
      <div className="skills-logoloop-wrap">
        <LogoLoop
          logos={techLogos}
          speed={55}
          direction="left"
          logoHeight={44}
          gap={60}
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
