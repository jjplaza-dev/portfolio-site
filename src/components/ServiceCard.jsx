import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ServiceCard = ({ title, index, activeIndex, setActiveIndex }) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);
  const innerRef = useRef(null);
  
  const isActive = activeIndex === index;

  // --- Animation Logic for Mobile ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        if (isActive) {
          gsap.to(textRef.current, { opacity: 0, duration: 0.3 });
          gsap.to(innerRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.2)" });
        } else {
          gsap.to(textRef.current, { opacity: 1, duration: 0.3 });
          gsap.to(innerRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
        }
      });
    }, btnRef);

    return () => ctx.revert();
  }, [isActive]);

  // --- Desktop Interaction Handlers ---
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      gsap.to(innerRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "none" });
      gsap.to(textRef.current, { color: "white", duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      gsap.to(innerRef.current, { opacity: 0, scale: 1.1, x: 0, y: 0, duration: 0.5, ease: "none" });
      gsap.to(textRef.current, { color: "inherit", duration: 0.3 });
    }
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth >= 1024) {
      const rect = btnRef.current.getBoundingClientRect();
      const xPos = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const yPos = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(innerRef.current, {
        x: xPos * 20,
        y: yPos * 20,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setActiveIndex(isActive ? null : index);
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[2/1] flex justify-center items-center border border-black/20 overflow-hidden group select-none"
    >
      {/* THE INNER REVEAL ELEMENT */}
      <div 
        ref={innerRef} 
        className="absolute z-0 flex items-center justify-center bg-black text-white pointer-events-none opacity-0 lg:w-[80%] lg:h-[80%] w-full h-full"
      >
        {/* You can add icons or service numbers here */}
      </div>

      {/* THE BUTTON TEXT */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <h3 ref={textRef} className="w-full h-full flex justify-center items-center transition-colors">
          {title}
        </h3>
      </div>
    </button>
  );
}

export default ServiceCard;