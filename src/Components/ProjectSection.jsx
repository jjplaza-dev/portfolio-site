import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Philaya", desc: "A full-on Media and News website." },
  { id: 2, title: "Verdant Void", desc: "A deck-building rogue-like card game utilizing React, Zustand, and GSAP for seamless card transitions." },
  { id: 3, title: "Gallria", desc: "A photography site." },
  { id: 4, title: "Surveyour", desc: "A survey and poll app." },
];

const ProjectSection = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    // 1. Calculate how far left the horizontal track needs to move.
    // If there are 4 projects, the track is 400vw wide. We move it -75% so the last 100vw is visible.
    const xOffset = -100 * ((PROJECTS.length - 1) / PROJECTS.length);

    gsap.to(horizontalRef.current, {
      xPercent: xOffset,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // 0.5 second smoothing effect as you scroll
      }
    });
  }, { scope: containerRef });

  return (
    // The main container provides the total vertical height (N * 100vh)
    <section ref={containerRef} className="relative w-full bg-base-300 text-white">

        {/* --- LAYER 1: HORIZONTAL PREVIEWS (Background Layer) --- */}
        {/* Absolute wrapper ensures it covers the whole height, but the sticky inner div pins it to the screen */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="sticky top-0 w-screen h-screen overflow-hidden">
                
                {/* The Horizontal Track */}
                <div 
                    ref={horizontalRef} 
                    className="flex h-screen"
                    style={{ width: `${PROJECTS.length * 100}vw` }} 
                >
                    {PROJECTS.map((proj, index) => (
                        // Each Preview Block: 100vw x 100vh, transparent background
                        <div key={`preview-${proj.id}`} className="w-screen h-screen flex items-center justify-end p-2 lg:p-8 bg-transparent">
                            
                            {/* Empty Placeholder Box (Positioned to the right) */}
                            <div className="w-full h-full border border-white/20 rounded-3xl bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-2xl pointer-events-auto">
                                <span className="font-mono text-white/30 tracking-widest uppercase">
                                    Preview Media {index + 1}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>


        {/* --- LAYER 2: VERTICAL TEXT (Foreground Layer) --- */}
        {/* Relative z-10 puts this text on top of the images. Pointer-events-auto makes buttons clickable. */}
        <div className="relative z-10 w-full pointer-events-none">
            {PROJECTS.map((proj, index) => (
                // Each Text Block: 100vw x 100vh, transparent background
                <div key={`text-${proj.id}`} className="w-screen h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 bg-transparent pointer-events-none">
                    
                    {/* Text Container (Constrained width so it stays on the left) */}
                    <div className="w-fit pointer-events-auto">
                        
                        <h1 className="font-[family-name:var(--font-scriptoria)] text-nowrap mb-6 tracking-tighter">
                            {proj.title}
                        </h1>
                        
                    </div>

                </div>
            ))}
        </div>

    </section>
  )
}

export default ProjectSection;