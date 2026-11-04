import { JobListing, ResumeData } from '../types';

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Full Stack Software Engineer',
    company: 'Stripe',
    logo: '💳',
    location: 'San Francisco, CA (Remote Friendly)',
    type: 'Remote',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$130,000 - $160,000 + Equity',
    postedDate: '2 days ago',
    pathId: 'fullstack',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'DSA'],
    matchScore: 68,
    overview: 'Join Stripe to build the next generation of financial infrastructure. You will work on user-facing payment checkout flows, resilient high-volume webhook endpoints, and microservice backends.',
    requirements: [
      'Strong proficiency in TypeScript, React, and modern CSS/Tailwind',
      'Solid experience architecting RESTful services with Node.js and SQL databases',
      'Familiarity with containerization (Docker) and CI/CD pipelines',
      'Strong foundation in Data Structures, Algorithms, and clean code principles'
    ],
    benefits: ['100% Healthcare Coverage', 'Unlimited PTO', '$3,000 Home Office Stipend', '401(k) 6% Match']
  },
  {
    id: 'job-2',
    title: 'Frontend / Full Stack Engineer',
    company: 'Linear',
    logo: '⚡',
    location: 'Remote (Global)',
    type: 'Remote',
    experienceLevel: 'Mid-Level',
    salary: '$140,000 - $175,000',
    postedDate: 'Just now',
    pathId: 'fullstack',
    tags: ['React 19', 'TypeScript', 'Zustand', 'WebSockets', 'DSA'],
    matchScore: 65,
    overview: 'Linear is building the operating system for modern software development. We obsess over 60fps responsiveness, keyboard-driven navigation, and instant local-first state synchronizations.',
    requirements: [
      'Deep mastery of React, TypeScript, and modern state architectures (Zustand/Jotai)',
      'Experience building ultra-responsive real-time apps with WebSockets and optimistic updates',
      'Deep algorithmic intuition for client-side tree traversals, search indexing, and cache eviction'
    ],
    benefits: ['Work from Anywhere', 'Yearly Team Retreats', 'Latest M3 Max MacBook Pro', 'Wellness Stipend']
  },
  {
    id: 'job-3',
    title: 'Junior Machine Learning / AI Engineer',
    company: 'Scale AI',
    logo: '🤖',
    location: 'San Francisco, CA / Hybrid',
    type: 'Hybrid',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$145,000 - $180,000',
    postedDate: '3 days ago',
    pathId: 'ai-ml',
    tags: ['Python', 'PyTorch', 'LLMs', 'RAG Pipelines', 'Vector Databases', 'DSA'],
    matchScore: 60,
    overview: 'Scale AI powers enterprise AI initiatives with data foundations and model evaluations. You will construct automated evaluation harnesses for leading frontier LLMs, fine-tuning pipelines, and RAG retrieval systems.',
    requirements: [
      'Hands-on experience with Python, PyTorch, and Hugging Face Transformers',
      'Understanding of RAG architectures, vector databases (Chroma/Pinecone), and prompt orchestration',
      'Rigorous foundation in algorithmic complexity, tensor operations, and matrix mathematics'
    ],
    benefits: ['Comprehensive Health & Dental', 'Onsite Chef & Catered Lunch', 'Equity Grants', 'Gym Membership']
  },
  {
    id: 'job-4',
    title: 'Generative AI Application Developer',
    company: 'Perplexity AI',
    logo: '🔮',
    location: 'San Francisco, CA / Remote',
    type: 'Remote',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$150,000 - $190,000',
    postedDate: '1 day ago',
    pathId: 'ai-ml',
    tags: ['Python', 'LangChain', 'TypeScript', 'RAG', 'Vector DB', 'DSA'],
    matchScore: 58,
    overview: 'Help redefine web discovery and conversational search. Develop fast retrieval augmented generation pipelines, ranking models, and intuitive user experiences.',
    requirements: [
      'Experience in Python and TypeScript building production LLM apps',
      'Proficiency with embedding models, rerankers, and vector indexing',
      'Exceptional algorithmic problem-solving abilities (DSA mastery)'
    ],
    benefits: ['Competitive Equity', 'Flexible Hours', 'Health, Vision & Dental', 'Education Allowance']
  },
  {
    id: 'job-5',
    title: 'Cloud & DevOps Infrastructure Engineer',
    company: 'Datadog',
    logo: '🐶',
    location: 'New York, NY / Remote',
    type: 'Remote',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$135,000 - $165,000',
    postedDate: '4 days ago',
    pathId: 'cloud-devops',
    tags: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'Linux', 'DSA'],
    matchScore: 62,
    overview: 'Support one of the world’s largest monitoring platforms processing trillions of daily metric datapoints. Maintain multi-region Kubernetes clusters, automated Terraform code, and CI/CD pipelines.',
    requirements: [
      'Strong hands-on experience with Linux administration, Docker, and Kubernetes',
      'Familiarity with Infrastructure as Code (Terraform) and AWS/GCP services',
      'Proficiency in Bash scripting and Python/Go automation',
      'Solid understanding of systems design, networking, and core algorithms'
    ],
    benefits: ['Stock Purchase Plan', 'Generous 401(k)', 'Mental Health Support', 'Learning Budget']
  },
  {
    id: 'job-6',
    title: 'Data Engineer / Analytics Specialist',
    company: 'Snowflake',
    logo: '❄️',
    location: 'Bellevue, WA / Remote',
    type: 'Hybrid',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$125,000 - $155,000',
    postedDate: '5 days ago',
    pathId: 'data-science',
    tags: ['SQL', 'Python', 'PySpark', 'Snowflake', 'Airflow', 'DSA'],
    matchScore: 64,
    overview: 'Architect data pipelines that ingest and process massive streaming data. Work closely with product and analytics teams to build dimensional data models and scalable ETL jobs.',
    requirements: [
      'Advanced SQL and Python programming capabilities',
      'Experience with distributed computing (PySpark/Spark) or modern cloud warehouses',
      'Understanding of dimensional modeling and Airflow orchestration',
      'Solid grasp of data structure optimizations and algorithmic efficiency'
    ],
    benefits: ['Employee Stock Purchase Plan', 'Generous Parental Leave', 'Home Office Stipend']
  },
  {
    id: 'job-7',
    title: 'Application Security Engineer',
    company: 'Cloudflare',
    logo: '🛡️',
    location: 'Austin, TX / Remote',
    type: 'Remote',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$135,000 - $170,000',
    postedDate: '3 days ago',
    pathId: 'cybersecurity',
    tags: ['OWASP', 'Penetration Testing', 'Burp Suite', 'Linux', 'Python', 'DSA'],
    matchScore: 61,
    overview: 'Protect the Internet infrastructure. Conduct vulnerability assessments, threat modeling, and assist software engineering teams in remediating complex vulnerabilities.',
    requirements: [
      'Demonstrated knowledge of OWASP Top 10 vulnerabilities and modern mitigation strategies',
      'Experience utilizing web security testing tools like Burp Suite and Nmap',
      'Strong scripting ability in Python/Bash and algorithmic analytical reasoning'
    ],
    benefits: ['Comprehensive Medical/Dental', '401k Matching', 'Catered Lunches & Travel Perks']
  },
  {
    id: 'job-8',
    title: 'React Native Mobile Developer',
    company: 'Duolingo',
    logo: '🦉',
    location: 'Pittsburgh, PA / Remote',
    type: 'Remote',
    experienceLevel: 'Junior / Mid-Level',
    salary: '$120,000 - $150,000',
    postedDate: '2 days ago',
    pathId: 'mobile-dev',
    tags: ['React Native', 'TypeScript', 'Expo', 'Reanimated', 'Mobile Architecture', 'DSA'],
    matchScore: 63,
    overview: 'Help make education free, fun, and accessible to everyone. Build joyful animations, offline-first study sessions, and high-performance cross-platform mobile features.',
    requirements: [
      'Proficiency in React Native and TypeScript',
      'Knowledge of state management and 60fps animations',
      'Solid grasp of data structures, algorithmic caching, and mobile memory constraints'
    ],
    benefits: ['Relocation Assistance', 'Language Learning Perk', 'Wellness Subsidy', 'Top Tier Health']
  }
];

export function calculateJobMatch(job: JobListing, resume: ResumeData): number {
  let score = 50;
  const allResumeSkills = [
    ...resume.skills.technical,
    ...resume.skills.frameworks,
    ...resume.skills.tools,
    ...resume.skills.soft
  ].map(s => s.toLowerCase());

  // Also check projects and experience text
  const fullText = JSON.stringify(resume).toLowerCase();

  let matchedTags = 0;
  job.tags.forEach(tag => {
    const t = tag.toLowerCase();
    const isMatched = allResumeSkills.some(s => s.includes(t) || t.includes(s)) || fullText.includes(t);
    if (isMatched) {
      matchedTags++;
    }
  });

  const tagRatio = job.tags.length > 0 ? (matchedTags / job.tags.length) : 0.5;
  score += Math.round(tagRatio * 42);

  // Bonus for certifications
  if (resume.certifications && resume.certifications.length > 0) {
    score += Math.min(8, resume.certifications.length * 3);
  }

  return Math.min(99, Math.max(35, score));
}
