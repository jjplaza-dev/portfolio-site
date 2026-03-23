import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(Draggable);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const arrowDown = useRef(null);

  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;

  useGSAP(() => {
    const dragTargets = gsap.utils.toArray('.drag-item');

    dragTargets.forEach((target) => {
      Draggable.create(target, {
        type: "x,y",
        edgeResistance: 0.1,
        bounds: sectionRef.current,
        inertia: true,
        onDragStart: function() {
          gsap.to(this.target, { scale: 1.05, duration: 0.2 });
        },
        onDragEnd: function() {
          gsap.to(this.target, { scale: 1, duration: 0.2 });
        },
      });
    });

    // Arrow bounce animation (Infinite loop)
    gsap.to(arrowDown.current, {
      y: 0,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, { scope: sectionRef });

  const myText = "I am this I am that, chuchu Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, minus nisi veniam iusto nulla."
  const dragClass = "drag-item w-fit h-fit px-2 box-border border border-transparent hover:border-accent cursor-grab active:cursor-grabbing z-20";

  return (
    <section ref={sectionRef} className='section-box w-screen h-screen'>
      <div className='h-[200vh] relative'>
        <div className='inner-section h-screen flex justify-center sticky top-0 border-none'>
          <div className='hero-background w-full h-full grid grid-cols-5 absolute top-0 left-0'>
            <div className='border-x border-black/5'></div>
            <div className=''></div>
            <div className='border-x border-black/5'></div>
            <div className=''></div>
            <div className='border-x border-black/5'></div>
          </div>

          <div className='w-full h-fit my-auto '>
            <div className='hero-name w-full max-md:justify-center md:w-[100%] md:translate-x-[0] lg:translate-x-0 flex gap-10 relative items-center'>
              <div className={`w-fit h-fit lg:px-2 box-border border border-transparent hover:border-accent group ${dragClass}`}>
                <FourCorners />
                JURIST</div>
              <div className={`w-[50%] w-[50%] xl:w-[50%] md:max-w-[280px] h-fit translate-0 lg:translate-x-[50%] xl:translate-x-0 hidden md:flex items-center border border-transparent hover:border-accent p-1 text-lg tracking-normal leading-5 group ${dragClass}`}><FourCorners />{myText}</div>
            </div>
            <div className='hero-name w-full flex max-md:justify-center md:w-[40%]  md:translate-x-[50%] lg:translate-x-1/2'>
            <div className={`w-fit h-fit px-2 box-border border border-transparent hover:border-accent group ${dragClass}`}><FourCorners/>JOHN</div>
            </div>
            <div className='hero-name w-full flex max-md:justify-center md:w-[80%] md:translate-x-[50%] lg:translate-x-1/2'>
              <div className={`w-fit h-fit px-2 box-border border border-transparent hover:border-accent group ${dragClass}`}><FourCorners/>PLAZA</div>
              </div>
            <div className={`w-[80%] text-center mt-5 md:hidden h-fit flex items-center mx-auto border border-transparent hover:border-accent p-1 text-md tracking-normal leading-5 ${dragClass}`}>{myText}</div>
            <div className={`absolute bottom-[10%] left-[50%] translate-x-[-50%] w-fit h-fit flex flex-col items-center py-4 px-2 group ${isDesktop ? 'drag-item border border-transparent hover:border-accent' : ''}`}>
              <FourCorners />
              <a href="#projects-section" className=' px-4 py-2 rounded-full text-primary bg-secondary cursor-pointer'>Go to my Projects</a>
              <div className='text-[12px] mt-2 h-fit opacity-80'>scroll down</div>
              <div ref={arrowDown} className='scale-60 opacity-80 translate-y-[-25%]'><ArrowDown /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FourCorners = () => {
  return <>
    <div className="absolute -top-[4px] -left-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -top-[4px] -right-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -bottom-[4px] -left-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute -bottom-[4px] -right-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-0 group-hover:opacity-100 transition-opacity" />

  </>
}

export default HeroSection;