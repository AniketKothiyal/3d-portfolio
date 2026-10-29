import React, { useState } from 'react';
import { Sparkles, Terminal, Box, Globe, ChevronRight, Activity } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeArrayIdx, setActiveArrayIdx] = useState(2);

  const projects = [
    {
      id: 'c-journey',
      title: 'C Programming Journey',
      category: 'SYSTEMS & FOUNDATIONS',
      description:
        'Learning programming fundamentals through loops, arrays, strings, and practical exercises.',
      status: 'Learning',
      statusClass: 'status-learning',
      tags: ['C Language', 'Memory Management', 'Algorithms', 'Console Apps'],
      icon: <Terminal size={20} className="text-violet" />,
      previewType: 'c-code',
    },
    {
      id: 'nexus-portfolio',
      title: 'NEXUS Portfolio',
      category: 'CREATIVE 3D WEB',
      description:
        'An interactive portfolio exploring immersive visuals, creative development, and 3D web experiences.',
      status: 'In Progress',
      statusClass: 'status-progress',
      tags: ['Three.js', 'React', 'WebGL', 'TypeScript', 'Responsive Design'],
      icon: <Box size={20} className="text-violet" />,
      previewType: '3d-wireframe',
    },
    {
      id: 'virtual-world',
      title: 'Virtual World',
      category: 'EXPERIMENTAL CONCEPT',
      description:
        'A planned exploration of interactive 3D environments and digital spaces.',
      status: 'Concept',
      statusClass: 'status-concept',
      tags: ['Spatial Web', '3D Environments', 'Shader Exploration', 'Audio-Visual'],
      icon: <Globe size={20} className="text-violet" />,
      previewType: 'spatial-grid',
    },
  ];

  const renderVisualPreview = (type: string) => {
    switch (type) {
      case 'c-code':
        return (
          <div className="preview-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal-title">pointers_memory.c</span>
              <span className="terminal-tag">GCC 13.2</span>
            </div>
            <div className="terminal-body">
              <div className="code-line">
                <span className="line-num">01</span>
                <span className="c-keyword">#include</span> <span className="c-string">&lt;stdio.h&gt;</span>
              </div>
              <div className="code-line">
                <span className="line-num">02</span>
                <span className="c-keyword">int</span> <span className="c-func">main</span>() &#123;
              </div>
              <div className="code-line indent">
                <span className="line-num">03</span>
                <span className="c-keyword">int</span> memory[] = &#123;4, 8, 15, 16, 23, 42&#125;;
              </div>
              <div className="code-line indent">
                <span className="line-num">04</span>
                <span className="c-keyword">int</span> *ptr = memory;
              </div>
              <div className="code-line indent">
                <span className="line-num">05</span>
                <span className="c-comment">// Step through elements</span>
              </div>
              <div className="code-line">
                <span className="line-num">06</span>
                &#125;
              </div>

              {/* Interactive Memory Array Visualizer */}
              <div className="memory-grid">
                <span className="memory-label">RAM BUFFER:</span>
                <div className="memory-cells">
                  {[4, 8, 15, 16, 23, 42].map((val, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`memory-cell ${activeArrayIdx === idx ? 'active' : ''}`}
                      onClick={() => setActiveArrayIdx(idx)}
                      title={`Address 0x7FFE0${idx} = ${val}`}
                    >
                      <span className="cell-val">{val}</span>
                      <span className="cell-addr">[{idx}]</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case '3d-wireframe':
        return (
          <div className="preview-wireframe">
            <div className="wireframe-overlay-grid" />
            <div className="wireframe-scanner-beam" />
            <div className="wireframe-spatial-object">
              <div className="spatial-ring spatial-ring-1" />
              <div className="spatial-ring spatial-ring-2" />
              <div className="spatial-ring spatial-ring-3" />
              <div className="spatial-core-prism">
                <span className="prism-label">NEXUS CORE</span>
              </div>
            </div>
            <div className="wireframe-metrics">
              <div className="metric-chip">VERTICES: 12,480</div>
              <div className="metric-chip">SHADERS: PBR PHYSICAL</div>
            </div>
          </div>
        );

      case 'spatial-grid':
        return (
          <div className="preview-spatial">
            <div className="spatial-horizon" />
            <div className="spatial-perspective-grid" />
            <div className="spatial-stars">
              <span className="star-node node-1" />
              <span className="star-node node-2" />
              <span className="star-node node-3" />
              <span className="star-node node-4" />
              <span className="star-node node-5" />
            </div>
            <div className="spatial-floating-monolith">
              <div className="monolith-face" />
              <div className="monolith-glow" />
            </div>
            <div className="spatial-coordinates">
              <span>LAT: 45.289°</span>
              <span>DEPTH: ∞</span>
              <span>RENDER: DRAFT</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="section nexus-projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-dot" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="section-title">Experiments in Progress.</h2>
          <p className="section-subtitle">
            A transparent window into what I am actively learning, building, and conceptualizing.
            Real progress over polished illusions.
          </p>
        </div>

        {/* 3 Premium Project Cards */}
        <div className="projects-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="glass-panel project-card">
              {/* Card Visual Preview (Interactive custom CSS/SVG/Canvas) */}
              <div className="project-preview-wrapper">
                {renderVisualPreview(proj.previewType)}
                
                {/* Status Badge */}
                <div className={`project-status-badge ${proj.statusClass}`}>
                  <span className="status-badge-dot" />
                  <span>{proj.status}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="project-content">
                <div className="project-category-row">
                  <div className="project-icon-badge">{proj.icon}</div>
                  <span className="project-category">{proj.category}</span>
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p className="project-description">{proj.description}</p>

                {/* Tech / Subject Tags */}
                <div className="project-tags">
                  {proj.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action / Real Status Indicator */}
                <div className="project-footer">
                  <div className="project-indicator">
                    <Activity size={14} className="text-violet" />
                    <span className="indicator-text">
                      {proj.status === 'Learning' && 'Active study & daily drills'}
                      {proj.status === 'In Progress' && 'Live in current viewport'}
                      {proj.status === 'Concept' && 'Architecting design docs'}
                    </span>
                  </div>
                  <div className="project-card-arrow" aria-hidden="true">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>

              <div className="project-card-border-glow" />
            </div>
          ))}
        </div>

        {/* Integrity Note (Prompt rule: "Never invent GitHub URLs, live demos, or completed projects.") */}
        <div className="projects-authenticity-banner">
          <Sparkles size={16} className="text-violet" />
          <p>
            <strong>Note on Integrity:</strong> I believe in showing authentic, real-time progress.
            Live repositories and deployment links will be linked as each milestone is completed.
          </p>
        </div>
      </div>
    </section>
  );
};

