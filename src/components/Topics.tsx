import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FloatingObjects } from './FloatingObjects';
import { Lightbulb, BarChart3, Coins, Rocket, Mic } from 'lucide-react';

export const Topics: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const topics = [
    {
      num: '01',
      title: 'IDEATION',
      subtitle: 'Problem Validation & Market Gap Analysis',
      icon: Lightbulb,
      desc: 'Identify high-impact real world problems, uncover untapped consumer demand, and stress-test raw hypotheses through rigorous frameworks.',
      offset: '',
    },
    {
      num: '02',
      title: 'BUSINESS MODELS',
      subtitle: 'The 9-Box Canvas Architecture',
      icon: BarChart3,
      desc: 'Construct a resilient Business Model Canvas (BMC). Map unit economics, customer segments, distribution moats, and revenue streams.',
      offset: 'lg:translate-y-8',
    },
    {
      num: '03',
      title: 'STARTUP FINANCE',
      subtitle: 'Unit Economics & Runway Dynamics',
      icon: Coins,
      desc: 'Master the financial vital signs every investor evaluates: CAC, LTV, burn rate, runway projection, and valuation fundamentals.',
      offset: '',
    },
    {
      num: '04',
      title: 'MVPS & POCS',
      subtitle: 'Rapid Prototype-to-Validation Loops',
      icon: Rocket,
      desc: 'Cut through analysis paralysis. Build minimum viable products and proof-of-concept prototypes in days, validating directly with real users.',
      offset: 'lg:translate-y-8',
    },
    {
      num: '05',
      title: 'PITCHING',
      subtitle: 'High-Stakes Investor Communication',
      icon: Mic,
      desc: 'Craft an unforgettable narrative arc. Master slide-by-slide storytelling, objection handling, and charismatic stage presence.',
      offset: 'lg:col-span-2 lg:max-w-2xl lg:mx-auto',
    },
  ];

  return (
    <section
      id="topics"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#7B2FBE]/10 blur-[130px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'gold-ring', size: 110, top: '6%', right: '3%', duration: 22 },
          { type: 'glass-sphere', size: 90, top: '42%', left: '2%', duration: 10 },
          { type: 'purple-orb', size: 75, bottom: '8%', right: '4%', duration: 9 },
          { type: 'cube', size: 60, bottom: '25%', left: '3%', duration: 15 },
        ]}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1.5px] bg-[#F5C518]" />
              <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.25em]">
                IMMERSIVE CURRICULUM
              </span>
            </div>
            <h2 className="font-bebas text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-wide select-none">
              WHAT YOU&apos;LL EXPLORE
            </h2>
          </div>
          <p className="text-[#C5B8D8] text-xs sm:text-sm max-w-sm uppercase tracking-[0.15em] font-medium">
            Five core disciplines designed to transform idea validation into investor-ready execution.
          </p>
        </div>

        {/* Staggered Editorial Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.article
                key={topic.num}
                initial={{ opacity: 0, y: 30 }}
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
                  opacity: { duration: 0.7, delay: index * 0.1, ease: 'easeOut' },
                  y: {
                    duration: 4.8 + (index % 3) * 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.4,
                  },
                }}
                className={`group relative rounded-3xl p-7 sm:p-9 bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-[#F5C518]/50 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,197,24,0.18)] flex flex-col justify-between overflow-hidden cursor-default ${topic.offset}`}
              >
                {/* Subtle internal gradient accent on hover */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#F5C518]/5 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="font-bebas text-4xl sm:text-5xl text-[#F5C518]/90 tracking-wider">
                    {topic.num}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#F5C518] group-hover:border-[#F5C518]/40 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Middle: Title & Subtitle */}
                <div>
                  <h3 className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide transition-transform duration-300 group-hover:translate-x-2">
                    {topic.title}
                  </h3>
                  <div className="text-[11px] sm:text-xs font-semibold text-[#F5C518]/80 uppercase tracking-[0.18em] mt-1 mb-4">
                    {topic.subtitle}
                  </div>
                  <p className="text-[#C5B8D8] text-sm sm:text-base leading-relaxed font-normal opacity-85 group-hover:opacity-100 group-hover:text-white/95 transition-all duration-300">
                    {topic.desc}
                  </p>
                </div>

                {/* Bottom: Expanding Gold Line */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="h-[2px] w-8 group-hover:w-24 bg-[#F5C518] shadow-[0_0_10px_#F5C518] transition-all duration-400 ease-out" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-[#F5C518] transition-colors">
                    MODULE // {topic.num}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
