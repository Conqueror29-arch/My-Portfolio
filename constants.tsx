
import { Project, BlogPost, Stat } from './types';
import { Code, Server, Terminal, Cpu, Database, Layout, Brain, BarChart3, Bot, Wrench, Cloud } from 'lucide-react';
import React from 'react';

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Works', path: '/works' },
];

export const HERO_STATS: Stat[] = [
  { label: 'CGPA', value: '8.3', plus: false },
  { label: 'Live Projects', value: '3', plus: true },
  { label: 'Certifications', value: '4', plus: false },
  { label: 'Tech Stack', value: '15', plus: true },
];

export const SKILLS = [
  { title: 'AI & ML', icon: <Brain className="w-6 h-6" />, desc: 'Building intelligent features with Gemini API, OpenAI, and ML workflows.' },
  { title: 'Frontend Dev', icon: <Layout className="w-6 h-6" />, desc: 'Modern UI with React 19, Next.js 15, Tailwind CSS, and Shadcn UI.' },
  { title: 'Backend Dev', icon: <Server className="w-6 h-6" />, desc: 'Robust APIs using Python, FastAPI, Node.js, and Express.' },
  { title: 'Databases', icon: <Database className="w-6 h-6" />, desc: 'Data management with MongoDB, NeonDB, Prisma, and Redis.' },
  { title: 'Cloud & DevOps', icon: <Cloud className="w-6 h-6" />, desc: 'Deployment on Vercel, Docker containerization, and cloud infrastructure.' },
  { title: 'Languages', icon: <Code className="w-6 h-6" />, desc: 'Proficient in Java, Python, JavaScript, and TypeScript.' },
];

export const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science (AI/ML)',
    institution: 'Galgotias College of Engineering and Technology',
    year: '2023 - 2027',
    description: 'Specializing in Artificial Intelligence and Machine Learning. Current CGPA: 8.3.'
  },
  {
    degree: 'Class XII (CBSE)',
    institution: 'Mahatma Hansraj Modern School, Jhansi',
    year: '2021 - 2022',
    description: 'Completed Higher Secondary Education with 70% aggregate.'
  },
  {
    degree: 'Class X (ICSE)',
    institution: 'St. Francis’ Convent Inter College, Jhansi',
    year: '2019 - 2020',
    description: 'Completed High School Education with 86% aggregate.'
  }
];

export const CERTIFICATIONS = [
  { 
    name: 'SnapAR Hands-on Augmented Reality Lens Creation',
    issuer: 'Arexa & Bharat XR',
    link: '#' 
  },
  { 
    name: 'Data Classification and Summarization Using IBM Granite',
    issuer: 'IBM SkillsBuild',
    link: '#' 
  },
  { 
    name: 'Introduction to Prompt Engineering with GitHub Copilot',
    issuer: 'Microsoft & Simplilearn',
    link: '#' 
  },
  { 
    name: 'Oracle Certified Foundations Associate AI Foundations',
    issuer: 'Oracle University',
    link: '#' 
  }
];

// Using abstract tech images for the projects
const PROJECT_IMAGES = {
    careerCoach: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    expense: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
    code: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-career-coach',
    title: 'AI Career Coach',
    category: 'Full Stack AI',
    year: '2024',
    image: PROJECT_IMAGES.careerCoach,
    description: 'A comprehensive platform offering personalized career guidance, resume analysis, and interview prep using Gemini API.',
    techStack: ['React 19', 'Next.js 15', 'Gemini API', 'NeonDB', 'Prisma', 'Clerk', 'Inngest', 'Shadcn UI'],
    challenge: 'In an increasingly competitive job market, students often struggle to identify gaps in their resumes or prepare effectively for interviews. Traditional career counseling is expensive and not always available on-demand.',
    solution: 'Built a full-stack AI Career Coach that acts as a 24/7 personal mentor. By leveraging Google\'s Gemini 1.5 Pro, the system extracts text from PDF resumes, scores them against job descriptions, and provides specific, actionable feedback. It also features a mock interview simulator.',
    modules: [
        { title: 'Resume Parsing Engine', desc: 'Utilizes PDF.js to extract raw text and Gemini API to structure data into experience, skills, and education blocks for analysis.' },
        { title: 'Mock Interview Simulator', desc: 'A stateful chat interface that maintains conversation context, asking progressive technical questions and grading responses.' },
        { title: 'Job Matching Algorithm', desc: 'Compares user skills vector with trending market requirements to suggest high-impact learning paths.' }
    ],
    outcome: 'Successfully deployed a prototype helping peer students improve their resume ATS scores. The mock interview feature reduced anxiety by providing a safe, private environment for practice.',
    liveUrl: '#',
    repoUrl: '#',
    keyFeatures: [
        'Personalized Career Guidance powered by Gemini.',
        'Modern UI with Tailwind + Shadcn.',
        'Secure Authentication via Clerk.',
        'Background job processing with Inngest.'
    ]
  },
  {
    id: 'ai-expense-tracker',
    title: 'AI Expense Tracker',
    category: 'FinTech AI',
    year: '2024',
    image: PROJECT_IMAGES.expense,
    description: 'An intelligent expense tracker that categorizes transactions and provides spending insights using Natural Language Processing.',
    techStack: ['Python', 'FastAPI', 'React.js', 'MongoDB', 'Gemini API', 'Node.js'],
    challenge: 'Manual expense tracking is tedious and prone to user abandonment. Standard apps require navigating multiple forms to log a single coffee purchase.',
    solution: 'Developed a "Talk-to-Track" system where users can input expenses via natural language text. The application uses an LLM to parse unstructured text into structured data (Amount, Category, Merchant) and stores it in MongoDB.',
    modules: [
        { title: 'NLP Transaction Parser', desc: 'A Python service utilizing Gemini API to identify intents and entities from free-text inputs, converting them to JSON.' },
        { title: 'Real-time Dashboard', desc: 'React.js frontend using Recharts to render live spending breakdowns by category, time, and merchant.' },
        { title: 'Smart Budget Alerts', desc: 'Background service that monitors category thresholds and triggers alerts when spending velocity exceeds set limits.' }
    ],
    outcome: 'Reduced the time required to log expenses by approximately 80%, leading to more consistent tracking habits. The automatic categorization achieved high accuracy for common transaction types.',
    liveUrl: '#',
    repoUrl: '#',
    keyFeatures: [
        'Automatic transaction categorization.',
        'Spending analysis and insights.',
        'Responsive dashboard with real-time charts.',
        'Personalized financial recommendations.'
    ]
  },
  {
    id: 'ai-code-reviewer',
    title: 'AI Code Reviewer',
    category: 'Developer Tools',
    year: '2023',
    image: PROJECT_IMAGES.code,
    description: 'Automated code quality checker that detects bugs and suggests improvements in real-time using OpenAI.',
    techStack: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'OpenAI API'],
    challenge: 'Code reviews are a critical bottleneck in the software development lifecycle. Junior developers often lack immediate feedback loops to improve their code quality before submission.',
    solution: 'Created an AI-driven Code Reviewer that integrates directly into the developer workflow. Users can paste code snippets to receive instant feedback. The system analyzes code for potential runtime errors, security vulnerabilities, and adherence to clean code principles.',
    modules: [
        { title: 'Static & Semantic Analysis', desc: 'Combines traditional linting with AI semantic understanding to catch both syntax errors and logical flaws.' },
        { title: 'Refactoring Engine', desc: 'Generates optimized versions of submitted code, highlighting performance improvements.' },
        { title: 'Review History Tracker', desc: 'MongoDB storage of past reviews to track improvement in code quality over time.' }
    ],
    outcome: 'Streamlined the review process for student projects, allowing for instant feedback on assignments. Detected common security flaws like SQL injection risks in initial drafts.',
    liveUrl: '#',
    repoUrl: '#',
    keyFeatures: [
        'Real-time bug detection.',
        'Automated code quality scoring.',
        'Intuitive submission interface.',
        'Improved developer workflow efficiency.'
    ]
  }
];

const BLOG_IMAGE = "https://images.unsplash.com/photo-1499750310159-52f0f837ce62?q=80&w=2070&auto=format&fit=crop";

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Leveraging Gemini API for Career Growth Apps',
    category: 'AI Development',
    date: 'Mar 15, 2024',
    image: BLOG_IMAGE,
    excerpt: 'How integrating Google Gemini API can transform standard career portals into intelligent coaching platforms.'
  },
  {
    id: '2',
    title: 'Building Scalable AI Apps with Next.js 15',
    category: 'Web Dev',
    date: 'Feb 10, 2024',
    image: BLOG_IMAGE,
    excerpt: 'Exploring the new features of Next.js 15 and how they benefit AI-driven application performance.'
  }
];

export const FAQS = [
  { question: 'What tech stack do you specialize in?', answer: 'I specialize in React 19, Next.js 15, Python, and integrating AI models like Gemini and OpenAI.' },
  { question: 'Can you build end-to-end ML workflows?', answer: 'Yes, I have a strong foundation in Data Science and ML, skilled in building pipelines and intelligent features.' },
  { question: 'Are you available for internships?', answer: 'Yes, I am a highly motivated B.Tech student eager to contribute to AI/ML teams.' },
  { question: 'Do you have experience with Cloud platforms?', answer: 'Yes, I have experience deploying applications on Vercel and managing cloud infrastructure.' },
  { question: 'What is your preferred project management tool?', answer: 'I primarily use GitHub Projects and Notion for tracking tasks and documentation.' },
];
