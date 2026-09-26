import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, MotionValue, useTransform } from 'motion/react';
import * as THREE from 'three';

interface IlluminationPortalProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
}

export const IlluminationPortal: React.FC<IlluminationPortalProps> = ({
  mouseX,
  mouseY,
  scrollYProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Screen size check for mobile layout & parallax disabling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 11. MOUSE PARALLAX (Desktop only, 8–12px max with spring smoothing)
  const portalMouseX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const portalMouseY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const beamMouseX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const beamMouseY = useTransform(mouseY, [-1, 1], [-6, 6]);
  const atmosphereMouseX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const atmosphereMouseY = useTransform(mouseY, [-1, 1], [-8, 8]);

  // SCROLL INTERACTION (3D installation: y: 0 -> -100px, scale: 1 -> 1.08, opacity: 1 -> 0.25)
  const defaultScrollProgress = useTransform(mouseX, () => 0);
  const scrollProg = scrollYProgress || defaultScrollProgress;

  const portalScrollY = useTransform(scrollProg, [0, 1], [0, -100]);
  const portalScrollScale = useTransform(scrollProg, [0, 1], [1, 1.08]);
  const portalScrollOpacity = useTransform(scrollProg, [0, 0.85, 1], [1, 0.7, 0.25]);

  // THREE.JS 3D ILLUMINATION PORTAL SCULPTURE
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
    } catch {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    // Root Group for the architectural sculpture
    const portalMasterGroup = new THREE.Group();
    scene.add(portalMasterGroup);

    // -------------------------------------------------------------
    // MATERIALS: Smoked glass, translucent violet glass, brushed metal
    // -------------------------------------------------------------
    const smokedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#150B24'),
      metalness: 0.15,
      roughness: 0.14,
      transmission: 0.82,
      thickness: 1.6,
      transparent: true,
      opacity: 0.92,
      ior: 1.54,
      reflectivity: 0.85,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });

    const violetGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#431572'),
      metalness: 0.25,
      roughness: 0.22,
      transmission: 0.75,
      thickness: 1.2,
      transparent: true,
      opacity: 0.88,
      ior: 1.52,
    });

    const brushedDarkMetalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1F182A'),
      metalness: 0.88,
      roughness: 0.38,
    });

    const warmGoldBevelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFD21C'),
      metalness: 0.95,
      roughness: 0.25,
      emissive: new THREE.Color('#5E4203'),
      emissiveIntensity: 0.4,
    });

    // -------------------------------------------------------------
    // ARCHITECTURAL PORTAL GEOMETRY (Incomplete circular/oval opening)
    // -------------------------------------------------------------
    // 1. Primary Outer Smoked Glass Curved Monolith (arc opening)
    const outerArchGeo = new THREE.TorusGeometry(3.1, 0.36, 32, 100, Math.PI * 1.68);
    const outerArchMesh = new THREE.Mesh(outerArchGeo, smokedGlassMaterial);
    outerArchMesh.rotation.z = -Math.PI * 0.34;
    portalMasterGroup.add(outerArchMesh);

    // Chamfered brushed metal outer rim
    const outerRimGeo = new THREE.TorusGeometry(3.32, 0.08, 16, 100, Math.PI * 1.62);
    const outerRimMesh = new THREE.Mesh(outerRimGeo, brushedDarkMetalMaterial);
    outerRimMesh.rotation.z = -Math.PI * 0.32;
    portalMasterGroup.add(outerRimMesh);

    // 2. Secondary Nested Violet Translucent Glass Fin Arch
    const innerArchGeo = new THREE.TorusGeometry(2.35, 0.26, 32, 90, Math.PI * 1.72);
    const innerArchMesh = new THREE.Mesh(innerArchGeo, violetGlassMaterial);
    innerArchMesh.rotation.z = Math.PI * 0.65;
    innerArchMesh.rotation.y = 0.22;
    portalMasterGroup.add(innerArchMesh);

    // 3. Focal Aperture Ring with Warm Gold Chamfer
    const apertureGoldRingGeo = new THREE.TorusGeometry(1.58, 0.09, 24, 80, Math.PI * 1.8);
    const apertureGoldRingMesh = new THREE.Mesh(apertureGoldRingGeo, warmGoldBevelMaterial);
    apertureGoldRingMesh.rotation.z = 0.28;
    apertureGoldRingMesh.rotation.x = 0.15;
    portalMasterGroup.add(apertureGoldRingMesh);

    // Additional architectural fin panels (curved slabs)
    const finGeometry = new THREE.CylinderGeometry(2.8, 2.8, 0.16, 40, 1, true, 0.2, 2.2);
    const finMesh1 = new THREE.Mesh(finGeometry, smokedGlassMaterial);
    finMesh1.rotation.x = Math.PI * 0.46;
    finMesh1.rotation.y = 0.25;
    portalMasterGroup.add(finMesh1);

    const finMesh2 = new THREE.Mesh(finGeometry, brushedDarkMetalMaterial);
    finMesh2.rotation.x = -Math.PI * 0.44;
    finMesh2.rotation.y = -0.3;
    finMesh2.scale.set(0.85, 0.85, 0.85);
    portalMasterGroup.add(finMesh2);

    // -------------------------------------------------------------
    // CENTRAL GOLDEN LIGHT CORE (Deep inside opening)
    // -------------------------------------------------------------
    // Core Nucleus Sphere
    const coreSphereGeo = new THREE.SphereGeometry(0.52, 32, 32);
    const coreSphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFF6CE'),
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    portalMasterGroup.add(coreSphere);

    // Soft Volumetric Golden Bloom Sphere
    const coreHaloGeo = new THREE.SphereGeometry(0.95, 32, 32);
    const coreHaloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFD21C'),
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const coreHalo = new THREE.Mesh(coreHaloGeo, coreHaloMat);
    portalMasterGroup.add(coreHalo);

    // Outer golden haze
    const coreHazeGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const coreHazeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#F5B800'),
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const coreHaze = new THREE.Mesh(coreHazeGeo, coreHazeMat);
    portalMasterGroup.add(coreHaze);

    // Warm golden point light deep inside the core
    const corePointLight = new THREE.PointLight(0xffd21c, 4.2, 16, 1.4);
    corePointLight.position.set(0, 0, 0.1);
    portalMasterGroup.add(corePointLight);

    // Secondary subtle warm ambient fill
    const ambientLight = new THREE.AmbientLight(0x2d144e, 1.4);
    scene.add(ambientLight);

    // Directional rim lights for glass specular highlights
    const rimLight1 = new THREE.DirectionalLight(0x9b5cff, 2.2);
    rimLight1.position.set(5, 6, 4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xffd21c, 1.6);
    rimLight2.position.set(-5, -4, 3);
    scene.add(rimLight2);

    // -------------------------------------------------------------
    // GOLD LIGHT BEAM: Emerging from center & pointing left toward ILLUMINATE
    // Soft, transparent, cinematic cone of light
    // -------------------------------------------------------------
    const beamGeo = new THREE.ConeGeometry(1.9, 5.8, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFD21C'),
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    // Point outward toward the left (negative X)
    beamMesh.position.set(-2.8, 0.15, 0.2);
    beamMesh.rotation.z = Math.PI * 0.52;
    beamMesh.rotation.y = -0.15;
    portalMasterGroup.add(beamMesh);

    // -------------------------------------------------------------
    // FLOATING "IDEA FRAGMENTS": Thin geometric panels & dust particles
    // -------------------------------------------------------------
    const fragmentsGroup = new THREE.Group();
    portalMasterGroup.add(fragmentsGroup);

    interface FragmentData {
      mesh: THREE.Mesh;
      initialRadius: number;
      orbitSpeed: number;
      rotSpeedX: number;
      rotSpeedY: number;
      phase: number;
      yOffset: number;
    }

    const fragmentItems: FragmentData[] = [];
    const fragmentPlateGeo = new THREE.BoxGeometry(0.38, 0.62, 0.035);

    for (let i = 0; i < 7; i++) {
      const isGold = i % 2 === 0;
      const fragMat = isGold ? warmGoldBevelMaterial : smokedGlassMaterial;
      const fragMesh = new THREE.Mesh(fragmentPlateGeo, fragMat);

      const radius = 1.35 + i * 0.32;
      const phase = (i * Math.PI * 2) / 7;
      const yOffset = (i - 3) * 0.28;

      fragMesh.position.set(Math.cos(phase) * radius, yOffset, Math.sin(phase) * radius);
      fragmentsGroup.add(fragMesh);

      fragmentItems.push({
        mesh: fragMesh,
        initialRadius: radius,
        orbitSpeed: 0.2 + (i % 3) * 0.08,
        rotSpeedX: 0.4 + (i % 2) * 0.3,
        rotSpeedY: 0.3 + (i % 4) * 0.2,
        phase,
        yOffset,
      });
    }

    // 16 Idea dust particles drifting toward center
    const particleCount = 20;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let p = 0; p < particleCount; p++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.4 + Math.random() * 2.6;
      particlePositions[p * 3] = Math.cos(theta) * r;
      particlePositions[p * 3 + 1] = (Math.random() - 0.5) * 3.2;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 1.8;

      particleVelocities.push({
        x: -Math.cos(theta) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: -Math.sin(theta) * 0.002,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#FFD21C'),
      size: 0.075,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    portalMasterGroup.add(particleSystem);

    // -------------------------------------------------------------
    // RENDER RESIZE HANDLER
    // -------------------------------------------------------------
    const updateSize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // -------------------------------------------------------------
    // ANIMATION LOOP: Fast infinite rotation & dynamic light breathing
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Breathing central light
      const breath = Math.sin(elapsed * 2.5) * 0.5 + 0.5; // 0 to 1
      corePointLight.intensity = 3.5 + breath * 2.5;
      coreHalo.scale.setScalar(0.95 + breath * 0.25);
      coreHaloMat.opacity = 0.35 + breath * 0.3;
      beamMat.opacity = 0.12 + breath * 0.12;

      // CONTINUOUS INFINITE ROTATION (Calibrated smooth & active)
      if (!shouldReduceMotion) {
        // Continuous 360-degree steady spin on Y and Z axes
        portalMasterGroup.rotation.y += 0.014; // Steady continuous spin around Y axis
        portalMasterGroup.rotation.z += 0.007; // Gentle continuous diagonal roll
        portalMasterGroup.rotation.x = Math.sin(elapsed * 0.8) * 0.11; // Gentle axial pitch

        // Component architectural rings rotating steadily in counter-directions
        outerArchMesh.rotation.z += 0.008;
        outerRimMesh.rotation.z += 0.008;
        innerArchMesh.rotation.z -= 0.011;
        apertureGoldRingMesh.rotation.z += 0.016;
        finMesh1.rotation.y += 0.01;
        finMesh2.rotation.y -= 0.013;

        // Idea fragments orbit & tumbling steadily toward light
        fragmentItems.forEach((frag, idx) => {
          const currentPhase = frag.phase + elapsed * frag.orbitSpeed * 0.9;
          const currentRadius = frag.initialRadius + Math.sin(elapsed * 0.9 + idx) * 0.14;
          frag.mesh.position.x = Math.cos(currentPhase) * currentRadius;
          frag.mesh.position.z = Math.sin(currentPhase) * currentRadius;
          frag.mesh.position.y = frag.yOffset + Math.cos(elapsed * 0.8 + idx) * 0.1;

          frag.mesh.rotation.x += 0.016 * frag.rotSpeedX;
          frag.mesh.rotation.y += 0.022 * frag.rotSpeedY;
          frag.mesh.rotation.z += 0.012;
        });

        // Dust particle positions drift smoothly toward core
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;
        for (let p = 0; p < particleCount; p++) {
          positions[p * 3] += particleVelocities[p].x * 1.6;
          positions[p * 3 + 1] += particleVelocities[p].y * 1.6;
          positions[p * 3 + 2] += particleVelocities[p].z * 1.6;

          // Wrap back if reached core
          const dist = Math.sqrt(
            positions[p * 3] ** 2 +
            positions[p * 3 + 1] ** 2 +
            positions[p * 3 + 2] ** 2
          );
          if (dist < 0.6) {
            const theta = Math.random() * Math.PI * 2;
            const r = 3.2;
            positions[p * 3] = Math.cos(theta) * r;
            positions[p * 3 + 1] = (Math.random() - 0.5) * 2.8;
            positions[p * 3 + 2] = (Math.random() - 0.5) * 1.6;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();

      // Dispose geometries & materials
      outerArchGeo.dispose();
      outerRimGeo.dispose();
      innerArchGeo.dispose();
      apertureGoldRingGeo.dispose();
      finGeometry.dispose();
      coreSphereGeo.dispose();
      coreHaloGeo.dispose();
      coreHazeGeo.dispose();
      beamGeo.dispose();
      fragmentPlateGeo.dispose();
      particleGeo.dispose();

      smokedGlassMaterial.dispose();
      violetGlassMaterial.dispose();
      brushedDarkMetalMaterial.dispose();
      warmGoldBevelMaterial.dispose();
      coreSphereMat.dispose();
      coreHaloMat.dispose();
      coreHazeMat.dispose();
      beamMat.dispose();
      particleMat.dispose();
    };
  }, [shouldReduceMotion]);

  return (
    <aside
      aria-hidden="true"
      className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[45%] pointer-events-none z-[4] overflow-hidden select-none flex items-center justify-center"
    >
      {/* 
        ========================================================================
        ATMOSPHERIC BACKGROUND LIGHTING:
        Behind the 3D object: large soft violet glow
        ========================================================================
      */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.12, 1],
                opacity: [0.75, 0.95, 0.75],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[32%] right-[5%] w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] lg:w-[680px] lg:h-[680px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.28) 0%, rgba(67, 21, 114, 0.16) 45%, rgba(255, 210, 28, 0.04) 70%, transparent 85%)',
          filter: 'blur(95px)',
          x: isMobile || shouldReduceMotion ? 0 : atmosphereMouseX,
          y: isMobile || shouldReduceMotion ? 0 : atmosphereMouseY,
        }}
      />

      {/* 
        ========================================================================
        GOLD LIGHT BEAM TOWARD "ILLUMINATE":
        Subtle golden beam emerging from the center of the portal, pointing leftward
        ========================================================================
      */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.35, 0.65, 0.35],
                scaleX: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute top-[48%] right-[32%] w-[480px] h-[120px] -translate-y-1/2 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse at 100% 50%, rgba(255, 210, 28, 0.45) 0%, rgba(245, 184, 0, 0.18) 45%, rgba(155, 92, 255, 0.05) 75%, transparent 100%)',
          filter: 'blur(28px)',
          transformOrigin: 'right center',
          x: isMobile || shouldReduceMotion ? 0 : beamMouseX,
          y: isMobile || shouldReduceMotion ? 0 : beamMouseY,
        }}
      />

      {/* 
        ========================================================================
        CONTAINER FOR 3D PORTAL SCULPTURE:
        Desktop: 42%-45% right side, vertically centered, ample negative space
        ========================================================================
      */}
      <motion.div
        ref={containerRef}
        style={{
          y: shouldReduceMotion ? 0 : portalScrollY,
          scale: shouldReduceMotion ? 1 : portalScrollScale,
          opacity: shouldReduceMotion ? 1 : portalScrollOpacity,
        }}
        className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] lg:w-[620px] lg:h-[620px] flex items-center justify-center"
      >
        <motion.div
          style={{
            x: isMobile || shouldReduceMotion ? 0 : portalMouseX,
            y: isMobile || shouldReduceMotion ? 0 : portalMouseY,
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* WebGL Canvas for Three.js 3D Sculpture */}
          {webglSupported ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full block pointer-events-none drop-shadow-[0_20px_60px_rgba(255,210,28,0.22)]"
            />
          ) : (
            /* Graceful architectural fallback if WebGL is unavailable */
            <div className="relative w-[85%] h-[85%] flex items-center justify-center animate-spin [animation-duration:8s]">
              {/* Smoked glass outer arch */}
              <div
                className="absolute inset-0 rounded-full border-[18px] border-[#150B24]/90"
                style={{
                  boxShadow:
                    '0 0 50px rgba(124, 58, 237, 0.35), inset 0 0 40px rgba(255, 210, 28, 0.25)',
                }}
              />
              {/* Warm gold aperture core */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 rounded-full bg-[#FFD21C] blur-md shadow-[0_0_80px_#FFD21C]"
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </aside>
  );
};
