import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FloatingObjects } from './FloatingObjects';
import { Sparkles, Clock } from 'lucide-react';

export const Schedule: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const timelineItems = [
    {
      num: '01',
      title: 'Introduction',
      duration: '15 min',
      desc: 'Icebreaking and structured introduction exercises to connect attendees across disciplines.',
      highlight: false,
    },
    {
      num: '02',
      title: 'What is Entrepreneurship',
      duration: '15 min',
      desc: 'Deconstructing entrepreneurial mindset, value creation mechanisms, and market opportunity analysis.',
      highlight: false,
    },
    {
      num: '03',
      title: 'Team Formation',
      duration: '15 min',
      desc: 'Forming interdisciplinary founder teams combining business, tech, and design skillsets.',
      highlight: false,
    },
    {
      num: '04',
      title: 'Idea Generation & Problem Identification',
      duration: '15 min',
      desc: 'Intensive group sprint identifying painful market bottlenecks and validating problem statements.',
      highlight: false,
    },
    {
      num: '05',
      title: 'Business Model Canvas Workshop',
      duration: '60 min',
      desc: 'Deep-dive session dissecting all 9 blocks of the Business Model Canvas with mentors from E-Cell IIT Bombay.',
      highlight: true,
    },
    {
      num: '06',
      title: 'Team Activity: Filling Out BMC',
      duration: '60 min',
      desc: 'Hands-on sprint where teams flesh out the full BMC for their startup concept with live critique and iteration.',
      highlight: true,
    },
    {
      num: '07',
      title: 'Finance For Entrepreneurs',
      duration: '30 min',
      desc: 'Early-stage startup accounting, pricing strategies, burn rates, runway management, and seed mechanics.',
      highlight: false,
    },
    {
      num: '08',
      title: 'Insights Into Startup Development',
      duration: '30 min',
      desc: 'Proof-of-concept (POC) to Minimum Viable Product (MVP) progression and early customer acquisition loops.',
      highlight: false,
    },
    {
      num: '09',
      title: 'Pitching Workshop & Q&A',
      duration: '30 min',
      desc: 'Live stage pitch delivery framework, pitch deck optimization, and interactive open floor Q&A.',
      highlight: false,
    },
  ];

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Background ambient blooms */}
      <div className="absolute top-1/2 left-10 w-[550px] h-[550px] rounded-full bg-[#7B2FBE]/10 blur-[130px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'gem-octahedron', size: 70, top: '15%', right: '4%', duration: 16 },
          { type: 'glass-sphere', size: 85, top: '48%', left: '3%', duration: 12 },
          { type: 'gold-ring', size: 100, bottom: '12%', right: '3%', duration: 24 },
          { type: 'purple-orb', size: 68, bottom: '28%', left: '4%', duration: 8 },
        ]}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#F5C518]" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.25em]">
              TIMELINE & SESSIONS
            </span>
            <span className="w-5 h-[1.5px] bg-[#F5C518]" />
          </div>

          <h2 className="font-bebas text-white text-5xl sm:text-6xl lg:text-7xl tracking-wide leading-none select-none">
            WORKSHOP SCHEDULE
          </h2>

          <p className="text-[#C5B8D8] text-xs sm:text-sm max-w-md mx-auto uppercase tracking-[0.18em] font-medium mt-3">
            A 7-hour high-intensity progression from raw ideation to pitch execution.
          </p>
        </div>

        {/* Cinematic Timeline */}
        <div className="relative">
          {/* Thin continuous gold timeline */}
          <div className="absolute top-4 bottom-4 left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#F5C518]/80 via-[#F5C518]/30 to-[#7B2FBE]/20 pointer-events-none" />

          <div className="space-y-8 sm:space-y-10">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.07, ease: 'easeOut' }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Timeline Gold Node */}
                  <div
                    className={`absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0D0618] border-2 ${
                      item.highlight
                        ? 'border-[#F5C518] shadow-[0_0_15px_#F5C518]'
                        : 'border-[#F5C518]/60 shadow-[0_0_8px_rgba(245,197,24,0.4)]'
                    } z-20 flex items-center justify-center`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.highlight ? 'bg-[#F5C518]' : 'bg-[#F5C518]/80'
                      }`}
                    />
                  </div>

                  {/* Content Card Wrapper */}
                  <motion.div
                    whileHover={{ scale: 1.015, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-full pl-14 sm:pl-16 md:pl-0 md:w-1/2 cursor-default ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div
                      className={`relative rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 ${
                        item.highlight
                          ? 'bg-[#F5C518]/[0.08] border-2 border-[#F5C518] shadow-[0_0_35px_rgba(245,197,24,0.22)]'
                          : 'bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 hover:shadow-[0_0_25px_rgba(255,210,28,0.1)]'
                      }`}
                    >
                      {/* Key Session Badge */}
                      {item.highlight && (
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#F5C518] text-black mb-3 shadow-[0_0_12px_rgba(245,197,24,0.5)] ${
                            isEven ? 'md:float-right md:ml-3' : 'md:float-left md:mr-3'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 fill-black text-black" />
                          <span>KEY SESSION</span>
                        </div>
                      )}

                      {/* Session metadata */}
                      <div className="flex items-center gap-3 mb-2 flex-wrap clear-both">
                        <span className="font-bebas text-[#F5C518] text-xl tracking-wider">
                          SESSION {item.num}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80">
                          <Clock className="w-3 h-3 text-[#F5C518]" />
                          {item.duration}
                        </span>
                      </div>

                      {/* Session Title */}
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight mb-2 ${
                          item.highlight ? 'text-[#F5C518]' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Session Description */}
                      <p className="text-[#C5B8D8] text-xs sm:text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
