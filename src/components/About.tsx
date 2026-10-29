import React from 'react';
import { Cpu, Compass, Target, Code2, Binary } from 'lucide-react';

export const About: React.FC = () => {
  const infoBlocks = [
    {
      id: 'learning',
      tag: '01 / FOUNDATION',
      title: 'Currently Learning',
      highlight: 'C Programming',
      description:
        'Focusing on the building blocks of computing: pointers, memory management, algorithmic loops, and low-level logic.',
      icon: <Cpu size={24} className="text-violet" />,
      badges: ['Pointers & Memory', 'Data Structures', 'Algorithms', 'Syntax Mastery'],
    },
    {
      id: 'exploring',
      tag: '02 / HORIZON',
      title: 'Exploring',
      highlight: 'Software Development',
      description:
        'Experimenting with modern web architecture, interactive 3D spaces, creative frontends, and how software systems connect.',
      icon: <Compass size={24} className="text-violet" />,
      badges: ['Three.js & 3D Web', 'TypeScript / React', 'Component Architecture', 'UI/UX Polish'],
    },
    {
      id: 'goal',
      tag: '03 / AMBITION',
      title: 'My Goal',
      highlight: 'Become a Skilled Developer',
      description:
        'Deepening problem-solving instincts, crafting performant real-world tools, and developing the rigor to write clean, enduring code.',
      icon: <Target size={24} className="text-violet" />,
      badges: ['Software Engineering', 'Lifelong Learning', 'Clean Code', 'Impactful Work'],
    },
  ];

  return (
    <section id="about" className="section nexus-about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-dot" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="section-title">Beyond the Screen.</h2>
          <p className="section-subtitle">
            I'm a student and aspiring developer beginning my journey into the world of programming.
            I enjoy learning how things work, experimenting with ideas, and building the skills to
            turn concepts into real digital experiences.
          </p>
        </div>

        {/* 3 Minimal Info Blocks */}
        <div className="about-blocks-grid">
          {infoBlocks.map((block) => (
            <div key={block.id} className="glass-panel about-card">
              <div className="about-card-glow" />

              <div className="about-card-header">
                <span className="about-card-tag">{block.tag}</span>
                <div className="about-card-icon-wrap">{block.icon}</div>
              </div>

              <div className="about-card-body">
                <h3 className="about-card-title">{block.title}</h3>
                <div className="about-card-highlight">{block.highlight}</div>
                <p className="about-card-desc">{block.description}</p>
              </div>

              <div className="about-card-badges">
                {block.badges.map((badge, idx) => (
                  <span key={idx} className="about-badge">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="about-card-corner-accent" />
            </div>
          ))}
        </div>

        {/* Learning Philosophy Quote Strip */}
        <div className="glass-panel philosophy-strip">
          <div className="philosophy-icon">
            <Binary size={20} className="text-violet" />
          </div>
          <div className="philosophy-content">
            <span className="philosophy-label">LEARNING MINDSET</span>
            <p className="philosophy-text">
              "Every complex system starts with simple, deliberate steps. Curiosity turns confusion into clarity."
            </p>
          </div>
          <div className="philosophy-status">
            <Code2 size={16} className="text-muted" />
            <span>CONTINUOUS ITERATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
