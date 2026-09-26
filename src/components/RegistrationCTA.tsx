import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section id="registration" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[600px] bg-gradient-to-tr from-purple-900/30 via-amber-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <div className="rounded-3xl bg-gradient-to-b from-[#16092e] to-[#0c051a] border border-amber-400/40 p-8 sm:p-14 text-center shadow-2xl shadow-purple-950/50 gold-glow">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-300">
              Limited Seats Available
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 text-balance">
            Ready to illuminate your idea?
          </h2>

          {/* Text */}
          <p className="text-base sm:text-xl text-zinc-300 max-w-xl mx-auto mb-8 sm:mb-10 font-normal">
            Reserve your spot for the illuminate Workshop.
          </p>

          {/* Price Highlight */}
          <div className="mb-8 inline-flex items-baseline gap-2 px-5 py-2.5 rounded-2xl bg-[#090314]/70 border border-purple-900/50">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400 tabular-nums">
              {EVENT_CONFIG.pricing.currencySymbol}{EVENT_CONFIG.pricing.amount}
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">
              {EVENT_CONFIG.pricing.label}
            </span>
          </div>

          {/* Large CTA Button */}
          <div className="flex justify-center mb-10">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto min-h-[54px] px-10 py-4 rounded-full text-sm sm:text-base font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-[0.98] transition-all gold-glow cursor-pointer shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
            </button>
          </div>

          {/* Zero-Pill Feature Checklist */}
          <div className="pt-8 border-t border-purple-900/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-300">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Dual Certificate</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Full Startup Kit</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hands-on BMC</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Live Pitch Drills</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
