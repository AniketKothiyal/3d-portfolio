import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, MessageSquare } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  // Editable placeholders
  const contactInfo = {
    email: 'aniket.kothiyal@example.com',
    github: 'github.com/aniket-kothiyal',
    githubUrl: 'https://github.com/aniket-kothiyal',
    linkedin: 'linkedin.com/in/aniket-kothiyal',
    linkedinUrl: 'https://linkedin.com/in/aniket-kothiyal',
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    // Direct mailto generation with encoded parameters
    const subject = encodeURIComponent(`NEXUS Connection from ${formName || 'A Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formName || 'Anonymous'}\nContact: ${formEmail || 'Not specified'}\n\nMessage:\n${formMessage}`
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <section id="contact" className="section nexus-contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-dot" />
            <span>TRANSMISSION HUB</span>
          </div>
          <h2 className="section-title">Let's Build Something.</h2>
          <p className="section-subtitle">
            Have an interesting idea or want to connect? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Channels & Placeholders */}
          <div className="contact-channels-column">
            {/* Primary Email Card */}
            <div className="glass-panel contact-channel-card email-card">
              <div className="channel-icon-wrap">
                <Mail size={24} className="text-violet" />
              </div>

              <div className="channel-info">
                <span className="channel-type">DIRECT EMAIL (PLACEHOLDER)</span>
                <span className="channel-value">{contactInfo.email}</span>
                <p className="channel-hint">
                  Feel free to copy or launch directly via your default email application.
                </p>
              </div>

              <div className="channel-actions">
                <button
                  type="button"
                  className="channel-action-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={16} className="text-violet" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${contactInfo.email}?subject=Hello%20Aniket%20from%20NEXUS`}
                  className="channel-action-btn primary"
                  aria-label="Send direct email"
                >
                  <Send size={15} />
                  <span>Launch Mail</span>
                </a>
              </div>
            </div>

            {/* Social & Code Profiles (Editable Placeholders) */}
            <div className="contact-profiles-grid">
              {/* GitHub Card */}
              <div className="glass-panel profile-card">
                <div className="profile-card-top">
                  <div className="profile-icon-wrap">
                    <GithubIcon size={20} className="text-violet" />
                  </div>
                  <span className="profile-badge">CONFIGURABLE</span>
                </div>
                <h3 className="profile-name">GitHub</h3>
                <span className="profile-handle">{contactInfo.github}</span>
                <p className="profile-desc">
                  Central repository hub for code drills, C projects, and experiments.
                </p>
                <div className="profile-footer">
                  <span className="profile-link-preview">Ready to link profile</span>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="glass-panel profile-card">
                <div className="profile-card-top">
                  <div className="profile-icon-wrap">
                    <LinkedinIcon size={20} className="text-violet" />
                  </div>
                  <span className="profile-badge">CONFIGURABLE</span>
                </div>
                <h3 className="profile-name">LinkedIn</h3>
                <span className="profile-handle">{contactInfo.linkedin}</span>
                <p className="profile-desc">
                  Professional network for student developer connections and collaborations.
                </p>
                <div className="profile-footer">
                  <span className="profile-link-preview">Ready to link profile</span>
                </div>
              </div>
            </div>

            {/* Status note */}
            <div className="glass-panel status-banner-small">
              <Sparkles size={16} className="text-violet" />
              <span>
                <strong>Response Window:</strong> Student schedule — typically replies within 24–48 hours.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Note Dispatcher */}
          <div className="contact-form-column">
            <div className="glass-panel contact-form-card">
              <div className="form-card-header">
                <div className="form-header-left">
                  <MessageSquare size={18} className="text-violet" />
                  <span className="form-title">QUICK MESSAGE DISPATCH</span>
                </div>
                <span className="form-pill">CLIENT-SIDE TRANSMIT</span>
              </div>

              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Jane Doe"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="jane@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="text-violet">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    className="form-textarea"
                    placeholder="Hello Aniket, I saw your NEXUS portfolio and wanted to reach out regarding..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="nexus-btn-primary full-width">
                  <Send size={16} className="btn-icon" />
                  <span>TRANSMIT MESSAGE</span>
                </button>

                {sentNotice && (
                  <div className="form-alert-success" role="alert">
                    <Check size={16} />
                    <span>Preparing message in your default email client...</span>
                  </div>
                )}

                <div className="form-disclaimer">
                  <span>Note: Opens your system mail client with pre-filled content. No private data is logged or stored.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
