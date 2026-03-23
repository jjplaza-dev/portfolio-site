import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Works = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    // fromTo guarantees the starting position so it never "snaps" in early
    gsap.fromTo(
      pageRef.current,
      { y: '100vh' }, 
      { 
        y: '0', 
        duration: 0.8, 
        ease: 'power4.out',
        delay: 0.1 // Gives the browser a tiny buffer to process the render
      }
    );
  }, []);

  return (
    // 'translate-y-[100vh]' forces it off-screen on the very first frame
    <div 
      ref={pageRef} 
      className="h-screen w-full bg-primary text-black flex flex-col justify-center px-4 md:px-10 translate-y-[100vh] will-change-transform"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between border-b border-black pb-8">
        <h1 className="text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none">Works</h1>
        <p className="font-mono text-sm uppercase mb-2 md:mb-4">Selected Projects [3]</p>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-8 flex flex-col gap-4">
        {['Digital Archive', 'Static Motion', 'Neural Flow'].map((project, i) => (
          <div key={i} className="group flex justify-between items-center cursor-pointer hover:bg-black hover:text-white transition-colors p-4 -mx-4">
            <h2 className="text-3xl md:text-5xl uppercase font-bold tracking-tighter">{project}</h2>
            <span className="font-mono text-xs opacity-50 group-hover:opacity-100">0{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;