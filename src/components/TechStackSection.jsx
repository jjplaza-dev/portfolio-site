import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Figma, GitGraph, icons, SquareKanban } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TechStackSection = () => {
  const sectionRef = useRef(null);
  
  const stacks = [
    { title: "", items: ["React", "Next", "Tailwind", "GSAP"] },
    { title: "", items: ["Supabase", "Node", "MongoDB"] },
    { title: "", items: ["Figma", "VS Studio"] }
  ];
const benefits = [
    { title: "Web Design", items: ["Unique UI", "No code development", "Visual Identity"], icon: <GitGraph/>},
    { title: "Figma to React", items: ["Clean Code", "Pixel Perfect", "Responsive"], icon: <Figma />},
    { title: "Growth & Management", items: ["SEO", "Performance", "Scalability"], icon: <SquareKanban />}
  ];

  useGSAP(() => {
    const allItems = gsap.utils.toArray('.stack-item');

    gsap.fromTo(allItems, 
      { 
        opacity: 0, 
        x: 0, 
        rotate: 0,
        scale: 0.9 
      },
      {
        opacity: 1,
        x: (index, target) => {
          const itemIndex = Array.from(target.parentNode.children).indexOf(target);
          return `-${25 * itemIndex}%`;
        },
        rotate: 10,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className='w-screen h-fit px-[6vw] py-[10vh] grid grid-cols-1 2xl:grid-cols-2 overflow-hidden'>
      <div className='w-full flex flex-col gap-6'>
        
        {stacks.map((stack, sIndex) => (
          <div key={sIndex} className="flex flex-col gap-4">
            <h5 className="text-xs uppercase tracking-[0.3em] font-semibold text-primary/70 ml-2">
              {stack.title}
            </h5>
            
            <div className='flex items-center ml-8'>
              {stack.items.map((item, iIndex) => ( 
                <div 
                  key={iIndex}
                  className='stack-item w-20 lg:w-32 aspect-square border-2 lg:border-6 border-base-100 shadow-xl shadow-blue-900/5 rounded-2xl flex items-center justify-center bg-base-300 cursor-pointer'
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
      <div className='flex flex-col lg:flex-row mt-20 2xl:mt-0 gap-10 lg:gap-0'>
        {benefits.map((benefit, index) => (
          <div key={index} className='w-full flex flex-col items-start'>
            <p className="font-semibold flex gap-4 roboto mb-4 text-neutral/80"><p className='scale-120'>{benefit.icon}</p>{benefit.title}</p>
            <div className="font-medium text-neutral/70 flex flex-col gap-1 mt-1 w-full">
              {benefit.items.map((content, i) => (
                <div key={i} className="pl-2">
                  <p>{content}</p>
                  <div 
                    className="w-[40%] lg:w-[80%] h-1 mb-2 mt-1"
                    style={{
                      backgroundImage: `linear-gradient(to right, oklch(0% 0 0 / 0.15) 50%, transparent 0%)`,
                      backgroundSize: '15px 1px',
                      backgroundRepeat: 'repeat-x'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;