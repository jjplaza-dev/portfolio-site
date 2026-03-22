import React, { useState } from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const services = [
    {"title":"Web Dev",
      "desc":"Scalable architecture without the bloat. Built for speed, accessibility, and the long game."
    },
    {"title":"Web Design",
      "desc":"Structure before style. Interfaces that prioritize hierarchy and interaction over empty decoration."
    },
    {
      "title":"Redesign",
      "desc":"Evolution, not just a facelift. Sharpening your visual identity while boosting core performance."
    },
    {
      "title":"Custom Code",
      "desc":"Solving the edge cases. Bespoke logic and backend tools for problems off-the-shelf plugins can't handle."
    }
  ]
  

  return (
    <section className='w-screen h-full flex flex-col justify-center border-t border-b border-black/20 bg-inherit'>
      <div className='w-full h-full rounded-2xl'>
        <div className='section-title w-full flex'><p>SERVICES</p>
      </div>
        
      
        <div className='inner-section w-full grid grid-cols-1 border-l border-black/10'>
          {services.map((title, index) => (
            <ServiceCard 
              key={index} 
              index={index}
              title={title.title} 
              desc={title.desc}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;