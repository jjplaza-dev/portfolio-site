import React from 'react'

const Works = () => {
  const myProjects = ["1","2","3","1","2","3","1","2","3"]
  return (
    <section className='w-full h-fit px-[10vw] py-5'>
      <div className='w-full h-fit pt-4 grid grid-cols-1 md:grid-cols-2 gap-5'>
        {myProjects.map((projects, index) => (
          <div key={index} className='aspect-[1/0.8] relative bg-base-200 p-5 border-dashed border-base-300 flex flex-col justify-between items-center border-3 lg:border-5 text-black'>
            <div className='w-full h-full flex justify-center items-center'>
              <div  
            style={{ filter: 'drop-shadow(2px 2px #92400e) drop-shadow(-2px -2px #92400e) drop-shadow(2px -2px #92400e) drop-shadow(-2px 2px #92400e)' }}
            className='w-[80%] lg:w-[60%] aspect-video self-center rounded-lg -rotate-z-[10deg] mb-10 bg-amber-300'>
              <div className='w-[30%] aspect-square absolute bottom-[-20%] right-[-10%] bg-amber-400 rounded-lg rotate-z-20'></div>
            </div>
            </div>
            <div className='w-full h-10 self-end flex items-center border-1 border-dashed'>Project: {projects}</div>
          </div>
        ))} 
      </div>
     
      
    </section>
  )
}

const ClippedBox = () => {
  // A random, abstract polygon shape
  const randomPath = "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)";
  

  return (
    <div className="relative w-100 h-64 group">
      <div 
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
        style={{ clipPath: randomPath }}
      />

      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <polygon
          points="0 0, 0 100, 100 100,  100 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 2"
          className="text-primary/50"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

    
      <div className="relative z-10 flex items-center justify-center h-full font-bold text-primary">
        ABSTRACT
      </div>
    </div>
  )
}

export default Works;