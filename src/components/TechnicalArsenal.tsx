import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';

export const TechnicalArsenal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <section id="arsenal" className="relative w-full py-28 px-6 sm:px-12 bg-[#0B0B0B] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              <span>03</span>
              <span className="w-8 h-[1px] bg-neutral-700" />
              <span className="text-blue-400">Technical Competencies</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
              Technical Arsenal.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-mono">
            Zero vanity percentages. A disciplined breakdown of core languages, systems libraries,
            and specialized domain competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((cat, idx) => {
            const isSelected = selectedCategory === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedCategory(isSelected ? null : idx)}
                className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-500/10'
                    : 'border-neutral-800 bg-[#121212] hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                    <span className="text-blue-400 font-semibold">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-[11px] text-neutral-400">{cat.skills.length} Competencies</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-neutral-800/80">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-800/40 last:border-b-0"
                    >
                      <span className="text-neutral-200">{skill}</span>
                      <span className="text-neutral-400 text-[10px]">VERIFIED</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-neutral-800 bg-[#121212]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <div className="text-xs font-mono text-neutral-300">
              Systems Philosophy: Grounded in low-level pointer management and deterministic performance before high-level abstraction.
            </div>
          </div>
          <div className="text-xs font-mono text-neutral-400 shrink-0">
            C11 · Python 3.10+ · SQL
          </div>
        </div>
      </div>
    </section>
  );
};
