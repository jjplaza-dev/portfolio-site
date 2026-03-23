import React, { useRef } from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Draggable);

const Expertise = () => {
  const scopeRef = useRef(null);
  const boundsRef = useRef(null);

  const expertise = [
    {
      "title": "Motion Orchestration",
      "desc": "I transform static layouts into cinematic, scroll-driven narratives where every movement serves a clear purpose.",
      "image": ""
    },
    {
      "title": "Interaction Engineering",
      "desc": "I craft tactile, high-fidelity interfaces that prioritize the feel of every click, hover, and micro-interaction.",
      "image": ""
    },
    {
      "title": "AI Workflows",
      "desc": "I integrate advanced generative tools into my development process to solve complex logic and ship features at high speed.",
      "image": ""
    },
    {
      "title": "Vibe Coding",
      "desc": "I lean into rapid, intuition-led iteration to bridge the gap between abstract ideas and functional, live prototypes.",
      "image": ""
    }
  ]

  useGSAP(() => {
    const cards = gsap.utils.toArray('.draggable-card');

    cards.forEach((card) => {
      Draggable.create(card, {
        type: "x,y",
        bounds: boundsRef.current,
        edgeResistance: 0,
        inertia: true,
        onDragStart: function() {
          gsap.to(this.target, { scale: 1.05, duration: 0.2 });
        },
        onDragEnd: function() {
          gsap.to(this.target, { scale: 1, duration: 0.2 });
        }
      });
    });
  }, { scope: scopeRef });

  return (
    <section ref={scopeRef} className='section-box'>
      <div className='section-title'>Expertise</div>
      <div ref={boundsRef} className='inner-section grid grid-cols-1 xl:grid-cols-2'>
        
        <div className='text-[clamp(1.2rem,2vw,2rem)] px-10 pb-10 text-center lg:text-start pointer-events-none'>
          I blend product thinking, design craft, vibe coding speed, and AI workflows to ship better work, faster.
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-5'>
          {expertise.map((item, index) => (
            <div key={index} className='flex justify-center items-center' style={{ transform: `translateY(${index * 5}%)` }}>
              <div className='draggable-card w-[95%] max-w-[240px] h-fit flex flex-col justify-center items-center gap-2 p-2 border border-accent/20 hover:border-accent/80 transform-border cursor-grab active:cursor-grabbing group z-10'>
                 {/* Four Corners */}
                  <div className="absolute -top-[4px] -left-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-[4px] -right-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-[4px] -left-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-[4px] -right-[4px] w-2 h-2 bg-accent outline outline-3 outline-primary opacity-20 group-hover:opacity-100 transition-opacity" />

                <div className='w-24 aspect-square border pointer-events-none flex items-center justify-center text-[10px] uppercase tracking-widest text-black/30'>
                  Logo
                </div>
                <div className='text-[14px] font-bold pointer-events-none'>{item.title}</div>
                <div className='w-[90%] text-black/70 text-[12px] text-center leading-4 pointer-events-none'>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Expertise