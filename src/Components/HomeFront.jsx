import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const HomeFront = () => {
  const sectionRef = useRef(null);        
  const scrollWrapperRef = useRef(null);  // Handles Scale & Y (Carries the 3D Camera)
  const tiltRef = useRef(null);           // Handles Tilt & Opacity fade
  
  // Refs for high-performance GSAP updates
  const xSet = useRef();
  const ySet = useRef();
  const rotXSet = useRef();
  const rotYSet = useRef();

  useEffect(() => {
    if (!tiltRef.current || !scrollWrapperRef.current) return;

    // --- 1. 3D TRACKING SETUP ---
    // Stronger base tilt (40) for that pronounced bottom-heavy look
    const BASE_TILT = 30;

    gsap.set(tiltRef.current, { 
        rotateX: BASE_TILT, 
        transformOrigin: "center center" 
    });

    xSet.current = gsap.quickTo(tiltRef.current, "x", { duration: 0.8, ease: "power3.out" });
    ySet.current = gsap.quickTo(tiltRef.current, "y", { duration: 0.8, ease: "power3.out" });
    rotXSet.current = gsap.quickTo(tiltRef.current, "rotateX", { duration: 0.8, ease: "power3.out" });
    rotYSet.current = gsap.quickTo(tiltRef.current, "rotateY", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
        const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
        const yNorm = (e.clientY / window.innerHeight) * 2 - 1;
        
        const moveX = xNorm * 30; 
        const moveY = yNorm * 30; 
        
        // Dynamic tilt based on mouse position
        const rotX = BASE_TILT - (yNorm * 15); 
        const rotY = xNorm * 10; 

        xSet.current(moveX);
        ySet.current(moveY);
        rotXSet.current(rotX);
        rotYSet.current(rotY);
    };

    const handleMouseLeave = () => {
        xSet.current(0);
        ySet.current(0);
        rotXSet.current(BASE_TILT); 
        rotYSet.current(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // --- 2. TRACING TEXT ANIMATION ---
    const textTl = gsap.timeline();
    
    textTl.fromTo('.trace-text', 
        { 
            strokeDasharray: 2000, 
            strokeDashoffset: 2000, 
            fill: 'rgba(255, 255, 255, 0)' 
        },
        { 
            strokeDashoffset: 0, 
            duration: 3, 
            ease: "power2.inOut",
        }
    ).to('.trace-text', {
        fill: 'rgba(255, 255, 255, 1)', 
        duration: 0.5,
        ease: "power1.out"
    }, "-=0.5"); 

    // --- 3. SCROLL AWAY EFFECT ---
    // We use a timeline so we can animate the wrapper (scale/y) and the tiltRef (opacity) simultaneously
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "center top",
            scrub: 1, 
        }
    });

    // Animate the Camera Wrapper (Scale + Move Up)
    scrollTl.to(scrollWrapperRef.current, {
        y: "-30vh", 
        scale: 0.4, 
        ease: "power1.out",
    }, 0)
    // Animate the Opacity on the inner container to prevent CSS 3D flattening
    .to(tiltRef.current, {
        opacity: 0,
        ease: "power1.out"
    }, 0);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        textTl.kill(); 
        if (scrollTl.scrollTrigger) scrollTl.scrollTrigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className='w-screen h-screen bg-base-300 text-white overflow-hidden flex items-center justify-center'>
        {/* Outside the change your perspective text */}


        <div ref={scrollWrapperRef} className="w-full h-full flex items-center justify-center will-change-transform" style={{ perspective: '600px' }} >
            {/* TILT CONTAINER - along with change your perspective text*/}


            <div 
                ref={tiltRef}
                className='w-full h-full flex flex-col justify-center items-center transform-gpu will-change-transform'
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* --- LINE 1: CHANGE YOUR --- */}
                <div className="relative w-fit flex justify-center items-center">
                    <div 
                        className='opacity-0 select-none font-[family-name:var(--font-scriptoria)] leading-none text-center' 
                        style={{ fontSize: 'clamp(2rem, 10vw + 2rem, 20rem)' }}
                    >
                        CHANGE YOUR
                    </div>

                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        <text 
                            x="50%" 
                            y="50%" 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            className="trace-text font-[family-name:var(--font-scriptoria)]"
                            style={{ fontSize: 'clamp(2rem, 10vw + 2rem, 20rem)' }}
                            stroke="white"
                            strokeWidth="2px"
                        >
                            CHANGE YOUR
                        </text>
                    </svg>
                </div>

                {/* --- LINE 2: PERSPECTIVE --- */}
                <div className="relative w-fit flex justify-center items-center">
                    <div 
                        className='opacity-0 select-none font-[family-name:var(--font-scriptoria)] leading-none text-center' 
                        style={{ fontSize: 'clamp(2rem, 10vw + 2rem, 20rem)' }}
                    >
                        PERSPECTIVE
                    </div>

                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        <text 
                            x="50%" 
                            y="50%" 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            className="trace-text font-[family-name:var(--font-scriptoria)]"
                            style={{ fontSize: 'clamp(2rem, 10vw + 2rem, 20rem)' }}
                            stroke="white"
                            strokeWidth="2px"
                        >
                            PERSPECTIVE
                        </text>
                    </svg>
                </div>
                
            </div>
        </div>
        
    </section>
  )
}

export default HomeFront