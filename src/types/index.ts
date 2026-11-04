export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  headline: string;
  summary: string;
  skills: {
    technical: string[];
    frameworks: string[];
    tools: string[];
    soft: string[];
  };
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}

export interface ScoreBreakdown {
  overall: number;
  atsCompliance: number;
  impactMetrics: number;
  skillsRelevance: number;
  depthOfExperience: number;
  actionVerbsScore: number;
  strengths: string[];
  improvements: string[];
  keywordGaps: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  providerBadge: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';
  atsScoreBoost: number;
  marketValueScore: number; // e.g. 9.5 / 10
  estimatedSalaryImpact: string;
  description: string;
  syllabus: string[];
  skillsCovered: string[];
  capstoneProject: {
    title: string;
    description: string;
    techStack: string[];
  };
  isFinalDsaCourse?: boolean;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  enrolledDate?: string;
  completedDate?: string;
  certificateUrl?: string;
  learningUrl?: string;
}

export interface DevelopmentPath {
  id: string;
  title: string;
  category: string;
  tagline: string;
  badge: string;
  color: string;
  description: string;
  marketDemand: 'Ultra High' | 'Very High' | 'High';
  avgSalary: string;
  openPositions: string;
  iconName: string;
  targetSkills: string[];
  courses: Course[];
  finalCourse: Course; // The Ultimate DSA Capstone
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  experienceLevel: 'Entry-Level' | 'Junior' | 'Mid-Level' | 'Senior' | 'Junior / Mid-Level' | string;
  salary: string;
  postedDate: string;
  pathId: string;
  tags: string[];
  matchScore: number;
  overview: string;
  requirements: string[];
  benefits: string[];
  appliedStatus?: 'applied' | 'interview' | 'offer' | null;
  appliedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export type ActiveTab = 'analyzer' | 'paths' | 'courses' | 'builder' | 'jobs' | 'login';
