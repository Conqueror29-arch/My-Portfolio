
import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hide, setHide] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Core...');

  // Scramble text effect helper
  const useScramble = (text: string) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const [display, setDisplay] = useState(text);
    
    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                .split('')
                .map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('')
            );
            
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return display;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHide(true), 400); 
          setTimeout(() => setIsFinished(true), 900); 
          return 100;
        }
        
        const diff = 100 - prev;
        const inc = Math.max(1, Math.ceil(diff / (Math.random() * 10 + 5)));
        const next = Math.min(prev + inc, 100);

        // Update status text based on percentage
        if (next > 20 && next < 50) setStatusText('Loading Modules...');
        else if (next >= 50 && next < 80) setStatusText('Verifying Integrity...');
        else if (next >= 80) setStatusText('System Ready');
        
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const scrambledStatus = useScramble(statusText);

  if (isFinished) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${hide ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}
    >
        {/* Modern Tech Layout */}
        <div className="relative w-72 md:w-96">
            
            {/* Logo / Title Row */}
            <div className="flex justify-between items-end mb-4">
                <span className="text-white font-display font-bold text-2xl tracking-tight">
                    Harishama<span className="text-primary animate-pulse">.</span>
                </span>
                <span className="font-mono text-primary font-bold text-xl tabular-nums">
                    {percent.toString().padStart(3, '0')}%
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                {/* Glowing Progress Bar */}
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-200 ease-out rounded-full"
                    style={{ width: `${percent}%` }}
                >
                    {/* Leading Shine Effect */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-4 bg-gradient-to-l from-white/80 to-transparent opacity-50"></div>
                </div>
            </div>

            {/* Loading Status Text with Scramble Effect */}
            <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-textMuted uppercase tracking-widest font-mono h-4">
                <span className="w-40">{scrambledStatus}</span>
                <div className="flex gap-1">
                   <div className={`w-1 h-1 bg-primary rounded-full ${percent % 2 === 0 ? 'opacity-100' : 'opacity-20'}`}></div>
                   <div className={`w-1 h-1 bg-primary rounded-full ${percent % 3 === 0 ? 'opacity-100' : 'opacity-20'}`}></div>
                   <div className={`w-1 h-1 bg-primary rounded-full ${percent % 4 === 0 ? 'opacity-100' : 'opacity-20'}`}></div>
                </div>
            </div>
            
        </div>
    </div>
  );
};

export default Preloader;
