import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { FloatingObjects } from './FloatingObjects';

export const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const contacts = [
    { name: 'PARI TIWARI' },
    { name: 'AWASTHI RAGHWENDRA' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Subtle purple background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[#5E0ED7]/12 blur-[130px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'gold-ring', size: 95, top: '15%', left: '5%', duration: 20 },
          { type: 'glass-sphere', size: 85, top: '25%', right: '5%', duration: 12 },
          { type: 'purple-orb', size: 70, bottom: '20%', right: '6%', duration: 8 },
        ]}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <span className="w-6 h-[1.5px] bg-[#F5C518]" />
          <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.28em]">
            WORKSHOP TEAM
          </span>
          <span className="w-6 h-[1.5px] bg-[#F5C518]" />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bebas text-white text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none select-none mb-14"
        >
          CONTACT
        </motion.h2>

        {/* Two Clean Premium Dark Glass Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
          {contacts.map((person, idx) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: [0, -6, 0],
                    }
                  : {}
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.15 + idx * 0.1 },
                y: {
                  duration: 4.6 + idx * 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.4,
                },
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(94,14,215,0.35)] group text-center flex flex-col items-center justify-center cursor-default"
            >
              {/* Small Gold Accent Line */}
              <div className="w-10 h-[2.5px] bg-gradient-to-r from-transparent via-[#F5C518] to-transparent rounded-full mb-6 group-hover:w-16 transition-all duration-300" />

              {/* Name */}
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider leading-tight">
                {person.name}
              </h3>

              {/* Minimal Accent Badge */}
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5B8D8]/70">
                <Sparkles className="w-3 h-3 text-[#F5C518]" />
                <span>E-CELL LEADERSHIP</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institution Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap mt-14"
        >
          <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            E-CELL CRCE
          </div>

          <span className="text-sm font-bebas text-[#F5C518]">×</span>

          <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            E-CELL IIT BOMBAY
          </div>
        </motion.div>
      </div>
    </section>
  );
};
