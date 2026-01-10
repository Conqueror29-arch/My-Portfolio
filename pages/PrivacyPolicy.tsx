
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto relative rounded-3xl bg-[#050505] border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl">
        
        <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display uppercase border-b border-white/10 pb-6 tracking-tight">Privacy Policy</h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-textMuted">
              <p className="mb-6 text-white/90 font-medium">
                Last updated: October 2024
              </p>
              <p className="mb-6 leading-relaxed">
                Thank you for visiting my portfolio. This Privacy Policy describes how I collect, use, and protect your information when you visit this website.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span> 
                  1. Information I Collect
              </h2>
              <p className="mb-4">
                This website is primarily for informational purposes. However, if you choose to contact me via the contact form or email, I may collect the following information:
              </p>
              <ul className="list-none space-y-2 mb-4 ml-2">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Your Name</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Email address</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Any other information you voluntarily provide in your message</li>
              </ul>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                  2. How I Use Your Information
              </h2>
              <p className="mb-4">
                 I use the information you provide solely to:
              </p>
              <ul className="list-none space-y-2 mb-4 ml-2">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Respond to your inquiries or project proposals.</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Improve the content and functionality of this portfolio.</li>
              </ul>
              <p className="mb-4 bg-white/5 p-4 rounded-xl border border-white/5">
                I do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                   <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                   3. Cookies
              </h2>
              <p className="mb-4">
                This website may use cookies to enhance user experience (e.g., retaining theme preferences). You can choose to disable cookies through your browser settings, though this may affect some site functionality.
              </p>

              <h2 className="text-2xl font-bold text-white uppercase mb-4 mt-10 flex items-center gap-2">
                   <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                   4. Contact Me
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact me at:
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

export default PrivacyPolicy;
