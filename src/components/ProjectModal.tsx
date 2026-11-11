import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#121212] border border-neutral-700 rounded-3xl overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121212]/95 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="text-blue-400 font-bold">{project.index}</span>
            <span>·</span>
            <span>{project.discipline}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-2">
              {project.title}
            </h2>
            <p className="text-lg text-neutral-300 font-serif italic mb-6">
              {project.subtitle}
            </p>
            <p className="text-base text-neutral-300 font-sans font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-neutral-800 bg-black/50">
              {project.stats.map((s, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-2xl font-bold font-display text-white tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-800">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400 mb-3">
                Architectural Design
              </h4>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {project.technicalDetails.architecture}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400 mb-3">
                Implementation Specifics
              </h4>
              <ul className="space-y-2">
                {project.technicalDetails.implementation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
                    <span className="text-blue-500 font-bold mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
              Verified Technical Stack
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex items-center justify-between">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors"
              >
                Inspect Repository on GitHub ↗
              </a>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono transition-colors"
            >
              Close Viewer (ESC)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
