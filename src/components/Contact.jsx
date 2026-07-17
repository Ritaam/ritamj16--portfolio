import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const EMAILJS_SERVICE_ID  = 'service_fpn03u2';
const EMAILJS_TEMPLATE_ID = 'template_hcdfydc';
const EMAILJS_PUBLIC_KEY  = 'PvyDwU3BhYcPSgObN';

const Contact = () => {
  const formRef    = useRef(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [status,   setStatus]   = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.text || 'Something went wrong. Please try again or email me directly.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const isConfigured =
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  const socials = [
    { href: 'https://github.com/Ritaam',                            icon: <FaGithub size={18} />,  label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/ritam-jana-b90382310/',   icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
    { href: 'https://twitter.com',                                  icon: <FaTwitter size={18} />,  label: 'Twitter' },
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="text-gradient">05.</span> Get In Touch
          </h2>
        </motion.div>

        <div className="contact-content">
          {/* Left info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Let's build something together!</h3>
            <p className="contact-desc">
              I'm currently looking for new opportunities, particularly internship or entry-level
              Software Engineering roles. Whether you have a question, a project idea, or just want
              to say hi, I'll try my best to get back to you!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><Mail size={18} /></div>
                <span>ritamjana6969@gmail.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={18} /></div>
                <span>India</span>
              </div>
            </div>

            <div className="contact-socials">
              {socials.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="contact-form-wrapper glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {!isConfigured && (
              <div className="emailjs-setup-notice">
                <AlertCircle size={14} />
                <span>EmailJS not configured.</span>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="from_name">Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="from_email">Email</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
                />
              </div>

              <input type="hidden" name="to_name" value="Ritam" />

              <motion.button
                type="submit"
                className={`submit-btn submit-${status}`}
                disabled={status === 'sending' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'idle' && (
                    <motion.span key="idle" className="btn-content"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <Send size={16} /> Send Message
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" className="btn-content"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <Loader size={16} className="spin" /> Sending…
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" className="btn-content"
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <CheckCircle size={16} /> Message Sent!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" className="btn-content"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <AlertCircle size={16} /> Try Again
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {status === 'success' && (
                <motion.p className="form-status success-msg"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <CheckCircle size={14} /> Thank you! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p className="form-status error-msg"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <AlertCircle size={14} /> {errorMsg}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
