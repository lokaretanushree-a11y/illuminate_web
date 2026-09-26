import React from 'react';
import { Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#090312] border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 text-[#C5B8D8]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Left Column: Brand */}
          <div className="md:col-span-5">
            <div className="font-bebas text-4xl text-[#F5C518] tracking-wider leading-none">
              illuminate
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70 mt-2 font-medium">
              E-CELL IIT BOMBAY × E-CELL CRCE
            </p>
            <p className="text-sm text-[#C5B8D8]/80 mt-4 max-w-sm leading-relaxed">
              Empowering the next generation of founders through hands-on ideation, financial modeling, and pitch execution.
            </p>
          </div>

          {/* Center Column: Logistics summary */}
          <div className="md:col-span-4 space-y-2 text-xs uppercase tracking-[0.15em] text-[#C5B8D8]">
            <div className="text-[11px] font-mono text-[#F5C518] font-bold mb-3">
              EVENT LOGISTICS
            </div>
            <div>03 OCTOBER 2026</div>
            <div>11:00 AM — 6:00 PM IST</div>
            <div>FR. CONCEICAO RODRIGUES COLLEGE OF ENGINEERING (CRCE), BANDRA, MUMBAI</div>
          </div>

          {/* Right Column: Connect & Back to top */}
          <div className="md:col-span-3 flex flex-col justify-between h-full">
            <div>
              <div className="text-[11px] font-mono text-[#F5C518] font-bold uppercase tracking-[0.2em] mb-3">
                CONNECT
              </div>
              <div className="space-y-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-[#F5C518] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#F5C518]" />
                  <span>E-Cell CRCE</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-[#F5C518] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#F5C518]" />
                  <span>E-Cell IIT Bombay</span>
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors cursor-pointer group"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5B8D8]/60">
          <div>© 2026 illuminate Workshop. All rights reserved.</div>
          <div className="text-[11px] uppercase tracking-wider">
            Conducted by E-Cell IIT Bombay · Hosted by E-Cell CRCE
          </div>
        </div>
      </div>
    </footer>
  );
};
