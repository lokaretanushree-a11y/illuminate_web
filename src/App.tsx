/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Topics } from './components/Topics';
import { Schedule } from './components/Schedule';
import { Benefits } from './components/Benefits';
import { EventDetails } from './components/EventDetails';
import { RegistrationSteps } from './components/RegistrationSteps';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { RegistrationModal } from './components/RegistrationModal';
import { AuroraRegistration, StepItem, SocialButton, InputGroup } from './components/AuroraRegistration';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'website' | 'aurora'>('website');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check URL hash for direct deep links
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#aurora') {
        setCurrentView('aurora');
      } else if (window.location.hash === '#modal' || window.location.hash === '#register-modal') {
        window.open('https://forms.gle/XJMwB8mSd4GzBn9G7', '_blank', 'noopener,noreferrer');
        window.location.hash = '';
      } else {
        setCurrentView('website');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Registration handler opens Google Form in a new tab safely
  const handleOpenRegistration = () => {
    window.open('https://forms.gle/XJMwB8mSd4GzBn9G7', '_blank', 'noopener,noreferrer');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLearnMore = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user specifically requests Aurora view (via #aurora)
  if (currentView === 'aurora') {
    return (
      <AuroraRegistration
        onBackToWebsite={() => {
          setCurrentView('website');
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#08040F] text-white flex flex-col font-sans relative selection:bg-[#F5C518] selection:text-black">
      {/* 
        SUBTLE ANIMATED BACKGROUND SYSTEM
        Slow 15–30s floating ambient purple, violet & gold blobs with 18 low-opacity particles
      */}
      <AnimatedBackground />

      {/* Fixed Glass Navbar (slides down past hero) */}
      <Navbar onOpenRegister={handleOpenRegistration} />

      {/* Main Website Flow */}
      <main className="relative z-10 flex-1">
        {/* SECTION 1 — HERO: CINEMATIC SCROLL & PARALLAX */}
        <Hero
          onOpenRegister={handleOpenRegistration}
          onLearnMore={handleLearnMore}
        />

        {/* SECTION 2 — ABOUT THE WORKSHOP */}
        <About />

        {/* SECTION 3 — WHAT YOU'LL EXPLORE */}
        <Topics />

        {/* SECTION 4 — WORKSHOP SCHEDULE (TIMELINE) */}
        <Schedule />

        {/* SECTION 5 — WHAT YOU GET */}
        <Benefits />

        {/* SECTION 6 — EVENT DETAILS */}
        <EventDetails onOpenRegister={handleOpenRegistration} />

        {/* SECTION 7 — HOW TO REGISTER (2 PREVIEW PANELS) */}
        <RegistrationSteps onOpenRegister={handleOpenRegistration} />

        {/* SECTION 8 — CONTACT US */}
        <Contact />
      </main>

      {/* SECTION 9 — FOOTER */}
      <Footer />

      {/* Floating Register Button with pulsing gold glow and hover expansion */}
      <aside aria-label="Quick Registration" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.a
          href="https://forms.gle/XJMwB8mSd4GzBn9G7"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,210,28,0.4)',
              '0 0 35px rgba(255,210,28,0.65)',
              '0 0 20px rgba(255,210,28,0.4)',
            ],
          }}
          transition={{
            boxShadow: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          aria-label="Register for Illuminate Workshop for ₹700"
          className="group px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#FFD21C] hover:bg-[#ffe066] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 sm:gap-2.5 transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>REGISTER NOW — ₹700</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>
      </aside>

      {/* Polished Glassmorphism Event Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

// Re-export required components for testing/benchmark suites
export { StepItem, SocialButton, InputGroup };
