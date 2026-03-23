import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Contact = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { y: '100vh' },
      { y: '0', duration: 0.8, ease: 'power4.out', delay: 0.1 }
    );
  }, []);

  return (
    <div 
      ref={pageRef} 
      className="h-screen w-full bg-primary text-black flex flex-col justify-between px-4 md:px-10 py-10 pt-32 translate-y-[100vh] will-change-transform"
    >
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <p className="font-mono text-sm uppercase mb-4">Got an idea?</p>
        <a 
          href="mailto:hello@studio.com" 
          className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none hover:italic transition-all duration-300"
        >
          Let's Talk ↘
        </a>
      </div>

      <div className="w-full max-w-7xl mx-auto border-t border-black pt-4 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] uppercase">
        <p>© 2026 Creative Studio</p>
        <div className="flex gap-8">
          <a href="#" className="hover:line-through">Instagram</a>
          <a href="#" className="hover:line-through">Twitter</a>
          <a href="#" className="hover:line-through">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;