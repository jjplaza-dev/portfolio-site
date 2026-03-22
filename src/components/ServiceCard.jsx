import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const   ServiceCard = ({ title, desc}) => {
  
  return (
    <button className="relative w-full h-fit py-2 flex justify-center items-center border-b border-t border-black/5 group select-none">
      <div className="relative z-10 w-full h-full flex pointer-events-none">
        <div  className="w-full h-full flex flex-col lg:flex-row justify-start lg:justify-between transition-colors items-start lg:items-center pr-10 gap-2 lg:gap-0">
          <p className='ml-2 mt-1 lg:ml-10 lg:mt-2 text-nowrap'>{title}</p>
          <p className='w-full lg:w-[400px] xl:w-[500px] leading-5 lg:leading-6 text-start ml-2 font-normal text-black/60'>{desc}</p>
        </div>
        
      </div>
    </button>
  );
}

export default ServiceCard;