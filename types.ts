
export interface ProjectModule {
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  techStack: string[];
  challenge: string;
  solution: string;
  keyFeatures: string[];
  modules?: ProjectModule[];
  outcome?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  plus: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export enum PageRoute {
  HOME = '/',
  ABOUT = '/about',
  WORKS = '/works',
  BLOGS = '/blogs',
  CONTACT = '/contact',
}
