import React, { useState } from 'react'
import PixelWord from './design-components/PixelWord';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Define items here to easily map delays
  const navItems = ['ABOUT', 'PROJECTS', 'CONTACT'];

  return (
    <>
      <nav className='fixed top-0 w-full flex justify-between items-center p-6 z-50 text-white'>
        
        {/* Brand / Logo */}
        <div className="font-bold tracking-wider"></div>

        {/* --- MENU TOGGLE BUTTON --- */}
        <button 
          onClick={toggleMenu}
          className='ml-auto w-fit h-fit grid grid-cols-2 gap-2 group cursor-pointer p-2 relative z-50 bg-black rounded-full'
        >
          <div className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${isOpen ? 'translate-x-[2.5px] translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${isOpen ? '-translate-x-[2.5px] translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${isOpen ? 'translate-x-[2.5px] -translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${isOpen ? '-translate-x-[2.5px] -translate-y-[2.5px]' : ''}`}></div>
        </button>

        {/* --- DROPDOWN CONTAINER --- */}
        <div 
          className={`
            bg-white border border-white/20 p-4 z-40
            transition-all duration-300 ease-in-out origin-top-right
            absolute top-16 right-6 flex
            flex-col items-end w-auto
            
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `} style={{ transitionDelay: isOpen ? '0ms' : '400ms'}}
        >

          {/* --- MAPPED BUTTONS WITH STAGGERED DELAY --- */}
          {navItems.map((item, index) => (
            <button 
              key={item} 
              className='text-white hover:text-gray-400 transition-colors py-4 px-2 overflow-hidden'
            >
              {/* Inner container handles the slide movement */}
              <div 
                className={`transition-transform duration-500 ease-out will-change-transform
                  ${isOpen ? 'translate-y-0' : 'translate-y-[-200%]'}
                `}
                style={{ 
                  // 1. Stagger Delay: Multiply index by 100ms (0ms, 100ms, 200ms...)
                  // 2. Conditional: Only apply delay when opening. When closing, reset instantly for snappier feel.
                  transitionDelay: isOpen ? `${index * 200}ms` : `${index * 100}ms`
                }}
              >
                <PixelWord text={item} size={4} color='black'/>
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
    </>
  )
}

export default Navigation