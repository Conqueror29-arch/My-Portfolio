import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  
  const [ripple, setRipple] = useState<{x: number, y: number, color: string} | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme || 'dark');
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const rippleColor = nextTheme === 'dark' ? '#050505' : '#FAFAFA';

    setRipple({ x, y, color: rippleColor });

    // Switch theme halfway through animation
    setTimeout(() => {
      setTheme(nextTheme);
    }, 300);

    // Cleanup ripple
    setTimeout(() => {
      setRipple(null);
    }, 700);
  };

  return (
    <>
        <div className="fixed top-6 right-6 z-[60]">
            <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-surfaceHighlight border border-border text-textMain shadow-xl hover:scale-110 transition-transform duration-300 hover:text-accent"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Moon size={20} className="fill-current" /> : <Sun size={20} className="fill-current" />}
            </button>
        </div>
        
        {ripple && (
            <div
                className="fixed rounded-full pointer-events-none z-[59] animate-ripple"
                style={{
                    left: ripple.x,
                    top: ripple.y,
                    backgroundColor: ripple.color,
                    width: '10px',
                    height: '10px',
                }}
            />
        )}
    </>
  );
};

export default ThemeToggle;