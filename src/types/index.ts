// types/index.ts

export interface Project {
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    features: string[];
  }
  
  export interface WorkExperience {
    title: string;
    company: string;
    location: string;
    period: string;
    responsibilities: string[];
  }
  
  export interface Skill {
    category: string;
    items: string[];
  }
  
  export interface Education {
    degree: string;
    institution: string;
    period: string;
    location: string;
  }