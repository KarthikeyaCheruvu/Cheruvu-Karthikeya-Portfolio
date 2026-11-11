import React, { useState, useEffect } from 'react';
import { TIMELINE_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [rhythmActive, setRhythmActive] = useState<boolean>(true);
  const [beatStep, setBeatStep] = useState<number>(0);

  useEffect(() => {
    if (!rhythmActive) return;
    const interval = setInterval(() => {
      setBeatStep((prev) => (prev + 1) % 16);
    }, 180);
    return () => clearInterval(interval);
  }, [rhythmActive]);

  const filteredItems = TIMELINE_DATA.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'industry') return item.type === 'Internship' || item.type === 'Certification';
    if (filter === 'academic') return item.type === 'Education';
    if (filter === 'percussion') return item.type === 'Extracurricular Discipline';
    return true;
  });

  const barHeights = [38, 82, 54, 96, 45, 76, 90, 62, 48, 88, 70, 95, 52, 78, 64, 85];

  return (
    <section id="experience" className="relative w-full py-28 px-6 sm:px-12 bg-[#0B0B0B] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              <span>04</span>
              <span className="w-8 h-[1px] bg-neutral-700" />
              <span className="text-blue-400">Chronological Record</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
              Experience & Education.
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/[0.04] backdrop-blur-xl border border-white/15 rounded-xl">
            {[
              { id: 'all', label: 'All Records' },
              { id: 'industry', label: 'Industry & Certs' },
              { id: 'academic', label: 'Academic' },
              { id: 'percussion', label: 'Percussion' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'bg-blue-600/85 text-white font-medium shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredItems.map((item, idx) => {
            const isDrums = item.type === 'Extracurricular Discipline';

            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-blue-400/35 hover:bg-white/[0.05] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                <div className="md:col-span-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400 font-semibold mb-1">
                      {item.year}
                    </div>
                    <div className="text-lg font-bold text-white font-display">
                      {item.organization}
                    </div>
                    <div className="text-xs font-mono text-neutral-400 mt-1">
                      {item.location}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400">
                    RECORD TYPE: <span className="text-neutral-200">{item.type}</span>
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-4">
                      {item.role}
                    </h3>

                    <ul className="space-y-3">
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-neutral-300 font-light leading-relaxed">
                          <span className="text-blue-400 mt-1">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Drums & Percussion Visual Showcase */}
                  {isDrums && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] group">
                      <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
                        <img
                          src="/src/assets/images/drums_kit_closeup_1794418670825.jpg"
                          alt="Trinity College London Acoustic Drum Kit & Percussion"
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                            rhythmActive && beatStep % 4 === 0 ? 'scale-[1.03]' : 'scale-100'
                          }`}
                        />

                        {/* Subtle Acoustic Resonance Ripple on Beat */}
                        <div
                          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 bg-radial from-blue-500/20 via-transparent to-transparent ${
                            rhythmActive && beatStep % 2 === 0 ? 'opacity-90' : 'opacity-20'
                          }`}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                        {/* Top Metadata Overlay */}
                        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between text-[11px] font-mono">
                          <span className="px-2.5 py-1 rounded-md bg-white/[0.1] backdrop-blur-xl border border-white/20 text-white">
                            TRINITY COLLEGE LONDON · GRADE 5 COMPLETED / GRADE 6 IN PROGRESS
                          </span>
                          <button
                            onClick={() => setRhythmActive(!rhythmActive)}
                            className="px-3 py-1 rounded-md bg-blue-600/75 hover:bg-blue-500 backdrop-blur-xl border border-blue-300/30 text-white transition-colors cursor-pointer"
                          >
                            {rhythmActive ? 'Pause Cadence' : 'Play Cadence'}
                          </button>
                        </div>

                        {/* Bottom Animated GIF-Style Rhythmic Equalizer & TempoVisualizer */}
                        <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-4">
                          <div>
                            <div className="text-[10px] font-mono text-blue-300 uppercase tracking-widest">
                              Acoustic Percussion & Timekeeping
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-white font-serif italic">
                              Six years of graded rhythmic precision & polyrhythmic control
                            </div>
                          </div>

                          {/* Animated Equalizer Bars */}
                          <div className="flex items-end gap-1 h-9 px-3 py-1.5 rounded-xl bg-white/[0.07] backdrop-blur-xl border border-white/15">
                            {barHeights.map((baseH, bIndex) => {
                              const activeShift = rhythmActive
                                ? ((bIndex + beatStep) % 5) * 18 + 20
                                : 25;
                              const heightPct = Math.min(100, Math.max(20, (baseH + activeShift) / 2));
                              return (
                                <span
                                  key={bIndex}
                                  className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-sky-300 transition-all duration-150"
                                  style={{ height: `${heightPct}%` }}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
