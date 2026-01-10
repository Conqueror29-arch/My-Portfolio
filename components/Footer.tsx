
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Heart, Code, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-10 pb-6 mt-12 relative z-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight font-display">Harishama.</h2>
            <p className="text-textMuted text-sm mb-6 leading-relaxed max-w-sm">
              Building intelligent solutions at the intersection of AI and Full Stack Development.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Conqueror29-arch" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-textMuted hover:bg-white hover:text-black transition-all border border-white/5">
                <Github size={18} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-textMuted hover:bg-white hover:text-black transition-all border border-white/5">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/harishama-chaurasia-b4694735b/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-textMuted hover:bg-white hover:text-black transition-all border border-white/5">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider mb-4">Explore</h4>
                <ul className="space-y-2">
                <li><Link to="/about" className="text-textMuted text-sm hover:text-primary transition-colors">About Me</Link></li>
                <li><Link to="/skills" className="text-textMuted text-sm hover:text-primary transition-colors">My Skills</Link></li>
                <li><Link to="/works" className="text-textMuted text-sm hover:text-primary transition-colors">Projects</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider mb-4">Support</h4>
                <ul className="space-y-2">
                <li><Link to="/contact" className="text-textMuted text-sm hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="text-textMuted text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-use" className="text-textMuted text-sm hover:text-primary transition-colors">Terms of Use</Link></li>
                </ul>
            </div>
          </div>
        </div>

        {/* Animated Collider Line */}
        <div className="relative h-px w-full mb-6">
           <style>{`
             @keyframes collisionLeft {
               0%, 100% { width: 0%; opacity: 0; }
               50% { width: 50%; opacity: 1; }
             }
             @keyframes collisionRight {
               0%, 100% { width: 0%; opacity: 0; }
               50% { width: 50%; opacity: 1; }
             }
           `}</style>
           
           {/* Static Faint Base Line */}
           <div className="absolute inset-0 bg-white/5"></div>

           {/* Left Beam (Cyan) */}
           <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan-500/80 to-white shadow-[0_0_15px_#22d3ee]"
                style={{ animation: 'collisionLeft 4s ease-in-out infinite' }}></div>

           {/* Right Beam (Cyan) */}
           <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-transparent via-cyan-500/80 to-white shadow-[0_0_15px_#22d3ee]"
                style={{ animation: 'collisionRight 4s ease-in-out infinite' }}></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-textMuted text-xs">© 2026 Tegota. All rights reserved.</p>
          <div className="flex items-center gap-1 text-textMuted text-xs">
            <span>Designed & Built by Harishama</span>
            <Heart className="w-3 h-3 text-cyan-400 fill-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
