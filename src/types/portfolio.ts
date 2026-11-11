export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  discipline: string;
  period: string;
  description: string;
  problemSolved: string;
  keyHighlights: string[];
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  stats?: { label: string; value: string }[];
  technicalDetails: {
    architecture: string;
    implementation: string[];
    outcomes: string[];
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}
