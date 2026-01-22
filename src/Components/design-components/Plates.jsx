import React from 'react'

const Plates = (props) => {
    const boxSize = 40;


  return (
   <>
        <div 
          style={{ width: boxSize, height: boxSize, backgroundColor: `${props.bgColor ? props.bgColor: 'black'}`, clipPath: 'polygon(100% 10%, 90% 0%, 10% 0%, 0% 10%, 0% 90%, 10% 100%, 90% 100%, 100% 90%)' }} 
          className="aspect-square m-[1.5px] opacity-75"
        ></div>
   </>
  )
}

export default Plates