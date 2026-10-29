import React from 'react';
import { ArrowUp, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="nexus-footer">
      <div className="container nexus-footer-container">
        <div className="footer-top-row">
          {/* Brand & Concept */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-letter">N</span>
              <span className="footer-logo-text">NEXUS</span>
            </div>
            <p className="footer-concept">
              "Enter My Digital World." An interactive 3D universe conceived and coded by Aniket Kothiyal.
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="footer-nav">
            <span className="footer-heading">NAVIGATION</span>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#journey">Journey</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* Tech Stack Specs */}
          <div className="footer-specs">
            <span className="footer-heading">SYSTEM STACK</span>
            <div className="specs-list">
              <span className="spec-item">Three.js WebGL Engine</span>
              <span className="spec-item">React 19 & TypeScript</span>
              <span className="spec-item">Custom PBR Lighting Shaders</span>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-row">
          {/* Main Footer Copyright Line from prompt */}
          <div className="footer-copyright">
            <Sparkles size={14} className="text-violet" />
            <span>NEXUS © 2026 — Crafted with curiosity.</span>
          </div>

          <div className="footer-status-pill">
            <Terminal size={12} className="text-violet" />
            <span>SYSTEM STATUS: OPTIMAL</span>
          </div>

          {/* Back to Top Link */}
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <div className="arrow-box">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

