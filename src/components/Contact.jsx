import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual form submission
    alert('Thank you for your message! This is a placeholder.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">05.</span> Get In Touch
        </h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's build something together!</h3>
            <p className="contact-desc">
              I'm currently looking for new opportunities, particularly internship or entry-level 
              Software Engineering roles. Whether you have a question, a project idea, or just want 
              to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <span>ritam@example.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <span>India</span>
              </div>
            </div>
            
            <div className="contact-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">
                <FaLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="contact-form-wrapper glass-panel">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder="Your message here..."
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
