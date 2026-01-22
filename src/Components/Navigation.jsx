import React, { useState } from 'react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. NAVIGATION BAR 
         - z-50: Ensures it sits ON TOP of the modal (which is z-40)
         - mix-blend-difference: Inverts colors so it's visible on both white pages and black modals 
      */}
      <nav className='fixed top-0 w-full flex justify-between items-center p-6 z-50 mix-blend-difference text-white'>
        

        {/* 2. DESKTOP LINKS 
           - hidden: Hidden on mobile
           - lg:flex: Visible on large screens
        */}
        <section className='hidden lg:flex gap-8 absolute right-[20%] font-bold tracking-widest uppercase text-sm'>
          <button className='px-3 py-1'>About</button>
          <button className='px-3 py-1'>Projects</button>
          <button className='px-3 py-1'>Contact</button>
        </section>

        {/* 3. MOBILE MENU BUTTON 
           - lg:hidden: Hidden on Desktop
           - ml-auto: Pushes it to the right
           - It resides inside the z-50 nav, so it will always be above the modal
        */}
        <button 
          onClick={toggleMenu}
          className='lg:pointer-events-none ml-auto w-fit h-fit grid grid-cols-2 gap-2 group cursor-pointer p-1'
        >
          {/* Animated Dots: Rotate into a generic shape or cross when open */}
          <div className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 ${isOpen ? 'translate-x-[2.5px] translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 ${isOpen ? '-translate-x-[2.5px] translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 ${isOpen ? 'translate-x-[2.5px] -translate-y-[2.5px]' : ''}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 ${isOpen ? '-translate-x-[2.5px] -translate-y-[2.5px]' : ''}`}></div>
        </button>
      </nav>

      {/* 4. FULL SCREEN MODAL 
         - z-40: Sits BEHIND the nav (z-50) so the button is never covered
         - fixed inset-0: Covers entire screen
      */}
      <div 
        className={`fixed inset-0 bg-black z-40 flex flex-col justify-center items-center gap-10 transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <button className='text-xl px-4 py-2 font-black uppercase tracking-tighter text-white hover:text-gray-500 transition-colors'>About</button>
        <button className='text-xl px-4 py-2 font-black uppercase tracking-tighter text-white hover:text-gray-500 transition-colors'>Projects</button>
        <button className='text-xl px-4 py-2 font-black uppercase tracking-tighter text-white hover:text-gray-500 transition-colors'>Contact</button>
      </div>
    </>
  )
}

export default Navigation