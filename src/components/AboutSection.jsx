import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  const myAbout = "Hi, I’m Jurist John Plaza. I’m a Filipino web and digital designer dedicated to the intersection of motion design, interactive experiences, and pixel-perfect animation. My approach is simple: I balance the energy of movement and brand consistency with high-level functionality and a deeply intentional user experience."
  const myAI = "To stay at the cutting edge, I lean heavily into AI-driven workflows. I am an advocate for the symbiotic relationship between human intuition and machine speed. This tech-forward approach has effectively doubled my work efficiency, cutting turnaround times by more than half while maintaining the rigorous quality my clients expect."
  const benefits = ["Strategic Conversion", "Purposeful Motion", "Personalized Designs", "Scalable Architecture"]

  useGSAP(() => {
    gsap.from(".myBenefits", {
      opacity: 0,
      x: 200,
      y: 30,
      duration: 1.5,
      stagger: 0.20,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reset",
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className='section-box w-screen h-fit overflow-hidden'>
      <div className='w-full h-fit'>
        <div className='w-full flex section-title'><h5>WHO YOU'RE WORKING WITH</h5></div>
        <div className='w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <div className='flex flex-col gap-10'>
          <div className='flex justify-center items-center'>
            <img className='w-[50%] aspect-square' src='src/assets/images/profile-pencil-stroke-nobg.png'/>
          </div>

          <div className='font-normal text-neutral/70 leading-relaxed tracking-wider flex justify-center items-end'>
            <p className="w-[90%] h-fit ">{myAbout}</p>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='h-fit font-normal text-neutral/70 leading-relaxed flex justify-center items-center tracking-wider'>
          <p className="w-[90%] max-w-xl">{myAI}</p>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-4 py-10'>
          {benefits.map((item, index) => (
            <div 
              key={index}
              className='myBenefits w-[280px] md:w-[320px] text-center border-4 border-base-100 font-extrabold text-neutral/50 px-8 py-5 rounded-xl shadow-md bg-base-300 select-none' 
              style={{ transform: `rotateZ(${(index * 8) - 10}deg)` }}
            >
              {item}
            </div>
          ))}
        </div>
        </div>
      </div>
      </div>
      
    </section>
  )
}

export default AboutSection