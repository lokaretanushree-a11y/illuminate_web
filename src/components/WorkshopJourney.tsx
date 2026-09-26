import React from 'react';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';

interface JourneyStep {
  step: string;
  time: string;
  phase: string;
  title: string;
  description: string;
}

export const WorkshopJourney: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      step: "01",
      time: "11:00 AM",
      phase: "Phase 1 · Foundations",
      title: "Introduction",
      description: "Welcome address, workshop orientation, and setting the stage with leaders from E-Cell IIT Bombay and E-Cell CRCE.",
    },
    {
      step: "02",
      time: "11:30 AM",
      phase: "Phase 1 · Foundations",
      title: "What is Entrepreneurship",
      description: "Deconstructing the entrepreneurial mindset, navigating risk, and understanding what distinguishes thriving startups from failing ideas.",
    },
    {
      step: "03",
      time: "12:15 PM",
      phase: "Phase 1 · Foundations",
      title: "Team Formation",
      description: "Structured cohort interaction to assemble multidisciplinary founder teams with complementary design, tech, and business skillsets.",
    },
    {
      step: "04",
      time: "01:15 PM",
      phase: "Phase 2 · Architecture",
      title: "Idea Generation & Problem Identification",
      description: "Hands-on ideation sprint to identify authentic market frictions, root causes, and user behavior before designing solutions.",
    },
    {
      step: "05",
      time: "02:30 PM",
      phase: "Phase 2 · Architecture",
      title: "Business Model Canvas",
      description: "Deep dive workshop into the 9 blocks of the Business Model Canvas, transforming raw concepts into structured, viable business engines.",
    },
    {
      step: "06",
      time: "03:45 PM",
      phase: "Phase 2 · Architecture",
      title: "Finance for Entrepreneurs",
      description: "Essential startup math: unit economics, pricing strategies, cash burn, runway planning, and what angel investors look for.",
    },
    {
      step: "07",
      time: "04:30 PM",
      phase: "Phase 3 · Execution",
      title: "Insights Into Startup Development",
      description: "First-hand founder case studies on navigating early-stage bottlenecks, customer discovery pitfalls, and MVP validation loops.",
    },
    {
      step: "08",
      time: "05:15 PM",
      phase: "Phase 3 · Execution",
      title: "Pitching Workshop & Q&A",
      description: "Live pitch deck mastery session, simulation drills, real-time mentor critique, open Q&A, and certification closing ceremony.",
    },
  ];

  return (
    <section id="workshop" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span className="w-6 h-[1px] bg-amber-400/80" />
            <span>Structured Workshop Schedule</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Workshop Journey
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            A comprehensive 7-hour roadmap engineered to take you from a raw premise to an investor-ready pitch outline.
          </p>
        </div>

        {/* Sophisticated Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-purple-900/40 space-y-8 sm:space-y-10">
          {steps.map((item, index) => (
            <div key={item.step} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#07030e] border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition-all gold-glow-sm" />
              </div>

              {/* Content Box */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-medium text-amber-400/90 tracking-wider">
                    {item.time}
                  </span>
                  <span aria-hidden="true" className="text-zinc-600 text-xs">·</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                    {item.phase}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline-block">
                  Step {item.step}/08
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
