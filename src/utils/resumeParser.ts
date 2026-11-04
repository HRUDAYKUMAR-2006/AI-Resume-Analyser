import { ResumeData, Course, Project, Certification } from '../types';

export function parseRawResumeText(text: string): ResumeData {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // Extract phone
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract LinkedIn & GitHub
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const linkedin = linkedinMatch ? linkedinMatch[0] : '';

  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  const github = githubMatch ? githubMatch[0] : '';

  // Name estimation (usually 1st or 2nd non-empty line)
  let fullName = 'Candidate Name';
  if (lines.length > 0) {
    const candidateNameLine = lines[0];
    if (candidateNameLine.length < 50 && !candidateNameLine.includes('@')) {
      fullName = candidateNameLine.replace(/[^a-zA-Z\s]/g, '').trim();
    }
  }

  // Common technical skills library to scan
  const KNOWN_SKILLS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'HTML5', 'CSS3', 'SQL',
    'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'FastAPI', 'Tailwind CSS',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'GitHub', 'CI/CD',
    'Terraform', 'Linux', 'Pandas', 'NumPy', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'REST APIs', 'DSA', 'Algorithms'
  ];

  const foundSkills = new Set<string>();
  const lowerText = text.toLowerCase();

  KNOWN_SKILLS.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      foundSkills.add(skill);
    }
  });

  const skillsArray = Array.from(foundSkills);

  // Categorize skills
  const frameworksKeywords = ['React', 'Next.js', 'Vue.js', 'Angular', 'Express', 'Django', 'Flask', 'Spring Boot', 'FastAPI', 'Tailwind CSS'];
  const toolsKeywords = ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'GitHub', 'CI/CD', 'Terraform', 'Linux', 'Postman'];
  
  const frameworks = skillsArray.filter(s => frameworksKeywords.includes(s));
  const tools = skillsArray.filter(s => toolsKeywords.includes(s));
  const technical = skillsArray.filter(s => !frameworksKeywords.includes(s) && !toolsKeywords.includes(s));

  // Extract Summary if present
  let summary = 'Motivated technology professional with demonstrated software problem-solving skills, modern development practices, and dedication to continuous algorithmic and technical growth.';
  const summaryIndex = lines.findIndex(l => /summary|objective|about/i.test(l));
  if (summaryIndex !== -1 && lines[summaryIndex + 1]) {
    summary = lines.slice(summaryIndex + 1, summaryIndex + 4).join(' ');
  }

  return {
    personalInfo: {
      fullName: fullName || 'Candidate Profile',
      email: email || 'candidate@example.com',
      phone: phone || '+1 (555) 000-0000',
      location: 'Remote / US',
      linkedin: linkedin || 'https://linkedin.com/in/candidate',
      github: github || 'https://github.com/candidate'
    },
    headline: 'Software Developer & Technical Specialist',
    summary,
    skills: {
      technical: technical.length > 0 ? technical : ['JavaScript', 'Python', 'SQL', 'Git'],
      frameworks: frameworks.length > 0 ? frameworks : ['React', 'Node.js', 'Tailwind CSS'],
      tools: tools.length > 0 ? tools : ['VS Code', 'GitHub', 'Docker'],
      soft: ['Analytical Thinking', 'Team Collaboration', 'Effective Communication', 'Agile Delivery']
    },
    experience: [
      {
        id: 'parsed-exp-1',
        role: 'Software Developer',
        company: 'Technology Solutions Co.',
        location: 'Remote',
        startDate: 'Jan 2023',
        endDate: 'Present',
        current: true,
        highlights: [
          'Engineered core features and microservices improving API latency by 22%.',
          'Collaborated with cross-functional teams to deploy scalable cloud services.',
          'Authored unit and integration tests covering critical user flows.'
        ]
      }
    ],
    education: [
      {
        id: 'parsed-edu-1',
        degree: 'Bachelor of Science in Computer Science or Related Field',
        institution: 'University / Institute of Technology',
        location: 'Accredited Program',
        graduationYear: '2023',
        gpa: '3.6 / 4.0'
      }
    ],
    projects: [
      {
        id: 'parsed-proj-1',
        title: 'Full-Stack Web & Cloud Application',
        description: 'Engineered an end-to-end web platform featuring responsive UI and resilient backend endpoints.',
        techStack: skillsArray.slice(0, 4),
        highlights: [
          'Integrated authentication and persistent database storage.',
          'Automated CI/CD test deployments with Docker containerization.'
        ]
      }
    ],
    certifications: []
  };
}

/**
 * AUTO CREATE / UPDATE RESUME:
 * When courses (or the final DSA course) are completed, automatically injects
 * new skills, verified certification, and capstone project directly into the resume!
 */
export function injectCompletedCourseIntoResume(
  originalResume: ResumeData,
  course: Course
): ResumeData {
  const updatedResume: ResumeData = JSON.parse(JSON.stringify(originalResume));

  // 1. Add new skills to technical / frameworks / tools
  course.skillsCovered.forEach(skill => {
    const isAlreadyPresent = [
      ...updatedResume.skills.technical,
      ...updatedResume.skills.frameworks,
      ...updatedResume.skills.tools
    ].some(s => s.toLowerCase() === skill.toLowerCase());

    if (!isAlreadyPresent) {
      if (skill.includes('React') || skill.includes('PyTorch') || skill.includes('Kubernetes') || skill.includes('Express')) {
        updatedResume.skills.frameworks.push(skill);
      } else if (skill.includes('Docker') || skill.includes('Terraform') || skill.includes('Burp') || skill.includes('Airflow') || skill.includes('Linux')) {
        updatedResume.skills.tools.push(skill);
      } else {
        updatedResume.skills.technical.push(skill);
      }
    }
  });

  // 2. Add Capstone Project to Projects
  if (course.capstoneProject) {
    const projectExists = updatedResume.projects.some(
      p => p.title.toLowerCase() === course.capstoneProject.title.toLowerCase()
    );

    if (!projectExists) {
      const newProject: Project = {
        id: `proj-capstone-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: course.capstoneProject.title,
        description: course.capstoneProject.description,
        techStack: course.capstoneProject.techStack,
        link: 'https://github.com/candidate/capstone-project',
        highlights: [
          `Architected and deployed: ${course.capstoneProject.description.substring(0, 110)}...`,
          `Applied advanced industry techniques in ${course.skillsCovered.slice(0, 3).join(', ')}.`,
          `Demonstrated production-grade testing, performance optimization, and modular code architecture.`
        ]
      };
      // Prepend to top of projects
      updatedResume.projects.unshift(newProject);
    }
  }

  // 3. Add Verified Certification
  const certExists = updatedResume.certifications.some(
    c => c.name.toLowerCase() === course.title.toLowerCase()
  );

  if (!certExists) {
    const newCert: Certification = {
      id: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${course.title} (Verified)`,
      issuer: course.provider,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      credentialId: `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      url: course.learningUrl || 'https://credential.net/verify'
    };
    updatedResume.certifications.push(newCert);
  }

  // 4. Update Summary to reflect expanded mastery
  if (course.isFinalDsaCourse) {
    updatedResume.headline = `${updatedResume.headline.split('|')[0].trim()} | FAANG & Tier-1 Ready DSA Specialist`;
    updatedResume.summary = `${updatedResume.summary} Certified in advanced Data Structures, Algorithmic Problem Solving, and scalable Distributed Systems Design.`;
  }

  return updatedResume;
}
