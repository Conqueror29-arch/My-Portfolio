
import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    // --- Configuration ---
    const BG_COLOR = '#000000'; // Pure Black

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      
      // Initial Fill
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // No animation loop needed for static black background
    // But we re-fill on resize to be safe
    
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ background: '#000000' }}
    />
  );
};

export default Background;
