import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const containerRef = useRef(null);
  const topPathRef = useRef(null);
  const bottomPathRef = useRef(null);

  useGSAP(() => {
    // Initial curve state (flat)
    // M=Move to, L=Line to, Q=Quadratic Bezier (ControlPointX, ControlPointY, EndX, EndY)
    // 0,0 is top-left. 100,100 is bottom-right of the SVG viewbox.
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom", // When top of footer hits bottom of viewport
      end: "bottom bottom", // When bottom of footer hits bottom of viewport
      scrub: 0, // Instant reaction to scroll
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        
        // --- CALCULATION ---
        // Max bulge depth. 50 is the middle of the SVG height.
        // We start at 0 (flat) and go to 50 (deep curve).
        const bendDepth = progress * 50; 

        // --- TOP PATH ANIMATION ---
        // Top block is 100% width, but the bottom edge curves DOWN.
        // M 0,0 -> Top Left
        // L 100,0 -> Top Right
        // L 100,0 -> Right edge (start of curve)
        // Q 50,${bendDepth} -> Control point in middle, pushing DOWN
        // 0,0 -> End at Left edge
        const topCurve = `M0,0 L100,0 L100,0 Q50,${bendDepth} 0,0 Z`;
        
        // --- BOTTOM PATH ANIMATION ---
        // Bottom block top edge curves UP.
        // M 0,100 -> Bottom Left
        // L 100,100 -> Bottom Right
        // L 100,100 -> Right edge (start of curve)
        // Q 50,${100 - bendDepth} -> Control point in middle, pushing UP
        // 0,100 -> End at Left edge
        const bottomCurve = `M0,100 L100,100 L100,100 Q50,${100 - bendDepth} 0,100 Z`;

        // Apply visual updates
        if(topPathRef.current) {
            topPathRef.current.setAttribute("d", topCurve);
        }
        if(bottomPathRef.current) {
            bottomPathRef.current.setAttribute("d", bottomCurve);
        }
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden'>

      {/* --- TOP SQUISHER --- */}
      {/* 1. h-[20vh] is the solid block 
          2. The SVG sits absolutely below it to create the bulge 
      */}
      <div className='absolute top-0 left-0 w-full z-20'>
        {/* The Solid Block */}
        <div className='w-full h-[10vh] bg-base-300' />
        
        {/* The Bulge Effect */}
        <div className='w-full h-[50vh] -mt-[1px] relative'>
            <svg 
                className='w-full h-full fill-base-300 block'
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
            >
                <path ref={topPathRef} d="M0,0 L100,0 L100,0 Q50,0 0,0 Z" vectorEffect="non-scaling-stroke" />
            </svg>
        </div>
      </div>


      {/* --- MIDDLE CONTENT --- */}
      <div className='relative z-10 w-full h-full flex flex-col items-center justify-center py-32 px-4'>
        <h2 className='text-6xl md:text-9xl font-black text-black tracking-tighter text-center uppercase leading-none'>
            Lets Work<br/>Together
        </h2>
        <button className='mt-8 px-8 py-3 bg-black text-white rounded-full text-xl font-bold hover:scale-110 transition-transform duration-300'>
            Contact Me
        </button>
      </div>


      {/* --- BOTTOM SQUISHER --- */}
      {/* 1. h-[20vh] is the solid block at bottom
          2. The SVG sits absolutely ABOVE it to create the bulge 
      */}
      <div className='absolute bottom-0 left-0 w-full z-20'>
         {/* The Bulge Effect (Rotated logic via SVG path) */}
         <div className='w-full h-[50vh] -mb-[1px] relative'>
            <svg 
                className='w-full h-full fill-base-300 block'
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
            >
                <path ref={bottomPathRef} d="M0,100 L100,100 L100,100 Q50,100 0,100 Z" vectorEffect="non-scaling-stroke" />
            </svg>
        </div>

        {/* The Solid Block */}
        <div className='w-full h-[10vh] bg-base-300' />
      </div>

    </div>
  )
}

export default Footer