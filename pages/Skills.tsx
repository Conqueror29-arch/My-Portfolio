
import React from 'react';
import { SKILLS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import SpotlightCard from '../components/SpotlightCard';
import TiltCard from '../components/TiltCard';

// Selected 12 Tools based on AI/ML & Full Stack Resume Profile
const TOOLS_LIST = [
    { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/white' },
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
    { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
    { name: 'DigitalOcean', logo: 'https://cdn.simpleicons.org/digitalocean/0080FF' },
    { name: 'Deepnote', logo: 'https://cdn.simpleicons.org/deepnote/3649F5' },
    { name: 'Coolify', logo: 'https://cdn.simpleicons.org/coolify/6B21A8' },
    { name: 'Dokploy', logo: 'https://raw.githubusercontent.com/Dokploy/website/4f2beec32ebc62b630de10d0ba62e0376eee7bd5/apps/website/public/icon.svg' },
    { name: 'Authentik', logo: 'https://cdn.simpleicons.org/authentik/FD4B2D' },
];

const Skills: React.FC = () => {
  return (
    <div className="w-full pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                    Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Arsenal</span>
                </h1>
                <p className="text-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
                    A curated list of technologies I use to build performant, scalable, and intelligent applications.
                </p>
            </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {SKILLS.map((skill, idx) => (
                <ScrollReveal key={idx} animation="blur-in" delay={idx * 100}>
                    <TiltCard className="h-full">
                        <div className="relative group rounded-3xl bg-[#050505] border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.08)] flex flex-col p-8 h-full shadow-[0_0_15px_-5px_rgba(255,255,255,0.05)]">
                            <CardBackground />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-white/10 group-hover:border-white/30">
                                    {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 28 })}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-tight transition-colors">{skill.title}</h3>
                                <p className="text-textMuted text-sm leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                    {skill.desc}
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </ScrollReveal>
            ))}
        </div>

        {/* Tools I Use Section */}
        <div className="mb-20">
            <ScrollReveal animation="slide-right" distance={40}>
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-display px-4">
                        <Wrench className="text-accent" size={24} /> Tools & Environment
                    </h3>
                    <div className="h-px bg-white/10 flex-grow"></div>
                </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {TOOLS_LIST.map((tool, idx) => (
                    <ScrollReveal key={idx} animation="scale-up" delay={idx * 50}>
                        <TiltCard className="h-full">
                            <div className="group relative bg-[#050505] border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-500 h-full overflow-hidden hover:border-white/40 shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.1)]">
                                <CardBackground />
                                
                                <div className="relative z-10 h-10 w-10 flex items-center justify-center">
                                    {tool.logo ? (
                                        <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-full font-bold text-xs">{tool.name[0]}</div>
                                    )}
                                </div>
                                
                                <span className="text-sm font-bold text-white relative z-10 tracking-tight">{tool.name}</span>
                            </div>
                        </TiltCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>

        <ScrollReveal animation="fade-up">
            <div className="text-center relative z-10">
                <Link 
                  to="/works" 
                  className="btn px-10 py-5 rounded-2xl bg-black border-2 border-primary text-white font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all group active:scale-95"
                >
                    See Skills in Action 
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform ml-2" />
                </Link>
            </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default Skills;
