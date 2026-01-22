import React, { useState, useEffect, useRef, createContext, useContext, useId } from 'react';

// 1. The Shared Brain (Context)
const PointsContext = createContext(null);

// 2. The Manager Component
export const MidPointsManager = ({ children }) => {
  const [activeLines, setActiveLines] = useState([]);
  
  // We store the actual DOM elements now, not just coordinates
  const elementsRef = useRef(new Map()); 
  // We track cursor in a Ref for calculation (instant access) and State for rendering
  const cursorRef = useRef({ x: -1000, y: -1000 });
  const [cursorState, setCursorState] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animationFrameId;
    let isTicking = false;

    // The heavy lifter: Calculates positions based on current Scroll & Mouse
    const updateCalculations = () => {
      isTicking = false;
      const mouseX = cursorRef.current.x;
      const mouseY = cursorRef.current.y;

      // Get all registered DOM elements
      const elements = Array.from(elementsRef.current.values());

      const withDistances = elements.map(({ id, element }) => {
        // ⚡ KEY FIX: Calculate position fresh on every frame/scroll
        // getBoundingClientRect() automatically accounts for scroll position
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const dx = x - mouseX;
        const dy = y - mouseY;

        return {
          id,
          x,
          y,
          distSq: dx * dx + dy * dy,
          dist: Math.hypot(dx, dy)
        };
      });

      // Filter: Nearest 8, within 300px
      const nearest = withDistances
        .sort((a, b) => a.distSq - b.distSq)
        .slice(0, 20)
        .filter(p => p.dist < 300);

      setActiveLines(nearest);
    };

    // Trigger update on next frame
    const requestUpdate = () => {
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(updateCalculations);
        isTicking = true;
      }
    };

    // Event Handlers
    const onMouseMove = (e) => {
      // Update refs immediately for the calculation engine
      cursorRef.current = { x: e.clientX, y: e.clientY };
      // Update state for the SVG render
      setCursorState({ x: e.clientX, y: e.clientY });
      requestUpdate();
    };

    const onScroll = () => {
      // On scroll, mouse stays still relative to screen, so we just recalc dots
      requestUpdate();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const registerPoint = (id, element) => {
    elementsRef.current.set(id, { id, element });
  };

  const unregisterPoint = (id) => {
    elementsRef.current.delete(id);
  };

  return (
    <PointsContext.Provider value={{ registerPoint, unregisterPoint }}>
      {children}
      
      <svg 
        className="fixed inset-0 pointer-events-none z-0 overflow-visible"
        style={{ width: '100vw', height: '100vh' }}
      >
        {activeLines.map(point => (
          <line
            key={point.id}
            x1={point.x}
            y1={point.y}
            x2={cursorState.x}
            y2={cursorState.y}
            stroke="gray"
            strokeWidth="2"
            opacity={Math.max(0, 1 - (point.dist / 300))} 
           
          />
        ))}
      </svg>
    </PointsContext.Provider>
  );
};

// 3. The Individual Dot Component
export const MidPoints = () => {
  const id = useId();
  const elRef = useRef(null);
  const { registerPoint, unregisterPoint } = useContext(PointsContext) || {};

  // Randomize: Only 20% of dots are "connectable"
  const isLucky = useRef(Math.random() < 0.2); 

  useEffect(() => {
    if (!registerPoint || !isLucky.current || !elRef.current) return;

    // Simply register the DOM element itself
    registerPoint(id, elRef.current);

    return () => {
      unregisterPoint(id);
    };
  }, [id, registerPoint, unregisterPoint]);

  return (
    <div 
      ref={elRef} 
      className="w-1 h-1 bg-black rounded-full relative z-0"
    ></div>
  );
};

const MidPointsExport = { MidPoints, MidPointsManager };
export default MidPointsExport;