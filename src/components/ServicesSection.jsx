import React, { useState } from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const services = [
    {"title":"Web Dev",
      "desc":"Building high-performance, scalable web applications using modern frameworks and robust backend integrations."
    },
    {"title":"Web Design",
      "desc":"Crafting unique digital identities that balance bold aesthetics with intuitive, user-centered layouts."
    },
    {
      "title":"Redesign",
      "desc":"Modernize outdated platforms by injecting fresh visuals, optimized performance, and current web standards."
    },
    {
      "title":"Custom Code",
      "desc":"Solving specific technical hurdles by engineering specialized scripts and complex logic tailored to your unique needs."
    },
    {
      "title": "Figma to React",
      "desc":"Translate high-fidelity designs into pixel-perfect, interactive React components that look and feel exactly like the prototype."
    },
    {
      "title": "Motion & Interaction Design",
      "desc": "Bringing static interfaces to life using cinematic GSAP animations and fluid, tactile transitions that guide the user's journey."
    },
    {
      "title": "Performance & SEO Optimization",
      "desc": "Audit and refine existing codebases to achieve lightning-fast load times and ensure your site ranks where it belongs."
    }
  ]
  

  return (
    <section className='section-box flex flex-col justify-center bg-inherit'>
      <div className='w-full h-full rounded-2xl'>
        <div className='section-title w-full flex'><p>SERVICES</p></div>
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