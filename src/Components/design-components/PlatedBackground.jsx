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
        className='w-screen h-[100vh] relative bg-black border-2 border-white flex flex-wrap content-start overflow-hidden mx-auto'
      >
        {Array.from({ length: plateCount }).map((_, index) => (
            <div key={index + 'a'}>
                <Plates key={index} bgColor={'#11111190'}/>
                <MidPoints key={index + 'b'} />
            </div>
          
        ))}
        <div className='w-full h-screen absolute bottom-0' style={{background: 'linear-gradient(to top, #000000 0%, #000000 30%, #11111100 60%)'}}></div>
      </main>
    </MidPointsManager>
  );
};

export default PlatedBackground;