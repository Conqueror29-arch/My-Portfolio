
import React, { useEffect, useRef } from 'react';

const ShootingStars: React.FC = () => {
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
    const GRID_SIZE = 20; 
    const GRID_COLOR = 'rgba(255, 255, 255, 0.03)'; // Dimmed further
    const SQUARE_COLOR = 'rgba(255, 255, 255, 0.15)'; // Changed to White, low opacity
    
    // --- State ---
    interface Square {
        x: number; y: number;
        life: number; maxLife: number;
        size: number;
    }
    let squares: Square[] = [];
    
    const init = () => {
        squares = [];
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let frameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- 1. Draw Static Grid ---
      ctx.lineWidth = 1;
      ctx.strokeStyle = GRID_COLOR;
      ctx.beginPath();
      
      // Vertical lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = 0; y <= height; y += GRID_SIZE) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
      }
      ctx.stroke();

      // --- 2. Random Glowing Squares ---
      if (Math.random() < 0.05) { 
          const col = Math.floor(Math.random() * (width / GRID_SIZE));
          const row = Math.floor(Math.random() * (height / GRID_SIZE));
          squares.push({
              x: col * GRID_SIZE,
              y: row * GRID_SIZE,
              life: 0,
              maxLife: 100 + Math.random() * 100, 
              size: GRID_SIZE - 2 
          });
      }

      for (let i = squares.length - 1; i >= 0; i--) {
          const sq = squares[i];
          sq.life++;
          
          let opacity = 0;
          if (sq.life < 20) opacity = sq.life / 20;
          else if (sq.life > sq.maxLife - 20) opacity = (sq.maxLife - sq.life) / 20;
          else opacity = 1;

          if (sq.life >= sq.maxLife) {
              squares.splice(i, 1);
              continue;
          }

          ctx.fillStyle = SQUARE_COLOR;
          ctx.globalAlpha = opacity;
          ctx.fillRect(sq.x + 1, sq.y + 1, sq.size, sq.size);
          
          // Subtle white glow for premium feel
          ctx.shadowBlur = 2;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
          ctx.strokeRect(sq.x + 1.5, sq.y + 1.5, sq.size - 1, sq.size - 1);
          ctx.shadowBlur = 0;
          
          ctx.globalAlpha = 1.0;
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default ShootingStars;
