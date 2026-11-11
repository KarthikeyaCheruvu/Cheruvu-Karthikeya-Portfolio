import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="w-full py-12 px-6 sm:px-12 bg-[#0B0B0B] border-t border-neutral-900 text-xs font-mono text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-neutral-300">
          <span>© 2026 {PERSONAL_INFO.name}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">Bengaluru, India</span>
        </div>

        <div className="text-neutral-400 text-center">
          Jain Deemed-to-be University · B.Tech CSE (AI & ML)
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
          <button
            onClick={onScrollToTop}
            className="text-neutral-400 hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
