import React from 'react';
import { ArrowDown, Compass, Send, Sparkles, Terminal } from 'lucide-react';
import { Hero3D } from './Hero3D';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="nexus-hero-section">
      <div className="container nexus-hero-container">
        {/* Left Column: Typography & Action Buttons */}
        <div className="nexus-hero-content">
          {/* Small Status Indicator */}
          <div className="hero-status-tag" role="status">
            <span className="status-indicator-dot" />
            <span className="status-indicator-text">MY JOURNEY STARTS HERE</span>
          </div>

          {/* Identity & Sub-header */}
          <div className="hero-identity-wrapper">
            <h2 className="hero-name">ANIKET KOTHIYAL</h2>
            <div className="hero-role-pill">
              <Terminal size={13} className="role-icon" />
              <span>STUDENT · ASPIRING DEVELOPER</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline">
            Building My Own <span className="gradient-text">Universe.</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Exploring code, creating experiences, and turning curiosity into something real.
          </p>

          {/* Action Buttons */}
          <div className="hero-action-group">
            <button
              type="button"
              className="nexus-btn-primary"
              onClick={() => scrollTo('projects')}
              aria-label="Explore My World — Navigate to Projects"
            >
              <Compass size={17} className="btn-icon" />
              <span>EXPLORE MY WORLD</span>
            </button>

            <button
              type="button"
              className="nexus-btn-secondary"
              onClick={() => scrollTo('contact')}
              aria-label="Let's Connect — Navigate to Contact"
            >
              <Send size={16} className="btn-icon" />
              <span>LET'S CONNECT</span>
            </button>
          </div>

          {/* Key Quick Stats/Badges */}
          <div className="hero-micro-meta">
            <div className="micro-meta-item">
              <span className="micro-meta-value">3D</span>
              <span className="micro-meta-label">Interactive Experience</span>
            </div>
            <div className="micro-meta-divider" />
            <div className="micro-meta-item">
              <span className="micro-meta-value">C & Web</span>
              <span className="micro-meta-label">Foundation Studies</span>
            </div>
            <div className="micro-meta-divider" />
            <div className="micro-meta-item">
              <Sparkles size={14} className="text-violet" />
              <span className="micro-meta-label">Curiosity-Driven</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Centerpiece */}
        <div className="nexus-hero-visual">
          <div className="visual-frame">
            <div className="visual-top-badge">
              <span className="coordinate-pill">CORE // 3D MATRIX</span>
              <span className="fps-counter">ACTIVE ENGINE</span>
            </div>

            <Hero3D />

            <div className="visual-bottom-meta">
              <span>DRAG / HOVER TO ROTATE PERSPECTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="scroll-button"
          aria-label="Scroll down to About section"
        >
          <span className="scroll-caption">DISCOVER MORE</span>
          <div className="scroll-mouse-icon">
            <div className="scroll-wheel" />
          </div>
          <ArrowDown size={14} className="scroll-arrow" />
        </button>
      </div>
    </section>
  );
};

