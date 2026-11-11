import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';

interface HeroCompositionProps {
  onExploreClick: () => void;
  onProjectClick: (projectId: string) => void;
}

export const HeroComposition: React.FC<HeroCompositionProps> = ({
  onExploreClick,
  onProjectClick,
}) => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 bg-[#0B0B0B] overflow-hidden select-none">
      {/* Editorial Subheader (Directly matching reference image top row) */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm text-neutral-400 font-mono tracking-wider pt-2 pb-4 border-b border-neutral-800/40">
        <span className="text-neutral-300">Portfolio</span>
        <span className="text-neutral-200 font-semibold">[ 2026 ]</span>
        <span className="text-neutral-300 hidden sm:inline">Computer Science & AI/ML</span>
      </div>

      {/* Main Composition Anchor */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center my-6">
        {/* Signature Oversized Typography: Porto + folio with pixel-stroke glyph inspired by reference */}
        <div className="relative z-10 text-center select-none pointer-events-none mb-[-2rem] sm:mb-[-4rem]">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-white font-display leading-none flex items-center justify-center">
            <span>Porto</span>
            <span className="relative inline-flex items-baseline font-serif italic font-normal text-blue-100/90 ml-[-0.05em]">
              <span className="relative">
                f
                {/* Pixelated vertical accent stroke echoing reference's iconic 'f' */}
                <span className="absolute left-[38%] -top-4 sm:-top-8 w-1 sm:w-1.5 h-14 sm:h-24 bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.8)] opacity-95 pointer-events-none" />
              </span>
              <span className="font-display font-black not-italic text-white">olio</span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 mt-2 font-mono">
            {PERSONAL_INFO.name} · Engineering & Systems
          </p>
        </div>

        {/* Central Layered Composition (matching reference image collage) */}
        <div className="relative w-full max-w-3xl h-[420px] sm:h-[480px] md:h-[520px] flex items-center justify-center">
          {/* Background Three.js 3D WebGL Canvas for continuous interactive parallax */}
          <div className="absolute inset-0 z-0">
            <Hero3DCanvas />
          </div>

          {/* Interactive Overlapping Translucent Glass Cards */}
          <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-auto">
            {/* Card 1: Left Fan - About */}
            <div
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute left-[5%] sm:left-[12%] top-[12%] w-44 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.06] backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.25)] transform -rotate-12 -translate-y-4 hover:rotate-0 hover:scale-105 hover:border-blue-400/50 hover:bg-white/[0.1] hover:z-30 transition-all duration-300 cursor-pointer group"
            >
              <img
                src={PROJECTS_DATA[1].image}
                alt="About & Story"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-75 mix-blend-lighten transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-white/[0.04] flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider block mb-0.5">
                    Profile & Story
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight leading-tight block">
                    About Me
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Center-Right Fan - Internship */}
            <div
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute right-[6%] sm:right-[14%] top-[8%] w-48 sm:w-60 aspect-[3/4] rounded-2xl overflow-hidden border border-blue-400/35 bg-blue-500/[0.08] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)] transform rotate-8 hover:rotate-0 hover:scale-105 hover:border-blue-400/60 hover:bg-blue-500/[0.14] hover:z-30 transition-all duration-300 cursor-pointer group"
            >
              <img
                src={PROJECTS_DATA[0].image}
                alt="Ola Electric Internship"
                className="w-full h-full object-cover opacity-55 group-hover:opacity-80 mix-blend-lighten transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-blue-950/25 to-white/[0.05] flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-blue-200/80 uppercase">02</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider block mb-0.5">
                    Ola Electric · 2026
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight leading-tight block">
                    Internship
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Deep Center Fan - Experience */}
            <div
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute top-[2%] w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.05] backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.22)] transform -rotate-2 -translate-y-2 hover:scale-105 hover:border-indigo-400/50 hover:bg-white/[0.1] hover:z-30 transition-all duration-300 cursor-pointer group"
            >
              <img
                src={PROJECTS_DATA[2].image}
                alt="Experience & Works"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-75 mix-blend-lighten transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-white/[0.04] flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">03</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block mb-0.5">
                    Selected Works
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight leading-tight block">
                    Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Translucent Frosted Glass Overlay Shield */}
            <div className="absolute bottom-[4%] sm:bottom-[6%] w-[90%] sm:w-[84%] max-w-xl h-32 sm:h-36 rounded-2xl bg-gradient-to-r from-blue-950/35 via-white/[0.06] to-blue-900/30 border border-white/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-between px-5 sm:px-8 z-30">
              {/* Circular Year Badge + "selected works" label */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md text-blue-950 flex flex-col items-center justify-center font-black leading-none shadow-lg shrink-0">
                  <span className="text-xs sm:text-sm tracking-tighter">20</span>
                  <span className="text-xs sm:text-sm tracking-tighter">26</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">selected</span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-200/90 tracking-tight">works</span>
                </div>
              </div>

              {/* Translucent Frosted Glass Navigation Card on Right */}
              <div className="rounded-xl bg-blue-600/35 border border-blue-300/30 backdrop-blur-xl px-4 py-2 sm:py-2.5 text-white shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col gap-1 text-right font-sans">
                <div
                  className="text-[10px] sm:text-[11px] font-medium tracking-tight text-blue-100 hover:text-white transition-colors cursor-pointer"
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Internship
                </div>
                <div
                  className="text-[10px] sm:text-[11px] font-medium tracking-tight text-blue-100 hover:text-white transition-colors cursor-pointer"
                  onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Experience
                </div>
                <div
                  className="text-[10px] sm:text-[11px] font-medium tracking-tight text-blue-100 hover:text-white transition-colors cursor-pointer"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  About Me
                </div>
                <div
                  className="text-[10px] sm:text-[11px] font-medium tracking-tight text-blue-100 hover:text-white transition-colors cursor-pointer"
                  onClick={() => document.getElementById('arsenal')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Technical Arsenal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Details (Matching reference: Name / [Selected] / Works) */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm text-neutral-400 font-mono tracking-wider pt-4 border-t border-neutral-800/40">
        <span className="text-neutral-300 font-medium">Cheruvu Karthikeya</span>

        <button
          onClick={onExploreClick}
          className="group flex items-center gap-1.5 text-neutral-200 hover:text-blue-400 transition-colors font-semibold"
        >
          <span>[</span>
          <span className="group-hover:tracking-wider transition-all">Selected</span>
          <span>]</span>
        </button>

        <button
          onClick={onExploreClick}
          className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
        >
          <span>Works</span>
          <span className="text-blue-400 text-xs">↓</span>
        </button>
      </div>
    </section>
  );
};
