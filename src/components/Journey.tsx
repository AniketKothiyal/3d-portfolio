import React from 'react';
import { Compass, BookOpen, Sparkles, Code, CheckCircle2 } from 'lucide-react';

export const Journey: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Starting with programming fundamentals',
      phase: 'THE BEDROCK',
      status: 'Current Focus',
      description:
        'Diving deep into computational thinking, variable scoping, pointers, memory allocation, and algorithmic logic with C. Learning how computers truly operate under the hood.',
      icon: <BookOpen size={18} className="text-violet" />,
      details: ['Pointer manipulation & memory addresses', 'Conditional flow & nested loops', 'Array handling & string algorithms'],
    },
    {
      step: '02',
      title: 'Exploring creative web development',
      phase: 'THE EXPANSION',
      status: 'Active Exploration',
      description:
        'Discovering the intersection where raw logic meets visual storytelling. Experimenting with modern JavaScript/TypeScript, reactive architectures, and 3D graphics in the browser.',
      icon: <Code size={18} className="text-violet" />,
      details: ['Modern TypeScript & React ecosystems', 'Three.js & WebGL rendering pipelines', 'Cinematic dark aesthetics & fluid UI physics'],
    },
    {
      step: '03',
      title: 'Building my first interactive portfolio',
      phase: 'THE NEXUS MILESTONE',
      status: 'Current Reality',
      description:
        'Synthesizing curiosity into a tangible, immersive digital universe called NEXUS. Turning self-taught knowledge into an award-worthy 3D experience that represents my creative ambition.',
      icon: <Sparkles size={18} className="text-violet" />,
      details: ['Custom interactive 3D centerpiece', 'Responsive mobile-first composition', 'Clean code & accessible interaction model'],
    },
  ];

  return (
    <section id="journey" className="section nexus-journey-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-dot" />
            <span>PROGRESSION MAP</span>
          </div>
          <h2 className="section-title">One Step at a Time.</h2>
          <p className="section-subtitle">
            A genuine progression of a student learning the art and science of software creation.
            No manufactured accolades — just curiosity, dedication, and persistent building.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="journey-timeline">
          <div className="timeline-spine-line" />

          <div className="timeline-items">
            {steps.map((item) => (
              <div key={item.step} className="timeline-item">
                {/* Node Milestone Indicator */}
                <div className="timeline-node">
                  <div className="node-glow" />
                  <div className="node-inner">
                    <span className="node-number">{item.step}</span>
                  </div>
                </div>

                {/* Card Container */}
                <div className="glass-panel timeline-card">
                  <div className="timeline-card-header">
                    <div className="timeline-phase-pill">
                      {item.icon}
                      <span>{item.phase}</span>
                    </div>
                    <span className="timeline-status-tag">{item.status}</span>
                  </div>

                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>

                  <div className="timeline-details-list">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="timeline-detail-item">
                        <CheckCircle2 size={13} className="text-violet" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="timeline-card-corner" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Horizon Footnote */}
        <div className="glass-panel journey-horizon-card">
          <div className="horizon-icon">
            <Compass size={22} className="text-violet" />
          </div>
          <div className="horizon-info">
            <h4 className="horizon-title">Next Horizons</h4>
            <p className="horizon-desc">
              Moving towards data structures & algorithms mastery, building full-stack web applications, and experimenting with spatial WebGL computing.
            </p>
          </div>
          <div className="horizon-badge">
            <span>ALWAYS GROWING</span>
          </div>
        </div>
      </div>
    </section>
  );
};
