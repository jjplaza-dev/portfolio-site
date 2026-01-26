import React, { useEffect, useMemo, useRef, useState } from 'react';

// --- THE 5x8 PIXEL FONT MAP ---
// 1 = Pixel On, 0 = Pixel Off
const FONT_MAP = {
  A: ['01110','10001','10001','11111','10001','10001','10001','00000'],
  B: ['11110','10001','10001','11110','10001','10001','11110','00000'],
  C: ['01110','10001','10000','10000','10000','10001','01110','00000'],
  D: ['11110','10001','10001','10001','10001','10001','11110','00000'],
  E: ['11111','10000','10000','11110','10000','10000','11111','00000'],
  F: ['11111','10000','10000','11110','10000','10000','10000','00000'],
  G: ['01110','10001','10000','10011','10001','10001','01110','00000'],
  H: ['10001','10001','10001','11111','10001','10001','10001','00000'],
  I: ['01110','00100','00100','00100','00100','00100','01110','00000'],
  J: ['00111','00001','00001','00001','00001','10001','01110','00000'],
  K: ['10001','10010','10100','11000','10100','10010','10001','00000'],
  L: ['10000','10000','10000','10000','10000','10000','11111','00000'],
  M: ['10001','11011','10101','10001','10001','10001','10001','00000'],
  N: ['10001','11001','10101','10011','10001','10001','10001','00000'],
  O: ['01110','10001','10001','10001','10001','10001','01110','00000'],
  P: ['11110','10001','10001','11110','10000','10000','10000','00000'],
  Q: ['01110','10001','10001','10001','10101','10010','01101','00000'],
  R: ['11110','10001','10001','11110','10100','10010','10001','00000'],
  S: ['01111','10000','10000','01110','00001','00001','11110','00000'],
  T: ['11111','00100','00100','00100','00100','00100','00100','00000'],
  U: ['10001','10001','10001','10001','10001','10001','01110','00000'],
  V: ['10001','10001','10001','10001','10001','01010','00100','00000'],
  W: ['10001','10001','10001','10001','10101','11011','10001','00000'],
  X: ['10001','10001','01010','00100','01010','10001','10001','00000'],
  Y: ['10001','10001','01010','00100','00100','00100','00100','00000'],
  Z: ['11111','00001','00010','00100','01000','10000','11111','00000'],
  ' ': ['00000','00000','00000','00000','00000','00000','00000','00000'],
  '0': ['01110','10011','10101','10101','10101','11001','01110','00000'],
  '1': ['00100','01100','00100','00100','00100','00100','01110','00000'],
  '2': ['01110','10001','00001','00010','00100','01000','11111','00000'],
  '3': ['11110','00001','00001','00110','00001','00001','11110','00000'],
  '4': ['00010','00110','01010','10010','11111','00010','00010','00000'],
  '5': ['11111','10000','11110','00001','00001','10001','01110','00000'],
  '6': ['01110','10000','11110','10001','10001','10001','01110','00000'],
  '7': ['11111','00001','00010','00100','01000','10000','10000','00000'],
  '8': ['01110','10001','10001','01110','10001','10001','01110','00000'],
  '9': ['01110','10001','10001','10001','01111','00001','01110','00000'],
  '?': ['01110','10001','00010','00100','00100','00000','00100','00000'],
  '.': ['00000','00000','00000','00000','00000','00000','00100','00000'],
  '!': ['00100','00100','00100','00100','00100','00000','00100','00000'],
  '-': ['00000','00000','00000','11111','00000','00000','00000','00000'],
};

const PixelUnit = ({ pixel, size}) => {
  const [mounted, setMounted] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  
  // 1. Random Start Position (Left/Right)
  const startX = useRef(Math.random() > 0.5 ? '100vw' : '-100vw');
  
  // 2. Random Start Rotation (-360deg to 360deg)
  const startRotation = useRef(Math.floor(Math.random() * 720) - 360);

  useEffect(() => {
    if (pixel === '0') return;

    // Random Delay before starting (100ms - 2000ms)
    const delay = Math.floor(Math.random() * 1000) + 200;
    // Animation Duration (must match CSS transition duration)
    const duration = 1000; 

    // Step A: Trigger the fly-in
    const startTimer = setTimeout(() => {
      setMounted(true);
    }, delay);

    // Step B: Cleanup inline styles so Hover effects work again
    const cleanupTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, delay + duration);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(cleanupTimer);
    };
  }, [pixel]);

  // Determine the current Transform state
  const getTransform = () => {
    // Phase 1: Waiting (Off-screen, rotated)
    if (!mounted) {
      return `translate3d(${startX.current}, 0, 0) rotate(${startRotation.current}deg)`;
    }
    // Phase 2: Finished (Clear style so CSS hover:scale works)
    if (animationFinished) {
      return undefined; 
    }
    // Phase 3: Animating (Moving to center, rotating to 0)
    return `translate3d(0, 0, 0) rotate(0deg)`;
  };

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    
    // --- ANIMATION LOGIC ---
    // 1. Opacity: 0 -> 1
    opacity: mounted ? 1 : 0,
    // 2. Transform: Off-screen/Rotated -> Center/Flat
    transform: getTransform(),

    // --- TRANSITION TUNING ---
    // Transform: Standard ease-out for movement
    // Opacity: 'ease-in' + slightly longer duration ensures it stays invisible longer 
    // and only fades in "nearing the end"
    transition: `
      transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), 
      opacity 1s ease-in
    `,

    backgroundColor: pixel === '1' ? 'white' : 'transparent',
    boxShadow: pixel === '1' ? '0 0 2px rgba(255,255,255,0.3)' : 'none'
  };

  return (
    <div
      style={style}
      className={`${pixel === '1' ? 'bg-white will-change-transform' : 'bg-transparent'}`}
    />
  );
};

// Main Component (Untouched logic)
const PixelWordAnimated = ({ text = "HELLO", size = 4, gap = 1 }) => {
  const characters = useMemo(() => {
    return text.toString().toUpperCase().split('');
  }, [text]);

  return (
    <div className="flex" style={{ gap: `${gap * size}px` }}>
      {characters.map((char, charIndex) => {
        const charData = FONT_MAP[char] || FONT_MAP['?'];
        return (
          <div 
            key={charIndex} 
            className="grid grid-cols-5"
            style={{ width: `${5 * size}px` }}
          >
            {charData.map((row, rowIndex) => (
              row.split('').map((pixel, colIndex) => (
                <PixelUnit 
                  key={`${rowIndex}-${colIndex}`}
                  pixel={pixel}
                  size={size}
                />
              ))
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PixelWordAnimated;