import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'about', label: 'Story' },
    { id: 'works', label: 'Selected Works' },
    { id: 'arsenal', label: 'Technical Arsenal' },
    { id: 'experience', label: 'Experience' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0B]/85 backdrop-blur-md border-b border-neutral-800/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => onNavigate('hero')}
            className="text-base sm:text-lg font-semibold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors focus:outline-none"
          >
            {PERSONAL_INFO.name}
          </button>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all rounded-lg whitespace-nowrap shrink-0 shadow-sm shadow-blue-500/20"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
