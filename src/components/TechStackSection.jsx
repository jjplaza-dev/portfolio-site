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
{ title: "Web Design", items: ["Unique UI", "No code development", "Visual Identity"], icon:
<GitGraph />},
{ title: "Figma to React", items: ["Clean Code", "Pixel Perfect", "Responsive"], icon:
<Figma />},
{ title: "Growth & Management", items: ["SEO", "Performance", "Scalability"], icon:
<SquareKanban />}
];

useGSAP(() => {
const allItems = gsap.utils.toArray('.stack-item');

gsap.fromTo(allItems,
{
opacity: 0,
x: 0,
scale: 0.9
},
{
opacity: 1,
scale: 1,
duration: 1.5,
stagger: 0.15,
ease: "expo.out",
scrollTrigger: {
trigger: sectionRef.current,
start: "top 75%",
toggleActions: "play none none reverse"
}
}
);
}, { scope: sectionRef });

return (
<section className='section-box w-screen h-fit grid grid-cols-1 overflow-hidden border-b border-black/50 bg-inherit'>
  <div ref={sectionRef} className='w-full h-full'>
    <div className='w-full flex section-title'><p>STACKS AND TOOLS</p></div>
    <div className='inner-section flex flex-col gap-6 border-x border-black/20'>

      {stacks.map((stack, sIndex) => (
      <div key={sIndex} className="flex flex-col gap-4 lg:pl-2">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-primary/70 ml-2">
          {stack.title}
        </p>

        <div className='flex items-center gap-1'>
          {stack.items.map((item, iIndex) => (
          <div key={iIndex}
            className='stack-item w-24 lg:w-32 aspect-square border-[0.5px] border-black/20 flex justify-center cursor-pointer p-1'>
            <p className='h-fit w-[90%] text-center border-1 border-black/20 p-1'>{item}</p>
          </div>
          ))}
        </div>
      </div>
      ))}

    </div>
    <div className='inner-section flex flex-col md:flex-row'>
      {benefits.map((benefit, index) => (
      <div key={index} className='w-full flex flex-col items-start'>
        <div className="font-semibold flex gap-4 roboto mb-4 text-neutral/80">
          <p className='scale-120'>{benefit.icon}</p>{benefit.title}
        </div>
        <div className="font-medium text-neutral/70 flex flex-col gap-1 mt-1 w-full">
          {benefit.items.map((content, i) => (
          <div key={i} className="pl-2">
            <p>{content}</p>
            <div className="w-[40%] lg:w-[80%] h-1 mb-2 mt-1" style={{
                      backgroundImage: `linear-gradient(to right, oklch(0% 0 0 / 0.15) 50%, transparent 0%)`,
                      backgroundSize: '15px 1px',
                      backgroundRepeat: 'repeat-x'
                    }}></div>
          </div>
          ))}
        </div>
      </div>
      ))}
    </div>

  </div>

</section>
);
};

export default TechStackSection;