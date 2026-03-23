import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { y: '100vh' },
      { y: '0', duration: 0.8, ease: 'power4.out', delay: 0.1 }
    );
  }, []);

  return (
    <div 
      ref={pageRef} 
      className="h-screen w-full bg-primary text-black flex flex-col justify-center px-4 md:px-10 translate-y-[100vh] will-change-transform"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
        <h1 className="text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none border-b border-black pb-4 md:pb-8">
          About
        </h1>
        
        <div className="pb-4 md:pb-8">
          <p className="text-xl md:text-3xl font-medium leading-tight tracking-tight mb-8">
            We are a creative studio operating at the intersection of design, technology, and art. We build digital experiences that refuse to be ignored.
          </p>
          <div className="font-mono text-xs uppercase flex gap-10">
            <div>
              <span className="opacity-50 block mb-1">Location</span>
              <p>Manila, PH</p>
            </div>
            <div>
              <span className="opacity-50 block mb-1">Focus</span>
              <p>Creative Coding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;