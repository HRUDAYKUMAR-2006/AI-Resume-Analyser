import { DevelopmentPath, Course } from '../types';

export const dsaCapstoneCourse: Course = {
  id: 'course-dsa-final',
  title: 'Ultimate Data Structures, Algorithms & System Design Capstone',
  provider: 'MIT & Stanford Open Technical Mastery',
  providerBadge: '⭐ Tier-1 Capstone ⭐',
  duration: '8 Weeks (Self-paced, 60+ Hours)',
  difficulty: 'Mastery',
  atsScoreBoost: 20,
  marketValueScore: 9.9,
  estimatedSalaryImpact: '+$35,000 / ₹18-30 LPA Upside',
  isFinalDsaCourse: true,
  description: 'The definitive algorithmic problem-solving and technical interview capstone required by all top-tier tech firms (FAANG, Unicorns & Global Leaders). Covers advanced graph theory, dynamic programming, tree traversals, concurrency, and high-scale system design.',
  syllabus: [
    'Time & Space Complexity (Amortized Analysis & Big-O)',
    'Advanced Linear Data Structures & Custom Allocators',
    'Trees, Tries, Heaps, AVL & Red-Black Balancing',
    'Graphs (BFS, DFS, Dijkstra, Bellman-Ford, TopoSort, Tarjan)',
    'Dynamic Programming Patterns (Knapsack, LCS, Matrix Exponentiation)',
    'System Design Foundations: Sharding, Caching, Event-driven Messaging',
    '150+ Curated LeetCode Medium/Hard Patterns & Mock FAANG Interviews'
  ],
  skillsCovered: [
    'Data Structures & Algorithms (DSA)',
    'Dynamic Programming',
    'Graph Algorithms',
    'System Design & Micro-benchmarking',
    'Time/Space Complexity Optimization',
    'Technical Coding Interview Mastery'
  ],
  capstoneProject: {
    title: 'Distributed In-Memory Key-Value Cache with Algorithmic LRU/LFU Eviction',
    description: 'Designed and implemented a thread-safe, high-concurrency distributed caching engine using custom red-black trees, skip lists, and Bloom filters capable of 500,000+ ops/sec with consistent hashing.',
    techStack: ['Data Structures', 'Algorithms', 'High Concurrency', 'System Design', 'C++/Go/TypeScript']
  },
  status: 'locked',
  learningUrl: 'https://leetcode.com/explore/'
};

export const DEVELOPMENT_PATHS: DevelopmentPath[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Engineering',
    category: 'Web & Distributed Systems',
    tagline: 'Modern React 19, TypeScript, Node.js, Next.js & Cloud-Native APIs',
    badge: '🔥 Highest Total Volume',
    color: 'from-blue-600 via-indigo-600 to-violet-700',
    description: 'Master full-lifecycle web engineering from pixel-perfect responsive user interfaces to high-throughput backend APIs, microservices, and database clustering.',
    marketDemand: 'Ultra High',
    avgSalary: '$125,000 / ₹14-26 LPA',
    openPositions: '142,000+ openings globally',
    iconName: 'Globe',
    targetSkills: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
      'PostgreSQL', 'Prisma / TypeORM', 'Redis', 'Docker',
      'REST & GraphQL APIs', 'Tailwind CSS', 'CI/CD Pipelines'
    ],
    courses: [
      {
        id: 'fs-c1',
        title: 'Modern Frontend Architecture with React 19 & TypeScript',
        provider: 'Meta & OpenJS Foundation',
        providerBadge: 'Industry Standard',
        duration: '4 Weeks (24 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 12,
        marketValueScore: 9.6,
        estimatedSalaryImpact: '+$14,000 / ₹4-7 LPA',
        description: 'Deep dive into server components, React Suspense, advanced custom hooks, state stores (Zustand), and production-grade TypeScript enterprise patterns.',
        syllabus: [
          'React 19 Server Components & Actions',
          'Enterprise TypeScript Types & Generics',
          'Modern State Management with Zustand & TanStack Query',
          'Component Performance Profiling & Web Vitals'
        ],
        skillsCovered: ['React 19', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
        capstoneProject: {
          title: 'High-Performance Real-Time Collaborative Workspace',
          description: 'Built a real-time collaborative document platform featuring optimistic UI updates, conflict resolution, and sub-100ms response times.',
          techStack: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS']
        },
        status: 'available',
        learningUrl: 'https://react.dev'
      },
      {
        id: 'fs-c2',
        title: 'Backend Scalability with Node.js, Express & PostgreSQL',
        provider: 'Node.js Consortium',
        providerBadge: 'Enterprise Core',
        duration: '5 Weeks (30 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 14,
        marketValueScore: 9.5,
        estimatedSalaryImpact: '+$18,000 / ₹5-9 LPA',
        description: 'Build enterprise-grade REST and GraphQL backends with relational database indexing, connection pooling, Redis caching, and robust JWT/OAuth2 authentication.',
        syllabus: [
          'Node.js Event Loop & Non-Blocking I/O Architecture',
          'PostgreSQL Schema Design, Indexing & Query Optimization',
          'Redis In-Memory Caching & Distributed Rate Limiting',
          'Secure Authentication: OAuth2, Refresh Tokens & RBAC'
        ],
        skillsCovered: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST APIs', 'JWT Security'],
        capstoneProject: {
          title: 'Multi-Tenant SaaS API Gateway with Redis Rate Limiting',
          description: 'Architected a resilient API gateway handling authenticated requests, tenant isolation, dynamic caching, and automated request throttling.',
          techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker']
        },
        status: 'available',
        learningUrl: 'https://nodejs.org'
      },
      {
        id: 'fs-c3',
        title: 'Cloud Native Microservices, Docker & CI/CD Deployment',
        provider: 'Linux Foundation & Cloud Native Computing Foundation',
        providerBadge: 'High ROI',
        duration: '4 Weeks (25 Hours)',
        difficulty: 'Advanced',
        atsScoreBoost: 15,
        marketValueScore: 9.7,
        estimatedSalaryImpact: '+$22,000 / ₹7-12 LPA',
        description: 'Containerize multi-service applications with Docker, orchestrate deployments with automated GitHub Actions CI/CD pipelines, and implement telemetry monitoring.',
        syllabus: [
          'Multi-stage Dockerfile Optimization & Minimal Distroless Containers',
          'Docker Compose Multi-Container Orchestration',
          'Automated CI/CD Pipeline Automation with GitHub Actions',
          'Application Monitoring, Structured Logging & Health Probes'
        ],
        skillsCovered: ['Docker', 'Docker Compose', 'CI/CD Pipelines', 'GitHub Actions', 'Cloud Deployment'],
        capstoneProject: {
          title: 'End-to-End Automated Cloud Deployment Pipeline',
          description: 'Automated zero-downtime blue/green deployment workflow with integrated automated test suites, linting gates, and Docker container registry.',
          techStack: ['Docker', 'GitHub Actions', 'Nginx', 'AWS/GCP Cloud']
        },
        status: 'available',
        learningUrl: 'https://www.docker.com'
      }
    ],
    finalCourse: dsaCapstoneCourse
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'AI, LLMs & Neural Networks',
    tagline: 'PyTorch, Hugging Face, LLMs, RAG Pipelines & Autonomous Agents',
    badge: '🚀 Most In-Demand',
    color: 'from-purple-600 via-pink-600 to-rose-700',
    description: 'Transition into the frontier of artificial intelligence, mastering deep learning, foundation models, vector embeddings, retrieval augmented generation, and agentic workflows.',
    marketDemand: 'Ultra High',
    avgSalary: '$148,000 / ₹18-35 LPA',
    openPositions: '98,000+ openings globally',
    iconName: 'Cpu',
    targetSkills: [
      'Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn',
      'Hugging Face', 'Vector Databases (Chroma/Pinecone)',
      'LangChain / LlamaIndex', 'RAG Architecture', 'Model Fine-Tuning'
    ],
    courses: [
      {
        id: 'ai-c1',
        title: 'Applied Machine Learning & Statistical Mathematics with Python',
        provider: 'DeepLearning.AI',
        providerBadge: 'Foundational',
        duration: '4 Weeks (25 Hours)',
        difficulty: 'Beginner',
        atsScoreBoost: 12,
        marketValueScore: 9.4,
        estimatedSalaryImpact: '+$16,000 / ₹5-8 LPA',
        description: 'Master supervised and unsupervised learning, linear algebra, calculus, feature engineering, and predictive modeling using Scikit-Learn.',
        syllabus: [
          'Mathematical Foundations: Linear Algebra & Matrix Decompositions',
          'Supervised Learning: Gradient Boosting, Random Forests, SVMs',
          'Feature Engineering, Imputation & PCA Dimensionality Reduction',
          'Model Evaluation: ROC-AUC, Cross-Validation & Hyperparameter Tuning'
        ],
        skillsCovered: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Statistical Analysis'],
        capstoneProject: {
          title: 'Predictive Churn & Market Risk Analytics Engine',
          description: 'Engineered an end-to-end ML classification pipeline predicting user churn with 93.4% ROC-AUC score, complete with explainability via SHAP values.',
          techStack: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib']
        },
        status: 'available',
        learningUrl: 'https://www.deeplearning.ai'
      },
      {
        id: 'ai-c2',
        title: 'Deep Learning & Neural Network Architectures with PyTorch',
        provider: 'Stanford Online',
        providerBadge: 'Deep Tech',
        duration: '6 Weeks (35 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 16,
        marketValueScore: 9.8,
        estimatedSalaryImpact: '+$24,000 / ₹8-14 LPA',
        description: 'Construct convolutional networks (CNNs), sequence models, and Transformer architectures from scratch using PyTorch with GPU tensor acceleration.',
        syllabus: [
          'Backpropagation, Autograd & Custom PyTorch Modules',
          'Convolutional Networks (ResNet, EfficientNet) & Transfer Learning',
          'Attention Mechanisms & The Transformer Architecture from Scratch',
          'GPU Acceleration, Mixed Precision & PyTorch Lightning'
        ],
        skillsCovered: ['PyTorch', 'Deep Learning', 'Transformers', 'Computer Vision', 'CUDA Acceleration'],
        capstoneProject: {
          title: 'Multi-Modal Vision Transformer for Medical Imaging',
          description: 'Trained a fine-tuned vision transformer on distributed GPUs, improving diagnostic accuracy by 18% over conventional convolutional baselines.',
          techStack: ['PyTorch', 'TorchVision', 'CUDA', 'WandB']
        },
        status: 'available',
        learningUrl: 'https://pytorch.org'
      },
      {
        id: 'ai-c3',
        title: 'Generative AI, Large Language Models & Production RAG Pipelines',
        provider: 'OpenAI & LangChain Academy',
        providerBadge: 'Breakthrough Skill',
        duration: '5 Weeks (30 Hours)',
        difficulty: 'Advanced',
        atsScoreBoost: 18,
        marketValueScore: 9.9,
        estimatedSalaryImpact: '+$32,000 / ₹12-20 LPA',
        description: 'Build enterprise-grade generative AI applications utilizing retrieval-augmented generation (RAG), semantic vector databases, and multi-agent coordination frameworks.',
        syllabus: [
          'LLM Fine-Tuning (LoRA, QLoRA) & Parameter Efficient Adaptation',
          'Dense & Sparse Vector Retrieval, Hybrid Search, Reciprocal Rank Fusion',
          'LangChain & LlamaIndex Agentic Routing and Tool Calling',
          'Hallucination Mitigation, Evaluation Benchmarks & LLMOps'
        ],
        skillsCovered: ['LLMs', 'RAG Pipelines', 'Vector Databases', 'LangChain', 'Prompt Engineering'],
        capstoneProject: {
          title: 'Autonomous Enterprise Knowledge Copilot with Hybrid RAG',
          description: 'Developed an autonomous enterprise assistant ingesting 100,000+ documents with hybrid vector search, citation verification, and re-ranking.',
          techStack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI/Gemini API']
        },
        status: 'available',
        learningUrl: 'https://langchain.com'
      }
    ],
    finalCourse: dsaCapstoneCourse
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps Engineering',
    category: 'Cloud, Infrastructure & SRE',
    tagline: 'AWS, Kubernetes, Terraform, GitOps & Production Resilience',
    badge: '⚡ High Stability & Compensation',
    color: 'from-amber-600 via-orange-600 to-red-700',
    description: 'Design highly available, self-healing cloud infrastructure. Automate deployment workflows using Infrastructure as Code (IaC) and Kubernetes orchestration.',
    marketDemand: 'Very High',
    avgSalary: '$135,000 / ₹16-28 LPA',
    openPositions: '84,000+ openings globally',
    iconName: 'Cloud',
    targetSkills: [
      'AWS / GCP', 'Kubernetes', 'Docker', 'Terraform',
      'Ansible', 'Prometheus & Grafana', 'CI/CD Pipelines', 'Linux Systems'
    ],
    courses: [
      {
        id: 'dev-c1',
        title: 'Linux Systems Engineering & Networking Mastery',
        provider: 'Red Hat Enterprise Academy',
        providerBadge: 'Foundational',
        duration: '3 Weeks (18 Hours)',
        difficulty: 'Beginner',
        atsScoreBoost: 10,
        marketValueScore: 9.1,
        estimatedSalaryImpact: '+$12,000 / ₹3-6 LPA',
        description: 'Deep dive into Linux kernel parameters, systemd, process isolation, TCP/IP networking, SSH tunneling, and shell scripting automation.',
        syllabus: [
          'Linux Kernel Internals, Process Trees & Namespaces',
          'Advanced Bash Scripting & System Automation',
          'TCP/IP, DNS, Subnetting, Firewalls & Network Diagnostics',
          'Storage Volumes, LVM & File System Permissions'
        ],
        skillsCovered: ['Linux', 'Bash Automation', 'TCP/IP', 'Networking', 'Security Hardening'],
        capstoneProject: {
          title: 'Automated Linux Server Hardening & Audit Script',
          description: 'Created a production hardening automation script securing SSH, firewall rules, user privilege escalation, and real-time audit logging.',
          techStack: ['Linux', 'Bash', 'IPTables', 'Auditd']
        },
        status: 'available',
        learningUrl: 'https://www.redhat.com'
      },
      {
        id: 'dev-c2',
        title: 'Kubernetes in Production: Orchestration & Service Mesh',
        provider: 'Cloud Native Computing Foundation (CNCF)',
        providerBadge: 'Premier Credential',
        duration: '6 Weeks (36 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 16,
        marketValueScore: 9.8,
        estimatedSalaryImpact: '+$24,000 / ₹8-15 LPA',
        description: 'Deploy, scale, and troubleshoot containerized workloads with Kubernetes, Helm charts, Ingress controllers, and Istio service mesh.',
        syllabus: [
          'Pods, Deployments, StatefulSets & DaemonSets Architecture',
          'Cluster Networking: CNI Plugins, CoreDNS & Ingress-NGINX',
          'Storage Classes, Persistent Volumes & Dynamic Provisioning',
          'Helm Package Management & Istio Service Mesh Traffic Shifting'
        ],
        skillsCovered: ['Kubernetes', 'Helm', 'Ingress', 'Service Mesh', 'Container Orchestration'],
        capstoneProject: {
          title: 'Multi-Cluster Kubernetes Deployment with Helm & Istio',
          description: 'Constructed an auto-scaling multi-zone Kubernetes cluster with canary deployment routing, mutual TLS security, and automated disaster failover.',
          techStack: ['Kubernetes', 'Helm', 'Istio', 'Docker']
        },
        status: 'available',
        learningUrl: 'https://kubernetes.io'
      },
      {
        id: 'dev-c3',
        title: 'Infrastructure as Code with Terraform & AWS Solutions',
        provider: 'HashiCorp & AWS Partner Network',
        providerBadge: 'Enterprise Cloud',
        duration: '5 Weeks (28 Hours)',
        difficulty: 'Advanced',
        atsScoreBoost: 16,
        marketValueScore: 9.7,
        estimatedSalaryImpact: '+$26,000 / ₹9-16 LPA',
        description: 'Provision immutable cloud infrastructure on AWS using Terraform HCL, modular state management, VPC peering, and automated GitOps workflows.',
        syllabus: [
          'Terraform Modules, State Locking with S3 & DynamoDB',
          'AWS VPC Design: Public/Private Subnets, NAT Gateways & Route Tables',
          'Auto-Scaling EC2, ECS Fargate & Serverless Lambda Infrastructure',
          'GitOps with ArgoCD & Automated IaC Testing with Terratest'
        ],
        skillsCovered: ['Terraform', 'AWS', 'Infrastructure as Code', 'ArgoCD', 'GitOps'],
        capstoneProject: {
          title: 'Terraform-Automated Enterprise AWS VPC & Microservices Stack',
          description: 'Engineered a multi-environment AWS infrastructure codebase deploying redundant subnets, application load balancers, and RDS Aurora clusters.',
          techStack: ['Terraform', 'AWS VPC', 'AWS ECS', 'ArgoCD']
        },
        status: 'available',
        learningUrl: 'https://www.terraform.io'
      }
    ],
    finalCourse: dsaCapstoneCourse
  },
  {
    id: 'data-science',
    title: 'Data Science & Big Data Analytics',
    category: 'Data Engineering & Analytics',
    tagline: 'SQL, Python, PySpark, Data Warehousing & Predictive Analytics',
    badge: '📊 High Business Value',
    color: 'from-emerald-600 via-teal-600 to-cyan-700',
    description: 'Transform raw data into strategic intelligence. Master big data distributed computing, ETL pipeline construction, statistical analysis, and interactive dashboarding.',
    marketDemand: 'Very High',
    avgSalary: '$128,000 / ₹13-24 LPA',
    openPositions: '79,000+ openings globally',
    iconName: 'BarChart3',
    targetSkills: [
      'SQL', 'Python', 'Pandas / Polars', 'PySpark',
      'Snowflake / BigQuery', 'Apache Airflow', 'Tableau / PowerBI', 'Statistical Inference'
    ],
    courses: [
      {
        id: 'ds-c1',
        title: 'Advanced SQL & Modern Data Warehousing (BigQuery & Snowflake)',
        provider: 'Google Cloud Training',
        providerBadge: 'Enterprise Core',
        duration: '4 Weeks (20 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 13,
        marketValueScore: 9.4,
        estimatedSalaryImpact: '+$15,000 / ₹4-8 LPA',
        description: 'Master analytical window functions, common table expressions (CTEs), partitioning strategies, and star-schema dimensional modeling.',
        syllabus: [
          'Complex SQL Window Functions & Recursive CTEs',
          'Dimensional Modeling: Fact & Dimension Tables, Slowly Changing Dimensions',
          'Cloud Warehousing Optimization: Clustering, Partitioning & Cost Tuning',
          'dbt (data build tool) for Automated Transformation & Testing'
        ],
        skillsCovered: ['SQL', 'Snowflake', 'BigQuery', 'dbt', 'Data Modeling'],
        capstoneProject: {
          title: 'E-Commerce Analytics Warehouse with dbt & Snowflake',
          description: 'Modeled millions of daily transactional records into optimized dimensional marts, reducing analytical query execution times by 65%.',
          techStack: ['SQL', 'Snowflake', 'dbt', 'Data Modeling']
        },
        status: 'available',
        learningUrl: 'https://cloud.google.com/bigquery'
      },
      {
        id: 'ds-c2',
        title: 'Distributed Big Data Processing with PySpark & Apache Airflow',
        provider: 'Databricks Academy',
        providerBadge: 'High Scale',
        duration: '5 Weeks (32 Hours)',
        difficulty: 'Advanced',
        atsScoreBoost: 16,
        marketValueScore: 9.7,
        estimatedSalaryImpact: '+$25,000 / ₹8-15 LPA',
        description: 'Architect distributed data processing pipelines processing terabytes of data using Spark DataFrames, RDD operations, and DAG scheduling with Airflow.',
        syllabus: [
          'Apache Spark Architecture: Master, Executors & Catalyst Optimizer',
          'PySpark Transformations, Actions, Windowing & Performance Tuning',
          'Building Resilient Workflow DAGs with Apache Airflow',
          'Lakehouse Architecture with Delta Lake & Parquet Files'
        ],
        skillsCovered: ['PySpark', 'Apache Airflow', 'Big Data', 'Delta Lake', 'ETL Pipelines'],
        capstoneProject: {
          title: 'Real-Time Streaming Big Data ETL Pipeline',
          description: 'Orchestrated an end-to-end distributed ETL pipeline ingesting high-volume clickstream logs with automated anomaly alerts and Parquet archiving.',
          techStack: ['PySpark', 'Apache Airflow', 'Delta Lake', 'Python']
        },
        status: 'available',
        learningUrl: 'https://spark.apache.org'
      }
    ],
    finalCourse: dsaCapstoneCourse
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Security & Penetration Testing',
    tagline: 'OWASP Top 10, Network Penetration, SIEM & DevSecOps Defenses',
    badge: '🛡️ Critical National Need',
    color: 'from-rose-600 via-red-600 to-neutral-900',
    description: 'Defend organizations from sophisticated threat actors. Specialize in offensive security auditing, defensive blue-teaming, SIEM log analysis, and application vulnerability remediation.',
    marketDemand: 'Ultra High',
    avgSalary: '$138,000 / ₹15-28 LPA',
    openPositions: '65,000+ openings globally',
    iconName: 'ShieldCheck',
    targetSkills: [
      'Ethical Hacking', 'OWASP Top 10', 'Wireshark / Nmap',
      'Burp Suite', 'Linux Hardening', 'SIEM / Splunk', 'DevSecOps', 'Cryptography'
    ],
    courses: [
      {
        id: 'sec-c1',
        title: 'Practical Web Application Penetration Testing & OWASP',
        provider: 'Offensive Security & PortSwigger',
        providerBadge: 'Offensive Expert',
        duration: '5 Weeks (30 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 15,
        marketValueScore: 9.6,
        estimatedSalaryImpact: '+$22,000 / ₹7-13 LPA',
        description: 'Identify and exploit modern web application vulnerabilities including SQL injection, cross-site scripting (XSS), SSRF, and authentication bypasses with Burp Suite.',
        syllabus: [
          'Burp Suite Pro Workflows, Interception & Intruder Custom Payloads',
          'OWASP Top 10 Vulnerabilities: Deep Exploitation & Remediation',
          'Server-Side Request Forgery (SSRF) & Insecure Deserialization',
          'API Security Testing: GraphQL, JWT & Broken Object Level Authorization (BOLA)'
        ],
        skillsCovered: ['Penetration Testing', 'Burp Suite', 'OWASP', 'Vulnerability Assessment', 'API Security'],
        capstoneProject: {
          title: 'Comprehensive Web Application Vulnerability Audit & Patch Report',
          description: 'Audited an enterprise banking demo application, uncovering 12 vulnerabilities and delivering automated regression exploit scripts and mitigation patches.',
          techStack: ['Burp Suite', 'OWASP ZAP', 'Python Exploit Scripting']
        },
        status: 'available',
        learningUrl: 'https://portswigger.net/web-security'
      },
      {
        id: 'sec-c2',
        title: 'SOC Operations, Threat Hunting & Incident Response with SIEM',
        provider: 'SANS Institute & Splunk Academy',
        providerBadge: 'Defensive Defense',
        duration: '5 Weeks (28 Hours)',
        difficulty: 'Advanced',
        atsScoreBoost: 16,
        marketValueScore: 9.7,
        estimatedSalaryImpact: '+$26,000 / ₹8-16 LPA',
        description: 'Detect adversary techniques mapped to the MITRE ATT&CK framework, construct SIEM correlation rules, and conduct forensic incident response.',
        syllabus: [
          'MITRE ATT&CK Framework Mapping & Threat Modeling',
          'Splunk Search Processing Language (SPL) & Correlation Searches',
          'Endpoint Detection & Response (EDR) Telemetry Analysis',
          'Automated Incident Response Playbooks & Forensic Memory Analysis'
        ],
        skillsCovered: ['SIEM', 'Splunk', 'Threat Hunting', 'Incident Response', 'MITRE ATT&CK'],
        capstoneProject: {
          title: 'Enterprise SIEM Threat Detection & Ransomware Defense Playbook',
          description: 'Constructed custom correlation rules in Splunk detecting lateral movement and automated containment triggers via webhook orchestration.',
          techStack: ['Splunk', 'Wireshark', 'Sysmon', 'Python']
        },
        status: 'available',
        learningUrl: 'https://www.splunk.com'
      }
    ],
    finalCourse: dsaCapstoneCourse
  },
  {
    id: 'mobile-dev',
    title: 'Cross-Platform Mobile Engineering',
    category: 'Mobile & Device Native',
    tagline: 'React Native, Flutter, Offline-First Architecture & App Store Delivery',
    badge: '📱 6+ Billion Device Reach',
    color: 'from-cyan-600 via-sky-600 to-indigo-700',
    description: 'Ship fluid, native-feeling mobile applications for iOS and Android. Master state management, native device hardware bridging, and seamless app store releases.',
    marketDemand: 'High',
    avgSalary: '$122,000 / ₹12-22 LPA',
    openPositions: '54,000+ openings globally',
    iconName: 'Smartphone',
    targetSkills: [
      'React Native', 'Flutter', 'TypeScript', 'Redux Toolkit',
      'Offline Storage (SQLite/MMKV)', 'Push Notifications', 'App Store / Play Store Release'
    ],
    courses: [
      {
        id: 'mob-c1',
        title: 'Production React Native & Expo Architecture',
        provider: 'Meta & Expo Core Team',
        providerBadge: 'Industry Standard',
        duration: '4 Weeks (24 Hours)',
        difficulty: 'Intermediate',
        atsScoreBoost: 14,
        marketValueScore: 9.5,
        estimatedSalaryImpact: '+$18,000 / ₹5-9 LPA',
        description: 'Build 60fps native mobile apps with React Native, Reanimated 3, gesture handler, native modules, and Expo Application Services (EAS).',
        syllabus: [
          'React Native Architecture (New Architecture / Fabric & TurboModules)',
          'Complex Gestures & 60fps Animations with Reanimated',
          'Offline-First Data Sync with WatermelonDB / SQLite',
          'EAS Build, Over-The-Air (OTA) Updates & App Store Submission'
        ],
        skillsCovered: ['React Native', 'Expo', 'Reanimated', 'Mobile Architecture', 'TypeScript'],
        capstoneProject: {
          title: 'Offline-First Fitness & Nutrition Mobile Application',
          description: 'Built a 60fps smooth cross-platform mobile application with background biometric sensor sync, interactive charts, and offline SQLite cache.',
          techStack: ['React Native', 'Expo', 'Reanimated', 'SQLite']
        },
        status: 'available',
        learningUrl: 'https://reactnative.dev'
      }
    ],
    finalCourse: dsaCapstoneCourse
  }
];
