import React, { useState, useEffect } from 'react';
import Plates from './Plates';
import { MidPointsManager } from './MidPoints';

const PlatedBackground = () => {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    // 1. Orientation Logic
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <main 
        className={`w-full h-screen z-[-1] bg-black mx-auto overflow-hidden grid
          ${isLandscape ? 'grid-cols-5 grid-rows-4' : 'grid-cols-4 grid-rows-5'}
        `}
      >
        {/* We render exactly 20 plates. 
           (5x4 = 20, 4x5 = 20)
        */}
        {Array.from({ length: 20 }).map((_, index) => (
            <Plates />
        ))}
        
      </main>
  );
};

export default PlatedBackground;