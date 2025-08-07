import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Galaxy from '../components/Galaxy';
import Cubes from '../components/Cubes';

const Home: React.FC = () => {
  return (
    <div>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="hero-title-main">The New Era Of Innovation</span>
              </h1>
              <p className="hero-description">
                Nebula is a cutting-edge web development agency that transforms your vision into stunning digital realities. We craft websites that not only look amazing but perform exceptionally.
              </p>
              <div className="hero-buttons">
                <Link to="/contact" className="btn btn-primary">Let's talk</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="galaxy-background">
                <Galaxy 
                  focal={[0.5, 0.5]}
                  rotation={[1.0, 0.0]}
                  starSpeed={0.3}
                  density={0.8}
                  hueShift={140}
                  speed={0.8}
                  mouseInteraction={true}
                  glowIntensity={0.4}
                  saturation={0.2}
                  mouseRepulsion={true}
                  repulsionStrength={1.5}
                  twinkleIntensity={0.4}
                  rotationSpeed={0.05}
                  transparent={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What We Do Best</h2>
              <p className="section-description">We specialize in creating exceptional web experiences that drive results</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3>Modern Development</h3>
                <p>We use the latest technologies and frameworks to build fast, secure, and scalable websites that stand the test of time.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3>Quality Assurance</h3>
                <p>Every project goes through rigorous testing to ensure flawless performance across all devices and browsers.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3>Lightning Fast</h3>
                <p>Our optimized code and efficient architecture ensure your website loads quickly and performs smoothly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Section */}
        <section className="animation-section">
          <div className="animation-container">
            <div className="animation-content">
              <h2>Interactive Innovation</h2>
              <p>
                Experience the future of web development with our cutting-edge interactive animations. 
                Move your mouse over the cubes to see them respond with fluid 3D transformations, 
                or click anywhere to trigger a mesmerizing ripple effect that showcases the power 
                of modern web technologies.
              </p>
              <p>
                This is just a glimpse of what we can create for your brand - immersive, 
                engaging experiences that captivate your audience and set you apart from the competition.
              </p>
            </div>
            <div className="animation-visual">
              <Cubes
                gridSize={10}
                maxAngle={45}
                radius={3}
                easing="power3.out"
                duration={{ enter: 0.3, leave: 0.6 }}
                borderStyle="1px solid #B18CFF"
                faceColor="#1a1534"
                shadow="0 0 10px rgba(177, 140, 255, 0.3)"
                autoAnimate={true}
                rippleOnClick={true}
                rippleColor="#B18CFF"
                rippleSpeed={2}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Digital Presence?</h2>
              <p>Let's work together to create something extraordinary that will set you apart from the competition.</p>
              <Link to="/contact" className="btn btn-primary">Start Your Project</Link>
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

export default Home;