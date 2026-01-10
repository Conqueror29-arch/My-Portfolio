
import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-in' | 'slide-left' | 'slide-right' | 'blur-in' | 'scale-up' | 'rotate-in' | 'flip-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  enableBlur?: boolean;
  repeat?: boolean; // If true, animation triggers every time element enters viewport
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  duration = 800,
  delay = 0,
  distance = 30,
  threshold = 0.1,
  className = '',
  enableBlur = true,
  repeat = false, // Changed default to false for better performance and reliability
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Safety fallback: If IntersectionObserver is not supported or fails, show content.
    if (!('IntersectionObserver' in window)) {
        setIsVisible(true);
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!repeat) observer.unobserve(element);
        } else if (repeat) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0, // Trigger as soon as any pixel is visible
        rootMargin: '0px 0px 0px 0px', // Removed negative margin to ensure triggering
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, repeat]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    
    switch (animation) {
      case 'fade-up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'fade-down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'slide-left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'slide-right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'scale-up':
        return `scale(0.8)`;
      case 'rotate-in':
        return `rotate(-5deg) scale(0.9)`;
      case 'flip-up':
        return `perspective(1000px) rotateX(20deg) translate3d(0, ${distance}px, 0)`;
      case 'blur-in':
      case 'fade-in':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const getOpacity = () => (isVisible ? 1 : 0);
  
  const getBlur = () => {
      if (!enableBlur) return 'none';
      if (animation === 'blur-in') return isVisible ? 'blur(0)' : 'blur(10px)';
      return isVisible ? 'blur(0)' : 'blur(4px)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `all ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        transitionDelay: `${delay}ms`,
        opacity: getOpacity(),
        transform: getTransform(),
        filter: getBlur(),
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
