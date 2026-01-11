
import React, { useEffect, useRef } from 'react';

const BackgroundCurves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only initialize on devices with a mouse/trackpad
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let mouse = { x: 0, y: 0 };
    let head = { x: 0, y: 0 };
    
    // Trail state
    let trail: { x: number; y: number }[] = [];
    const MAX_TRAIL_LENGTH = 18; // Slightly longer for more "weight"
    
    // Particle state
    let particles: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      life: number; 
      color: string;
      size: number;
    }[] = [];

    let isActive = false;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updateMouse = (x: number, y: number) => {
      mouse.x = x;
      mouse.y = y;
      if (!isActive) {
        head = { x, y };
        isActive = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isActive) {
        // Smoothing movement (increased speed for snappiness)
        head.x += (mouse.x - head.x) * 0.35;
        head.y += (mouse.y - head.y) * 0.35;

        trail.push({ x: head.x, y: head.y });
        if (trail.length > MAX_TRAIL_LENGTH) trail.shift();

        // Spawn high-quality particles
        const speed = Math.hypot(mouse.x - head.x, mouse.y - head.y);
        if (Math.random() > 0.3) {
          particles.push({
            x: head.x + (Math.random() - 0.5) * 8,
            y: head.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1.0,
            color: '#22d3ee', // Theme Cyan
            size: Math.random() * 2.5 + 1.5
          });
        }

        // Update Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy;
          p.life -= 0.035; p.size *= 0.96;
          if (p.life <= 0) particles.splice(i, 1);
        }

        // Draw Substantial Trail
        if (trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          for (let i = 1; i < trail.length - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
          }
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          // Thicker, more substantial stroke
          ctx.lineWidth = 6; 
          
          const grad = ctx.createLinearGradient(
            trail[0].x, trail[0].y, 
            trail[trail.length - 1].x, trail[trail.length - 1].y
          );
          grad.addColorStop(0, 'rgba(34, 211, 238, 0)');
          grad.addColorStop(1, 'rgba(34, 211, 238, 0.6)');
          
          ctx.strokeStyle = grad;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#22d3ee';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw Sparks
        for (const p of particles) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Draw Premium Cursor Head
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#22d3ee';
        
        // Inner white dot
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer cyan glow ring
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9998]" />;
};

export default BackgroundCurves;
