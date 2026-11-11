import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { PROJECTS_DATA } from '../data/portfolioData';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onSelectProject }) => {
  const [telemetrySimState, setTelemetrySimState] = useState({
    rpm: 7800,
    soc: 74,
    temp: 34.2,
    torque: 412,
  });

  const simulateCycle = (speedDelta: number) => {
    setTelemetrySimState((prev) => ({
      rpm: Math.max(3000, Math.min(9800, prev.rpm + speedDelta * 400)),
      soc: Math.max(10, Math.min(100, +(prev.soc - 0.2).toFixed(1))),
      temp: Math.max(28, Math.min(48, +(prev.temp + speedDelta * 0.4).toFixed(1))),
      torque: Math.max(150, Math.min(680, prev.torque + speedDelta * 30)),
    }));
  };

  return (
    <section id="works" className="relative w-full py-28 px-6 sm:px-12 bg-[#0B0B0B] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              <span>02</span>
              <span className="w-8 h-[1px] bg-neutral-700" />
              <span className="text-blue-400">Project Exhibition</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
              Selected Works.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-mono">
            Architectural case studies spanning electric vehicle telemetry, low-level memory engineering,
            and contextual artificial intelligence.
          </p>
        </div>

        <div className="space-y-24">
          {PROJECTS_DATA.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-blue-400/35 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div
                    className={`relative lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-black/60 ${
                      isEven ? 'order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 opacity-85 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />

                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-mono bg-white/[0.08] backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-lg text-neutral-200 shadow-lg">
                      <span>{project.discipline}</span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-blue-300">{project.period}</span>
                    </div>

                    {project.id === 'ola-vehicle-engineering' && (
                      <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] text-xs font-mono text-white hidden sm:block">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-blue-300 font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            LIVE TELEMETRY STREAM SIMULATOR
                          </span>
                          <span className="text-neutral-300">CAN_BUS_SYNC</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center py-1">
                          <div className="bg-white/[0.06] backdrop-blur-md p-2 rounded-lg border border-white/10">
                            <div className="text-neutral-300 text-[10px]">MOTOR RPM</div>
                            <div className="text-white font-bold tabular-nums">{telemetrySimState.rpm}</div>
                          </div>
                          <div className="bg-white/[0.06] backdrop-blur-md p-2 rounded-lg border border-white/10">
                            <div className="text-neutral-300 text-[10px]">BATTERY SOC</div>
                            <div className="text-sky-300 font-bold tabular-nums">{telemetrySimState.soc}%</div>
                          </div>
                          <div className="bg-white/[0.06] backdrop-blur-md p-2 rounded-lg border border-white/10">
                            <div className="text-neutral-300 text-[10px]">CELL TEMP</div>
                            <div className="text-amber-300 font-bold tabular-nums">{telemetrySimState.temp}°C</div>
                          </div>
                          <div className="bg-white/[0.06] backdrop-blur-md p-2 rounded-lg border border-white/10">
                            <div className="text-neutral-300 text-[10px]">TORQUE</div>
                            <div className="text-blue-300 font-bold tabular-nums">{telemetrySimState.torque} Nm</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/10 text-[11px]">
                          <span className="text-neutral-300">Simulate Acceleration Load:</span>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                simulateCycle(1);
                              }}
                              className="px-2.5 py-1 rounded-md bg-blue-600/80 hover:bg-blue-500 border border-blue-400/30 text-white transition-colors"
                            >
                              + Throttle
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                simulateCycle(-1);
                              }}
                              className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-100 transition-colors"
                            >
                              - Regen Brake
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between ${
                      isEven ? 'order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                        <span className="text-blue-400 font-semibold">{project.index}</span>
                        <span>{project.category}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-300 font-serif italic mb-6">
                        {project.subtitle}
                      </p>

                      <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light mb-6">
                        {project.description}
                      </p>

                      <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
                        <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-1">
                          The Engineering Challenge
                        </div>
                        <p className="text-xs text-neutral-300 leading-normal">
                          {project.problemSolved}
                        </p>
                      </div>

                      <div className="space-y-2 mb-6">
                        {project.keyHighlights.slice(0, 2).map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <span className="text-blue-400 mt-0.5">·</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-neutral-400 mb-8">
                        {project.technologies.map((tech, tIdx) => (
                          <React.Fragment key={tIdx}>
                            <span className="text-neutral-200">{tech}</span>
                            {tIdx < project.technologies.length - 1 && (
                              <span className="text-neutral-600">/</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-neutral-800">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-5 py-2.5 rounded-lg bg-white text-black font-medium text-xs hover:bg-neutral-200 active:scale-95 transition-all"
                      >
                        Explore Case Study
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                        >
                          Source Code ↗
                        </a>
                      )}
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
