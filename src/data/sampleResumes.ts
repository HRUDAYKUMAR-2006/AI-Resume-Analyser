import { ResumeData } from '../types';

export const SAMPLE_RESUMES: { id: string; label: string; role: string; score: number; resume: ResumeData }[] = [
  {
    id: 'fresher-cs',
    label: 'Rohan Sharma (Fresher Graduate)',
    role: 'Computer Science Fresher / Entry-Level',
    score: 54,
    resume: {
      personalInfo: {
        fullName: 'Rohan Sharma',
        email: 'rohan.sharma.fresher@example.com',
        phone: '+1 (555) 234-8901',
        location: 'San Jose, CA',
        portfolio: 'https://rohansharma.me',
        linkedin: 'https://linkedin.com/in/rohan-sharma-fresher',
        github: 'https://github.com/rohansharma-dev'
      },
      headline: 'Computer Science Fresher | Aspiring Software Engineer',
      summary: 'Energetic and self-motivated Computer Science fresh graduate (Class of 2024) with foundational knowledge of algorithms, object-oriented design, Java, Python, and modern web basics. Seeking an entry-level software engineering role to apply academic knowledge, learn industry-standard workflows, and contribute to production-grade applications.',
      skills: {
        technical: ['Python', 'Java', 'C++', 'JavaScript Basics', 'HTML5', 'CSS3', 'SQL Basics'],
        frameworks: ['Basic React', 'Flask Basics', 'Bootstrap'],
        tools: ['Git', 'GitHub', 'VS Code', 'MySQL Workbench', 'Postman Basics'],
        soft: ['Fast Learner', 'Problem Solving', 'Team Collaboration', 'Communication', 'Work Ethic']
      },
      experience: [
        {
          id: 'exp-fresher-1',
          role: 'Software Engineering Intern (Academic)',
          company: 'Campus Tech Innovations',
          location: 'San Jose, CA',
          startDate: 'Jan 2024',
          endDate: 'May 2024',
          current: false,
          highlights: [
            'Collaborated with a student development team to construct a campus event notification web portal using HTML, CSS, JavaScript, and Flask.',
            'Assisted in writing SQL queries to retrieve student registration details from a MySQL database.',
            'Conducted basic unit tests and documented API endpoints for 4 backend modules.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-fresher-1',
          degree: 'Bachelor of Science in Computer Science',
          institution: 'State University of California',
          location: 'San Jose, CA',
          graduationYear: '2024',
          gpa: '3.65 / 4.0'
        }
      ],
      projects: [
        {
          id: 'proj-fresher-1',
          title: 'Campus Food Delivery & Order Tracker',
          description: 'A beginner-friendly web application enabling students to browse campus dining menus and simulate order tracking.',
          techStack: ['JavaScript', 'HTML5', 'CSS3', 'Flask', 'SQLite'],
          link: 'https://github.com/rohansharma-dev/campus-eats',
          highlights: [
            'Designed responsive UI forms for menu browsing and user registration.',
            'Stored user order history in SQLite database with basic CRUD operations.'
          ]
        },
        {
          id: 'proj-fresher-2',
          title: 'Personal Portfolio & Tech Blog',
          description: 'A clean personal website showcasing academic coursework, projects, and programming notes.',
          techStack: ['HTML5', 'CSS3', 'JavaScript'],
          link: 'https://github.com/rohansharma-dev/portfolio',
          highlights: [
            'Built responsive layouts with mobile-first CSS media queries.',
            'Hosted on GitHub Pages with custom domain integration.'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert-fresher-1',
          name: 'Programming Foundations with Python',
          issuer: 'Coursera / University Academic',
          date: '2023'
        }
      ]
    }
  },
  {
    id: 'junior-web',
    label: 'Alex Rivera (Junior Web Developer)',
    role: 'Aspiring Full Stack Engineer',
    score: 62,
    resume: {
      personalInfo: {
        fullName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 349-8120',
        location: 'Austin, TX',
        portfolio: 'https://alexrivera.dev',
        linkedin: 'https://linkedin.com/in/alexrivera-dev',
        github: 'https://github.com/alexrivera'
      },
      headline: 'Junior Web Developer | Frontend & JavaScript Enthusiast',
      summary: 'Passionate and detail-oriented Junior Developer with 1.5 years of experience crafting interactive user interfaces using HTML, CSS, JavaScript, and basic React. Eager to broaden backend competencies, cloud architecture, and algorithmic skills to step into a Full Stack Engineering role.',
      skills: {
        technical: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Basic React', 'Git'],
        frameworks: ['React', 'Bootstrap', 'Basic Express'],
        tools: ['VS Code', 'GitHub', 'Figma', 'Postman'],
        soft: ['Communication', 'Team Collaboration', 'Problem Solving', 'Agile Mindset']
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Junior Frontend Developer',
          company: 'PixelCraft Digital Agency',
          location: 'Austin, TX',
          startDate: 'Jun 2023',
          endDate: 'Present',
          current: true,
          highlights: [
            'Built responsive landing pages and client microsites using modern HTML5, CSS3, and JavaScript.',
            'Collaborated with UI/UX designers to convert wireframes into functional web interfaces for 8+ commercial clients.',
            'Refactored legacy CSS into modular utility styles, reducing page load times by 14%.',
            'Participated in daily standups and weekly code reviews within an Agile scrum team.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University of Texas at Austin',
          location: 'Austin, TX',
          graduationYear: '2023',
          gpa: '3.6 / 4.0'
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'RecipeVault - Recipe Discovery Web App',
          description: 'A responsive single-page web application that lets users search culinary recipes and filter by dietary restrictions.',
          techStack: ['JavaScript', 'React', 'CSS Modules', 'Spoonacular API'],
          link: 'https://github.com/alexrivera/recipe-vault',
          highlights: [
            'Integrated external REST APIs with debounced search query handling.',
            'Implemented bookmarking stored in browser LocalStorage.'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Responsive Web Design Certification',
          issuer: 'freeCodeCamp',
          date: '2023'
        }
      ]
    }
  },
  {
    id: 'entry-data',
    label: 'Samantha Chen (Data Analyst Fresher)',
    role: 'Aspiring AI / Data Scientist',
    score: 64,
    resume: {
      personalInfo: {
        fullName: 'Samantha Chen',
        email: 'samantha.chen@example.com',
        phone: '+1 (555) 782-9901',
        location: 'Seattle, WA',
        portfolio: 'https://samanthachen-data.com',
        linkedin: 'https://linkedin.com/in/samanthachen',
        github: 'https://github.com/samanthachen'
      },
      headline: 'Data Analyst | Business Intelligence & SQL Specialist',
      summary: 'Analytical and results-driven graduate with hands-on experience querying relational databases, building Tableau dashboards, and performing statistical exploratory data analysis with Python. Seeking to transition into advanced Machine Learning, Predictive Modeling, and Big Data Engineering.',
      skills: {
        technical: ['SQL', 'Python (Pandas, NumPy)', 'Excel (VLOOKUP, Pivots)', 'Exploratory Data Analysis'],
        frameworks: ['Matplotlib', 'Seaborn', 'Basic Scikit-Learn'],
        tools: ['Tableau', 'Power BI', 'PostgreSQL', 'Jupyter Notebooks', 'Git'],
        soft: ['Data Storytelling', 'Stakeholder Communication', 'Analytical Thinking', 'Detail-Oriented']
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Junior Data Analyst Intern',
          company: 'Northwest Retail Group',
          location: 'Seattle, WA',
          startDate: 'Aug 2023',
          endDate: 'May 2024',
          current: false,
          highlights: [
            'Authored SQL queries across 1.2M rows of sales data to generate weekly executive revenue reports.',
            'Designed and maintained 4 interactive Tableau dashboards utilized daily by regional store managers.',
            'Conducted customer cohort analysis in Python to isolate seasonal purchasing behaviors.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science in Statistics & Informatics',
          institution: 'University of Washington',
          location: 'Seattle, WA',
          graduationYear: '2024',
          gpa: '3.7 / 4.0'
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Customer Churn Exploratory Analysis',
          description: 'Statistical analysis of telecommunications churn data to uncover churn correlation patterns.',
          techStack: ['Python', 'Pandas', 'Seaborn', 'Scikit-Learn'],
          highlights: [
            'Analyzed dataset of 7,000 customers with logistic regression baseline model yielding 79% accuracy.',
            'Generated feature importance charts isolating contract duration as the primary retention determinant.'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Google Data Analytics Professional Certificate',
          issuer: 'Google',
          date: '2023'
        }
      ]
    }
  }
];
