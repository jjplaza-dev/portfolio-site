import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, X } from 'lucide-react';

import hablonneVideo from '../assets/vidoes/Hablonne(edit 1).mp4'
import cooklookVideo from '../assets/vidoes/cooklook.mp4'

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '001', title: 'Philaya', tech: 'REACT + SUPABASE', details: 'A high-frequency trading dashboard featuring real-time data visualization via WebSockets and D3.js. Designed for low-latency state updates.', video: 'https://cdn.coverr.co/videos/coverr-typing-on-a-mechanical-keyboard-3-5244/1080p.mp4' },
  { id: '002', title: 'Hablonne', tech: 'NEXT.JS + GSAP', details: 'Automated CI/CD deployment interface. Utilizes complex GSAP timelines to visualize server build states and deployment nodes.', video: hablonneVideo },
  { id: '003', title: 'Prevhues', tech: 'MONGODB + NODE', details: 'Scalable NoSQL cluster management UI. Features an interactive node-graph editor to route database shards dynamically.', video: 'https://cdn.coverr.co/videos/coverr-lines-of-code-on-a-screen-2178/1080p.mp4' },
  { id: '004', title: 'Surveyour', tech: 'THREE.JS + WEBGL', details: 'In-browser 3D simulation engine for aerodynamic testing. Built entirely with raw WebGL shaders and Three.js math utilities.', video: 'https://cdn.coverr.co/videos/coverr-abstract-neon-lines-4156/1080p.mp4' },
  { id: '005', title: 'CookLook', tech: 'VUE + WEBSOCKETS', details: 'Medical-grade telemetry dashboard. Prioritizes accessibility and instantaneous data reflection for critical hardware monitoring.', video: cooklookVideo},
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
    mm.add("(min-width: 768px)", () => {
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
    mm.add("(max-width: 767px)", () => {
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
      className="relative group w-full h-[90px] border-b border-black/10 bg-primary flex items-center px-4 md:px-12 cursor-pointer"
    >
      
      {/* Default State Content */}
      <div ref={textGroupRef} className="w-full flex justify-between items-center z-10 pointer-events-none">
        <div className="flex gap-8 md:gap-16 items-center">
          <div className="flex flex-col">
            <h5 className={`${textValue}]`}>{project.title}</h5>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col text-right">
          <p className="text-sm uppercase font-mono tracking-tight text-black/80">{project.tech}</p>
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
      <div ref={mobileMediaRef} className="md:hidden absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0">
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
    <section className='section-box border-t border-black/10 bg-inherit overflow-hidden relative'>
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
            className="relative w-[90%] h-[90%] bg-primary border-[0.5px] border-black/20 flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300"
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
            <div className="w-full md:w-[65%] h-[40%] md:h-full bg-black relative border-b md:border-b-0 md:border-r border-black/20">
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
            <div className="w-full md:w-[35%] h-[60%] md:h-full p-6 md:p-12 overflow-y-auto flex flex-col gap-8 bg-primary">
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