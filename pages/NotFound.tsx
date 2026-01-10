
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-20">
        
        {/* 404 Number Container */}
        <div className="relative mb-8 select-none">
            <span className="text-[10rem] md:text-[16rem] font-black leading-none text-white tracking-tighter opacity-10">
                404
            </span>
            
            {/* Alert Icon Badge */}
            <div className="absolute top-[10%] right-[0%] md:top-[15%] md:right-[5%] w-16 h-16 md:w-24 md:h-24 bg-primary border-4 border-black rounded-full flex items-center justify-center shadow-glow-blue animate-bounce">
                <AlertTriangle size={32} className="text-white md:w-10 md:h-10" strokeWidth={2.5} />
            </div>
        </div>

        {/* Page Not Found Box */}
        <div className="bg-surface border border-white/20 px-8 py-2 mb-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-display">
                Page Not Found
            </h1>
        </div>
        
        {/* Description */}
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded border border-white/10 max-w-xl mx-auto mb-12">
            <p className="text-textMuted font-medium text-lg md:text-xl leading-relaxed">
                Whoops! It looks like you've taken a wrong turn into the digital void. The page you are looking for has been moved, deleted, or never existed.
            </p>
        </div>

        {/* Button */}
        <Link to="/" className="btn btn-filled">
            <ArrowLeft size={20} strokeWidth={3} />
            Go Back Home
        </Link>

    </div>
  );
};

export default NotFound;
