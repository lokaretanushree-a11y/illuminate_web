import React, { useState, useEffect } from 'react';
import { ArrowRight, Ticket } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';

interface MobileStickyCTAProps {
  onOpenRegister: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onOpenRegister }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls beyond the hero section (~450px)
      setVisible(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside 
      aria-label="Quick Registration Action"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-gradient-to-t from-[#07020f] via-[#07020f]/95 to-transparent border-t border-purple-900/40 backdrop-blur-lg animate-slideUp"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col pl-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
            {EVENT_CONFIG.date.day} {EVENT_CONFIG.date.month} · {EVENT_CONFIG.venue.shortName}
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1">
            <span>{EVENT_CONFIG.pricing.currencySymbol}{EVENT_CONFIG.pricing.amount}</span>
            <span className="text-[10px] font-normal text-zinc-400">{EVENT_CONFIG.pricing.label}</span>
          </div>
        </div>

        <a
          href="https://forms.gle/XJMwB8mSd4GzBn9G7"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 to-yellow-500 active:scale-[0.98] transition-transform gold-glow-sm flex items-center gap-1.5 shrink-0"
        >
          <span>REGISTER NOW</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
