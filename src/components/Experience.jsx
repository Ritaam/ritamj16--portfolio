import React from 'react';
import { BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      type: "learning",
      title: "Self-Taught & Ongoing Learning",
      organization: "Various Platforms",
      date: "Present",
      description: "Continuously expanding my skill set. Currently diving deep into System Design and advanced Data Structures to prepare for software engineering roles.",
      icon: <BookOpen size={20} />
    },
    {
      type: "education",
      title: "Computer Science Engineering",
      organization: "University",
      date: "2021 - Present",
      description: "Pursuing a degree in CSE with a focus on core computer science fundamentals. Consistently maintaining a strong academic record while participating in coding clubs.",
      icon: <GraduationCap size={20} />
    },
    {
      type: "project",
      title: "Building Real-World Projects",
      organization: "Personal Initiatives",
      date: "2023 - Present",
      description: "Applying theoretical knowledge to build practical applications. Focusing on clean code, modern architectures, and solving tangible problems.",
      icon: <Briefcase size={20} />
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">04.</span> My Journey
        </h2>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item delay-\${(index + 1) * 100}`}>
              <div className="timeline-marker">
                <div className="marker-icon">
                  {exp.icon}
                </div>
                {index !== experiences.length - 1 && <div className="marker-line"></div>}
              </div>
              
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <h4 className="timeline-org">{exp.organization}</h4>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
