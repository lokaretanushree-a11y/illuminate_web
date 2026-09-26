import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { Calendar, Clock, MapPin, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { IlluminationPortal } from './IlluminationPortal';

interface HeroProps {
  onOpenRegister: () => void;
  onLearnMore: () => void;
}

const TITLE_LETTERS = ['I', 'L', 'L', 'U', 'M', 'I', 'N', 'A', 'T', 'E'];

// Stagger effect variants for letter-by-letter reveal
const titleContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.45,
      staggerChildren: 0.05,
    },
  },
};

const titleCharacterVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onLearnMore }) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress tied to Hero section (natural browser scroll, zero scroll-jacking)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // SCROLL INTERACTION:
  // Video subtle zoom
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // ILLUMINATE: translateY(0 -> -45px), opacity(1 -> 0.65)
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.65]);

  // WORKSHOP: translateY(0 -> -35px)
  const workshopY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  // Event details: y 0 -> -60px, opacity 1 -> 0.4
  const infoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  // Scroll indicator fade-out
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // MOUSE PARALLAX (Desktop only, spring-smoothed)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 85 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // ILLUMINATE title: moves ONLY 3–5px
  const titleMouseX = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const titleMouseY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);

  // Background gold glow behind heading: moves max 8px
  const bgGlowMouseX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const bgGlowMouseY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const yNorm = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(xNorm);
      mouseY.set(yNorm);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pt-5 pb-6 sm:pb-8 select-none bg-[#05030A]"
    >
      {/* 
        BACKGROUND VIDEO:
        Visible without heavy dark overlay, subtle exhibition vignette
      */}
      <motion.video
        style={{
          scale: shouldReduceMotion ? 1 : videoScale,
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="./assets/poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none origin-center opacity-85"
      >
        <source src="./assets/hero.mp4" type="video/mp4" />
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
          type="video/mp4"
        />
      </motion.video>

      {/* Cinematic exhibition space vignette for maximum contrast and elegance */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 25% 50%, rgba(5,3,10,0.52) 0%, rgba(5,3,10,0.2) 50%, rgba(5,3,10,0.78) 100%)',
        }}
      />

      {/* 
        ATMOSPHERIC LIGHTING:
        Behind ILLUMINATE: warm gold illumination (#FFD21C / #FFF0A3)
        Illuminated by the portal from the right
      */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-18, 18, -18],
                opacity: [0.08, 0.14, 0.08],
              }
        }
        transition={{
          x: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          x: shouldReduceMotion ? 0 : bgGlowMouseX,
          y: shouldReduceMotion ? 0 : bgGlowMouseY,
        }}
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[400px] rounded-full bg-[#FFD21C]/[0.12] blur-[110px] pointer-events-none z-[2]"
      />

      {/* Deep violet atmospheric baseline glow */}
      <div className="absolute bottom-0 right-1/4 w-[520px] h-[360px] rounded-full bg-[#7C3AED]/12 blur-[120px] pointer-events-none z-[2]" />

      {/* 
        ========================================================================
        NEW 3D CENTERPIECE: ILLUMINATION PORTAL ("IDEA CORE")
        Smoked glass + translucent violet glass + brushed dark metal + warm gold core
        ========================================================================
      */}
      <IlluminationPortal
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollYProgress={scrollYProgress}
      />

      {/* TOP NAVIGATION */}
      <header className="relative z-10 w-full flex items-center justify-between pt-2">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <Sparkles className="w-3 h-3 text-[#FFD21C]" />
          <span>E-CELL LTCE × E-CELL IIT BOMBAY</span>
        </motion.div>

        {/* Minimal Navigation */}
        <motion.nav
          aria-label="Hero navigation"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/75"
        >
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-[#FFD21C] transition-colors cursor-pointer"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavClick('topics')}
            className="hover:text-[#FFD21C] transition-colors cursor-pointer"
          >
            EXPERIENCE
          </button>
          <button
            onClick={() => handleNavClick('schedule')}
            className="hover:text-[#FFD21C] transition-colors cursor-pointer"
          >
            SCHEDULE
          </button>
          <a
            href="https://forms.gle/XJMwB8mSd4GzBn9G7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFD21C] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold"
          >
            <span>REGISTER</span>
            <span className="text-[10px] opacity-75">₹700</span>
          </a>
        </motion.nav>
      </header>

      {/* 
        MAIN HERO CONTENT:
        Left 55% with ample negative space before the 3D Illumination Portal on the right
      */}
      <div className="relative z-10 w-full max-w-3xl lg:max-w-[55%] my-auto py-6 sm:py-8 lg:py-10 text-left">
        {/* Editorial Event Label */}
        <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3.5">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="h-[1.5px] bg-[#FFD21C] block shrink-0"
          />
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-inter text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-white/85"
          >
            ONE DAY ENTREPRENEURSHIP WORKSHOP
          </motion.span>
        </div>

        {/* 
          "ILLUMINATE" - THE DOMINANT HERO HEADING
          - Metallic warm-gold gradient: #FFF0A3 -> #FFD21C -> #F5B800 -> #FFD94A
          - Staggered letter-by-letter reveal (opacity 0->1, y 30px->0, blur 8px->0)
          - Soft warm glow behind text, illuminated by the portal
          - Slow subtle light sweep across letters (7-9s)
        */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : titleMouseX,
            y: shouldReduceMotion ? 0 : titleY,
            opacity: shouldReduceMotion ? 1 : titleOpacity,
          }}
          className="relative inline-block"
        >
          {/* Soft warm glow behind the text */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.22, 0.42, 0.22],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-6 bg-[#FFD21C] rounded-3xl blur-[45px] pointer-events-none -z-10"
            style={{ filter: 'blur(50px)' }}
          />

          <motion.h1
            variants={shouldReduceMotion ? undefined : titleContainerVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 'clamp(5rem, 14vw, 14.5rem)',
              textShadow:
                '0 0 35px rgba(255, 210, 28, 0.38), 0 0 75px rgba(255, 210, 28, 0.18)',
            }}
            className="font-bebas leading-[0.86] tracking-[0.01em] select-none inline-flex origin-left text-gold-shimmer"
            aria-label="ILLUMINATE"
          >
            {TITLE_LETTERS.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={shouldReduceMotion ? undefined : titleCharacterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* 
          "WORKSHOP" - INTEGRATED LOGO SYSTEM TITLE
          - Positioned directly below ILLUMINATE
          - Large tracking, warm white text with gold accent
          - Thin gold line underneath animating from 0% -> 100% on page load
        */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : workshopY,
          }}
          className="relative inline-block mt-0.5 sm:mt-1 pl-1"
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="font-inter text-white/95 uppercase tracking-[0.45em] sm:tracking-[0.55em] font-extrabold text-base sm:text-xl md:text-2xl drop-shadow-[0_0_12px_rgba(255,210,28,0.4)] flex items-center gap-2"
          >
            <span>WORKSHOP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21C]" />
          </motion.div>

          {/* Thin gold line underneath (0% -> 100% on load, then gentle breathing) */}
          <div className="relative w-full mt-1.5 h-[1.5px] overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={
                shouldReduceMotion
                  ? { width: '100%', opacity: 0.85 }
                  : {
                      width: '100%',
                      opacity: [0.6, 0.95, 0.6],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.6, delay: 0.85 }
                  : {
                      width: { duration: 0.65, delay: 0.85, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                    }
              }
              className="h-full bg-gradient-to-r from-[#FFD21C] via-[#FFF0A3] to-[#FFD21C]"
              style={{
                boxShadow: '0 0 10px rgba(255,210,28,0.7)',
              }}
            />
          </div>
        </motion.div>

        {/* Hero Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="font-inter text-[#D8D2E2] text-xs sm:text-sm md:text-base font-normal mt-3.5 sm:mt-4 max-w-xl pl-1 tracking-wide"
        >
          Empowering the next generation of changemakers.
        </motion.p>

        {/* Event Schedule & Location Bar */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : infoY,
            opacity: shouldReduceMotion ? 1 : infoOpacity,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-6 sm:mt-7 inline-flex flex-wrap items-center gap-2.5 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm tracking-wide shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#FFD21C]" />
            <span>12 OCTOBER 2026</span>
          </div>

          <span className="text-white/25 hidden sm:inline">|</span>

          <div className="flex items-center gap-2 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#FFD21C]" />
            <span>4–5 HOURS</span>
          </div>

          <span className="text-white/25 hidden sm:inline">|</span>

          <div className="flex items-center gap-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#FFD21C]" />
            <span>LTCE, NAVI MUMBAI</span>
          </div>
        </motion.div>

        {/* Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6 sm:mt-8 pl-0.5"
        >
          {/* Primary CTA */}
          <motion.a
            href="https://forms.gle/XJMwB8mSd4GzBn9G7"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FFD21C] hover:bg-[#ffe066] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,210,28,0.45)] hover:shadow-[0_0_42px_rgba(255,210,28,0.75)] transition-all duration-300 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
            <span className="font-black">₹700</span>
            <ArrowRight className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-[5px]" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLearnMore}
            className="group px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <span>EXPLORE WORKSHOP</span>
            <ArrowRight className="w-4 h-4 opacity-70 transition-transform duration-300 group-hover:translate-x-[5px]" />
          </motion.button>
        </motion.div>
      </div>

      {/* BOTTOM HERO FOOTER */}
      <footer className="relative z-10 w-full flex items-end justify-between pt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-medium"
        >
          <span>E-CELL IIT BOMBAY</span>
          <span className="mx-2 text-[#FFD21C]">×</span>
          <span>E-CELL LTCE</span>
        </motion.div>

        <motion.button
          onClick={onLearnMore}
          style={{
            opacity: shouldReduceMotion ? 0.7 : indicatorOpacity,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="group inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to explore workshop curriculum"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.span
            animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#FFD21C]" />
          </motion.span>
        </motion.button>
      </footer>
    </section>
  );
};
