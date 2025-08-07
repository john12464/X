import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  return (
    <div>
      <Navigation />
      
      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">Get In Touch</h1>
            <p className="page-description">
              Ready to transform your digital presence? Let's discuss your project and create something extraordinary together.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="content-section">
          <div className="container">
            <div className="contact-container">
              {/* Contact Form */}
              <div className="contact-form-section">
                <div className="section-header">
                  <h2 className="section-title">Start Your Project</h2>
                  <p className="section-description">Fill out the form below and we'll get back to you within 24 hours</p>
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type</label>
                    <select 
                      id="projectType" 
                      name="projectType" 
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="new-website">New Website</option>
                      <option value="redesign">Website Redesign</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="web-app">Web Application</option>
                      <option value="maintenance">Website Maintenance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Project Budget</label>
                    <select 
                      id="budget" 
                      name="budget" 
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                      <option value="discuss">Let's Discuss</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and any specific requirements..." 
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">Send Message</button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-info-section">
                <div className="contact-info">
                  <h3>Let's Talk</h3>
                  <p>We're here to help bring your vision to life. Reach out through any of these channels:</p>
                  
                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="contact-details">
                        <h4>Email Us</h4>
                        <p>hello@nebula-agency.com</p>
                        <span>We'll respond within 24 hours</span>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.271 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59344 1.99522 8.06456 2.16708 8.43727 2.48353C8.80998 2.79999 9.06063 3.23945 9.14999 3.72C9.31945 4.68007 9.62359 5.61273 10.05 6.49C10.2072 6.82715 10.2573 7.20464 10.1939 7.57215C10.1305 7.93966 9.95617 8.28051 9.68999 8.55L8.38999 9.85C9.80076 12.3801 11.8199 14.3992 14.35 15.81L15.65 14.51C15.9195 14.2438 16.2603 14.0695 16.6278 14.0061C16.9953 13.9427 17.3729 13.9928 17.71 14.15C18.5873 14.5764 19.5199 14.8805 20.48 15.05C20.9662 15.1406 21.4106 15.3969 21.7295 15.7775C22.0484 16.1581 22.2204 16.6353 22.22 17.12L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="contact-details">
                        <h4>Call Us</h4>
                        <p>+1 (555) 123-4567</p>
                        <span>Mon-Fri, 9AM-6PM EST</span>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="contact-details">
                        <h4>Visit Us</h4>
                        <p>123 Innovation Drive<br/>Tech District, CA 94105</p>
                        <span>By appointment only</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="response-time">
                  <h4>Quick Response Guaranteed</h4>
                  <div className="response-stats">
                    <div className="response-stat">
                      <span className="response-number">24hrs</span>
                      <span className="response-label">Average Response Time</span>
                    </div>
                    <div className="response-stat">
                      <span className="response-number">98%</span>
                      <span className="response-label">Client Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Nebula</h3>
              <p>Crafting digital experiences that matter.</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/why-choose-us">Why Choose Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Nebula. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;