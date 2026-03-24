import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import ProjectSection from '../components/ProjectSection'
import CTASection from '../components/CTASection'
import TechStackSection from '../components/TechStackSection'
import ServicesSection from '../components/ServicesSection';
import Expertise from '../components/Expertise';
import HeroSection from '../components/HeroSection';


gsap.registerPlugin(ScrollToPlugin);
const Home = () => {
useEffect(() => {
  gsap.to(window, { duration: 0.5, scrollTo: 0, ease: "power2.inOut" });
}, []);

  return (
    <div className='bg-inherit'>
        <HeroSection />
        <Expertise />
        <ServicesSection />
        <TechStackSection />
        <ProjectSection />
        <CTASection />
    </div>                        
  )
}

export default Home