import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Clock } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  
  const marqueeRef = useRef(null);
  const navItems = ['PROJECTS', 'ABOUT ME', 'SERVICES', 'CONTACT'];

  // 1. Properly Formatted Time Logic
  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-US', {
        hour: 'numeric',   // Removes leading zero (4:00 instead of 04:00)
        minute: '2-digit',
        hour12: true       // Forces 12-hour format (PM/AM)
      });
    };

    setTime(formatTime()); // Set initial time immediately

    const timer = setInterval(() => {
      setTime(formatTime());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // 2. GSAP Infinite Marquee
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

  const toggleMenu = () => setIsOpen(!isOpen);

    const navRef = useRef(null);

    useEffect(() => {
      // 2. Set a timeout to run after 1000ms (1 second)
      const timer = setTimeout(() => {
        // 3. Access the DOM element directly via .current
        if (navRef.current) {
          // Change the style directly
          navRef.current.style.opacity = '1';
        }
      }, 2000);

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }, []);

  return (
    <>
      <nav ref={navRef} style={{opacity: 0, transition: 'opacity 1s ease-out'}} className='fixed top-0 w-full h-14 md:h-20 py-4 flex justify-between items-center px-4 md:px-10 z-50 backdrop-blur-3xl text-white'>
        {/* Left Section: Logo, Marquee, Time */}
        <div className='h-full w-fit flex items-center gap-6'>
          {/* Brand */}
          <div className='flex-shrink-0 text-sm md:text-lg lg:text-3xl leading-none md:pb-2'>
            || ᜑ᜔ᜂᜇᜒᜐ᜔ᜆ᜔ ||
          </div>

          {/* Marquee Container */}
          <div className='w-fit h-full hidden min-md:flex items-center rounded-sm bg-base-300 brightness-95 text-black/80'>
            <div 
            className='relative overflow-hidden hidden md:block'
            style={{ 
              width: '200px', 
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
            }}
          >
            <div ref={marqueeRef} className='inline-block whitespace-nowrap'>
              {[...Array(4)].map((_, i) => (
                <span key={i} className='text-[14px] lato font-bold tracking-[0.1em] px-2 opacity-70'>
                  Open to opportunities &nbsp;&nbsp;&nbsp;//
                </span>
              ))}
            </div>
          </div>
          </div>
          

          {/* Local Time - Vertically Centered */}
          <div className='min-md:h-full w-fit max-md:py-1 flex-shrink-0 tabular-nums text-[16px] lg:text-[18px] px-2 lg:px-4 rounded-sm lato bg-base-300 brightness-95 text-black/80 font-medium leading-none flex items-center'>
            <span className='opacity-70 flex'>{time}</span><Clock className='h-[1em] opacity-70 mt-0 ml-1'/>
          </div>
        </div>

        {/* --- MENU TOGGLE BUTTON --- */}
        <button 
          onClick={toggleMenu}
          className='ml-auto w-fit h-fit grid grid-cols-2 gap-1 lg:gap-2 group cursor-pointer p-1 lg:p-2 relative z-50 rounded-full'
        >
          <div className={`w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-white transition-all duration-300 ${isOpen ? 'translate-x-[2.5px] translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-white transition-all duration-300 ${isOpen ? '-translate-x-[2.5px] translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-white transition-all duration-300 ${isOpen ? 'translate-x-[2.5px] -translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-white transition-all duration-300 ${isOpen ? '-translate-x-[2.5px] -translate-y-[2.5px]' : ''}`}></div>
        </button>

        {/* --- DROPDOWN CONTAINER --- */}
        <div 
          className={`
            bg-base-300 brightness-95 p-4 z-40
            transition-all duration-300 ease-in-out origin-top-right
            absolute top-20 right-6 flex
            flex-col items-end w-auto rounded-md
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `} style={{ transitionDelay: isOpen ? '0ms' : '400ms'}}
        >
          {navItems.map((item, index) => (
            <button key={item} className='text-base-100 text-2xl font-bold py-2 px-2 overflow-hidden'>
              <div 
                className={`transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-[-200%]'}`}
                style={{ transitionDelay: isOpen ? `${index * 150}ms` : `0ms` }}
              >
                {item}
              </div>
            </button>
          ))}
        </div>
      </nav>
         {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 z-30 bg-transparent cursor-default" 
        />
      )}
     {/* <div className='fixed bottom-0 w-full h-30 backdrop-blur-sm [mask-image:linear-gradient(to_top,white_33%,transparent_100%)] z-10'></div> */}
    </> 
  )
}

export default Navigation;