
import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="w-full pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto relative rounded-3xl bg-[#050505] border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl">

        <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display uppercase border-b border-white/10 pb-6 tracking-tight">Terms of Use</h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-textMuted">
              <p className="mb-6 text-white/90 font-medium">
                Last updated: October 2024
              </p>
              <p className="mb-6 leading-relaxed">
                By accessing this portfolio website, you agree to be bound by these Terms of Use.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  1. Intellectual Property
              </h2>
              <p className="mb-4">
                All content published on this website (including text, graphics, logos, project descriptions, and code snippets) is the property of Harishama Chaurasia unless otherwise noted. You may not reproduce, distribute, or create derivative works from this content without explicit permission.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                  2. Usage License
              </h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (such as the Resume/CV) for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                  3. Disclaimer
              </h2>
              <p className="mb-4 bg-white/5 p-4 rounded-xl border border-white/5">
                The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, regarding the accuracy or reliability of the use of the materials on this website.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  4. Links
              </h2>
              <p className="mb-4">
                This website includes links to external sites (e.g., GitHub, LinkedIn). I am not responsible for the contents or privacy practices of any such linked site. The inclusion of any link does not imply endorsement.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
                  5. Modifications
              </h2>
              <p className="mb-4">
                I may revise these terms of service for this website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10">Contact</h2>
              <p>
                For any questions regarding these terms, please contact:
              </p>
              <div className="mt-4 inline-block">
                 <a href="mailto:harishamachaurasia@gmail.com" className="text-white font-bold hover:text-primary transition-colors border-b border-white/20 hover:border-primary pb-1">
                    harishamachaurasia@gmail.com
                 </a>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
