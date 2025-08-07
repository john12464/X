import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const WhyChooseUs: React.FC = () => {
  return (
    <div>
      <Navigation />
      
      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">Why Choose Nebula?</h1>
            <p className="page-description">
              Discover what sets us apart in the competitive world of web development and why leading brands trust us with their digital future.
            </p>
          </div>
        </section>

        {/* Key Advantages Section */}
        <section className="content-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Competitive Edge</h2>
              <p className="section-description">What makes Nebula the right choice for your next project</p>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <h3>Proven Track Record</h3>
                <p>With 200+ successful projects and a 98% client satisfaction rate, our results speak for themselves. We've helped businesses of all sizes achieve their digital goals.</p>
              </div>
              <div className="content-card">
                <h3>Cutting-Edge Technology</h3>
                <p>We use the latest frameworks, tools, and methodologies to ensure your website is built with tomorrow's technology, not yesterday's.</p>
              </div>
              <div className="content-card">
                <h3>Lightning-Fast Delivery</h3>
                <p>Our streamlined process and agile methodology mean faster turnaround times without compromising on quality. Most projects completed 30% faster than industry average.</p>
              </div>
              <div className="content-card">
                <h3>Dedicated Support</h3>
                <p>Every project includes 3 months of free support and maintenance. We're here to help you succeed long after launch.</p>
              </div>
              <div className="content-card">
                <h3>Performance Focused</h3>
                <p>We build for speed, security, and scalability. Your website will load fast and handle growth seamlessly.</p>
              </div>
              <div className="content-card">
                <h3>Transparent Process</h3>
                <p>No surprises, no hidden costs. We keep you informed every step of the way with clear communication and regular updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="content-section" style={{background: 'linear-gradient(180deg, var(--color-background) 0%, var(--color-support) 100%)'}}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Proven Process</h2>
              <p className="section-description">How we ensure success in every project</p>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <h3>Discovery & Strategy</h3>
                <p>We dive deep into your business goals, target audience, and competitive landscape to create a comprehensive project strategy.</p>
              </div>
              <div className="content-card">
                <h3>Design & Prototyping</h3>
                <p>Our designers create stunning, user-focused designs with interactive prototypes that bring your vision to life before development begins.</p>
              </div>
              <div className="content-card">
                <h3>Development & Testing</h3>
                <p>Clean, efficient code meets rigorous testing standards. We build for performance, security, and scalability from the ground up.</p>
              </div>
              <div className="content-card">
                <h3>Launch & Support</h3>
                <p>Smooth deployment with comprehensive monitoring and three months of included support to ensure your success continues post-launch.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Experience the Nebula Difference?</h2>
              <p>Join the 200+ businesses who've chosen Nebula for their digital transformation. Let's discuss your project and show you exactly how we can help you succeed.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">Start Your Project</Link>
                <Link to="/about" className="btn btn-secondary">Meet Our Team</Link>
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

export default WhyChooseUs;