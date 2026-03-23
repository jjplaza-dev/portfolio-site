import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechStackSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const stacks = [
    { title: "Frontend Stack", items: ["React", "Next", "Tailwind", "GSAP"] },
    { title: "Backend Systems", items: ["Supabase", "Node", "MongoDB"] },
    { title: "Development Tools", items: ["Figma", "VS Code", "Figma", "Stitch"] }
  ];

  useGSAP(() => {
    const allItems = gsap.utils.toArray('.stack-item');

    gsap.fromTo(allItems,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  // Hover Effect: Magnetic Pull
  const onMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(target, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onMouseLeave = (target) => {
    gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section ref={sectionRef} className='section-box border-b border-black/10 bg-inherit overflow-hidden'>
      <div className='w-full flex section-title'>
        <div>STACKS AND TOOLS</div>
      </div>

      <div ref={containerRef} className='inner-section flex flex-col gap-10 border-l border-black/5 ml-4 lg:ml-10'>
        {stacks.map((stack, sIndex) => (
          <div key={sIndex} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">
                {stack.title}
              </p>
              <div className="h-[1px] flex-grow bg-black/5" />
            </div>

            <div className='flex flex-wrap gap-4 ml-2'>
              {stack.items.map((item, iIndex) => (
                <div 
                  key={iIndex}
                  onMouseMove={(e) => onMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => onMouseLeave(e.currentTarget)}
                  className='stack-item group relative w-20 lg:w-30 aspect-square border-[0.5px] border-black/10 flex flex-col justify-center items-center cursor-crosshair backdrop-blur-sm transition-colors hover:border-black/40'
                >
                  <div className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity" />

                  <span className='text-[10px] text-black/30 mb-2 font-mono'>0{iIndex + 1}</span>
                  <div className='text-[12px] font-medium tracking-tight uppercase'>{item}</div>

                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;