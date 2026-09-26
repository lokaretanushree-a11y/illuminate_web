import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FloatingObjects } from './FloatingObjects';

export const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const stats = [
    { number: '18,000+', label: 'STUDENTS IMPACTED' },
    { number: '200+', label: 'WORKSHOPS' },
    { number: '15+', label: 'STATES' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Soft purple/gold ambient glow behind the section */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7B2FBE]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#F5C518]/5 blur-[100px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'glass-sphere', size: 95, top: '8%', right: '4%', duration: 11 },
          { type: 'gold-ring', size: 105, bottom: '12%', left: '3%', duration: 20 },
          { type: 'gem-octahedron', size: 68, top: '48%', left: '2%', duration: 14 },
          { type: 'purple-orb', size: 70, bottom: '25%', right: '5%', duration: 8 },
        ]}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Large Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#F5C518]" />
              <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.25em]">
                ABOUT THE WORKSHOP
              </span>
            </div>

            <h2 className="font-bebas text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-wide select-none">
              WHAT IS <br />
              <span className="text-[#F5C518] drop-shadow-[0_0_25px_rgba(245,197,24,0.35)]">
                ILLUMINATE?
              </span>
            </h2>

            <div className="mt-6 hidden lg:block text-xs uppercase tracking-[0.25em] text-[#C5B8D8]/60 font-semibold">
              E-CELL IIT BOMBAY × E-CELL LTCE
            </div>
          </motion.div>

          {/* Right: Short description + 3 Impact Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Description */}
            <div className="space-y-4 text-[#C5B8D8] text-base sm:text-lg leading-relaxed font-normal">
              <p>
                <span className="text-white font-medium">illuminate</span> is a one-day, hands-on entrepreneurship workshop conducted by{' '}
                <span className="text-white font-semibold">E-Cell IIT Bombay</span> and hosted by{' '}
                <span className="text-white font-semibold">E-Cell LTCE</span>, bringing together students, aspiring founders, and innovators to turn raw ideas into scalable ventures.
              </p>
              <p className="text-sm sm:text-base text-[#C5B8D8]/80 leading-relaxed">
                Through immersive problem discovery, Business Model Canvas construction, startup finance fundamentals, MVP prototyping, and live pitch execution, you master the playbook of India&apos;s leading entrepreneurial ecosystem.
              </p>
            </div>

            {/* Impact Numbers: Oversized typography with thin borders and subtle glass surfaces */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 pt-10 sm:pt-12 border-t border-white/10 mt-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: [0, -6, 0],
                        }
                      : {}
                  }
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3 + idx * 0.1 },
                    y: { duration: 4 + idx * 0.7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 },
                  }}
                  className="relative p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#F5C518]/40 transition-colors group cursor-default shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                >
                  <div className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#F5C518] leading-none tracking-tight group-hover:scale-105 transition-transform origin-left drop-shadow-[0_0_12px_rgba(245,197,24,0.3)]">
                    {stat.number}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-[#C5B8D8] tracking-[0.15em] uppercase mt-2">
                    {stat.label}
                  </div>
                  {/* Subtle bottom indicator */}
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-[#F5C518]/0 via-[#F5C518]/40 to-[#F5C518]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
