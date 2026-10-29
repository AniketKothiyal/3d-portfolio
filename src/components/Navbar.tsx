import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`nexus-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="container nexus-navbar" aria-label="Main Navigation">
        {/* Logo */}
        <a
          href="#home"
          className="nexus-logo"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="NEXUS Home"
        >
          <div className="nexus-logo-mark">
            <span className="logo-glint" />
            <span className="logo-letter">N</span>
          </div>
          <div className="nexus-logo-text">
            <span className="logo-title">NEXUS</span>
            <span className="logo-sub">STUDIO</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="nexus-nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nexus-nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
                {isActive && <span className="active-pill" />}
              </a>
            );
          })}
        </div>

        {/* Status Indicator & Quick Action */}
        <div className="nexus-nav-actions">
          <div className="nexus-status-pill" title="Current Status">
            <span className="status-beacon">
              <span className="beacon-ping" />
              <span className="beacon-dot" />
            </span>
            <span className="status-label">JOURNEY STARTED</span>
          </div>

          <a
            href="#contact"
            className="nexus-nav-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>Connect</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nexus-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-status-bar">
            <Sparkles size={14} className="text-violet" />
            <span>STUDENT & ASPIRING DEVELOPER</span>
          </div>
          <div className="mobile-nav-list">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`mobile-nav-item ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
          <div className="mobile-drawer-footer">
            <a
              href="#contact"
              className="nexus-btn-primary full-width"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Let's Connect</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

