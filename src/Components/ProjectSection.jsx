import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { id: 1, title: "Project One", desc: "Description for project one.", color: "bg-red-500" },
  { id: 2, title: "Project Two", desc: "Description for project two.", color: "bg-blue-500" },
  { id: 3, title: "Project Three", desc: "Description for project three.", color: "bg-green-500" },
  { id: 4, title: "Project Four", desc: "Description for project four.", color: "bg-purple-500" },
];

// --- SPLIT TEXT COMPONENT ---
// Ensures overflow hidden is applied tightly around the text line
const SplitText = ({ text }) => {
  return (
    // 'overflow-hidden' here acts as the mask
    // 'leading-none' helps prevent line-height issues with the mask
    <span className="inline-block overflow-hidden leading-none py-2 -my-2">
        {text.split('').map((char, i) => (
            <span 
                key={i} 
                className="char inline-block will-change-transform"
                style={{ whiteSpace: 'pre' }} 
            >
                {char}
            </span>
        ))}
    </span>
  );
};

const ProjectSection = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]); 
  
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  
  const activeProject = PROJECTS[activeIndex];

  // --- 1. PINNING LOGIC ---
  useGSAP(() => {
    const scrollLength = PROJECTS.length - 1;

    ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollLength * 100}%`, 
        pin: true, 
        scrub: 0.5,
        onUpdate: (self) => {
            const index = gsap.utils.clamp(0, scrollLength, Math.round(self.progress * scrollLength));
            setActiveIndex((prev) => (prev !== index ? index : prev));
        }
    });
  }, { scope: containerRef });


  // --- 2. BIDIRECTIONAL TEXT ANIMATION ---
  useGSAP(() => {
    const currentIndex = activeIndex;
    const previousIndex = prevIndexRef.current;

    if (currentIndex === previousIndex) return;

    const currentSlide = projectRefs.current[currentIndex];
    const prevSlide = projectRefs.current[previousIndex];

    if (!currentSlide || !prevSlide) return;

    // --- A. DETERMINE DIRECTION ---
    // If current > previous, we are going DOWN (Next) -> Animate UP
    // If current < previous, we are going UP (Prev) -> Animate DOWN
    const isNext = currentIndex > previousIndex;
    
    // Moves to -120% (Up) or 120% (Down)
    const exitTo = isNext ? -120 : 120; 
    
    // Starts from 120% (Bottom) or -120% (Top)
    const enterFrom = isNext ? 120 : -120; 

    // --- B. SELECT ELEMENTS ---
    const prevChars = prevSlide.querySelectorAll('.char');
    const prevDesc = prevSlide.querySelectorAll('.desc-line');
    
    const currentChars = currentSlide.querySelectorAll('.char');
    const currentDesc = currentSlide.querySelectorAll('.desc-line');

    const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut', duration: 0.6 }
    });

    // --- STEP 1: EXIT PREVIOUS ---
    tl.to(prevChars, {
        yPercent: exitTo,
        stagger: 0.02,
    })
    .to(prevDesc, {
        yPercent: exitTo,
        opacity: 0,
        stagger: 0.05
    }, "<0.1");


    // --- STEP 2: ENTER NEW ---
    // Set initial state based on direction
    gsap.set(currentSlide, { zIndex: 10, visibility: 'visible' });
    gsap.set(prevSlide, { zIndex: 0 }); 
    
    gsap.set(currentChars, { yPercent: enterFrom });
    gsap.set(currentDesc, { yPercent: enterFrom, opacity: 0 });

    // Animate to neutral
    tl.to(currentChars, {
        yPercent: 0,
        stagger: 0.02,
    }, "<0.2") 
    .to(currentDesc, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05
    }, "<0.2");


    prevIndexRef.current = currentIndex;

  }, [activeIndex]);

  return (
    <main ref={containerRef} className='w-full h-screen relative overflow-hidden'>
        
        {/* BACKGROUND LAYER */}
        <div className={`absolute inset-0 transition-colors duration-700 ease-in-out ${activeProject.color}`} />

        {/* CONTENT LAYER */}
        <div className='relative z-10 w-full h-full'>
            
            {PROJECTS.map((project, i) => (
                <div 
                    key={project.id}
                    ref={el => projectRefs.current[i] = el}
                    className='absolute inset-0 w-full h-full mt-[5%] lg:ml-[5%] flex flex-col items-center lg:items-start justify-start text-white'
                    style={{ 
                        visibility: i === 0 ? 'visible' : 'hidden' 
                    }}
                >
                    <div className='text-center p-4 max-w-4xl'>
                        
                        {/* ID */}
                        <div className='overflow-hidden mb-6'>
                            <span className='desc-line block font-mono opacity-50 tracking-widest text-sm'>
                                0{project.id} / 0{PROJECTS.length}
                            </span>
                        </div>

                        {/* TITLE */}
                        {/* Added extra padding wrapper to prevent clipping */}
                        <div className='overflow-hidden mb-4 pb-2 -my-2'>
                            <h2 className='text-6xl font-black tracking-tighter'>
                                <SplitText text={project.title} />
                            </h2>
                        </div>

                        {/* DESCRIPTION */}
                        <div className='overflow-hidden py-1'>
                            <p className='desc-line text-xl opacity-90 font-light block'>
                                {project.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* PROGRESS BAR */}
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden z-20'>
                <div 
                    className='h-full bg-white transition-all duration-300 ease-out'
                    style={{ width: `${((activeIndex) / (PROJECTS.length - 1)) * 100}%` }}
                />
            </div>
            
        </div>

    </main>
  )
}

export default ProjectSection