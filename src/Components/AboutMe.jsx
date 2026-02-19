import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PortraitAnimation from './design-components/PortraitAnimation';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const tiltContainerRef = useRef(null);

  useGSAP(() => {
    // 1. Unfolding Tilt Animation (Same as before)
    gsap.fromTo(tiltContainerRef.current, 
      { 
        rotateX: 40, 
        opacity: 0,
        y: 100, 
        transformOrigin: "bottom center" 
      },
      {
        rotateX: 0,
        opacity: 1,
        y: 0,
        ease: "power1.out", 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",      
          end: "center center",  
          scrub: 1,              
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className='w-screen h-fit bg-transparent text-white flex items-center justify-center py-20 overflow-hidden'>
        
        <div className='w-full p-2 lg:p-8 mx-auto' style={{ perspective: '1000px' }}>
            
            <div 
                ref={tiltContainerRef} 
                className='w-full h-full transform-gpu will-change-transform relative overflow-hidden'
                style={{ transformStyle: 'preserve-3d' }}
            >

                {/* --- INNER CONTENT WRAPPER --- */}
                <div className="relative w-full h-fit px-4 pb-[50vw] sm:pb-[40vw] md:pb-[35vw] lg:pb-[30vw] z-10">
    
                    {/* --- LOWER LEFT: PORTRAIT BOX --- */}
                    {/* Positioned absolutely to the bottom left corner */}
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-[40vw] sm:w-[30vw] md:w-[25vw] lg:w-[18vw] aspect-square bg-transparent z-20 flex items-center justify-center p-4">
                        <PortraitAnimation />
                        {/* Decorative Inner Frame */}
                    </div>

                    {/* --- FOREGROUND: BIOGRAPHY TEXT --- */}
                    {/* Centered but with a max-width to keep it readable, pushed slightly up to balance the portrait */}
                    <div className="relative z-10 w-full text-center lg:pb-12 text-white">
                        
                        {/* --- FOREGROUND: BIOGRAPHY TEXT --- */}
                        {/* self-start forces this block to the very top of the container, balancing the bottom-left portrait */}
                        <div className="relative z-10 w-full self-start text-left lg:ml-auto text-white mt-4 lg:mt-0">
                            
                            <div className="font-serif lato font-medium text-xl md:text-2xl lg:text-5xl 2xl:text-7xl pt-2 px-2 lg:pt-10 leading-[1em] text-amber-200/90 drop-shadow-md">
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hi, I'm Jurist—a Filipino web designer and full-stack developer who loves problem-solving and crafting attention-grabbing, interactive experiences. As a dedicated React developer specializing in tools like ThreeJS and GSAP, my mission is to stray from standard trends and inject daring personality into the work I create.
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
        
    </section>
  )
}

export default AboutMe