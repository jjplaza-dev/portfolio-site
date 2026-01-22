import React, { useState, useEffect, useRef } from 'react';
import Plates from './Plates';
import { MidPointsManager, MidPoints } from './MidPoints';


const PlatedBackground = () => {
  const containerRef = useRef(null);
  const [plateCount, setPlateCount] = useState(0);

  useEffect(() => {
    const calculatePlates = () => {
      if (containerRef.current) {
        const { offsetWidth , offsetHeight } = containerRef.current;
        const PLATE_SIZE = 42;
        const columns = Math.ceil(offsetWidth / PLATE_SIZE);
        const rows = Math.ceil(offsetHeight / PLATE_SIZE);

        setPlateCount(columns * rows);
      }
    };
    calculatePlates();

    window.addEventListener('resize', calculatePlates);
    return () => window.removeEventListener('resize', calculatePlates);
  }, []);

  return (
    <MidPointsManager>
      <main 
        ref={containerRef} 
        className='w-screen h-screen z-[-1] bg-black flex flex-wrap content-start overflow-hidden mx-auto'
      >
        {Array.from({ length: plateCount }).map((_, index) => (
            <div key={index + 'a'}>
                <Plates key={index}/>
                {/* <MidPoints key={index + 'b'} /> */}
            </div>
          
        ))}
        
      </main>
    </MidPointsManager>
  );
};

export default PlatedBackground;