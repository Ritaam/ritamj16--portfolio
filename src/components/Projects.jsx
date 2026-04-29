import React from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Coin Change Problem Solver",
      description: "An interactive web application that visualizes the Dynamic Programming approach to the classic Coin Change problem. It allows users to input custom denominations and target amounts to see step-by-step solutions.",
      tags: ["React", "Dynamic Programming", "Algorithms", "CSS"],
      github: "https://github.com",
      external: "#"
    },
    {
      title: "Graph RAG (Retrieval-Augmented Generation)",
      description: "A sophisticated system that enhances LLM responses by incorporating knowledge graphs. Extracts entities and relationships from documents to provide more accurate and context-aware answers.",
      tags: ["Python", "LLMs", "Knowledge Graphs", "NLP", "Neo4j"],
      github: "https://github.com",
      external: "#"
    },
    {
      title: "Smart Locker Return System",
      description: "A comprehensive Java-based system simulating an automated locker return process. Implemented using multiple design patterns including Strategy, Observer, Builder, Factory, and Chain of Responsibility.",
      tags: ["Java", "Design Patterns", "OOP", "System Architecture"],
      github: "https://github.com",
      external: ""
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">03.</span> Featured Projects
        </h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card glass-panel delay-\${(index + 1) * 100}`}>
              <div className="project-header">
                <Folder className="folder-icon" size={40} />
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub Link">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.external && (
                    <a href={project.external} target="_blank" rel="noreferrer" aria-label="External Link">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </div>
              
              <ul className="project-tags">
                {project.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
