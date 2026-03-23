import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  // const navigate = useNavigate(); // Hook for programmatic navigation

  const handleNavClick = (e, href) => {
    e.preventDefault(); // Stop the browser from leaving immediately
    setIsOpen(false);   // Start the slide-up animation

    // Wait for the duration of your transition (700ms)
    setTimeout(() => {
      window.location.href = href; 
      // Or if using React Router: navigate(href);
    }, 700);
  };


  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

const formattedTime = time.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Manila'
});

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className='fixed top-2 left-0 w-full h-10 z-[9999] px-2 md:px-2 flex justify-between items-center pointer-events-none'>
        <div className='flex items-center h-full bg-primary pointer-events-auto gap-2'>
          
          {/** Marquee **/}
          <div className='w-32 md:w-48 h-full border-r border-black/10 overflow-hidden flex items-center bg-secondary text-primary px-2'>
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="text-[10px] font-mono uppercase tracking-widest mr-4">Open to Opportunities —</span>
              <span className="text-[10px] font-mono uppercase tracking-widest mr-4">Open to Opportunities —</span>
            </div>
          </div>

          {/** Local Time **/}
          <div className='px-4 flex items-center gap-2 border border-secondary/20 h-full'>
            <span className='text-[12px] font-mono font-bold uppercase tracking-tighter'>
              PST {formattedTime}
            </span>
          </div>
        </div>

        <button 
          onClick={toggleMenu}
          className='cursor-effect h-10 w-10 flex items-center justify-center border border-black/10 bg-primary text-black pointer-events-auto hover:bg-black hover:text-white transition-colors'
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div className={`fixed inset-0 z-[9998] bg-primary transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
          {navLinks.map((link, i) => (
            <a 
              key={link.name}
              href={link.href}
              // Call our new handler instead of just closing the menu
              onClick={(e) => handleNavClick(e, link.href)} 
              className='group relative overflow-hidden cursor-effect'
            >
              <span className='text-[10vw] pointer-events-none select-none font-light uppercase tracking-tighter leading-none block transition-transform duration-500 group-hover:-translate-y-full'>
                {link.name}
              </span>
              <span className='text-[10vw] pointer-events-none select-none font-light uppercase tracking-tighter leading-none absolute top-full left-0 text-accent transition-transform duration-500 group-hover:-translate-y-full'>
                {link.name}
              </span>
              <span className='absolute -left-12 top-1/2 -translate-y-1/2 text-xs font-mono opacity-0 group-hover:opacity-20 transition-opacity'>
                0{i + 1}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}} />
    </>
  );
};

export default Navigation;