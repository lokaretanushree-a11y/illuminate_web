import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Circle, Chrome, Github, Eye, EyeOff, ArrowLeft, CheckCircle2, Ticket } from 'lucide-react';

interface AuroraRegistrationProps {
  onBackToWebsite: () => void;
}

export const AuroraRegistration: React.FC<AuroraRegistrationProps> = ({
  onBackToWebsite,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ILLUM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Return to illuminate Workshop Bar */}
      <div className="absolute top-4 left-4 sm:left-6 z-50">
        <button
          type="button"
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F5C518]" />
          <span>Return to illuminate Workshop</span>
        </button>
      </div>

      <main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
        {/* Left Column (Hero & Background Video) */}
        <div className="relative flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full hidden lg:flex w-[52%]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
              type="video/mp4"
            />
          </video>

          {/* Hero Content Container - pure video, no dark overlays */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 w-full max-w-xs space-y-8"
          >
            {/* Brand/Logo */}
            <motion.div
              variants={heroChildVariants}
              className="flex items-center gap-2.5 justify-center"
            >
              <Circle className="w-5 h-5 fill-white text-white" />
              <span className="text-xl font-semibold tracking-tight text-white">
                Aurora
              </span>
            </motion.div>

            {/* Heading Block */}
            <motion.div
              variants={heroChildVariants}
              className="text-center space-y-2"
            >
              <h1 className="text-4xl font-medium tracking-tight whitespace-nowrap text-white">
                Join Aurora
              </h1>
              <p className="text-white/60 text-sm leading-relaxed px-4">
                Follow these 3 quick phases to activate your space.
              </p>
            </motion.div>

            {/* Steps */}
            <motion.div variants={heroChildVariants} className="space-y-3 w-full">
              <StepItem
                number={1}
                text="Register your identity"
                active={!isSubmitted}
              />
              <StepItem
                number={2}
                text="Configure your studio"
                active={isSubmitted}
              />
              <StepItem number={3} text="Finalize your profile" />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column (Sign Up Form) */}
        <div className="flex-1 flex flex-col items-center justify-center py-16 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
            >
              {/* Header */}
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-3xl font-medium tracking-tight text-white">
                  Create New Profile
                </h2>
                <p className="text-white/40 text-sm">
                  Input your basic details to begin the journey.
                </p>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <SocialButton
                  icon={<Chrome className="w-5 h-5" />}
                  label="Google"
                />
                <SocialButton
                  icon={<Github className="w-5 h-5" />}
                  label="Github"
                />
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="w-full border-t border-white/10" />
                <span className="absolute bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
                  Or
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputGroup
                    label="First Name"
                    placeholder="e.g. Alex"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <InputGroup
                    label="Last Name"
                    placeholder="e.g. Morgan"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <InputGroup
                  label="Email"
                  placeholder="alex@aurora.io"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputGroup
                  label="Password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none p-1 text-white/40 hover:text-white transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  }
                  helperText="Requires at least 8 symbols."
                />

                <button
                  type="submit"
                  className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 transition-all cursor-pointer flex items-center justify-center text-sm"
                >
                  Create Account
                </button>
              </form>

              {/* Footer Link */}
              <div className="text-center text-sm text-white/40 pt-2">
                <span>Member of the team? </span>
                <a
                  href="#login"
                  className="text-white hover:underline font-medium transition-colors"
                >
                  Log in
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-white/[0.04] border border-[#F5C518]/30 rounded-3xl p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[#F5C518] text-xs uppercase tracking-widest font-semibold">
                  Registration Successful
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Welcome, {firstName || 'Innovator'}!
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-2">
                  Your registration for illuminate Workshop has been confirmed.
                </p>
              </div>

              {/* Pass details */}
              <div className="bg-black/60 rounded-2xl p-5 border border-white/10 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-[#F5C518] font-bold">
                    <Ticket className="w-4 h-4" />
                    <span>Pass Reference</span>
                  </span>
                  <span className="font-mono text-white font-bold">{ticketId}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Event</span>
                  <span className="text-white font-medium">illuminate Workshop</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Date &amp; Venue</span>
                  <span className="text-white font-medium">12 Oct 2026 · LTCE Navi Mumbai</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Pass Type</span>
                  <span className="text-emerald-400 font-medium">All-Access Pass (₹700)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={onBackToWebsite}
                  className="w-full h-12 bg-[#F5C518] text-black font-bold rounded-xl hover:bg-[#e4b513] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to illuminate Website</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Reusable Components                                                        */
/* -------------------------------------------------------------------------- */

interface StepItemProps {
  number: number;
  text: string;
  active?: boolean;
}

export function StepItem({ number, text, active = false }: StepItemProps) {
  return (
    <div
      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl w-full text-sm font-medium transition-all ${
        active
          ? 'bg-white text-black border border-white'
          : 'bg-brand-gray text-white border-none'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
          active ? 'bg-black text-white' : 'bg-white/10 text-white/40'
        }`}
      >
        {number}
      </div>
      <span className="truncate">{text}</span>
    </div>
  );
}

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-black border border-white/10 rounded-xl hover:bg-white/5 h-12 flex items-center justify-center gap-2.5 text-sm font-medium text-white transition-colors w-full cursor-pointer"
    >
      <span className="text-white/80">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

interface InputGroupProps {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
  helperText?: string;
}

export function InputGroup({
  label,
  placeholder,
  type,
  value,
  onChange,
  rightElement,
  helperText,
}: InputGroupProps) {
  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-white block">{label}</label>
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-brand-gray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 w-full outline-none text-sm transition-all ${
            rightElement ? 'pr-11' : ''
          }`}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {helperText && <p className="text-xs text-white/40">{helperText}</p>}
    </div>
  );
}
