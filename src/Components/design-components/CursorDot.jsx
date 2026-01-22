import React, { useEffect, useRef, useState, useCallback } from 'react'

// --- Sub-component: Individual Particle ---
// Renders a single square that explodes and fades out
const Particle = ({ x, y, destX, destY, rotation, onComplete }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation frame to ensure transition happens
    requestAnimationFrame(() => setMounted(true));

    // Cleanup after 1 second (faster fade for snappier feel)
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="absolute bg-white w-[4px] h-[4px] pointer-events-none will-change-transform mix-blend-difference"
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
  
  // 1. Particle State
  const [particles, setParticles] = useState([]);

  // 2. Cursor Core Refs
  const cursor = useRef({ x: 0, y: 0, width: 20, height: 20, rotation: 0 });
  const target = useRef({ x: 0, y: 0, width: 20, height: 20, isSnapped: false });

  // Helper to remove particles
  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  useEffect(() => {
    // --- Event Listeners ---
    const onMouseMove = (e) => {
      const button = e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]');

      if (button) {
        const rect = button.getBoundingClientRect();
        target.current.x = rect.left + rect.width / 2;
        target.current.y = rect.top + rect.height / 2;
        target.current.width = rect.width;
        target.current.height = rect.height;
        target.current.isSnapped = true;
      } else {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
        target.current.width = 20;
        target.current.height = 20;
        target.current.isSnapped = false;
      }
    };

    // --- NEW: Click Listener for Particles ---
    const onMouseDown = (e) => {
       // Only trigger on Left Click
       if (e.button !== 0) return;

       const newParticles = [];
       const count = Math.floor(Math.random() * 3) + 4; // Spawn 4-6 particles

       for (let i = 0; i < count; i++) {
         // Explode outwards from the CURRENT cursor position
         // We use cursor.current.x/y to spawn from where the cursor *is*, not just where the mouse clicked
         newParticles.push({
           id: Date.now() + i + Math.random(),
           x: cursor.current.x,
           y: cursor.current.y,
           // Random spread -100px to 100px
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
      
      const ease = 0.1;
      cursor.current.x += dx * ease;
      cursor.current.y += dy * ease;
      cursor.current.width += (target.current.width - cursor.current.width) * ease;
      cursor.current.height += (target.current.height - cursor.current.height) * ease;

      let targetRotation = 0;
      if (!target.current.isSnapped) {
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
           targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        } else {
           targetRotation = cursor.current.rotation; 
        }
      } 
      
      cursor.current.rotation += (targetRotation - cursor.current.rotation) * ease;

      if (dotRef.current) {
        dotRef.current.style.width = `${cursor.current.width}px`;
        dotRef.current.style.height = `${cursor.current.height}px`;
        dotRef.current.style.transform = `
            translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) 
            translate(-50%, -50%) 
            rotate(${cursor.current.rotation}deg)
        `;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown); // Add Click Listener

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown); // Cleanup
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* 1. The Particle Layer (Z-Index matches Cursor) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {particles.map(p => (
          <Particle 
            key={p.id} 
            {...p} 
            onComplete={() => removeParticle(p.id)} 
          />
        ))}
      </div>

      {/* 2. The Main Cursor Dot */}
      <div 
        ref={dotRef} 
        style={{clipPath: "polygon(100% 10%, 90% 0%, 10% 0%, 0% 10%, 0% 90%, 10% 100%, 90% 100%, 100% 90%)"}} 
        className="fixed top-0 left-0 bg-white pointer-events-none z-[9999] mix-blend-difference"
      ></div>
    </>
  )
}

export default CursorDot