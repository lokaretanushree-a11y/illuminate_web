import React from 'react';
import { motion, useReducedMotion, MotionValue, useTransform } from 'motion/react';

export type FloatingObjectType =
  | 'cube'
  | 'sphere'
  | 'poly'
  | 'ring'
  | 'sparkle'
  | 'glass-sphere'
  | 'gold-ring'
  | 'purple-orb'
  | 'gem-octahedron'
  | 'gold-torus';

export interface FloatingObjectConfig {
  type: FloatingObjectType;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  color?: string;
  mobileHidden?: boolean;
  opacity?: number;
}

interface FloatingObjectsProps {
  objects?: FloatingObjectConfig[];
  count?: number;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export const FloatingObjects: React.FC<FloatingObjectsProps> = ({ objects, mouseX, mouseY }) => {
  const shouldReduceMotion = useReducedMotion();

  const defaultObjects: FloatingObjectConfig[] = [
    { type: 'glass-sphere', size: 90, top: '12%', left: '4%', duration: 12 },
    { type: 'gold-ring', size: 100, top: '28%', right: '5%', duration: 18 },
    { type: 'purple-orb', size: 75, bottom: '18%', left: '5%', duration: 10 },
    { type: 'gem-octahedron', size: 65, bottom: '22%', right: '6%', duration: 14 },
  ];

  const items = objects && objects.length > 0 ? objects : defaultObjects;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {items.map((item, idx) => (
        <FloatingItem
          key={idx}
          item={item}
          idx={idx}
          shouldReduceMotion={shouldReduceMotion}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
};

interface FloatingItemProps {
  item: FloatingObjectConfig;
  idx: number;
  shouldReduceMotion: boolean | null;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

const FloatingItem: React.FC<FloatingItemProps> = ({
  item,
  idx,
  shouldReduceMotion,
  mouseX,
  mouseY,
}) => {
  const size = item.size || 70;
  // Dynamic duration for lively, visible floating motion across the website
  const duration = Math.min(item.duration ? item.duration * 0.45 : 5.5, 7.5);

  // Staggered parallax multiplier for depth (8 to 18px)
  const factor = (idx % 2 === 0 ? 1 : -1) * (8 + (idx % 3) * 5);

  const parallaxX = mouseX ? useTransform(mouseX, [-1, 1], [-factor, factor]) : 0;
  const parallaxY = mouseY ? useTransform(mouseY, [-1, 1], [-factor, factor]) : 0;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: item.top,
    left: item.left,
    right: item.right,
    bottom: item.bottom,
    width: size,
    height: size,
  };

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -30, 4, 0],
        x: [0, idx % 2 === 0 ? 16 : -16, 0],
        rotate: [0, idx % 2 === 0 ? 12 : -12, 0],
        scale: [1, 1.07, 0.98, 1],
        transition: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  return (
    <motion.div
      style={{
        ...style,
        x: shouldReduceMotion ? 0 : parallaxX,
        y: shouldReduceMotion ? 0 : parallaxY,
      }}
      animate={floatAnimation}
      className={`transition-opacity duration-300 ${
        item.mobileHidden ? 'hidden md:block' : 'scale-70 sm:scale-85 md:scale-100'
      }`}
    >
      <div style={{ opacity: item.opacity ?? 0.85 }} className="w-full h-full">
        {(item.type === 'glass-sphere' || item.type === 'sphere') && (
          <GlassSphere3D size={size} />
        )}
        {(item.type === 'gold-ring' || item.type === 'gold-torus' || item.type === 'ring') && (
          <GoldRing3D size={size} />
        )}
        {item.type === 'purple-orb' && <PurpleOrb3D size={size} />}
        {(item.type === 'gem-octahedron' || item.type === 'poly') && (
          <GemOctahedron3D size={size} />
        )}
        {item.type === 'cube' && <WireframeCube3D size={size} />}
        {item.type === 'sparkle' && <SparkleParticle3D size={size} />}
      </div>
    </motion.div>
  );
};

/* 1. High-Fidelity 3D Translucent Glass Sphere with Violet Core & Caustic Lighting */
const GlassSphere3D: React.FC<{ size: number }> = ({ size }) => {
  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 35% 30%, rgba(220, 185, 255, 0.45) 0%, rgba(168, 85, 247, 0.5) 25%, rgba(123, 47, 190, 0.75) 50%, rgba(76, 11, 153, 0.92) 75%, rgba(20, 6, 38, 0.98) 100%)',
        boxShadow: `
          inset 0 0 ${size * 0.15}px rgba(255, 255, 255, 0.25),
          inset ${size * 0.05}px ${size * 0.05}px ${size * 0.1}px rgba(255, 255, 255, 0.4),
          inset -${size * 0.08}px -${size * 0.08}px ${size * 0.15}px rgba(245, 197, 24, 0.22),
          inset -${size * 0.12}px -${size * 0.12}px ${size * 0.25}px rgba(94, 14, 215, 0.8),
          0 15px 35px -5px rgba(94, 14, 215, 0.45),
          0 0 25px rgba(139, 61, 255, 0.25)
        `,
      }}
    >
      {/* Soft Luminous Internal Core */}
      <div
        className="absolute top-[26%] left-[24%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(192, 132, 252, 0.6) 0%, rgba(139, 61, 255, 0.3) 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Internal Warm Gold Caustic Reflection */}
      <div
        className="absolute bottom-[18%] right-[20%] w-[42%] h-[38%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 197, 24, 0.3) 0%, rgba(139, 61, 255, 0.15) 55%, transparent 75%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Top Specular Arc Glare */}
      <div
        className="absolute top-[10%] left-[16%] w-[46%] h-[25%] rounded-[100%] pointer-events-none -rotate-[28deg]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.15) 65%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Glass Rim Contour */}
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
    </div>
  );
};

/* 2. 3D Tilted Gyroscopic Geometric Gold Ring with Continuous 3D Rotation */
const GoldRing3D: React.FC<{ size: number }> = ({ size }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : {
              rotate: [0, 360],
            }
      }
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full filter drop-shadow-[0_0_15px_rgba(245,197,24,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ringGoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4A3" />
            <stop offset="50%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#8A6300" />
          </linearGradient>
          <linearGradient id="ringGoldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5C518" />
            <stop offset="50%" stopColor="#FFF285" />
            <stop offset="100%" stopColor="#B38100" />
          </linearGradient>
        </defs>

        {/* Primary Tilted Ring */}
        <ellipse
          cx="80"
          cy="80"
          rx="70"
          ry="30"
          transform="rotate(-25 80 80)"
          stroke="url(#ringGoldGrad1)"
          strokeWidth="2.2"
        />

        {/* Secondary Cross-axis Ring */}
        <ellipse
          cx="80"
          cy="80"
          rx="70"
          ry="30"
          transform="rotate(45 80 80)"
          stroke="url(#ringGoldGrad2)"
          strokeWidth="1.8"
          className="opacity-75"
        />

        {/* Inner Dashed Ring */}
        <circle
          cx="80"
          cy="80"
          r="48"
          stroke="#F5C518"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          className="opacity-60"
        />

        {/* Nodal Highlight Vertices */}
        <circle cx="80" cy="22" r="2.5" fill="#FFFFFF" />
        <circle cx="138" cy="80" r="2.5" fill="#FFFFFF" />
        <circle cx="80" cy="138" r="2.5" fill="#FFFFFF" />
        <circle cx="22" cy="80" r="2.5" fill="#FFFFFF" />
      </svg>
    </motion.div>
  );
};

/* 3. 3D Purple Luminous Orb with Pulsing Glow */
const PurpleOrb3D: React.FC<{ size: number }> = ({ size }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : {
              scale: [1, 1.12, 1],
            }
      }
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative rounded-full"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 35% 35%, #E9D5FF 0%, #C084FC 25%, #8B3DFF 55%, #5E0ED7 80%, #24103A 100%)',
        boxShadow: `
          0 0 ${size * 0.4}px rgba(168, 85, 247, 0.6),
          0 0 ${size * 0.75}px rgba(94, 14, 215, 0.45),
          inset ${size * 0.05}px ${size * 0.05}px ${size * 0.12}px rgba(255, 255, 255, 0.45),
          inset -${size * 0.08}px -${size * 0.08}px ${size * 0.18}px rgba(15, 4, 28, 0.75)
        `,
      }}
    >
      {/* Specular curved arc */}
      <div
        className="absolute top-[12%] left-[18%] w-[42%] h-[24%] rounded-[100%] pointer-events-none -rotate-[22deg]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
    </motion.div>
  );
};

/* 4. 3D Faceted Crystal Octahedron with Metallic Shading */
const GemOctahedron3D: React.FC<{ size: number }> = ({ size }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : {
              rotateY: [0, 360],
              rotateX: [15, 35, 15],
            }
      }
      transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full filter drop-shadow-[0_0_15px_rgba(245,197,24,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="facetGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="facetGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5E0ED7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Top Facets */}
        <polygon points="60,10 100,60 60,60" fill="url(#facetGrad1)" stroke="#F5C518" strokeWidth="1" />
        <polygon points="60,10 60,60 20,60" fill="url(#facetGrad2)" stroke="#F5C518" strokeWidth="1" />

        {/* Bottom Facets */}
        <polygon points="60,110 100,60 60,60" fill="url(#facetGrad2)" stroke="#F5C518" strokeWidth="1" />
        <polygon points="60,110 60,60 20,60" fill="url(#facetGrad1)" stroke="#F5C518" strokeWidth="1" />

        {/* Glowing Center Core Dot */}
        <circle cx="60" cy="60" r="3" fill="#FFFFFF" />
      </svg>
    </motion.div>
  );
};

/* 5. 3D Isometric Wireframe Cube */
const WireframeCube3D: React.FC<{ size: number }> = ({ size }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : {
              rotateX: [0, 360],
              rotateY: [0, 360],
            }
      }
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
    >
      <div
        className="w-[80%] h-[80%] border-2 border-[#F5C518]/75 rounded-md bg-[#F5C518]/5 shadow-[0_0_20px_rgba(245,197,24,0.35)]"
        style={{
          transform: 'rotateX(35deg) rotateY(45deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-1 border border-dashed border-[#F5C518]/40 rounded-sm" />
        <div className="absolute inset-2 border border-purple-400/40 rounded-sm" />
      </div>
    </motion.div>
  );
};

/* 6. 3D Radiant Stellar Sparkle */
const SparkleParticle3D: React.FC<{ size: number }> = ({ size }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : {
              scale: [0.85, 1.25, 0.85],
              rotate: [0, 90, 180],
            }
      }
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex items-center justify-center text-[#F5C518]"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(245,197,24,0.8)]"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
    </motion.div>
  );
};
