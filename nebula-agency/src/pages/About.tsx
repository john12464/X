import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const About: React.FC = () => {
  return (
    <div>
      <Navigation />
      
      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">About Nebula</h1>
            <p className="page-description">
              We're a passionate team of digital creators dedicated to transforming ideas into extraordinary web experiences.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="content-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Story</h2>
            </div>
            <div className="story-content">
              <div className="story-text">
                <p>
                  Founded in 2020, Nebula emerged from a simple belief: that every business deserves a digital presence as unique and ambitious as their vision. What started as a small team of passionate developers has grown into a full-service web development agency that combines technical expertise with creative innovation.
                </p>
                <p>
                  Our journey began when our founders recognized the gap between beautiful design and functional development. Too many businesses were stuck with websites that looked great but performed poorly, or vice versa. We set out to bridge that gap, creating digital experiences that are both visually stunning and technically superior.
                </p>
                <p>
                  Today, we've helped over 200+ businesses transform their digital presence, from startups taking their first steps online to established companies reinventing their brand for the digital age. Every project teaches us something new, and we bring that knowledge to every client we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="content-section" style={{background: 'linear-gradient(180deg, var(--color-background) 0%, var(--color-support) 100%)'}}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Values</h2>
              <p className="section-description">The principles that guide everything we do</p>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <h3>Innovation First</h3>
                <p>We stay ahead of the curve, constantly exploring new technologies and methodologies to deliver cutting-edge solutions that give our clients a competitive advantage.</p>
              </div>
              <div className="content-card">
                <h3>Quality Without Compromise</h3>
                <p>Every line of code, every design element, and every user interaction is crafted with meticulous attention to detail. We believe excellence is not negotiable.</p>
              </div>
              <div className="content-card">
                <h3>Transparent Partnership</h3>
                <p>We believe in open communication and collaborative relationships. Our clients are partners, and we keep them informed every step of the way.</p>
              </div>
              <div className="content-card">
                <h3>User-Centric Design</h3>
                <p>At the heart of every project is the end user. We design and develop with real people in mind, creating experiences that are intuitive and engaging.</p>
              </div>
              <div className="content-card">
                <h3>Continuous Learning</h3>
                <p>The digital landscape evolves rapidly, and so do we. We invest in our team's growth and stay current with industry trends and best practices.</p>
              </div>
              <div className="content-card">
                <h3>Results Driven</h3>
                <p>Beautiful websites are just the beginning. We focus on creating digital solutions that drive real business results and measurable growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Our Mission</h2>
              <p>To empower businesses with digital solutions that not only meet their current needs but anticipate their future growth. We're not just building websites; we're crafting digital foundations for success.</p>
              <Link to="/contact" className="btn btn-primary">Work With Us</Link>
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

export default About;