import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import React, { useRef } from 'react'
import gsap from 'gsap'

const AboutSection = () => {
  const myAbout = "Hi, I’m Jurist John Plaza. I’m a Filipino web and digital designer dedicated to the intersection of motion design, interactive experiences, and pixel-perfect animation. My approach is simple: I balance the energy of movement and brand consistency with high-level functionality and a deeply intentional user experience."
  const myAI = "To stay at the cutting edge, I lean heavily into AI-driven workflows. I am an advocate for the symbiotic relationship between human intuition and machine speed. This tech-forward approach has effectively doubled my work efficiency, cutting turnaround times by more than half while maintaining the rigorous quality my clients expect."
  const benefits = ["Strategic Conversion", "Purposeful Motion", "Personalized Designs", "Scalable Architecture"]

  const sectionRef = useRef(null);
  useGSAP(() => {
    const allItems = gsap.utils.toArray(".myBenefits");

    gsap.fromTo(allItems, 
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    )
  }, {scope: sectionRef})

  return (
    <div className='w-screen h-screen px-[6vw] py-[6vh]' >
      
      <div className='w-full h-full rounded-2xl p-2 grid grid-cols-1 lg:grid-cols-2'>
        <div></div>
        <div className='font-normal text-neutral/70 leading-6 md:leading-5 lg:leading-7 tracking-wider p-2 md:p-4 2xl:p-20 flex items-end'><p>{myAI}</p></div>
        <div className='font-normal text-neutral/70 leading-6 md:leading-5 lg:leading-7 tracking-wider p-2 md:p-4 2xl:p-20'><p>{myAbout}</p></div>
        <div className='w-full flex flex-col items-center gap-2'>
          {benefits.map((items, index) => (
            <div className='myBenefits w-[300px] text-center ml-5 my-2 border-4 border-base-100 font-extrabold text-neutral/50 px-8 py-5 rounded-xl shadow-md bg-base-300' style={{transform: `rotateZ(${(index*8)-10}deg)`}}>{items}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutSection