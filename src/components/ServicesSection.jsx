import React, { useState } from 'react';
import ServiceCard from './ServiceCard'; // We will create this below

const ServicesSection = () => {
  // State to track which button is clicked on mobile (Radio behavior)
  const [activeIndex, setActiveIndex] = useState(null);

  const services = [
    "Website Design",
    "Full-Stack Development",
    "Responsive Designs",
    "Web Development",
    "Micro Interactions",
    "SEO Strategy"
  ];

  return (
    <section className='w-full h-fit flex flex-col border border-black/10'>
      <h2 className='w-full lg:w-[80%] mx-auto p-5 mt-10 text-xl md:text-3xl font-light'>
        Digital environments engineered to feel as fluid as they are functional—igniting the user journey
      </h2>
      
      <div className='w-full h-fit py-10 px-[5vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
        {services.map((title, index) => (
          <ServiceCard 
            key={index} 
            index={index}
            title={title} 
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;