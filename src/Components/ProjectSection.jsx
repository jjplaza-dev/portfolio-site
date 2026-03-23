import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, MoveRight, X } from 'lucide-react';

import hablonneVideo from '../assets/vidoes/Hablonne(edit 1).mp4'
import cooklookVideo from '../assets/vidoes/cooklook.mp4'

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '001', title: 'Philaya', tech: 'REACT + SUPABASE', 
      details: 'Philaya is a dynamic news and media platform built to merge real-time reporting with modern web interactivity. Unlike static news portals, Philaya delivers a seamless experience through React-driven interfaces and GSAP-enhanced animations that make stories feel alive. Powered by Supabase for structured content management and deployed globally via Vercel with Hostinger domain integration, the system ensures fast delivery, scalability, and responsive design. By combining cutting-edge technology with curated journalism, Philaya positions itself as a forward-looking hub for geopolitics, science, and business.', video: 'https://cdn.coverr.co/videos/coverr-typing-on-a-mechanical-keyboard-3-5244/1080p.mp4' },
  { id: '002', title: 'Hablonne', tech: 'NEXT.JS + GSAP', 
      details: 'Hablonne is a modern heritage-driven fashion platform that fuses cultural craftsmanship with cutting-edge web technology. Unlike static e‑commerce templates, Hablonne delivers an immersive shopping experience through React-powered interfaces and GSAP animations that bring collections to life. Backed by Supabase for real-time data and deployed seamlessly on Vercel with Hostinger domain integration, the system ensures scalability, responsiveness, and global reach. By weaving tradition into a dynamic digital framework, Hablonne positions itself as both a cultural showcase and a sustainable lifestyle brand.', video: hablonneVideo },
  { id: '003', title: 'Prevhues', tech: 'MONGODB + NODE', 
      details: 'Prevhues is a dynamic design-engine and community library built to bridge the gap between color theory and real-time implementation. Unlike static palette generators, Prevhues allows users to "live-test" colors across the entire application interface instantly.', video: 'https://cdn.coverr.co/videos/coverr-lines-of-code-on-a-screen-2178/1080p.mp4' },
  { id: '004', title: 'Surveyour', tech: 'THREE.JS + WEBGL',
      details: 'Surveyour is a streamlined survey and polling platform designed to simplify data collection with a focus on user experience and visual impact. The application allows users to create, distribute, and track surveys in real-time', video: 'https://cdn.coverr.co/videos/coverr-abstract-neon-lines-4156/1080p.mp4' },
  { id: '005', title: 'CookLook', tech: 'VUE + WEBSOCKETS', 
      details: 'CookLook is a modern web application designed to bridge the gap between a cluttered pantry and a home-cooked meal. By focusing on "ingredient-first" discovery, the system allows users to input their available supplies and instantly receive curated recipe recommendations, effectively reducing food waste and decision fatigue.', video: cooklookVideo},
];

const ProjectItem = ({ project, onClick }) => {
  const itemRef = useRef(null);
  const textGroupRef = useRef(null);
  
  // Desktop Refs
  const desktopMediaRef = useRef(null);
  const desktopVideoRef = useRef(null);
  
  // Mobile Refs
  const mobileMediaRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // --- DESKTOP BEHAVIOR (Hover & Track) ---
    mm.add("(min-width: 769px)", () => {
      // 1. Mouse X/Y Tracking Logic
      const mediaMover = (e) => {
        const rect = itemRef.current.getBoundingClientRect();
        // The desktop video box is exactly 320px wide and 180px tall.
        // We offset by half (160 and 90) to pin the exact center of the video to the cursor.
        const relX = e.clientX - rect.left - 160; 
        const relY = e.clientY - rect.top - 90;
        
        gsap.to(desktopMediaRef.current, {
          x: relX, 
          y: relY,

        });
      };

      // 2. Hover Expand Timeline
      const tl = gsap.timeline({ paused: true });
      tl.to(itemRef.current, {
        duration: 0.4,
        ease: "power1.inOut"
      })
      .fromTo(desktopMediaRef.current, {
        scale: 0.9
      }, {
        opacity: 1, scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)"
      }, "-=0.2");

      const onEnter = () => {
        tl.play();
        desktopVideoRef.current.play();
        window.addEventListener('mousemove', mediaMover);
      };

      const onLeave = () => {
        tl.reverse();
        desktopVideoRef.current.pause();
        window.removeEventListener('mousemove', mediaMover);
      };

      itemRef.current.addEventListener('mouseenter', onEnter);
      itemRef.current.addEventListener('mouseleave', onLeave);

      return () => {
        itemRef.current.removeEventListener('mouseenter', onEnter);
        itemRef.current.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('mousemove', mediaMover);
      };
    });

    // --- MOBILE BEHAVIOR (Auto-play in Viewport Center) ---
    mm.add("(max-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: itemRef.current,
        start: "center 55%", // Trigger when center of item hits middle 10% of screen
        end: "center 45%",
        onEnter: () => {
          gsap.to(mobileMediaRef.current, { opacity: 1, duration: 0.3 });
          mobileVideoRef.current.play();
        },
        onEnterBack: () => {
          gsap.to(mobileMediaRef.current, { opacity: 1, duration: 0.3 });
          mobileVideoRef.current.play();
        },
        onLeave: () => {
          gsap.to(mobileMediaRef.current, { opacity: 0, duration: 0.3 });
          mobileVideoRef.current.pause();
        },
        onLeaveBack: () => {
          gsap.to(mobileMediaRef.current, { opacity: 0, duration: 0.3 });
          mobileVideoRef.current.pause();
        }
      });
    });

    return () => mm.revert(); // Clean up matchMedia
  }, { scope: itemRef });

  const textLabel = "text-[9px] font-mono tracking-[0.2em] uppercase text-black/40";
  const textValue = "text-lg md:text-xl uppercase tracking-tighter leading-tight";

  return (
    // Added cursor-effect so your custom cursor expands over the row
    <div 
      ref={itemRef} 
      onClick={() => onClick(project)}
      className="relative group w-full h-[90px] border-b border-black/10 bg-primary flex items-center px-4 cursor-pointer"
    >
      
      {/* Default State Content */}
      <div ref={textGroupRef} className="w-full flex justify-between items-center z-10 pointer-events-none">
        <div className="flex gap-8 md:gap-16 items-center">
          <div className="flex flex-row items-center gap-5">
            <span className='opacity-0 group-hover:opacity-100 duration-300'><MoveRight /></span>
            <h5 className={`${textValue}]`}>{project.title}</h5>
          </div>
        </div>
        
        <div className="flex items-center text-right scale-80 md:scale-100 gap-2 md:gap-0">
          <div>Visit</div>
          <div className=" w-8 h-8 bg-primary flex items-center justify-center text-black">
             <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* DESKTOP: Hover State Video Box (Floating) */}
      <div 
        ref={desktopMediaRef} 
        className="hidden md:block absolute top-0 left-0 w-[320px] h-[180px] opacity-0 pointer-events-none z-20 shadow-2xl"
      >
        <div className=" w-full h-full border border-white/20 bg-black overflow-hidden relative">
          <video ref={desktopVideoRef} src={project.video} loop muted playsInline className="w-full h-full object-cover opacity-80" />
          {/* Arrow Up Right Button Overlay */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-primary flex items-center justify-center border border-black/10 shadow-sm text-black">
            <ArrowUpRight size={18} />
          </div>
          {/* Schematic Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#FFF_1px,transparent_1px),linear-gradient(to_bottom,#FFF_1px,transparent_1px)] bg-[size:10px_10px]" />
        </div>
      </div>

      {/* MOBILE: Auto-play Background Video */}
      <div ref={mobileMediaRef} className="lg:hidden absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0">
        <video ref={mobileVideoRef} src={project.video} loop muted playsInline className="w-full h-full object-cover opacity-100" />
        <div className="absolute inset-0 bg-primary/40" /> {/* Wash over video so text remains readable */}
      </div>

    </div>
  );
};

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  return (
    <section id='projects-section' className='section-box border-t border-black/10 bg-inherit overflow-hidden relative'>
      <div className='section-title'><p>PROJECTS</p></div>
      
      <div className='inner-section w-full max-w-7xl mx-auto py-20 md:px-6'>
        {projects.map((project) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            onClick={(proj) => setSelectedProject(proj)} 
          />
        ))}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-10 transition-opacity"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-[90%] h-[90%] bg-primary border-[0.5px] border-black/20 flex flex-col lg:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="cursor-effect absolute top-4 right-4 z-50 p-2 bg-primary border border-black/10 text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Video Section: Top Left Desktop, Top Middle Mobile */}
            <div className="w-full lg:w-[65%] h-[40%] lg:h-full bg-black relative border-b md:border-b-0 md:border-r border-black/20">
              <video 
                src={selectedProject.video} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-[35%] h-[60%] lg:h-full p-6 lg:p-12 overflow-y-auto flex flex-col gap-8 bg-primary">
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] text-black/40 mb-2 uppercase">Project Profile</p>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">{selectedProject.title}</h2>
              </div>
              
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-mono tracking-[0.3em] text-black/40 uppercase">Technology Stack</p>
                <p className="text-sm font-bold uppercase tracking-widest">{selectedProject.tech}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-mono tracking-[0.3em] text-black/40 uppercase">System Overview</p>
                <p className="text-sm leading-relaxed text-black/70">
                  {selectedProject.details}
                </p>
              </div>

              {/* Action Buttons inside Modal */}
              <div className="mt-auto pt-8 flex gap-4">
                <a href="#" className="cursor-effect flex-1 bg-black text-white text-[10px] font-bold tracking-[0.2em] text-center uppercase hover:bg-black/80 transition-colors">
                  View Live Site
                </a>
                <a href="#" className="cursor-effect flex-1 bg-transparent border border-black/20 text-black text-[10px] font-bold tracking-[0.2em] text-center uppercase hover:bg-black/5 transition-colors">
                  GitHub Repo
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;