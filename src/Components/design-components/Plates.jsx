import React, { useEffect, useState } from 'react'

const Plates = (props) => {
  // Default to visible (false means "not flickering", so opacity is normal)
  const [isFlickering, setIsFlickering] = useState(false); 

  useEffect(() => {
    // Run this check every 1000ms (1 second)
    const interval = setInterval(() => {
      
      // 5% chance to trigger the flicker
      if (Math.random() < 0.01) {
        setIsFlickering(true);

        // "Go back to original" after a short delay (e.g., 200ms)
        // This creates a quick "glitch" out and back in
        setTimeout(() => {
          setIsFlickering(false);
        }, 2000); 
      }

    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
   <section className='overflow-hidden'>
        <div 
          style={{ 
            clipPath: 'polygon(100% 10%, 90% 0%, 10% 0%, 0% 10%, 0% 90%, 10% 100%, 90% 100%, 100% 90%)' 
          }} 
          
          className={`w-full h-full duration-2000 border-[0.5px] border-white/5 transition-all
            ${isFlickering ? 'opacity-100' : 'opacity-80'} 
          `}
        ></div>
   </section>
  )
}

export default Plates