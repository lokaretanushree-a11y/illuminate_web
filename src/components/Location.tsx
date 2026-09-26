import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';

export const Location: React.FC = () => {
  return (
    <section id="location" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span className="w-6 h-[1px] bg-amber-400/80" />
            <span>Venue & Direction</span>
            <span className="w-6 h-[1px] bg-amber-400/80" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Location
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Hosted along the scenic Bandstand Promenade in Bandra West, Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Info: Address breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e061c]/80 border border-purple-900/30">
              <div className="flex items-center gap-3 text-amber-400 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-400/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">Official Host Campus</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                {EVENT_CONFIG.venue.name}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                {EVENT_CONFIG.venue.address}
              </p>

              <div className="space-y-3 pt-6 border-t border-purple-900/40 text-xs text-zinc-400">
                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                  <span>Scenic campus location at Bandstand Promenade overlooking the Arabian Sea</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                  <span>Accessible via Bandra Railway Station (~12-15 mins by auto-rickshaw or taxi)</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-900/40">
                <a
                  href={EVENT_CONFIG.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 active:scale-[0.98] transition-all gold-glow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>VIEW ON GOOGLE MAPS</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Architectural Vector Map Placeholder Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#090314] border border-purple-900/40 p-6 sm:p-8 overflow-hidden group">
              {/* Decorative Map Grid & Coastline SVG */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-[#0d051a] overflow-hidden border border-purple-900/30 flex items-center justify-center">
                {/* SVG Stylized Cartography of Bandstand Coastline */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                  viewBox="0 0 500 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Water / Arabian Sea */}
                  <path
                    d="M0 0 L180 0 Q190 90 220 180 Q240 260 210 350 L0 350 Z"
                    fill="#15082e"
                  />
                  {/* Coastal Road - Bandstand Promenade */}
                  <path
                    d="M180 0 Q190 90 220 180 Q240 260 210 350"
                    stroke="#f5b041"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  {/* Urban Street Grids */}
                  <path d="M220 80 L500 60" stroke="#3b1b6d" strokeWidth="1.5" />
                  <path d="M225 140 L500 120" stroke="#3b1b6d" strokeWidth="1.5" />
                  <path d="M230 200 L500 210" stroke="#3b1b6d" strokeWidth="1.5" />
                  <path d="M215 280 L500 290" stroke="#3b1b6d" strokeWidth="1.5" />
                  <path d="M300 0 L320 350" stroke="#3b1b6d" strokeWidth="1.5" />
                  <path d="M400 0 L410 350" stroke="#3b1b6d" strokeWidth="1.5" />

                  {/* Ocean wave ripples */}
                  <path d="M40 70 Q80 60 120 70" stroke="#4a1e8a" strokeWidth="1" strokeOpacity="0.5" />
                  <path d="M60 140 Q100 130 140 140" stroke="#4a1e8a" strokeWidth="1" strokeOpacity="0.5" />
                  <path d="M30 230 Q70 220 110 230" stroke="#4a1e8a" strokeWidth="1" strokeOpacity="0.5" />
                </svg>

                {/* Map Pin Marker on Fr. CRCE Bandra */}
                <div className="absolute top-[52%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-75" />
                    <div className="relative p-2.5 rounded-full bg-amber-400 text-black shadow-lg shadow-amber-400/50">
                      <MapPin className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-md bg-[#0a0314]/90 border border-amber-400/40 backdrop-blur-md text-[11px] font-bold text-white whitespace-nowrap shadow-xl">
                    Fr. CRCE Bandra
                  </div>
                </div>

                {/* Overlay card in bottom corner */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto px-3.5 py-2 rounded-xl bg-[#090212]/90 border border-purple-900/50 backdrop-blur-md flex items-center justify-between sm:justify-start gap-4 text-[11px] text-zinc-300">
                  <div>
                    <span className="text-zinc-500 font-mono">19.0435° N, 72.8196° E</span>
                  </div>
                  <span className="text-amber-400 font-medium">Bandra West</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
                <span>Fr. Conceicao Rodrigues College of Engineering · Mumbai</span>
                <a
                  href={EVENT_CONFIG.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
