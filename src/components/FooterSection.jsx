import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef(null);
  const shapeRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Configuration for the "Tail" delay
      const smoothDelay = 1.5; // Higher = more "liquid" delay/tail effect

      gsap.fromTo(shapeRef.current,
        {
          clipPath: "ellipse(120% 0% at 50% 100%)", 
        },
        {
          clipPath: "ellipse(160% 100% at 50% 100%)",
          ease: "none", // Scrub handles the easing/smoothing
          scrollTrigger: {
            trigger: footerRef.current,
            // Desktop starts later, Mobile starts at 30% from bottom (70% viewport)
            start: "top 85%", 
            end: "bottom bottom",
            scrub: smoothDelay, // This creates the "duration" and "delay" you requested
            invalidateOnRefresh: true,
          }
        }
      );

      // Text animation with a slightly different delay for a parallax effect
      gsap.fromTo(textRef.current,
        { 
            y: 150, 
            opacity: 0,
            skewY: 7 // Adds a sophisticated "unfolding" look
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 90%",
            scrub: 2, // Slower than the shape for a sense of depth
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full h-[70vh] md:h-[90vh] bg-transparent overflow-hidden"
    >
      <div
        ref={shapeRef}
        className="absolute bottom-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center"
        style={{ clipPath: 'ellipse(120% 0% at 50% 100%)' }}
      >
        <div className="text-center px-4">
          <h1 
            ref={textRef} 
            className="text-[15vw] leading-none font-bold text-white uppercase tracking-tighter"
          >
            Let's Talk
          </h1>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
            {['Instagram', 'LinkedIn', 'Dribbble', 'Twitter'].map((link) => (
              <a 
                key={link}
                href={`#${link}`}
                className="text-sm md:text-lg text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Branding/Copyright at bottom */}
        <div className="absolute bottom-10 w-full px-10 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
          <p>© 2026 YOUR PORTFOLIO</p>
          <p>BUILT WITH REACT & GSAP</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;