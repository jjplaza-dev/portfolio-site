import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useGSAP(() => {
    const moveCursor = (e) => {
      // We use gsap.set for instant, high-performance updates
      gsap.set(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Shared classes for the 2x2 corner squares
  const cornerClass = "absolute w-[4px] h-[4px] bg-black";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{ x: -100, y: -100 }} // Start off-screen
    >
      {/* Main Square: 32px size, transparent bg, 0.5px border */}
      <div className="relative w-5 h-5 border-[1px] border-black/5 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        
        {/* Top Left Corner */}
        <div className={`${cornerClass} top-0 left-0 -translate-x-[50%] -translate-y-[50%]`} />
        
        {/* Top Right Corner */}
        <div className={`${cornerClass} top-0 right-0 translate-x-[50%] -translate-y-[50%]`} />
        
        {/* Bottom Left Corner */}
        <div className={`${cornerClass} bottom-0 left-0 -translate-x-[50%] translate-y-[50%]`} />
        
        {/* Bottom Right Corner */}
        <div className={`${cornerClass} bottom-0 right-0 translate-x-[50%] translate-y-[75%]`} />
        
      </div>
    </div>
  );
};

export default CustomCursor;