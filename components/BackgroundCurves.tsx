
import React, { useEffect, useRef } from 'react';

const BackgroundCurves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // State
    let mouse = { x: 0, y: 0 };
    let head = { x: 0, y: 0 };
    
    // Trail history
    let trail: { x: number; y: number }[] = [];
    const MAX_TRAIL_LENGTH = 14;
    
    // Particles
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

    // Canvas Resize
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

    // Mouse Tracking
    const updateMouse = (x: number, y: number) => {
      mouse.x = x;
      mouse.y = y;
      
      // Initialize position on first move
      if (!isActive) {
        head = { x, y };
        isActive = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      updateMouse(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isActive) {
        // 1. Movement Smoothing - Instant (1.0) to remove lag feeling
        head.x += (mouse.x - head.x) * 1; 
        head.y += (mouse.y - head.y) * 1;

        // 2. Trail Logic
        trail.push({ x: head.x, y: head.y });
        if (trail.length > MAX_TRAIL_LENGTH) {
          trail.shift();
        }

        // 3. Spawn Sparks
        const speed = Math.hypot(mouse.x - head.x, mouse.y - head.y);
        // Since movement is instant, speed calculation on this frame might be 0 if mouse hasn't moved since last frame, 
        // but trail[length-2] logic in previous version handled "delta".
        // Here we can spawn based on random chance if mouse moved recently
        
        if (Math.random() > 0.3) {
             const vxBase = (Math.random() - 0.5) * 3;
             const vyBase = (Math.random() - 0.5) * 3;
             
             particles.push({
               x: head.x + (Math.random() - 0.5) * 6,
               y: head.y + (Math.random() - 0.5) * 6,
               vx: vxBase, 
               vy: vyBase,
               life: 1.0,
               // Cyan/Electric Hues: 180 (Cyan) to 200 (Light Blue)
               color: `hsl(${180 + Math.random() * 20}, 100%, 60%)`, 
               size: Math.random() * 2 + 1
             });
        }

        // 4. Update Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.04;
          p.size *= 0.95;
          
          if (p.life <= 0) {
            particles.splice(i, 1);
          }
        }

        // 5. Draw Trail
        if (trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          
          for (let i = 1; i < trail.length - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
          }
          ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
          
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 3;
          
          const gradient = ctx.createLinearGradient(
            trail[0].x, trail[0].y, 
            trail[trail.length-1].x, trail[trail.length-1].y
          );
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0.8)'); // Cyan #22d3ee
          
          ctx.strokeStyle = gradient;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#22d3ee'; // Cyan
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

        // Draw Head
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#22d3ee';
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)'; // Cyan with opacity
        ctx.beginPath();
        ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default BackgroundCurves;
