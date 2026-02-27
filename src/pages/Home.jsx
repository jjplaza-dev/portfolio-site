import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '../Components/HeroSection'
import AboutSection from '../Components/AboutSection'
import ProjectSection from '../Components/ProjectSection'
import CTASection from '../Components/CTASection'
import TechStackSection from '../components/TechStackSection'
import ServicesSection from '../components/ServicesSection';

gsap.registerPlugin(ScrollToPlugin);
const Home = () => {
useEffect(() => {
  gsap.to(window, { duration: 0.5, scrollTo: 0, ease: "power2.inOut" });
}, []);

  return (
    <div>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ServicesSection />
        <TechStackSection />
        <CTASection />
    </div>
  )
}

export default Home