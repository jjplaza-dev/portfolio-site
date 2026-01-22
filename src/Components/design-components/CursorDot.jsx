import React, { useEffect, useRef, useState } from 'react'

const CursorDot = () => {
  const dotRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 1. Handle Cursor Movement (Direct DOM manipulation for performance)
    const moveCursor = (e) => {
      if (dotRef.current) {
        // Translate X and Y, and offset by -50% to center the dot on the pointer
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // 2. Handle Hover States (Bubbling events)
    const checkHover = (e) => {
      // Check if the target is a button or inside a button
      const isButton = e.target.closest('button') || e.target.tagName === 'A' || e.target.getAttribute('role') === 'button';
      setIsHovered(!!isButton);
    };

    window.addEventListener('mousemove', moveCursor);
    // 'mouseover' bubbles up, so we can detect hover on any child element
    document.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', checkHover);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] transition-[width,height,opacity] duration-300 ease-out
        ${isHovered ? 'w-12 h-12 opacity-50' : 'w-3 h-3 opacity-100'}
      `}

    />
  )
}

export default CursorDot