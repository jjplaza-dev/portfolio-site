import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Building digital interfaces that don't just sit there—they breathe, react, and resonate.", desc: "A full-on Media and News website." },
  { id: 2, title: "Turning static pixels into cinematic journeys through purposeful motion and GSAP-driven magic.", desc: "A deck-building rogue-like card game utilizing React, Zustand, and GSAP for seamless card transitions." },
  { id: 3, title: "Engineering the sweet spot between 'That looks cool' and 'This works perfectly.'", desc: "A photography site." },
];

const ProjectSection = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    const xOffset = -100 * ((PROJECTS.length - 1) / PROJECTS.length);

    gsap.to(horizontalRef.current, {
      xPercent: xOffset,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="sticky top-0 w-screen h-screen overflow-hidden">
                <div 
                    ref={horizontalRef} 
                    className="flex h-screen"
                    style={{ width: `${PROJECTS.length * 100}vw` }} 
                >
                    {PROJECTS.map((proj, index) => (
                        <div key={`preview-${proj.id}`} className="w-screen h-screen flex items-center justify-end p-2 lg:p-8 bg-transparent">
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

        <div className="relative z-10 w-full pointer-events-none">
           
            {PROJECTS.map((proj, index) => (
                <div key={`text-${proj.id}`} className="w-screen h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 bg-transparent pointer-events-none">
                    <div className="w-fit pointer-events-auto">
                        
                        <h2 className="font-[family-name:var(--font-scriptoria)] lg:w-[50vw] text-center mb-6 tracking-tighter">
                            {proj.title}
                        </h2>
                        
                    </div>
                </div>
            ))}
        </div>

    </section>
  )
}

export default ProjectSection;