import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Explore', href: '#topics' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Register', href: '#register' },
  ];

  const handleLinkClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    if (label === 'Register') {
      window.open('https://forms.gle/XJMwB8mSd4GzBn9G7', '_blank', 'noopener,noreferrer');
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#0D0618]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left: illuminate */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="font-bebas text-2xl sm:text-3xl text-[#F5C518] tracking-wider transition-transform group-hover:scale-105">
                illuminate
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] shadow-[0_0_8px_#F5C518]" />
            </a>

            {/* Center: About, Explore, Schedule, Register */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href, link.label)}
                  className="text-white/75 hover:text-[#F5C518] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right: REGISTER NOW */}
            <div className="hidden sm:flex items-center">
              <a
                href="https://forms.gle/XJMwB8mSd4GzBn9G7"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-[#F5C518] hover:bg-[#ffcf24] transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(245,197,24,0.3)] hover:scale-105 active:scale-95 inline-flex items-center justify-center"
              >
                REGISTER NOW
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white/80 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Minimal Mobile Drawer */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-3 pb-4 border-t border-white/10 mt-2 space-y-2.5"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href, link.label)}
                    className="text-left px-3 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-[#F5C518] rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 px-1">
                <a
                  href="https://forms.gle/XJMwB8mSd4GzBn9G7"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-[#F5C518] hover:bg-[#ffcf24] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>REGISTER NOW — ₹700</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </motion.header>
      )}
    </AnimatePresence>
  );
};
