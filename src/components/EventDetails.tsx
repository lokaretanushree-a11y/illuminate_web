import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { FloatingObjects } from './FloatingObjects';

interface EventDetailsProps {
  onOpenRegister?: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onOpenRegister }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="details"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Gold & Purple ambient glow behind this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-r from-[#7B2FBE]/20 via-[#F5C518]/15 to-[#A855F7]/20 blur-[130px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'gold-ring', size: 110, top: '12%', left: '4%', duration: 22 },
          { type: 'glass-sphere', size: 95, top: '20%', right: '4%', duration: 11 },
          { type: 'purple-orb', size: 80, bottom: '15%', right: '5%', duration: 8 },
          { type: 'gem-octahedron', size: 70, bottom: '18%', left: '5%', duration: 16 },
        ]}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Large Cinematic Registration Section Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative rounded-[2.5rem] p-8 sm:p-14 lg:p-16 text-center border border-white/15 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_60px_rgba(123,47,190,0.15)] overflow-hidden"
        >
          {/* Inner subtle glow highlight */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#F5C518]/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5C518] text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALL-ACCESS WORKSHOP PASS</span>
          </div>

          {/* Huge Price: ₹349 */}
          <div
            className="font-bebas text-8xl sm:text-9xl md:text-[11rem] text-[#F5C518] leading-[0.85] tracking-tight select-none"
            style={{
              textShadow:
                '0 0 35px rgba(245,197,24,0.5), 0 0 80px rgba(245,197,24,0.25)',
            }}
          >
            ₹349
          </div>

          {/* Subtitle: PER PARTICIPANT */}
          <div className="font-inter text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#C5B8D8] mt-3">
            PER PARTICIPANT
          </div>

          <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto mt-3 font-normal">
            Includes official certification from E-Cell IIT Bombay, startup kit, mentor guidance, and challenge incentives.
          </p>

          {/* Event Metadata Row: 03 OCTOBER 2026 | 11:00 AM — 6:00 PM | CRCE, BANDRA, MUMBAI */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/90">
            <div className="flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4 text-[#F5C518]" />
              <span>03 OCTOBER 2026</span>
            </div>

            <span className="text-white/20 hidden sm:inline">•</span>

            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-[#F5C518]" />
              <span>11:00 AM — 6:00 PM</span>
            </div>

            <span className="text-white/20 hidden sm:inline">•</span>

            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-[#F5C518]" />
              <span>CRCE, BANDRA, MUMBAI</span>
            </div>
          </div>

          {/* CTA: REGISTER NOW */}
          <div className="mt-10">
            <button
              onClick={onOpenRegister}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#F5C518] hover:bg-[#ffcf24] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(245,197,24,0.45)] hover:shadow-[0_0_50px_rgba(245,197,24,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
