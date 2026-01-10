
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';

const CTA: React.FC = () => {
  const location = useLocation();
  
  // Hide CTA on Contact, Privacy, Terms, and Project Detail pages (routes starting with /works/ but not /works itself)
  const isProjectDetail = location.pathname.startsWith('/works/') && location.pathname !== '/works';
  const hiddenRoutes = ['/contact', '/privacy-policy', '/terms-of-use'];

  if (hiddenRoutes.includes(location.pathname) || isProjectDetail) return null;

  return (
    <div className="w-full px-6 my-8">
      {/* Complex SVG Filter - Tuned for smoothness */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="3" result="noise1" seed="1">
                     <animate attributeName="seed" values="1;5;2;1" dur="4s" repeatCount="indefinite" />
                </feTurbulence>
                <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                    <animate attributeName="dy" values="500; 0" dur="4s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="3" result="noise2" seed="1">
                    <animate attributeName="seed" values="1;3;6;1" dur="4s" repeatCount="indefinite" />
                </feTurbulence>
                <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                    <animate attributeName="dy" values="0; -500" dur="4s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="3" result="noise1" seed="2">
                    <animate attributeName="seed" values="2;4;1;2" dur="4s" repeatCount="indefinite" />
                </feTurbulence>
                <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                    <animate attributeName="dx" values="500; 0" dur="4s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="3" result="noise2" seed="2">
                    <animate attributeName="seed" values="2;6;3;2" dur="4s" repeatCount="indefinite" />
                </feTurbulence>
                <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                    <animate attributeName="dx" values="0; -500" dur="4s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

                <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
            </filter>
        </defs>
      </svg>

      <style>{`
        .electric-card-root {
          --electric-border-color: #22d3ee;
          --electric-light-color: #a5f3fc; 
          --card-bg: transparent; /* Transparent background */
        }
        
        .inner-container {
            position: relative;
            width: 100%;
            /* Let content dictate height, but maintain min-height */
            min-height: 240px; 
        }

        .border-effect-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            filter: url(#turbulent-displace);
            pointer-events: none;
        }

        .electric-border {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            border: 2px solid var(--electric-border-color);
        }

        .glow-layer-1 {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            border: 2px solid var(--electric-border-color);
            filter: blur(2px);
            opacity: 0.7;
        }

        .glow-layer-2 {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            border: 2px solid var(--electric-border-color);
            filter: blur(4px);
            opacity: 0.5;
        }
        
        .background-glow {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            filter: blur(32px);
            opacity: 0.3;
            /* background: linear-gradient(-30deg, var(--electric-light-color), transparent); Removed for transparency */
            z-index: -1;
            transform: scale(1.02);
        }

        .main-card {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background-color: var(--card-bg);
        }
      `}</style>

      <div className="electric-card-root max-w-4xl mx-auto relative">
          <div className="inner-container">
             
             {/* 1. Background Layer (Bottom) */}
             <div className="main-card"></div>

             {/* 2. Electric Border Layers (Middle) */}
             <div className="border-effect-container">
                 <div className="electric-border"></div>
                 <div className="glow-layer-1"></div>
                 <div className="glow-layer-2"></div>
             </div>

             {/* 3. Content Layer (Top - Z-Index 30 ensures visibility over border effects) */}
             <div className="relative z-30 flex flex-col items-center justify-center text-center py-12 px-8 h-full min-h-[240px]">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display max-w-lg leading-tight">
                      Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">extraordinary?</span>
                  </h2>
                  
                  <p className="text-textMuted font-medium text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                  </p>
                  
                  <Link to="/contact" className="btn btn-white group relative">
                      <Mail size={16} /> Start a Conversation
                  </Link>
             </div>
          </div>
          
          <div className="background-glow"></div>
      </div>
    </div>
  );
};

export default CTA;
