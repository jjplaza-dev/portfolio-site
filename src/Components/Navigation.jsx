import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Clock } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  
  const marqueeRef = useRef(null);
  const navRef = useRef(null);

  // 1. Time Logic
  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    setTime(formatTime()); 
    const timer = setInterval(() => { setTime(formatTime()); }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Marquee Logic
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const singleWidth = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -singleWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  // 3. Navbar Fade-In
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) navRef.current.style.opacity = '1';
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // --- THE 3 MORPHING PANELS ---
  const panels = [
    {
      title: 'PROJECTS',
      // CLOSED: Top horizontal line (w-6)
      closed: 'max-md:bottom-[40px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-12 max-md:h-1 md:right-[32px] md:top-[calc(50%-10px)] md:-translate-y-1/2 md:w-6 md:h-1 bg-white border-[0.5px] border-base-300',
      // OPEN: Top button of the stack
      open: 'max-md:bottom-[152px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[240px] max-md:h-[60px] md:right-[32px] md:top-[calc(50%-76px)] md:-translate-y-1/2 md:w-[240px] md:h-[60px] bg-base-300 border border-white/50'
    },
    {
      title: 'ABOUT ME',
      // CLOSED: Middle horizontal line (w-8 makes it stick out to the left)
      closed: 'max-md:bottom-[32px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-8 max-md:h-1 md:right-[32px] md:top-1/2 md:-translate-y-1/2 md:w-8 md:h-1 bg-white border-[0.5px] border-base-300',
      // OPEN: Middle button of the stack
      open: 'max-md:bottom-[84px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[240px] max-md:h-[60px] md:right-[32px] md:top-1/2 md:-translate-y-1/2 md:w-[240px] md:h-[60px] bg-base-300 border border-white/50'
    },
    {
      title: 'CONTACT',
      // CLOSED: Bottom horizontal line (w-6)
      closed: 'max-md:bottom-[24px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-4 max-md:h-1 md:right-[32px] md:top-[calc(50%+10px)] md:-translate-y-1/2 md:w-6 md:h-1 bg-white border-[0.5px] border-base-300',
      // OPEN: Bottom button of the stack
      open: 'max-md:bottom-[16px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[240px] max-md:h-[60px] md:right-[32px] md:top-[calc(50%+76px)] md:-translate-y-1/2 md:w-[240px] md:h-[60px] bg-base-300 border border-white/50'
    }
  ];

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav ref={navRef} style={{opacity: 0, transition: 'opacity 1s ease-out'}} className='fixed top-0 w-fit h-14 md:h-20 py-4 flex justify-between items-center px-4 md:px-10 z-[60] text-white pointer-events-none'>
        <div className='h-full w-fit flex items-center gap-6 pointer-events-auto'>
          
          <div className='flex-shrink-0 text-sm md:text-lg lg:text-3xl text-black leading-none md:pb-2 backdrop-blur-3xl px-2'>
            || ᜑ᜔ᜂᜇᜒᜐ᜔ᜆ᜔ ||
          </div>

          <div className='w-fit h-full hidden min-md:flex items-center rounded-sm bg-base-300 brightness-95 text-black/80'>
            <div 
                className='relative overflow-hidden hidden md:block'
                style={{ width: '200px', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
            >
                <div ref={marqueeRef} className='inline-block whitespace-nowrap'>
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className='text-[14px] font-bold tracking-[0.1em] px-2 opacity-70'>
                            Open to opportunities &nbsp;&nbsp;&nbsp;//
                        </span>
                    ))}
                </div>
            </div>
          </div>
          
          <div className='min-md:h-full w-fit max-md:py-1 flex-shrink-0 tabular-nums text-[16px] lg:text-[18px] px-2 lg:px-4 rounded-sm bg-base-300 brightness-95 text-black/80 font-medium leading-none flex items-center'>
            <span className='opacity-70 flex'>{time}</span><Clock className='h-[1em] opacity-70 mt-0 ml-1'/>
          </div>

        </div>
      </nav>

      {/* --- CLICK OUTSIDE TO CLOSE OVERLAY --- */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 z-[45] bg-transparent cursor-default" 
        />
      )}

      {/* --- INVISIBLE OPEN TRIGGER --- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 cursor-pointer max-md:bottom-[16px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-16 max-md:h-[40px] md:right-[24px] md:top-1/2 md:-translate-y-1/2 md:w-[48px] md:h-[48px]"
          aria-label="Open Menu"
        />
      )}

      {/* --- THE 3 STAGGERED MORPHING BUTTONS --- */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {panels.map((panel, index) => {
          
          // DYNAMIC STAGGER LOGIC:
          // Opening: Top (0) -> Middle (75ms) -> Bottom (150ms)
          // Closing: Bottom (0) -> Middle (75ms) -> Top (150ms)
          const panelDelay = isOpen ? index * 75 : (2 - index) * 75;
          
          // Text fades in exactly 200ms AFTER its specific panel starts expanding
          // Text disappears instantly on close (0 delay)
          const textDelay = isOpen ? panelDelay + 200 : 0;

          return (
            <button
              key={panel.title}
              onClick={() => {
                  if(isOpen) {
                      console.log(`Navigating to ${panel.title}`);
                      setIsOpen(false);
                  }
              }}
              style={{ transitionDelay: `${panelDelay}ms` }}
              // Duration reduced to 500ms, using a snappy cubic-bezier with a slight overshoot bounce
              className={`absolute flex overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.2)] rounded-[20px] ${isOpen ? panel.open : panel.closed} ${isOpen ? 'pointer-events-auto cursor-pointer hover:border-amber-200/50 hover:scale-105 shadow-2xl' : 'pointer-events-none'}`}
            >
              
              {/* The Text Wrapper */}
              <div 
                className={`w-full h-full transition-opacity duration-200 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${textDelay}ms` }}
              >
                  <div className="flex w-full h-full items-center justify-center">
                      <span className="font-mono tracking-widest text-sm text-black whitespace-nowrap">
                          {panel.title}
                      </span>
                  </div>
              </div>

            </button>
          );
        })}
      </div>

    </> 
  )
}

export default Navigation;