import { useState, useEffect } from 'react'
import HomeFront from './Components/HomeFront'
import gsap from 'gsap'
import CursorDot from './Components/design-components/CursorDot'
import Navigation from './Components/Navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger' // Recommended for syncing
import * as THREE from 'three'
import Lenis from 'lenis'
import ProjectSection from './Components/ProjectSection'
import Footer from './Components/Footer'
import AboutMe from './Components/AboutMe'
import StackSection from './Components/StackSection'

gsap.registerPlugin(ScrollTrigger)

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true, 
      touchMultiplier: 2, 
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    window.scrollTo(0, 0);
    
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      {/* <LoadingScreen /> */}
      <Navigation />
      <HomeFront />
      <AboutMe />
      <ProjectSection />
      <StackSection />
      <Footer />
      
      <CursorDot />
    </>
  )
}

export default App
