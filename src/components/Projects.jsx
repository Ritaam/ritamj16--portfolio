import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const projects = [
    {
      title: "Coin Change Problem Solver",
      description: "An interactive web application that visualizes the Dynamic Programming approach to the classic Coin Change problem. It allows users to input custom denominations and target amounts to see step-by-step solutions.",
      tags: ["React", "Dynamic Programming", "Algorithms", "CSS"],
      github: "https://github.com",
      external: "#",
    },
    {
      title: "Graph RAG (Retrieval-Augmented Generation)",
      description: "A sophisticated system that enhances LLM responses by incorporating knowledge graphs. Extracts entities and relationships from documents to provide more accurate and context-aware answers.",
      tags: ["Python", "LLMs", "Knowledge Graphs", "NLP", "Neo4j"],
      github: "https://github.com",
      external: "#",
    },
    {
      title: "Smart Locker Return System",
      description: "A comprehensive Java-based system simulating an automated locker return process. Implemented using multiple design patterns including Strategy, Observer, Builder, Factory, and Chain of Responsibility.",
      tags: ["Java", "Design Patterns", "OOP", "System Architecture"],
      github: "https://github.com",
      external: "",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const cardVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="text-gradient">03.</span> Featured Projects
          </h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card glass-panel"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Gradient border top */}
              <div className="project-accent-bar" />

              <div className="project-header">
                <Folder className="folder-icon" size={38} />
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub Link" className="project-link-btn">
                      <FaGithub size={18} />
                    </a>
                  )}
                  {project.external && (
                    <a href={project.external} target="_blank" rel="noreferrer" aria-label="External Link" className="project-link-btn">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </div>

              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
