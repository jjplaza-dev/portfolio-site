import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { id: 1, title: "Project One", desc: "Description for project one.", color: "bg-blue-900/10" },
  { id: 2, title: "Project Two", desc: "Description for project two.", color: "bg-blue-900/10" },
  { id: 3, title: "Project Three", desc: "Description for project three.", color: "bg-blue-900/10" },
  { id: 4, title: "Project Four", desc: "Description for project four.", color: "bg-blue-900/10" },
];

// --- SPLIT TEXT COMPONENT ---
const SplitText = ({ text }) => {
  return (
    <span className="inline-block overflow-hidden leading-none pb-3.5 pt-1.5 -my-2">
        {text.split('').map((char, i) => (
            <span 
                key={i} 
                className="char inline-block py-2 will-change-transform"
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
  // We need a ref to store the currently running animation timeline
  const tlRef = useRef(null);
  
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
            // Rounding ensures we snap to the closest index cleanly
            const index = gsap.utils.clamp(0, scrollLength, Math.round(self.progress * scrollLength));
            setActiveIndex((prev) => (prev !== index ? index : prev));
        }
    });
  }, { scope: containerRef });


  // --- 2. BIDIRECTIONAL TEXT ANIMATION ---
  useGSAP(() => {
    const currentIndex = activeIndex;
    const previousIndex = prevIndexRef.current;

    // Skip if no change (initial render handled by CSS/HTML structure usually)
    if (currentIndex === previousIndex) return;

    // --- CRITICAL FIX: MANAGE TIMELINES ---
    // If a timeline is currently active (user scrolled fast), 
    // force it to finish immediately (progress(1)) then kill it.
    // This snaps the previous text out instantly so the new text can come in.
    if (tlRef.current) {
        tlRef.current.progress(1).kill();
    }

    const currentSlide = projectRefs.current[currentIndex];
    const prevSlide = projectRefs.current[previousIndex];

    if (!currentSlide || !prevSlide) return;

    // --- CLEANUP "SKIPPED" SLIDES ---
    // If user jumps from 1 to 4 fast, make sure 2 and 3 are hidden
    PROJECTS.forEach((_, i) => {
        if (i !== currentIndex && i !== previousIndex) {
            gsap.set(projectRefs.current[i], { zIndex: 0, visibility: 'hidden' });
        }
    });

    // Determine Direction
    const isNext = currentIndex > previousIndex;
    const exitTo = isNext ? -120 : 120; 
    const enterFrom = isNext ? 120 : -120; 

    // Select Elements
    const prevChars = prevSlide.querySelectorAll('.char');
    const prevDesc = prevSlide.querySelectorAll('.desc-line');
    
    const currentChars = currentSlide.querySelectorAll('.char');
    const currentDesc = currentSlide.querySelectorAll('.desc-line');

    // Create a new timeline and store it in the ref
    const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut', duration: 0.6 },
        onComplete: () => {
            // Cleanup previous slide specifically after animation ends
            gsap.set(prevSlide, { visibility: 'hidden', zIndex: 0 });
        }
    });
    
    tlRef.current = tl;

    // --- STEP 1: SETUP ---
    // Ensure current slide is visible and on top
    gsap.set(currentSlide, { zIndex: 10, visibility: 'visible' });
    gsap.set(prevSlide, { zIndex: 5, visibility: 'visible' }); // Keep prev visible during exit
    
    // Prepare Enter positions
    gsap.set(currentChars, { yPercent: enterFrom });
    gsap.set(currentDesc, { yPercent: enterFrom, opacity: 0 });

    // --- STEP 2: ANIMATE ---
    tl.to(prevChars, {
        yPercent: exitTo,
        stagger: 0.02,
    })
    .to(prevDesc, {
        yPercent: exitTo,
        opacity: 0,
        stagger: 0.05
    }, "<0.1")
    .to(currentChars, {
        yPercent: 0,
        stagger: 0.02,
    }, "<0.1") // Overlap the entry slightly for smoothness
    .to(currentDesc, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05
    }, "<0.2");

    prevIndexRef.current = currentIndex;

  }, [activeIndex]);

  return (
    <main ref={containerRef} className='w-full h-screen relative overflow-hidden bg-black'>
        
        {/* BACKGROUND LAYER */}
        <div className={`absolute inset-0 transition-colors duration-700 ease-in-out ${activeProject.color}`} />

        {/* CONTENT LAYER */}
        <div className='relative z-10 w-full h-full'>
            
            {PROJECTS.map((project, i) => (
                <div 
                    key={project.id}
                    ref={el => projectRefs.current[i] = el}
                    className='absolute inset-0 w-full h-full mt-[15%] lg:ml-[5%] flex flex-col items-center lg:items-start justify-start text-white'
                    style={{ 
                        // Only show the first one initially, let GSAP handle the rest
                        visibility: i === 0 ? 'visible' : 'hidden',
                        zIndex: i === 0 ? 10 : 0
                    }}
                >
                    <div className='text-center lg:text-left p-4 max-w-4xl'>
                        
                        {/* ID */}
                        <div className='overflow-hidden mb-6'>
                            <span className='desc-line block font-mono opacity-50 tracking-widest text-sm'>
                                0{project.id} / 0{PROJECTS.length}
                            </span>
                        </div>

                        {/* TITLE */}
                        <div className='overflow-hidden mb-4 pb-2 -my-2'>
                            <h2 className='text-6xl font-black tracking-tighter merienda-regular'>
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
        </div>

    </main>
  )
}

export default ProjectSection