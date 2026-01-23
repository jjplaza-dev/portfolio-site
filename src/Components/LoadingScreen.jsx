import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [hiddenSquares, setHiddenSquares] = useState(new Set());
  const [isLandscape, setIsLandscape] = useState(true);
  
  // New States for Sequence
  const [progress, setProgress] = useState(0);       // 0 - 100
  const [showBorders, setShowBorders] = useState(false); // Controls border opacity
  const [fadeText, setFadeText] = useState(false);   // Fades text out when squares start disappearing

  useEffect(() => {
    // Check orientation
    setIsLandscape(window.innerWidth > window.innerHeight);

    // --- PHASE 1: Loading Text (0s - 1.5s) ---
    const textInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(textInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    // --- PHASE 2: Borders Fade In (Starts at 1.5s) ---
    // Adjusted timing to match text finish (1500ms)
    const borderTimer = setTimeout(() => {
        setShowBorders(true);
    }, 2000); 

    // --- PHASE 3: Random Square Fade Out (Starts at 2.0s) ---
    let squareInterval;
    
    const startFadingTimer = setTimeout(() => {
        setFadeText(true);

        let availableIndices = Array.from({ length: 20 }, (_, i) => i);

        squareInterval = setInterval(() => {
            if (availableIndices.length === 0) return;

            const randomIndex = Math.floor(Math.random() * availableIndices.length);
            const targetId = availableIndices[randomIndex];
            availableIndices.splice(randomIndex, 1);

            setHiddenSquares(prev => {
                const newSet = new Set(prev);
                newSet.add(targetId);
                return newSet;
            });
        }, 100); 
    }, 2000);

    // --- CLEANUP: Unmount (Starts at 4.5s) ---
    const unmountTimer = setTimeout(() => {
      setVisible(false);
    }, 4500);

    return () => {
      clearInterval(textInterval);
      clearInterval(squareInterval);
      clearTimeout(borderTimer);
      clearTimeout(startFadingTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed w-screen h-screen inset-0 z-[99999] grid pointer-events-none bg-transparent
        ${isLandscape ? 'grid-cols-5 grid-rows-4' : 'grid-cols-4 grid-rows-5'}
      `}
    >
      {/* 1. The Grid of Squares */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          // FIX: Changed w-screen/h-screen to w-full/h-full
          className={`
            bg-black w-full h-full border-[0.5px] 
            transition-all duration-700 ease-out
            ${showBorders ? 'border-white/10' : 'border-transparent'} 
          `}
          // border-white/20 is subtle but visible. /100 is solid white.
          style={{ 
            opacity: hiddenSquares.has(i) ? 0 : 1 
          }}
        />
      ))}

      {/* 2. The Loading Text */}
      <div 
        className={`absolute bottom-5 right-10 text-white font-mono text-9xl font-bold tracking-tighter transition-opacity duration-500
            ${fadeText ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {progress}%
      </div>
    </div>
  )
}

export default LoadingScreen