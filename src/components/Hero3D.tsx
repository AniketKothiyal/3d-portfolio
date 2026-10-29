import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = (): boolean => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGL(false);
      setIsLoaded(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07060b, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.8);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      setIsLoaded(true);
      return;
    }

    // Main Group for the centerpiece
    const centerpieceGroup = new THREE.Group();
    scene.add(centerpieceGroup);

    // 1. Central Metallic Violet Torus Knot
    // Optimized geometry for high visual fidelity with strict polygon budget
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1.45, 0.42, 120, 28, 2, 3);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x8b5cf6),
      emissive: new THREE.Color(0x2d0b5a),
      emissiveIntensity: 0.38,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });
    const torusMesh = new THREE.Mesh(torusKnotGeometry, torusMaterial);
    centerpieceGroup.add(torusMesh);

    // 2. Inner Glowing Core: Faceted Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(0.72, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xc4b5fd),
      emissive: new THREE.Color(0x7c3aed),
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    centerpieceGroup.add(coreMesh);

    // Core Wireframe cage overlay
    const coreWireGeometry = new THREE.IcosahedronGeometry(0.78, 0);
    const coreWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xfaf7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeometry, coreWireMaterial);
    centerpieceGroup.add(coreWireMesh);

    // 3. Orbital Ring System
    const ring1Geometry = new THREE.TorusGeometry(2.5, 0.016, 16, 100);
    const ring1Material = new THREE.MeshStandardMaterial({
      color: 0xc4b5fd,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    centerpieceGroup.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(2.95, 0.014, 16, 100);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    centerpieceGroup.add(ring2);

    const ring3Geometry = new THREE.TorusGeometry(3.35, 0.012, 16, 100);
    const ring3Material = new THREE.MeshStandardMaterial({
      color: 0xa8a1b5,
      emissive: 0x3b0764,
      emissiveIntensity: 0.3,
      metalness: 0.95,
      roughness: 0.3,
    });
    const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
    ring3.rotation.y = Math.PI / 2.6;
    ring3.rotation.x = Math.PI / 6;
    centerpieceGroup.add(ring3);

    // 4. Floating Satellite Nodes on Ring 1
    const satelliteCount = 3;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xfaf7ff,
      emissive: 0xc4b5fd,
      emissiveIntensity: 1.2,
      metalness: 0.2,
      roughness: 0.1,
    });
    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      centerpieceGroup.add(sat);
      satellites.push(sat);
    }

    // 5. Atmospheric Dust & Star Particles
    const particleCount = 380;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Scatter in a surrounding sphere
      const radius = 2.2 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 0.8 + 0.3;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc4b5fd,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Cinematic Violet Rim & Accent Lights
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x100c19, 1.8);
    scene.add(ambientLight);

    // Main Directional Key Light (Primary Purple)
    const keyLight = new THREE.DirectionalLight(0x8b5cf6, 4.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Bright Violet Rim Light (Behind the sculpture for metallic rim contour)
    const rimLight = new THREE.PointLight(0xc4b5fd, 5.5, 14);
    rimLight.position.set(-3.5, 3.2, -3.5);
    scene.add(rimLight);

    // Deep Violet Fill Light (From below to carve contrast)
    const fillLight = new THREE.PointLight(0x4c1d95, 3.2, 12);
    fillLight.position.set(2.5, -4, 2);
    scene.add(fillLight);

    // Top Front Accent Light
    const frontGlow = new THREE.PointLight(0xfaf7ff, 1.4, 8);
    frontGlow.position.set(0, 1.5, 4.5);
    scene.add(frontGlow);

    // Mouse Tracking for Parallax
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = Math.max(-1, Math.min(1, x));
      targetMouse.y = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Touch Support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouse.x = Math.max(-1, Math.min(1, x)) * 0.6;
        targetMouse.y = Math.max(-1, Math.min(1, y)) * 0.6;
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container || isDisposed) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;

      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.055;
      mouse.y += (targetMouse.y - mouse.y) * 0.055;

      // Centerpiece Rotation & Breathing Levitation
      torusMesh.rotation.x = elapsedTime * 0.28;
      torusMesh.rotation.y = elapsedTime * 0.35;

      // Inner Core Counter-rotation
      coreMesh.rotation.x = -elapsedTime * 0.45;
      coreMesh.rotation.y = -elapsedTime * 0.38;
      coreWireMesh.rotation.x = -elapsedTime * 0.45;
      coreWireMesh.rotation.y = -elapsedTime * 0.38;

      // Orbital Rings Rotation
      ring1.rotation.z = elapsedTime * 0.22;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.3) * 0.1;

      ring2.rotation.z = -elapsedTime * 0.18;
      ring2.rotation.y = Math.cos(elapsedTime * 0.25) * 0.15;

      ring3.rotation.x = elapsedTime * 0.14;

      // Satellites orbiting around ring 1
      satellites.forEach((sat, idx) => {
        const offset = (idx * (Math.PI * 2)) / satelliteCount;
        const orbitAngle = elapsedTime * 0.5 + offset;
        const orbitRadius = 2.5;

        // Position on tilted plane of ring1
        const lx = Math.cos(orbitAngle) * orbitRadius;
        const ly = Math.sin(orbitAngle) * orbitRadius;
        const lz = 0;

        // Apply ring1 rotation to satellite
        const pos = new THREE.Vector3(lx, ly, lz);
        pos.applyEuler(ring1.rotation);
        sat.position.copy(pos);
      });

      // Subtle group tilt & parallax with mouse
      centerpieceGroup.rotation.y = mouse.x * 0.45;
      centerpieceGroup.rotation.x = -mouse.y * 0.35;
      centerpieceGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.14 + mouse.y * 0.15;
      centerpieceGroup.position.x = mouse.x * 0.18;

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.035;
      particles.rotation.x = elapsedTime * 0.015;

      // Subtle camera responsive drift
      camera.position.x = mouse.x * 0.25;
      camera.position.y = mouse.y * 0.25;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (!isLoaded) {
        setIsLoaded(true);
      }
    };

    animate();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      torusKnotGeometry.dispose();
      torusMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      coreWireGeometry.dispose();
      coreWireMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      ring3Geometry.dispose();
      ring3Material.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-3d-wrapper" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '440px' }}>
      {/* 3D WebGL Canvas Mounting Point */}
      <div
        ref={mountRef}
        className="hero-3d-canvas"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          display: hasWebGL ? 'block' : 'none',
        }}
        aria-label="Interactive 3D centerpiece of Project NEXUS"
      />

      {/* Loading state indicator */}
      {!isLoaded && (
        <div
          className="hero-3d-loading"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div className="nexus-spinner" />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              color: 'var(--bright-violet)',
            }}
          >
            INITIALIZING CORE...
          </span>
        </div>
      )}

      {/* Graceful Fallback: Pure CSS 3D Metallic Sculpture if WebGL is unavailable */}
      {!hasWebGL && (
        <div className="css-3d-fallback" aria-label="Sculptural representation of Project NEXUS">
          <div className="fallback-orb-glow" />
          <div className="fallback-torus-ring ring-a" />
          <div className="fallback-torus-ring ring-b" />
          <div className="fallback-torus-ring ring-c" />
          <div className="fallback-core">
            <div className="fallback-core-inner" />
          </div>
        </div>
      )}

      {/* Subtle bottom aura reflection */}
      <div
        className="sculpture-aura-glow"
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          height: '80px',
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.28) 0%, transparent 75%)',
          filter: 'blur(28px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

