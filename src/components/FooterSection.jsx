import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const marqueeRef = useRef(null);

  const name = "Jurist John Plaza"; // Added a dash for separation in the marquee

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. INTRO ANIMATION (Letters up + Line Expand)
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });

      introTl.from(".char", {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
      })
      .to(lineRef.current, {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
      }, "-=0.2");

      // 2. MARQUEE LOOP
      // We animate the inner container (marqueeRef)
      const loop = gsap.to(marqueeRef.current, {
        xPercent: -50, // Move half the width (since we duplicated the content)
        ease: "none",
        duration: 120, // Adjust speed here
        repeat: -1,
      });

      // 3. SCROLL DIRECTION LOGIC
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // self.direction is 1 when scrolling down, -1 when scrolling up
          if (self.direction === 1) {
            gsap.to(loop, { timeScale: 1, duration: 0.5 }); // Smoothly move Right to Left
          } else {
            gsap.to(loop, { timeScale: -1, duration: 0.5 }); // Smoothly move Left to Right
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = "text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:text-accent transition-colors cursor-pointer";

  // Helper to render the name letters
  const renderName = () => (
    <div className="flex whitespace-nowrap px-4">
      {name.split("").map((char, i) => (
        <span key={i} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );

  return (
    <footer ref={containerRef} className='section-box bg-inherit'>
      

      <div className='w-full pt-5 relative group text-primary'>
        {/* The "Expand This" Line */}
        <div 
          ref={lineRef}
          className='absolute top-0 left-0 w-0 border-t border-black/20 z-1'
        />

        {/* Marquee Container */}
        <div className='overflow-hidden'>
          <div ref={marqueeRef} className="flex w-fit text-[clamp(2.5rem,7vw,10rem)] py-5 bg-secondary font-extralight leading-[0.8] tracking-normal uppercase pointer-events-none select-none">
            {renderName()}<span className='scale-50 opacity-50'> • </span>
            {renderName()}<span className='scale-50 opacity-50'> • </span>
            {renderName()}<span className='scale-50 opacity-50'> • </span>
            {renderName()}<span className='scale-50 opacity-50'> • </span>
          </div>
        </div>
      </div>

      <div className='border-t border-secondary/20 mt-5 flex flex-wrap justify-center md:justify-between items-center gap-8 pt-5 pb-10 px-5'>
        <div className='flex gap-8 md:gap-16'>
          <a href="/" className={`${linkClass} cursor-effect`}>Home</a>
          <a href="/works" className={`${linkClass} cursor-effect`}>Works</a>
          <a href="/contact" className={`${linkClass} cursor-effect`}>Contact</a>
          <a href="/about" className={`${linkClass} cursor-effect`}>About</a>
        </div>
        
        <button onClick={scrollToTop} className={`${linkClass} cursor-effect`}>
          Back To Top ↑
        </button>
      </div>
    </footer>
  );
};

export default FooterSection;