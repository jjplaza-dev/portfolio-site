import React, { useState } from 'react'

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 3000)

  return (
    <section className='w-screen h-[92vh] px-[6vw] pt-[2vh] pb-[6vh]'>
      <div className={`w-full h-full shadow-2xl duration-300 rounded-2xl p-2 flex flex-col justify-center items-center gap-5`}>
        <h5 className='fredoka'>Hi, I'm Jurist</h5>
        <h2 className='w-[80%] text-center min-w-[360px] max-w-[720px] charm font-bold'>I help founders turn unclear product ideas into investor-ready experiences.</h2>
        <p className='w-[80%] text-center min-w-[340px] max-w-[700px] fredoka tracking-wide leading-5 lg:leading-7'>I simplify complexity so users instantly get your value and investors lean in. I specialize in React, GSAP to build responsive sites and deliver products with attractiveness and functionality.</p>
      </div>  
    {/*   <img className='w-[20vw] min-w-[200px] relative translate-y-[-40%] translate-x-[-50%]' src='src/assets/images/sun.png'/> */}
    </section>
  )
}

export default HeroSection