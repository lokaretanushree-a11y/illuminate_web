import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { FloatingObjects } from './FloatingObjects';

interface RegistrationStepsProps {
  onOpenRegister: () => void;
}

export const RegistrationSteps: React.FC<RegistrationStepsProps> = ({ onOpenRegister }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="register"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Subtle purple background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full bg-[#5E0ED7]/15 blur-[150px] pointer-events-none" />

      {/* Moving 3D Statement Objects */}
      <FloatingObjects
        objects={[
          { type: 'glass-sphere', size: 90, top: '10%', left: '4%', duration: 11 },
          { type: 'gold-ring', size: 100, top: '25%', right: '4%', duration: 22 },
          { type: 'purple-orb', size: 75, bottom: '15%', left: '5%', duration: 9 },
          { type: 'gem-octahedron', size: 65, bottom: '20%', right: '4%', duration: 15 },
        ]}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="w-6 h-[1.5px] bg-[#F5C518]" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.28em]">
              HOW TO REGISTER
            </span>
            <span className="w-6 h-[1.5px] bg-[#F5C518]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bebas text-white text-5xl sm:text-6xl lg:text-7xl tracking-wide leading-none select-none"
          >
            YOUR SPOT STARTS HERE.
          </motion.h2>
        </div>

        {/* ONE SINGLE FLOATING REGISTRATION CARD */}
        <div className="relative max-w-3xl mx-auto">
          {/* Subtle animated gold/purple ambient light behind the card */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.1, 1],
                    opacity: [0.35, 0.6, 0.35],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-[#7B2FBE]/20 via-[#F5C518]/15 to-[#5E0ED7]/25 rounded-[32px] blur-[50px] pointer-events-none -z-10"
          />

          {/* Floating Card Container (y: [0, -8, 0], 6-8s duration) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={
              isInView
                ? shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: 1,
                      y: [0, -8, 0],
                    }
                : {}
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.6 }
                : {
                    y: {
                      duration: 7,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    opacity: { duration: 0.6 },
                  }
            }
            className="rounded-[24px] p-7 sm:p-10 md:p-12 text-left"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.045)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 25px 70px -15px rgba(94, 14, 215, 0.4), 0 0 40px rgba(123, 47, 190, 0.2)',
            }}
          >
            {/* Top pill inside card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5C518]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F5C518] font-bold">
                  HOW TO REGISTER
                </span>
              </div>

              {/* REGISTER → PAYMENT → CONFIRM flow */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                <span className="text-white">REGISTER</span>
                <span className="text-[#F5C518]">→</span>
                <span className="text-white">PAYMENT</span>
                <span className="text-[#F5C518]">→</span>
                <span className="text-[#C5B8D8]">CONFIRM</span>
              </div>
            </div>

            {/* 3 Step Unified List inside the single card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-8 border-b border-white/10">
              {/* Step 01 */}
              <div className="space-y-2">
                <div className="font-bebas text-3xl text-[#F5C518] leading-none">
                  01
                </div>
                <div className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                  REGISTER
                </div>
                <p className="text-[#C5B8D8] text-xs sm:text-sm leading-relaxed">
                  Fill in your registration details.
                </p>
              </div>

              {/* Step 02 */}
              <div className="space-y-2">
                <div className="font-bebas text-3xl text-[#A855F7] leading-none">
                  02
                </div>
                <div className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                  PAYMENT
                </div>
                <p className="text-[#C5B8D8] text-xs sm:text-sm leading-relaxed">
                  Scan the QR code and complete the ₹349 payment.
                </p>
              </div>

              {/* Step 03 */}
              <div className="space-y-2">
                <div className="font-bebas text-3xl text-emerald-400 leading-none">
                  03
                </div>
                <div className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                  CONFIRM
                </div>
                <p className="text-[#C5B8D8] text-xs sm:text-sm leading-relaxed">
                  Submit your payment confirmation.
                </p>
              </div>
            </div>

            {/* Bottom Row: Registration Fee + REGISTER NOW Button */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#C5B8D8]/70">
                  Registration Fee
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bebas text-4xl sm:text-5xl text-[#F5C518] leading-none">
                    ₹349
                  </span>
                  <span className="text-xs text-[#C5B8D8]">/ participant</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-[#F5C518] hover:bg-[#ffcf24] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(245,197,24,0.4)] hover:shadow-[0_0_40px_rgba(245,197,24,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>REGISTER NOW →</span>
              </button>
            </div>

            {/* Subtle verification footnote */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-[#C5B8D8]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5C518]" />
              <span>Official E-Cell IIT Bombay credentials &amp; Delegate pass guaranteed upon verification</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
