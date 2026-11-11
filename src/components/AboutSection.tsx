import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-28 px-6 sm:px-12 bg-[#0B0B0B] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <span>01</span>
          <span className="w-8 h-[1px] bg-neutral-700" />
          <span className="text-blue-400">Editorial Narrative</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15] font-serif">
              Engineering with low-level clarity, algorithmic discipline, and real-world scale.
            </h2>

            <div className="mt-8 space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed font-sans font-light">
              <p>
                I am a Computer Science & Engineering student specializing in Artificial Intelligence
                and Machine Learning at <span className="text-white font-normal">Jain Deemed-to-be University</span>,
                Bengaluru, maintaining a <span className="text-blue-400 font-mono font-medium">9.435 SGPA</span>.
                My work spans low-level systems in C, high-frequency SQL telemetry analytics, and modern AI context architectures.
              </p>
              <p>
                During my engineering internship at <span className="text-white font-normal">Ola Electric’s Vehicle Engineering</span> division,
                I authored and optimized SQL queries over complex electric vehicle sensor datasets, bridging raw CAN bus readings with actionable
                powertrain and battery degradation analytics.
              </p>
              <p>
                Beyond software, six years of structured percussion training with <span className="text-white font-normal">Trinity College London</span> (Grade 5 Completed, Grade 6 in Progress)
                have shaped my approach to engineering: exact timing, rhythmic cadence, and the disciplined perseverance required to debug
                unforgiving pointer bugs or high-throughput query bottlenecks.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-neutral-800/60">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                Linguistic Fluency
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300 font-mono">
                <span className="text-white">English</span>
                <span className="text-neutral-600">/</span>
                <span>Professional</span>
                <span className="text-neutral-600 mx-2">·</span>
                <span className="text-white">Telugu</span>
                <span className="text-neutral-600">/</span>
                <span>Native</span>
                <span className="text-neutral-600 mx-2">·</span>
                <span className="text-white">Hindi</span>
                <span className="text-neutral-600">/</span>
                <span>Conversational</span>
                <span className="text-neutral-600 mx-2">·</span>
                <span className="text-white">Kannada</span>
                <span className="text-neutral-600">/</span>
                <span>Conversational</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] p-6 sm:p-8 space-y-8">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>Verified Metrics</span>
                <span className="text-blue-400">2026 Academic Record</span>
              </div>

              <div className="space-y-6 divide-y divide-white/10">
                {PERSONAL_INFO.coreMetrics.map((m, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-sm font-medium text-neutral-200 mt-1">
                      {m.label}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-0.5">
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-blue-100 text-sm leading-relaxed font-serif italic">
              "Precision in music requires exact temporal division; precision in engineering requires understanding every byte and cycle. Both demand sustained, uninterrupted discipline."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
