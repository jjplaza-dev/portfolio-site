import React, { useEffect, useState } from 'react'

const Plates = (props) => {
  const [isActive, setIsActive] = useState(true); // Currently not used
  const [colorChange, setColorChange] = useState(true); // Currently not used
  const boxSize = 40;


/*   useEffect(() => {
    const interval = setTimeout(() => {
      setIsActive(prev => !prev);
        
      setTimeout(() => {
        setColorChange(prev => !prev);
      } , 1000);
    } , 1000); 

    return () => clearTimeout(interval);
  }, []); */

  return (
   <section className='overflow-hidden'>
        <div 
          style={{ width: boxSize, height: boxSize, clipPath: 'polygon(100% 10%, 90% 0%, 10% 0%, 0% 10%, 0% 90%, 10% 100%, 90% 100%, 100% 90%)' }} 
          className={`aspect-square m-[1.5px] duration-1000 transition-all ${isActive ? 'translate-x-0' : 'translate-x-[110%]'} ${colorChange ? 'bg-[#11111140]' : 'bg-[#11111190]'}`}
        ></div>
   </section>
  )
}

export default Plates