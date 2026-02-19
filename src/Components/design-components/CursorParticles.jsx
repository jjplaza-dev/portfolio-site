import React, { useState, useEffect, useCallback } from 'react';

const CursorParticles = () => {
  const [particles, setParticles] = useState([]);

  // 1. Cleanup Helper: Removes a specific particle by ID
  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      // Only trigger on Left Click (button 0)
      if (e.button !== 0) return;

      const newParticles = [];
      // Spawn 4 to 6 particles
      const count = Math.floor(Math.random() * 3) + 4; 

      for (let i = 0; i < count; i++) {
        // Random Physics Calculations
        // Velocity: Move anywhere from -100px to 100px in X/Y directions
        const destX = (Math.random() - 0.5) * 200; 
        const destY = (Math.random() - 0.5) * 200; 
        
        // Rotation: Spin anywhere from -720deg to 720deg (fast spin)
        const rotation = (Math.random() - 0.5) * 1440; 

        newParticles.push({
          id: Date.now() + i, // Unique ID
          x: e.clientX,
          y: e.clientY,
          destX,
          destY,
          rotation
        });
      }

      setParticles(prev => [...prev, ...newParticles]);
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map(p => (
        <Particle 
          key={p.id} 
          {...p} 
          onComplete={() => removeParticle(p.id)} 
        />
      ))}
    </div>
  );
};

// Sub-component to handle individual particle lifecycle
const Particle = ({ x, y, destX, destY, rotation, onComplete }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Trigger Animation: Wait a micro-tick to ensure DOM is painted, then set mounted
    // This triggers the CSS transition from default -> final state
    requestAnimationFrame(() => {
        setMounted(true);
    });

    // 2. Lifecycle Timer: After 2 seconds, tell parent to delete me
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="absolute bg-white w-[2px] h-[2px] rounded-full will-change-transform mix-blend-difference"
      style={{
        left: x,
        top: y,
        // CSS Variables for the dynamic values
        '--tx': `${destX}px`,
        '--ty': `${destY}px`,
        '--rot': `${rotation}deg`,
        
        // The Transition Logic
        opacity: mounted ? 0 : 1, // Fade from 1 to 0
        transform: mounted 
          ? `translate3d(var(--tx), var(--ty), 0) rotate(var(--rot))` // Final State
          : `translate3d(0, 0, 0) rotate(0deg)`, // Initial State
        
        transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2s ease-out'
      }}
    />
  );
};

export default CursorParticles;