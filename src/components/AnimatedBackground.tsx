import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const AnimatedBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // 16 elegant, lively particles with active organic drift
  const particles = useMemo(() => {
    return [
      { id: 1, x: '10%', y: '16%', size: 3, color: '#FFD21C', duration: 6.5, delay: 0 },
      { id: 2, x: '24%', y: '36%', size: 2.5, color: '#9B5CFF', duration: 7.5, delay: 0.8 },
      { id: 3, x: '16%', y: '68%', size: 3.5, color: '#7C3AED', duration: 6.8, delay: 1.5 },
      { id: 4, x: '32%', y: '84%', size: 2.5, color: '#FFD21C', duration: 8.2, delay: 0.4 },
      { id: 5, x: '48%', y: '22%', size: 3, color: '#9B5CFF', duration: 7.0, delay: 1.2 },
      { id: 6, x: '58%', y: '62%', size: 2.5, color: '#FFD21C', duration: 6.2, delay: 2.1 },
      { id: 7, x: '70%', y: '26%', size: 3.5, color: '#7C3AED', duration: 8.5, delay: 0.9 },
      { id: 8, x: '84%', y: '18%', size: 2.5, color: '#FFD21C', duration: 7.4, delay: 1.8 },
      { id: 9, x: '90%', y: '46%', size: 3.5, color: '#9B5CFF', duration: 6.6, delay: 0 },
      { id: 10, x: '76%', y: '74%', size: 2.5, color: '#FFD21C', duration: 7.8, delay: 1.4 },
      { id: 11, x: '86%', y: '88%', size: 3, color: '#7C3AED', duration: 6.3, delay: 0.5 },
      { id: 12, x: '42%', y: '48%', size: 2.5, color: '#FFD21C', duration: 8.0, delay: 1.1 },
      { id: 13, x: '64%', y: '88%', size: 3, color: '#9B5CFF', duration: 7.2, delay: 2.0 },
      { id: 14, x: '6%', y: '52%', size: 3.5, color: '#7C3AED', duration: 7.6, delay: 0.7 },
      { id: 15, x: '76%', y: '54%', size: 2.5, color: '#9B5CFF', duration: 6.9, delay: 1.6 },
      { id: 16, x: '20%', y: '92%', size: 3, color: '#FFD21C', duration: 7.3, delay: 0.9 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 
        17. COLOR SYSTEM:
        #07040D -> #0D0618 -> #140A25
        Deep blackish violet canvas with rich depth
      */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #07040D 0%, #0D0618 35%, #140A25 70%, #1F0D38 100%)',
        }}
      />

      {/* 
        4. 3 LARGE BLURRED AMBIENT LIGHT SOURCES (Extremely slow 18-30s animation)
      */}
      {/* (1) Purple glow: top-right */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -50, 35, 0],
                y: [0, 60, -40, 0],
                scale: [1, 1.15, 0.92, 1],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[120px] -right-[80px] w-[620px] h-[620px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 61, 255, 0.22) 0%, rgba(123, 47, 190, 0.1) 50%, transparent 75%)',
          filter: 'blur(95px)',
        }}
      />

      {/* (2) Deep violet glow: center-right */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 45, -55, 0],
                y: [0, -50, 45, 0],
                scale: [1, 0.9, 1.15, 1],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[40%] -right-[60px] w-[680px] h-[680px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94, 14, 215, 0.24) 0%, rgba(94, 14, 215, 0.08) 55%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      {/* (3) Warm gold glow: behind/near the ILLUMINATE title (left/center-left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 40, -30, 0],
                y: [0, -40, 30, 0],
                scale: [1, 1.12, 0.94, 1],
              }
        }
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[18%] left-[10%] w-[580px] h-[580px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 210, 28, 0.12) 0%, rgba(255, 210, 28, 0.03) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* 
        2. UPLOADED SOFT PASTEL GRADIENT ASSET (AS OPTIONAL ATMOSPHERIC LIGHT LAYER)
        - Heavily blurred (120px)
        - Low opacity (~0.07)
        - Blended via mix-blend-screen into black/purple background
        - Cropped to organic ellipse, creates subtle light variation without making site pastel
      */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, 45, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[12%] right-[5%] w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.1] mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at 35% 35%, #bed7f8 0%, #dfe9f9 25%, #e8d3ea 50%, #c9b6ea 75%, transparent 100%)',
          filter: 'blur(130px)',
        }}
      />

      {/* Subtle fine noise overlay for depth texture */}
      <div className="absolute inset-0 space-noise" />

      {/* 
        FLOATING PARTICLES (16 total - tiny, active, luminous drift)
      */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: 0, opacity: 0.25 }}
              animate={{
                y: [0, -42, 6, 0],
                x: [0, 16, -12, 0],
                opacity: [0.25, 0.85, 0.35, 0.25],
                scale: [1, 1.35, 0.9, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 3.5}px ${p.color}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
