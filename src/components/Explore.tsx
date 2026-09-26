import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Layers, Target, DollarSign, Rocket, Mic } from 'lucide-react';

interface ExploreItem {
  id: string;
  num: string;
  title: string;
  summary: string;
  details: string;
  icon: React.ReactNode;
  tags: string[];
}

export const Explore: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("01");

  const areas: ExploreItem[] = [
    {
      id: "01",
      num: "01",
      title: "Ideation",
      summary: "Identify problems and develop meaningful solutions.",
      details: "Discover frameworks to spot genuine friction in existing markets. Learn how to transform raw observations into structured value propositions that address pressing customer needs.",
      icon: <Target className="w-5 h-5 text-amber-400" />,
      tags: ["Problem Discovery", "Pain Point Mapping", "Opportunity Scoping"],
    },
    {
      id: "02",
      num: "02",
      title: "Business Models",
      summary: "Build and understand a Business Model Canvas.",
      details: "Deconstruct the 9 foundational building blocks of scalable ventures. Connect customer segments, value streams, cost structures, and distribution channels into a coherent business engine.",
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      tags: ["BMC Architecture", "Value Architecture", "Revenue Streams"],
    },
    {
      id: "03",
      num: "03",
      title: "Startup Finance",
      summary: "Learn the basics of financial viability.",
      details: "Demystify unit economics, burn rate, runway, customer acquisition cost (CAC), and lifetime value (LTV). Build realistic financial logic that instills confidence in early backers.",
      icon: <DollarSign className="w-5 h-5 text-amber-400" />,
      tags: ["Unit Economics", "Runway & Burn", "Pricing Strategy"],
    },
    {
      id: "04",
      num: "04",
      title: "MVPs & POCs",
      summary: "Understand how ideas move towards real solutions.",
      details: "Learn how to build Minimum Viable Products and Proof of Concepts with speed and minimal burn. Validate critical assumptions in front of real users before committing heavy capital.",
      icon: <Rocket className="w-5 h-5 text-amber-400" />,
      tags: ["Hypothesis Testing", "Rapid Prototyping", "Validation Loops"],
    },
    {
      id: "05",
      num: "05",
      title: "Pitching",
      summary: "Learn how to present and communicate your idea.",
      details: "Master the art of high-impact storytelling. Structure persuasive 3-minute pitch decks that articulate problem, traction, market size, and vision with crisp clarity and presence.",
      icon: <Mic className="w-5 h-5 text-amber-400" />,
      tags: ["Pitch Deck Structure", "Narrative Arc", "Q&A Handling"],
    },
  ];

  return (
    <section id="explore" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span className="w-6 h-[1px] bg-amber-400/80" />
              <span>Curriculum Breakdown</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What You&apos;ll Explore
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xs sm:text-right">
            Five cornerstone disciplines for building, validating, and presenting a viable startup.
          </p>
        </div>

        {/* Interactive List / Reveal Layout */}
        <div className="space-y-3">
          {areas.map((area) => {
            const isActive = activeId === area.id;
            return (
              <div
                key={area.id}
                onClick={() => setActiveId(area.id)}
                onMouseEnter={() => setActiveId(area.id)}
                className={`group cursor-pointer rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#130726]/80 border-amber-400/40 shadow-xl shadow-purple-950/30'
                    : 'bg-[#0b0517]/40 border-purple-900/20 hover:border-purple-800/50 hover:bg-[#100720]/60'
                } p-5 sm:p-7`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Number + Title */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <span
                      className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight transition-colors tabular-nums ${
                        isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    >
                      {area.num}
                    </span>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2.5">
                        <span className="text-zinc-400 text-sm hidden sm:inline-block">
                          {area.icon}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {area.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-1 sm:line-clamp-none">
                        {area.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right indicator */}
                  <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-purple-900/30">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                      {area.tags.map((tag, idx) => (
                        <span key={tag} className="hidden lg:inline-flex items-center gap-1.5">
                          {idx > 0 && <span aria-hidden="true" className="text-zinc-700">·</span>}
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-amber-400 text-black rotate-90 sm:rotate-0'
                          : 'bg-white/5 text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100 mt-5 pt-4 border-t border-purple-900/40' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl mb-3">
                      {area.details}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-amber-300/80 font-medium">
                      <span className="text-zinc-500">Key Focus:</span>
                      {area.tags.map((tag, i) => (
                        <React.Fragment key={tag}>
                          {i > 0 && <span className="text-zinc-600">·</span>}
                          <span>{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
