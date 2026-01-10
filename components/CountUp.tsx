import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number | null = null;
          let animationFrameId: number;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            
            if (progress < duration) {
              const percentage = progress / duration;
              // Ease out quart function for smooth landing
              const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
              setCount(Math.floor(easeOutQuart * end));
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  return <span ref={elementRef}>{prefix}{count}{suffix}</span>;
};

export default CountUp;