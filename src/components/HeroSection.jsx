
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(Draggable);

const HeroSection = () => {
  const boxRef = useRef(null);

  useGSAP(() => {
    Draggable.create(boxRef.current, {
      type: "x,y", // Allow movement in both directions
      edgeResistance: 0.1, // "Rubber band" effect when hitting bounds
      bounds: window, // Keep it inside the screen
      inertia: true, // Requires InertiaPlugin (Club GSAP)
      onDragStart: () => gsap.to(boxRef.current, { scale: 1.05, duration: 0.2 }),
      onDragEnd: () => gsap.to(boxRef.current, { scale: 1, duration: 0.2 }),
    });
  }, []);

  const myText = "I am this I am that, chuchu Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, minus nisi veniam iusto nulla."
  return (
    <section className='section-box w-screen h-screen'>
      <div className='h-[200vh] relative'>
        <div className='inner-section h-screen flex justify-center sticky top-0'>
          <div className='hero-background w-full h-full grid grid-cols-5 absolute top-0 left-0'>
            <div className='border-x border-black/5'></div>
            <div className=''></div>
            <div className='border-x border-black/5'></div>
            <div className=''></div>
            <div className='border-x border-black/5'></div>
          </div>

          <div className='w-full h-fit my-auto '>
            <div  className='hero-name w-full max-md:justify-center md:w-[80%] md:translate-x-[12.5%] lg:translate-x-0 flex justify-between items-center'><div ref={boxRef} className='w-fit h-fit px-2 box-border border border-transparent hover:border-blue-600/80'>JURIST</div><div className='w-[50%] lg:w-[75%] xl:w-[50%] h-fit translate-0 lg:translate-x-[50%] xl:translate-x-0 hidden md:flex items-center absolute right-0 border border-transparent hover:border-blue-600/80 p-1 text-lg tracking-normal leading-5'>{myText}</div></div>
            <div className='hero-name w-full flex max-md:justify-center md:w-[40%]  md:translate-x-[75%] lg:translate-x-1/2'><div ref={boxRef} className='w-fit h-fit px-2 box-border border border-transparent hover:border-blue-600/80'>JOHN</div></div>
            <div className='hero-name w-full flex max-md:justify-center md:w-[40%]  md:translate-x-[125%] lg:translate-x-full'><div ref={boxRef} className='w-fit h-fit px-2 box-border border border-transparent hover:border-blue-600/80'>PLAZA</div></div>
            <div className='w-[90%] text-center mt-5 md:hidden h-fit flex items-center mx-auto border border-transparent hover:border-blue-600/80 p-1 text-md tracking-normal leading-5'>{myText}</div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default HeroSection