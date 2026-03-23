import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const boxRef = useRef(null); // Added ref specifically for the scalable inner box

  useGSAP(() => {
    let isHovering = false;

    const moveCursor = (e) => {
      // Check if we are hovering over an element with the class (or its children)
      const target = e.target.closest('.cursor-effect');

      if (target) {
        // --- EMBODY STATE ---
        if (!isHovering) {
          isHovering = true;
          // Swap border colors using Tailwind classes
          boxRef.current.classList.remove('border-black/5');
          boxRef.current.classList.add('border-accent');
        }

        const rect = target.getBoundingClientRect();

        // Snap wrapper to the exact center of the target element
        gsap.to(cursorRef.current, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          duration: 0.3,
          ease: "power3.out"
        });

        // Expand the inner box to match the element's exact size
        gsap.to(boxRef.current, {
          width: rect.width,
          height: rect.height,
          duration: 0.3,
          ease: "power3.out"
        });

      } else {
        // --- DEFAULT STATE ---
        if (isHovering) {
          isHovering = false;
          // Revert border colors
          boxRef.current.classList.remove('border-accent');
          boxRef.current.classList.add('border-black/5');
          
          // Revert back to original 20x20 size
          gsap.to(boxRef.current, {
            width: 20,
            height: 20,
            duration: 0.3,
            ease: "power3.out"
          });
        }

        // Follow the mouse (switched to .to from .set for a microscopic smoothness)
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1, 
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const cornerClass = "absolute w-[4px] h-[4px] bg-black";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center"
    >
      {/* Inner Box: 
        1. We removed w-5 h-5 and manage size via GSAP inline styles (starts at 20px).
        2. Added transition-colors so the border color swap is smooth.
      */}
      <div 
        ref={boxRef}
        className="relative border-[1px] border-black/5 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
        style={{ width: 20, height: 20 }}
      >
        <div className={`${cornerClass} top-0 left-0 -translate-x-[50%] -translate-y-[50%]`} />
        <div className={`${cornerClass} top-0 right-0 translate-x-[50%] -translate-y-[50%]`} />
        <div className={`${cornerClass} bottom-0 left-0 -translate-x-[50%] translate-y-[50%]`} />
        {/* Note: I fixed the translate-y-[75%] typo to 50% so it stays perfectly symmetrical when scaling */}
        <div className={`${cornerClass} bottom-0 right-0 translate-x-[50%] translate-y-[50%]`} />
      </div>
    </div>
  );
};

export default CustomCursor;