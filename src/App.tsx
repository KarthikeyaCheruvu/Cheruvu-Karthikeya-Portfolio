import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroComposition } from './components/HeroComposition';
import { AboutSection } from './components/AboutSection';
import { SelectedWorks } from './components/SelectedWorks';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { Project } from './types/portfolio';
import { PROJECTS_DATA } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'works', 'arsenal', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectById = (projectId: string) => {
    const match = PROJECTS_DATA.find((p) => p.id === projectId);
    if (match) {
      setSelectedProject(match);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans selection:bg-blue-600 selection:text-white">
      <Navigation onNavigate={scrollToSection} activeSection={activeSection} />

      <main>
        <HeroComposition
          onExploreClick={() => scrollToSection('works')}
          onProjectClick={handleOpenProjectById}
        />

        <AboutSection />

        <SelectedWorks onSelectProject={setSelectedProject} />

        <TechnicalArsenal />

        <ExperienceTimeline />

        <ContactSection />
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer onScrollToTop={() => scrollToSection('hero')} />
    </div>
  );
}
