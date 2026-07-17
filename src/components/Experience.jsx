import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const experiences = [
    {
      type: "learning",
      title: "Self-Taught & Ongoing Learning",
      organization: "Various Platforms",
      date: "Present",
      description: "Continuously expanding my skill set. Currently diving deep into System Design and advanced Data Structures to prepare for software engineering roles.",
      icon: <BookOpen size={18} />,
      color: 'var(--cyan)',
    },
    {
      type: "education",
      title: "Computer Science Engineering",
      organization: "Techno International New Town, Kolkata",
      date: "2024 - 2028",
      description: "Pursuing a degree in CSE with a focus on core computer science fundamentals. Consistently maintaining a strong academic record while participating in coding clubs.",
      icon: <GraduationCap size={18} />,
      color: 'var(--purple-light)',
    },
    {
      type: "project",
      title: "Building Real-World Projects",
      organization: "Personal Initiatives",
      date: "2024 - Present",
      description: "Applying theoretical knowledge to build practical applications. Focusing on clean code, modern architectures, and solving tangible problems.",
      icon: <Briefcase size={18} />,
      color: '#38BDF8',
    },
  ];

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="text-gradient">04.</span> My Journey
          </h2>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Marker */}
              <div className="timeline-marker">
                <motion.div
                  className="marker-icon"
                  style={{ borderColor: exp.color, color: exp.color }}
                  animate={isInView ? { boxShadow: [`0 0 0px ${exp.color}`, `0 0 20px ${exp.color}40`, `0 0 0px ${exp.color}`] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                >
                  {exp.icon}
                </motion.div>
                {index !== experiences.length - 1 && (
                  <motion.div
                    className="marker-line"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                  />
                )}
              </div>

              {/* Content */}
              <motion.div
                className="timeline-content glass-panel"
                whileHover={{ y: -4, x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-date" style={{ borderColor: `${exp.color}40`, color: exp.color }}>
                    {exp.date}
                  </span>
                </div>
                <h4 className="timeline-org">{exp.organization}</h4>
                <p className="timeline-desc">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
