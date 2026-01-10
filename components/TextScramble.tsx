
import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: any;
  characterSet?: string;
  key?: string | number; // allow forcing re-render
}

const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  duration = 1000,
  delay = 0,
  as: Component = 'div',
  characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*'
}) => {
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, '')); // Start empty but keep spacing
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle Text Change (for cycling words) or Initial Visibility
  useEffect(() => {
    if (!isVisible) return;
    
    // If text changes, restart animation
    setIsAnimating(true);
    let start = 0;
    let requestId: number;
    
    const timeout = setTimeout(() => {
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            if (progress >= 1) {
                setDisplay(text);
                setIsAnimating(false);
                return;
            }

            // Calculate how many characters should be revealed based on progress
            // We speed this up slightly to ensure full reveal before duration end
            const revealIndex = Math.floor(progress * text.length);
            
            const scrambled = text
                .split('')
                .map((char, index) => {
                    if (char === ' ' || char === '\n') return char;
                    if (index <= revealIndex) return char;
                    return characterSet[Math.floor(Math.random() * characterSet.length)];
                })
                .join('');
            
            setDisplay(scrambled);
            requestId = requestAnimationFrame(step);
        };
        requestId = requestAnimationFrame(step);
    }, delay);

    return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(requestId);
    };
  }, [isVisible, text, duration, delay, characterSet]);

  return (
    <Component ref={elementRef} className={className}>
      {display || text.replace(/[^\s]/g, '\u00A0')} 
    </Component>
  );
};

export default TextScramble;
