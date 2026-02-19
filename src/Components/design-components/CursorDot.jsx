import React, { useEffect, useRef, useState, useCallback } from 'react'

// --- Sub-component: Individual Particle ---
const Particle = ({ x, y, destX, destY, rotation, onComplete }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="absolute bg-white w-[4px] h-[4px] pointer-events-none will-change-transform mix-blend-difference rounded-full"
      style={{
        left: x,
        top: y,
        opacity: mounted ? 0 : 1,
        transform: mounted 
          ? `translate3d(${destX}px, ${destY}px, 0) rotate(${rotation}deg)` 
          : `translate3d(0, 0, 0) rotate(0)`,
        transition: 'transform 1s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 1s ease-out'
      }}
    />
  );
};

// --- Main Component: CursorDot ---
const CursorDot = () => {
  const dotRef = useRef(null);
  
  const [particles, setParticles] = useState([]);

  const cursor = useRef({ x: 0, y: 0, width: 20, height: 20 });
  const target = useRef({ x: 0, y: 0, width: 20, height: 20 });

  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  useEffect(() => {
    // --- Event Listeners ---
    const onMouseMove = (e) => {
      const button = e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]');

      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (button) {
        // Hover State: Enlarge and make hollow
        target.current.width = 40;  
        target.current.height = 40; 
        
        if (dotRef.current) {
            dotRef.current.classList.add('bg-transparent');
            dotRef.current.classList.remove('bg-white'); // Assuming white is your solid color
        }
      } else {
        // Normal State: Base size and solid center
        target.current.width = 20;
        target.current.height = 20;
        
        if (dotRef.current) {
            dotRef.current.classList.add('bg-white');
            dotRef.current.classList.remove('bg-transparent');
        }
      }
    };

    // --- Click Listener for Particles ---
    const onMouseDown = (e) => {
       if (e.button !== 0) return;

       const newParticles = [];
       const count = Math.floor(Math.random() * 3) + 4; 

       for (let i = 0; i < count; i++) {
         newParticles.push({
           id: Date.now() + i + Math.random(),
           x: cursor.current.x,
           y: cursor.current.y,
           destX: (Math.random() - 0.5) * 150, 
           destY: (Math.random() - 0.5) * 150,
           rotation: (Math.random() - 0.5) * 720
         });
       }
       setParticles(prev => [...prev, ...newParticles]);
    };

    // --- Animation Loop ---
    let rafId;
    const animate = () => {
      const dx = target.current.x - cursor.current.x;
      const dy = target.current.y - cursor.current.y;
      
      const ease = 0.15; 
      
      cursor.current.x += dx * ease;
      cursor.current.y += dy * ease;
      cursor.current.width += (target.current.width - cursor.current.width) * ease;
      cursor.current.height += (target.current.height - cursor.current.height) * ease;

      if (dotRef.current) {
        dotRef.current.style.width = `${cursor.current.width}px`;
        dotRef.current.style.height = `${cursor.current.height}px`;
        dotRef.current.style.transform = `
            translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) 
            translate(-50%, -50%) 
        `;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {particles.map(p => (
          <Particle 
            key={p.id} 
            {...p} 
            onComplete={() => removeParticle(p.id)} 
          />
        ))}
      </div>

      <div 
        ref={dotRef} 
        // Added: border-2, border-white, bg-white, and a smooth transition-colors
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-5 border-white bg-white transition-colors duration-200 ease-out"
      ></div>
    </>
  )
}

export default CursorDot