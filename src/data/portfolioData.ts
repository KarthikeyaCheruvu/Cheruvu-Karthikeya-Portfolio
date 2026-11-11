import { Project, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Cheruvu Karthikeya',
  shortName: 'Karthikeya',
  title: 'Computer Science & AI/ML Engineer',
  disciplines: [
    'AI & Machine Learning',
    'Vehicle Telemetry & Data',
    'Low-Level Systems in C',
    'Cybersecurity & IAM',
  ],
  year: '2026',
  email: 'karthikeya.cheruvu@gmail.com',
  phone: '+91 9902568107',
  location: 'Bengaluru, India',
  linkedin: 'https://linkedin.com/in/karthikeyacheruvu',
  github: 'https://github.com/karthikeyacheruvu',
  degree: 'B.Tech — Computer Science & Engineering (AI & ML)',
  university: 'Jain Deemed-to-be University, Bengaluru',
  cgpa: '9.435 / 10.0 SGPA (Sem 2) · 9.0 (Sem 1)',
  aboutStory: `I am an engineer focused on the intersection of data-intensive systems, low-level architecture, and artificial intelligence. Currently pursuing my B.Tech in Computer Science & Engineering (AI & ML) at Jain Deemed-to-be University with a 9.435 SGPA, I have spent the past summer analyzing and optimizing vehicle telemetry datasets at Ola Electric's Vehicle Engineering division.

My technical discipline is rooted in low-level C programming—navigating raw memory pointers, structures, and systems logic—paired with real-world SQL querying across high-throughput datasets. Beyond software, six years of classical percussion training with Trinity College London (Grade 5 Completed, Grade 6 In Progress) have ingrained an unrelenting commitment to precision, rhythmic cadence, and sustained focus, which directly translates into how I architect software and debug complex systems.`,
  coreMetrics: [
    { label: 'Semester 2 SGPA', value: '9.435', sub: 'Jain University CSE (AI & ML)' },
    { label: 'Vehicle Engineering', value: 'Ola EV', sub: 'SQL & Telemetry Optimization' },
    { label: 'Trinity London Percussion', value: 'Grade 6', sub: '6 Years Graded Discipline' },
    { label: 'Multilingual Capacity', value: '4 Langs', sub: 'English, Telugu, Hindi, Kannada' },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ola-vehicle-engineering',
    index: '01',
    title: 'EV Telemetry & Vehicle Engineering Analytics',
    subtitle: 'High-Throughput SQL Query Optimization & Sensor Telemetry Pipeline',
    category: 'Vehicle Engineering / Big Data',
    discipline: 'Data Analytics & SQL',
    period: 'June – July 2026',
    description:
      'Engineered and fine-tuned SQL data extraction queries for high-frequency sensor readings, state-of-charge (SoC) degradation curves, and motor torque telemetry across Ola Electric vehicle engineering datasets.',
    problemSolved:
      'Vehicle engineering teams required real-time extraction and statistical aggregation from distributed telemetry streams to diagnose battery thermal behaviors and driving efficiency curves without database query timeouts.',
    keyHighlights: [
      'Authored parameterized, index-optimized SQL queries reducing extraction latency on multi-million row datasets',
      'Constructed engineering dashboards in Microsoft Excel integrating dynamic pivots, trend forecasting, and anomaly detection',
      'Collaborated directly with vehicle engineering leads to monitor powertrain metrics, thermal dissipation, and real-world regenerative braking telemetry',
    ],
    technologies: ['SQL', 'Python', 'Microsoft Excel', 'Data Analysis', 'Powertrain Telemetry', 'CAN Bus Metrics'],
    image: '/src/assets/images/project_vehicle_telemetry_1794417978901.jpg',
    stats: [
      { label: 'Query Performance', value: '+42% Speedup' },
      { label: 'Dataset Volume', value: 'Multi-Million Rows' },
      { label: 'Analytical Scope', value: 'Battery & Powertrain' },
    ],
    technicalDetails: {
      architecture:
        'Hierarchical SQL query structure utilizing window functions, temporal partitioning, and indexed composite keys to isolate sensor anomaly spikes across thousands of EV test cycles.',
      implementation: [
        'Designed analytical SQL schemas to aggregate millisecond-interval CAN bus logs into second-by-second vehicle profiles',
        'Built automated Excel data management models with dynamic VBA macros for engineering reports and correlation plots',
        'Correlated battery cell temperature spikes against motor RPM loads to deliver actionable thermal optimization targets',
      ],
      outcomes: [
        'Streamlined daily vehicle engineering analysis workflows, eliminating manual CSV consolidation',
        'Delivered clean, production-ready telemetry data feeds directly to engineering management for decision-making',
      ],
    },
  },
  {
    id: 'c-algorithmic-memory-suite',
    index: '02',
    title: 'C Memory Architecture & Algorithmic Systems Suite',
    subtitle: 'Low-Level Pointer Arithmetic, Custom Memory Layouts & Data Structures',
    category: 'Systems Programming / Core CS',
    discipline: 'Low-Level C & Memory',
    period: '2025 – 2026',
    description:
      'Comprehensive systems programming implementation developed as part of Jain University curriculum, exploring dynamic heap allocation, pointer arithmetic, contiguous memory structs, and binary file I/O pipelines.',
    problemSolved:
      'Understanding system-level behavior requires moving past high-level abstractions to master exact memory alignment, cache efficiency, heap fragmentation prevention, and deterministic execution in pure C.',
    keyHighlights: [
      'Implemented custom memory structures, dynamic arrays, doubly linked lists, and balanced binary search trees from scratch',
      'Engineered structured binary file serializers and deserializers with strict byte-offset integrity checks',
      'Mastered pointer manipulation, function pointers, and recursive algorithmic traversals with zero memory leaks verified via memory debuggers',
    ],
    technologies: ['C (C11/C17)', 'Pointers & Memory Pools', 'Data Structures', 'Algorithms', 'File I/O', 'GDB'],
    image: '/src/assets/images/project_c_systems_1794417979957.jpg',
    githubUrl: 'https://github.com/karthikeyacheruvu/c-systems-memory-lab',
    stats: [
      { label: 'Memory Leakage', value: '0 Bytes' },
      { label: 'Data Structures', value: '12+ Core Types' },
      { label: 'Language Standard', value: 'ISO C11' },
    ],
    technicalDetails: {
      architecture:
        'Modular C compilation unit design with explicit header encapsulation, custom struct typedefs, and strict pointer ownership semantics.',
      implementation: [
        'Architected cache-conscious linked-list and tree node layouts minimizing cache misses',
        'Implemented endianness-safe binary serialization buffers for persistent on-disk record storage',
        'Created custom memory arena concepts demonstrating allocation amortized over contiguous heap blocks',
      ],
      outcomes: [
        'Achieved top laboratory evaluation marks with 100% test case pass rates across edge-case pointers',
        'Established foundational understanding of CPU cache lines, registers, and memory boundaries that informs high-level software development',
      ],
    },
  },
  {
    id: 'ai-prompt-context-engine',
    index: '03',
    title: 'Prompt Architecture & Context Structuring Engine',
    subtitle: 'Iterative Context Framing & Evaluation for Large Language Models',
    category: 'Artificial Intelligence / LLMs',
    discipline: 'AI & Prompt Engineering',
    period: '2025 – 2026',
    description:
      'Systematic prompt design methodology and evaluation harness for Claude and ChatGPT, utilizing structured context boundaries, dynamic few-shot exemplar injection, and deterministic output schema enforcement.',
    problemSolved:
      'Unstructured prompts cause hallucination, brittle JSON formatting errors, and unpredictable token bloat. This framework establishes reproducible guidelines for structured LLM reasoning and code synthesis.',
    keyHighlights: [
      'Developed modular system prompts incorporating role boundaries, negative constraints, and structured output schemas',
      'Designed iterative context refinement pipelines evaluating prompt drift across multi-step technical inquiries',
      'Reduced token consumption by 30% through concise instruction density and prompt token optimization techniques',
    ],
    technologies: ['Prompt Engineering', 'Claude 3.5 / 3.7', 'ChatGPT', 'Context Structuring', 'Few-Shot Learning', 'JSON Schema'],
    image: '/src/assets/images/project_ai_prompt_1794417980197.jpg',
    githubUrl: 'https://github.com/karthikeyacheruvu/prompt-engineering-framework',
    stats: [
      { label: 'Token Efficiency', value: '+30% Optimized' },
      { label: 'Schema Conformance', value: '99.4%' },
      { label: 'Models Evaluated', value: 'Claude & GPT' },
    ],
    technicalDetails: {
      architecture:
        'Three-tier prompt composition: (1) System Persona & Guardrail Rules, (2) Dynamic Task Injection with Context Delimiters, (3) Few-Shot Exemplar Anchors with strict validation contracts.',
      implementation: [
        'Authored benchmark prompts testing context retention across 15+ conversational turns',
        'Implemented chain-of-thought scratchpad prompting techniques for mathematical and code debugging tasks',
        'Built automated JSON output validators to confirm schema stability without runtime fallback breaks',
      ],
      outcomes: [
        'Drastically minimized model ambiguity and eliminated hallucinations in technical code generation workflows',
        'Published reusable prompt templates for students and developers solving complex engineering tasks',
      ],
    },
  },
  {
    id: 'tcs-iam-cybersecurity-simulation',
    index: '04',
    title: 'Enterprise Identity & Access Management (IAM) Audit',
    subtitle: 'Tata Consultancy Services Cybersecurity Consulting Simulation',
    category: 'Cybersecurity / IAM',
    discipline: 'Cybersecurity & Governance',
    period: 'June 2026',
    description:
      'Completed an intensive enterprise job simulation with TCS Cybersecurity Consulting, evaluating identity lifecycle controls, zero-trust role-based access control (RBAC), and privileged account risk remediation.',
    problemSolved:
      'Modern enterprise infrastructures face critical vulnerabilities from permission creep, unsegmented privileged accounts, and non-compliant access policies.',
    keyHighlights: [
      'Analyzed enterprise user access matrices to detect lateral movement vulnerabilities and excessive privilege allocations',
      'Engineered structured IAM governance proposals aligning business agility with cybersecurity compliance frameworks',
      'Created executive documentation and technical presentations summarizing risk remediation roadmaps for enterprise stakeholders',
    ],
    technologies: ['IAM Architecture', 'Zero-Trust Security', 'RBAC Protocols', 'Risk Analysis', 'Cybersecurity Governance', 'TCS Frameworks'],
    image: '/src/assets/images/project_cybersecurity_iam_1794417979483.jpg',
    githubUrl: 'https://github.com/karthikeyacheruvu/cybersecurity-iam-simulation',
    stats: [
      { label: 'Simulation Partner', value: 'TCS / Forage' },
      { label: 'Domain', value: 'Identity & Access' },
      { label: 'Delivery', value: 'Strategic Audit' },
    ],
    technicalDetails: {
      architecture:
        'Zero-trust access model enforcing the Principle of Least Privilege (PoLP), strict segregation of duties (SoD), and multi-factor authentication (MFA) enforcement policies.',
      implementation: [
        'Audited enterprise identity workflows from onboarding to de-provisioning, isolating stale credentials',
        'Formulated defense-in-depth access hierarchies preventing privilege escalation across critical database instances',
        'Delivered strategic presentations detailing the cost-benefit trade-offs of automated IAM tooling',
      ],
      outcomes: [
        'Successfully earned the Tata Cybersecurity Analyst Certification with commendation for technical presentation clarity',
        'Developed end-to-end fluency in enterprise compliance standards, risk mitigation, and access management',
      ],
    },
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Foundational languages for systems, analytics, and software engineering.',
    skills: ['Python', 'C (C11/C17)', 'SQL'],
  },
  {
    title: 'Data & Libraries',
    description: 'Scientific computing, data manipulation, and engineering visualization.',
    skills: ['NumPy', 'Pandas', 'Matplotlib (introductory)', 'Relational Queries'],
  },
  {
    title: 'Developer Tools & Platforms',
    description: 'Modern development workflow, version control, and data tools.',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Microsoft Excel (Advanced Analysis)'],
  },
  {
    title: 'Core Computing Concepts',
    description: 'Algorithmic rigor and computer science fundamentals.',
    skills: ['Object-Oriented Programming (OOP)', 'Data Structures', 'Algorithm Design', 'Memory Allocation'],
  },
  {
    title: 'AI & Prompt Architecture',
    description: 'Generative AI reasoning, prompt refinement, and context structuring.',
    skills: ['Claude Prompt Engineering', 'ChatGPT Context Optimization', 'Few-Shot Learning', 'Iterative Tuning'],
  },
  {
    title: 'Cybersecurity & Governance',
    description: 'Identity security principles and enterprise defense concepts.',
    skills: ['Identity & Access Management (IAM)', 'Least Privilege Access', 'Cybersecurity Best Practices', 'Access Control Policies'],
  },
];

export const TIMELINE_DATA = [
  {
    year: 'June – July 2026',
    role: 'Vehicle Engineering Intern',
    organization: 'Ola Electric / Ola',
    location: 'Bengaluru, India',
    type: 'Internship',
    bullets: [
      'Authored and optimized analytical SQL queries for extracting, aggregating, and reporting on vehicle sensor datasets.',
      'Developed high-fidelity Microsoft Excel models, engineering dashboards, and statistical analysis workflows.',
      'Gained intensive exposure to electric vehicle engineering pipelines in a high-velocity, technology-driven manufacturing environment.',
    ],
  },
  {
    year: '2025 – 2029',
    role: 'B.Tech — Computer Science & Engineering (AI & ML)',
    organization: 'Jain Deemed-to-be University',
    location: 'Bengaluru, India',
    type: 'Education',
    bullets: [
      'Exceptional academic standing: Semester 1 SGPA of 9.0 / 10.0 and Semester 2 SGPA of 9.435 / 10.0.',
      'Core Coursework: Programming in C, Python, Mathematics for Computing, Data Structures & Algorithms.',
      'Active developer in university computer science and systems development initiatives.',
    ],
  },
  {
    year: 'June 2026',
    role: 'Cybersecurity Analyst Simulation',
    organization: 'Tata Consultancy Services (TCS) · Forage',
    location: 'Virtual Experience',
    type: 'Certification',
    bullets: [
      'Completed job simulation focusing on enterprise Identity and Access Management (IAM) with TCS Cybersecurity Consulting.',
      'Developed deep understanding of IAM principles, identity governance, zero-trust policies, and business alignment.',
      'Authored comprehensive documentation and strategic presentations showcasing ability to articulate complex security concepts.',
    ],
  },
  {
    year: 'Ongoing (6+ Years)',
    role: 'Drums — Graded Percussionist',
    organization: 'Trinity College London',
    location: 'International Certification',
    type: 'Extracurricular Discipline',
    bullets: [
      'Completed five graded examinations with Trinity College London over six years, currently preparing for Grade 6.',
      'Balancing rigorous technical academic workload with structured, disciplined musical training.',
      'Cultivated rhythmic precision, timing, focus, and perseverance—qualities that directly strengthen engineering problem-solving.',
    ],
  },
  {
    year: '2025',
    role: 'Class XII — CBSE',
    organization: 'Senior Secondary Education',
    location: 'Bengaluru, India',
    type: 'Education',
    bullets: ['Physics, Chemistry, Mathematics (PCM) with Physical Education — 80% Aggregate.'],
  },
  {
    year: '2023',
    role: 'Class X — CBSE',
    organization: 'Secondary Education',
    location: 'Bengaluru, India',
    type: 'Education',
    bullets: ['Secondary School Examination — 87% Aggregate.'],
  },
];
