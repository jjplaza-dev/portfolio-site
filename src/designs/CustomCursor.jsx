import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const quickToX = useRef(null);
  const quickToY = useRef(null);
  const isLocked = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Initialize position tracking
    quickToX.current = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
    quickToY.current = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" });

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      // If we aren't locked to a button, follow the mouse coordinates
      if (!isLocked.current) {
        quickToX.current(e.clientX);
        quickToY.current(e.clientY);
      }
    };

    const handleOver = (e) => {
      const target = e.target.closest('button, a, .clickable');
      if (!target) return;

      isLocked.current = true;
      const rect = target.getBoundingClientRect();
      const { borderRadius } = window.getComputedStyle(target);

      // 1. Move the cursor center to the button center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      quickToX.current(centerX);
      quickToY.current(centerY);

      // 2. Expand the size
      gsap.to(cursor, {
        width: rect.width + 10,
        height: rect.height + 10,
        borderRadius: borderRadius,
        borderWidth: "4px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleOut = (e) => {
      const target = e.target.closest('button, a, .clickable');
      if (!target) return;

      isLocked.current = false;

      // Shrink and the next MouseMove will naturally pick up the position
      gsap.to(cursor, {
        width: 20,
        height: 20,
        borderRadius: "4px",
        borderWidth: "2px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:relative border-white mix-blend-difference"
      style={{
        width: '20px',
        height: '20px',
        borderWidth: '2px',
        borderStyle: 'solid',
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default CustomCursor;