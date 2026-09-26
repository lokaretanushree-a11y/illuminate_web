import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Package, Users, Gift } from 'lucide-react';
import { FloatingObjects } from './FloatingObjects';

export const Benefits: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const benefits = [
    {
      icon: Award,
      title: 'CERTIFICATE OF PARTICIPATION',
      subtitle: 'Certified by E-Cell IIT Bombay',
      desc: 'Officially credentialed certification validating your completed entrepreneurial training under India’s leading university entrepreneurship cell.',
    },
    {
      icon: Package,
      title: 'STARTUP KIT',
      subtitle: '',
      items: [
        'Business Model Canvas (BMC) sheet/template',
        'Frameworks for entrepreneurship and startup planning',
        'Workshop workbook/material',
        'Startup tools, templates, and resources',
        'Activity sheets and brainstorming material',
        'Illuminate goodies/merchandise (stickers, badges, etc.)',
        'Workshop incentives provided by E-Cell IIT Bombay',
      ],
    },
    {
      icon: Users,
      title: 'HANDS-ON ACTIVITIES',
      subtitle: 'Live Collaborative Execution',
      desc: 'Form teams, pressure-test business models in real time, and receive live critique directly from seasoned student founders and mentors.',
    },
    {
      icon: Gift,
      title: 'WORKSHOP INCENTIVES',
      subtitle: 'Exclusive Rewards & Recognition',
      desc: 'Special accolades, curated merchandise, and direct fast-track opportunities to flagship E-Cell competitions for top-performing pitches.',
    },
  ];

  return (
    <section
      id="benefits"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Subtle purple background ambient */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7B2FBE]/10 blur-[130px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'glass-sphere', size: 90, top: '14%', left: '3%', duration: 12 },
          { type: 'gold-ring', size: 95, top: '55%', right: '4%', duration: 20 },
          { type: 'purple-orb', size: 70, bottom: '15%', left: '4%', duration: 8 },
          { type: 'gem-octahedron', size: 65, bottom: '22%', right: '3%', duration: 15 },
        ]}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1.5px] bg-[#F5C518]" />
              <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.25em]">
                PARTICIPANT PRIVILEGES
              </span>
            </div>
            <h2 className="font-bebas text-white text-5xl sm:text-6xl lg:text-7xl tracking-wide leading-none select-none">
              WHAT YOU GET
            </h2>
          </div>
          <p className="text-[#C5B8D8] text-xs sm:text-sm max-w-sm uppercase tracking-[0.16em] font-medium">
            Tangible credentials, physical tools, and ecosystem access included in your ₹700 pass.
          </p>
        </div>

        {/* 2x2 Premium Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: [0, -6, 0],
                      }
                    : {}
                }
                whileHover={{ y: -10, scale: 1.015 }}
                transition={{
                  opacity: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' },
                  y: {
                    duration: 4.5 + (index % 2) * 0.9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.35,
                  },
                }}
                className="group relative p-8 sm:p-10 rounded-3xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 hover:border-[#F5C518]/40 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(245,197,24,0.15)]"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5C518] mb-6 group-hover:scale-105 group-hover:border-[#F5C518]/40 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#F5C518] transition-colors">
                    {benefit.title}
                  </h3>
                  {benefit.subtitle && (
                    <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#F5C518]/80 mt-1 mb-4">
                      {benefit.subtitle}
                    </div>
                  )}

                  {/* Description */}
                  {benefit.desc && (
                    <p className="text-[#C5B8D8] text-sm sm:text-base leading-relaxed font-normal">
                      {benefit.desc}
                    </p>
                  )}

                  {/* Bullet List for Startup Kit */}
                  {benefit.items && (
                    <ul className="space-y-2 sm:space-y-2.5 mt-3 text-[#C5B8D8] text-xs sm:text-sm leading-relaxed font-normal">
                      {benefit.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono">
                    BENEFIT // 0{index + 1}
                  </span>
                  <div className="w-6 h-[1.5px] bg-[#F5C518]/40 group-hover:w-12 group-hover:bg-[#F5C518] transition-all duration-300" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
