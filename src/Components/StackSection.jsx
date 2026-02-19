import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const StackSection = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(() => {
    // Grab all elements with the 'stack-item' class inside this section
    const items = gsap.utils.toArray('.stack-item', sectionRef.current);
    
    // Staggered reveal animation
    gsap.fromTo(items, 
      { 
        y: 40, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1, // 0.1s delay between each item animating in
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers when the top of the section is 75% down the viewport
        }
      }
    );
  }, { scope: sectionRef });

  // Your specific tech stack organized by domain
  const techStack = [
    { category: "Creative Front", items: ["React", "ThreeJS", "GSAP", "Tailwind CSS"] },
    { category: "State & Logic", items: ["Zustand", "JavaScript", "Node.js"] },
    { category: "Architecture", items: ["Supabase", "PostgreSQL", "REST APIs"] }
  ];

  return (
    <section ref={sectionRef} className='w-screen min-h-screen bg-base-300 text-white py-24 flex flex-col justify-center px-2 md:px-4 lg:px-8 overflow-hidden'>
        
        <div className='max-w-7xl w-full mx-auto'>
            
            {/* Section Header */}
            <div className='flex items-center gap-4 mb-8 stack-item'>
                <div className='w-12 h-[1px] bg-amber-200/50'></div>
                <span className='font-mono text-amber-200/60 tracking-widest text-sm uppercase'>
                    // The Arsenal
                </span>
            </div>

            <h2 className='font-[family-name:var(--font-scriptoria)] text-6xl md:text-8xl mb-16 tracking-tighter stack-item'>
                TECH STACK
            </h2>

            {/* Tech Grid */}
            <div ref={listRef} className='grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-white/10 pt-16'>
                
                {techStack.map((group, idx) => (
                    <div key={idx} className='flex flex-col'>
                        <h3 className='font-mono text-xl text-amber-200/80 mb-8 uppercase tracking-widest stack-item'>
                            {group.category}
                        </h3>
                        <ul className='space-y-6'>
                            {group.items.map((tech, i) => (
                                <li 
                                    key={i} 
                                    className='text-4xl md:text-5xl lg:text-6xl font-light italic text-white/50 hover:text-white hover:translate-x-2 transition-all duration-300 stack-item cursor-default'
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </div>

    </section>
  )
}

export default StackSection