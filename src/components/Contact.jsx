import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Contact.css';

// ──────────────────────────────────────────────
// 🔑  EmailJS Configuration
//
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with variables:
//      {{from_name}}, {{from_email}}, {{message}}, {{to_name}}
// 4. Replace the values below with your own:
// ──────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_fpn03u2';    // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_hcdfydc';   // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'PvyDwU3BhYcPSgObN';     // e.g. 'AbCdEfGhIjKlMn'

const Contact = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );

      setStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMsg(
        err?.text || 'Something went wrong. Please try again or email me directly.',
      );
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const isConfigured =
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

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
                <span>ritamjana6969@gmail.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <span>India</span>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/Ritaam" target="_blank" rel="noreferrer" className="social-link">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ritam-jana-b90382310/" target="_blank" rel="noreferrer" className="social-link">
                <FaLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper glass-panel">
            {/* Config warning — only shown in dev when keys aren't set */}
            {!isConfigured && (
              <div className="emailjs-setup-notice">
                <AlertCircle size={16} />
                <span>
                  EmailJS not configured yet. Update <code>EMAILJS_SERVICE_ID</code>,{' '}
                  <code>EMAILJS_TEMPLATE_ID</code>, and <code>EMAILJS_PUBLIC_KEY</code> in{' '}
                  <code>Contact.jsx</code>.
                </span>
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
                ></textarea>
              </div>

              {/* Hidden field for the template's {{to_name}} */}
              <input type="hidden" name="to_name" value="Ritam" />

              <button
                type="submit"
                className={`submit-btn ${status !== 'idle' ? `submit-${status}` : ''}`}
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <Loader size={18} className="spin" />
                    <span>Sending…</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle size={18} />
                    <span>Message Sent!</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle size={18} />
                    <span>Try Again</span>
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === 'success' && (
                <p className="form-status success-msg">
                  <CheckCircle size={16} />
                  Thank you! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="form-status error-msg">
                  <AlertCircle size={16} />
                  {errorMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
