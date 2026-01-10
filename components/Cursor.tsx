
import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if the device uses a fine pointer (like a mouse)
    // This prevents the cursor from rendering on mobile/touch-only devices
    if (typeof window !== 'undefined' && window.matchMedia) {
       const isFinePointer = window.matchMedia("(pointer: fine)").matches;
       if (!isFinePointer) return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Palette based on tailwind config
    const PALETTE = [
      '#C4A1FF', // Retro Purple
      '#FF9ECA', // Retro Pink
      '#D4FF9E', // Retro Green
      '#FFF59E', // Retro Yellow
      '#9ECAFF', // Retro Blue
    ];

    // State
    let mouse = { x: 0, y: 0 };
    let head = { x: 0, y: 0 };
    
    // Trail history
    let trail: { x: number; y: number }[] = [];
    const MAX_TRAIL_LENGTH = 12; // Shorter trail for a snappier feel
    
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
    
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      // Clear with respect to DPR
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isActive) {
        // 1. Instant Movement (No lag)
        head.x = mouse.x;
        head.y = mouse.y;

        // 2. Trail Logic
        trail.push({ x: head.x, y: head.y });
        if (trail.length > MAX_TRAIL_LENGTH) {
          trail.shift();
        }

        // 3. Spawn Particles
        const dx = mouse.x - (trail[trail.length - 2]?.x || mouse.x);
        const dy = mouse.y - (trail[trail.length - 2]?.y || mouse.y);
        const speed = Math.hypot(dx, dy);
        
        if (speed > 2 && Math.random() > 0.5) {
             const vxBase = (Math.random() - 0.5) * 2;
             const vyBase = (Math.random() - 0.5) * 2;
             
             particles.push({
               x: head.x + (Math.random() - 0.5) * 4,
               y: head.y + (Math.random() - 0.5) * 4,
               vx: vxBase, 
               vy: vyBase,
               life: 1.0,
               color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
               size: Math.random() * 2 + 1
             });
        }

        // 4. Update Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05; // Fade out slightly faster
          p.size *= 0.92; // Shrink
          
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
          ctx.lineWidth = 4;
          
          const gradient = ctx.createLinearGradient(
            trail[0].x, trail[0].y, 
            trail[trail.length-1].x, trail[trail.length-1].y
          );
          gradient.addColorStop(0, 'rgba(196, 161, 255, 0)');
          gradient.addColorStop(1, 'rgba(196, 161, 255, 0.8)');
          
          ctx.strokeStyle = gradient;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#C4A1FF';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw Particles
        for (const p of particles) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Draw Head
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx.stroke();
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

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default Cursor;
