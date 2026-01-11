
import React, { useEffect, useState, useRef } from 'react';

interface CardBackgroundProps {
  hideBeams?: boolean;
}

const CardBackground: React.FC<CardBackgroundProps> = ({ hideBeams = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);

  // 1. Measure Container Dimensions
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Generate Perfectly Aligned Grid Elements
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const GRID_SIZE = 20;
    const cols = Math.floor(dimensions.width / GRID_SIZE);
    const rows = Math.floor(dimensions.height / GRID_SIZE);

    // --- Generate Squares ---
    const newSquares: any[] = [];
    const maxSquares = 5; 
    const occupied = new Set<string>();

    for (let i = 0; i < 50; i++) { 
      if (newSquares.length >= maxSquares) break;

      const c = Math.floor(Math.random() * cols);
      const r = Math.floor(Math.random() * rows);
      const key = `${c},${r}`;

      if (occupied.has(key)) continue;

      let tooClose = false;
      for (const sq of newSquares) {
          const dc = Math.abs(sq.c - c);
          const dr = Math.abs(sq.r - r);
          if (dc < 2 && dr < 2) tooClose = true;
      }

      if (!tooClose) {
        occupied.add(key);
        newSquares.push({
          id: `sq-${i}`,
          c, r,
          left: c * GRID_SIZE + 1, 
          top: r * GRID_SIZE + 1,
          delay: Math.random() * 5 + 's',
          duration: Math.random() * 3 + 4 + 's'
        });
      }
    }
    setSquares(newSquares);

    // --- Generate Grid-Aligned Beams ---
    if (!hideBeams) {
        const newLines = [];
        
        // Horizontal Beams
        for (let i = 0; i < 3; i++) {
           const r = Math.floor(Math.random() * (rows + 1));
           newLines.push({
              id: `h-${i}`,
              type: 'horizontal',
              top: r * GRID_SIZE, 
              width: '60px', 
              delay: Math.random() * 5 + 's',
              duration: Math.random() * 4 + 6 + 's'
           });
        }

        // Vertical Beams
        for (let i = 0; i < 3; i++) {
           const c = Math.floor(Math.random() * (cols + 1));
           newLines.push({
              id: `v-${i}`,
              type: 'vertical',
              left: c * GRID_SIZE, 
              height: '60px',
              delay: Math.random() * 5 + 's',
              duration: Math.random() * 4 + 6 + 's'
           });
        }
        
        setLines(newLines);
    } else {
        setLines([]);
    }

  }, [dimensions.width, dimensions.height, hideBeams]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit z-0">
      
      {/* 1. Base Grid Pattern - 20px fixed size - Reduced Opacity for subtleness */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px', 
            maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
        }}
      ></div>

      {/* 2. Squares - White for Premium Look - Reduced Shadow Opacity */}
      {squares.map((sq) => (
        <div 
            key={sq.id}
            className="absolute bg-white animate-fade-in-out"
            style={{
                left: sq.left + 'px',
                top: sq.top + 'px',
                width: '19px', 
                height: '19px',
                animationDelay: sq.delay,
                animationDuration: sq.duration,
                opacity: 0, 
                // Significantly reduced inner shadow opacity to prevent obscuring text
                boxShadow: 'inset 0 0 6px rgba(255,255,255,0.05)',
                borderRadius: '1px'
            }}
        />
      ))}

      {/* 3. Beams - Moving along grid lines */}
      {!hideBeams && lines.map((line) => (
        <div 
           key={line.id}
           className={`absolute bg-gradient-to-r from-transparent via-white/30 to-transparent ${line.type === 'horizontal' ? 'animate-beam-horz' : 'animate-beam-vert'}`}
           style={{
              top: line.type === 'horizontal' ? line.top + 'px' : undefined,
              left: line.type === 'vertical' ? line.left + 'px' : undefined,
              width: line.type === 'horizontal' ? line.width : '1px',
              height: line.type === 'vertical' ? line.height : '1px',
              backgroundImage: line.type === 'vertical' ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)' : undefined,
              animationDelay: line.delay,
              animationDuration: line.duration,
           }}
        />
      ))}

      {/* 4. Ambient Shadow Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/90"></div>
    </div>
  );
};

export default CardBackground;
