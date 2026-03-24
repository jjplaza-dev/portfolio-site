import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

import hablonneVideo from '../assets/vidoes/Hablonne(edit 1).mp4';
import cooklookVideo from '../assets/vidoes/cooklook.mp4';

const Works = () => {
  const pageRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: '1', title: 'Philaya', link: "https://philaya.com/",
        details: 'Philaya is a dynamic news and media platform built to merge real-time reporting with modern web interactivity. Unlike static news portals, Philaya delivers a seamless experience through React-driven interfaces and GSAP-enhanced animations that make stories feel alive. Powered by Supabase for structured content management and deployed globally via Vercel with Hostinger domain integration, the system ensures fast delivery, scalability, and responsive design. By combining cutting-edge technology with curated journalism, Philaya positions itself as a forward-looking hub for geopolitics, science, and business.', video: 'https://cdn.coverr.co/videos/coverr-typing-on-a-mechanical-keyboard-3-5244/1080p.mp4' },
    { id: '2', title: 'Hablonne', link: "https://peru-alpaca-102666.hostingersite.com/",
        details: 'Hablonne is a modern heritage-driven fashion platform that fuses cultural craftsmanship with cutting-edge web technology. Unlike static e‑commerce templates, Hablonne delivers an immersive shopping experience through React-powered interfaces and GSAP animations that bring collections to life. Backed by Supabase for real-time data and deployed seamlessly on Vercel with Hostinger domain integration, the system ensures scalability, responsiveness, and global reach. By weaving tradition into a dynamic digital framework, Hablonne positions itself as both a cultural showcase and a sustainable lifestyle brand.', video: hablonneVideo },
    { id: '3', title: 'Prevhues', link: "https://prevhues.vercel.app/",
        details: 'Prevhues is a dynamic design-engine and community library built to bridge the gap between color theory and real-time implementation. Unlike static palette generators, Prevhues allows users to "live-test" colors across the entire application interface instantly.', video: 'https://cdn.coverr.co/videos/coverr-lines-of-code-on-a-screen-2178/1080p.mp4' },
    { id: '4', title: 'Surveyour', link: "https://surveyour.vercel.app/",
        details: 'Surveyour is a streamlined survey and polling platform designed to simplify data collection with a focus on user experience and visual impact. The application allows users to create, distribute, and track surveys in real-time', video: 'https://cdn.coverr.co/videos/coverr-abstract-neon-lines-4156/1080p.mp4' },
    { id: '5', title: 'CookLook', link: "https://cooklook.vercel.app/",
        details: 'CookLook is a modern web application designed to bridge the gap between a cluttered pantry and a home-cooked meal. By focusing on "ingredient-first" discovery, the system allows users to input their available supplies and instantly receive curated recipe recommendations, effectively reducing food waste and decision fatigue.', video: cooklookVideo},
  ];

  // 1. Initial Page Load Animation (Runs once)
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { y: '100vh' }, 
      { 
        y: '0', 
        duration: 0.8, 
        ease: 'power4.out',
        delay: 0.1
      }
    );
  }, []);

  // 2. Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <>
      {/* --- MAIN PAGE CONTENT (With Slide-up Animation) --- */}
      <div 
        ref={pageRef} 
        className="min-h-screen w-full bg-primary text-black flex flex-col pt-32 pb-20 px-4 md:px-10 translate-y-[100vh] will-change-transform relative z-10"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between border-b border-black pb-8">
          <h1 className="text-[15vw] md:text-[10vw] font-light uppercase tracking-tighter leading-none">Works</h1>
          <p className="font-mono text-sm uppercase mb-2 md:mb-4">Selected Projects [{projects.length}]</p>
        </div>

        {/* Project Grid */}
        <div className="w-full max-w-7xl mx-auto mt-12 grid grid-cols-1 2xl:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-black text-white"
            >
              <video 
                src={project.video} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h2 className="text-4xl md:text-5xl uppercase font-bold tracking-tighter">{project.title}</h2>
                <span className="mt-2 font-mono text-xs uppercase tracking-widest text-accent">{project.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- NEW PROJECT MODAL (From your ProjectSection) --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-10 transition-opacity"
          onClick={() => setSelectedProject(null)} // Click outside to close
        >
          <div 
            className="relative w-[90%] h-[85vh] bg-primary border-[0.5px] border-black/20 flex flex-col lg:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to background
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
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-mono tracking-[0.3em] text-black/40 uppercase">System Overview</p>
                <p className="text-sm leading-relaxed text-black/70">
                  {selectedProject.details}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-8 flex gap-4">
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-effect flex-1 bg-black text-white py-3 text-[10px] font-bold tracking-[0.2em] text-center uppercase hover:bg-black/80 transition-colors"
                >
                  View Live Site
                </a>
                <a 
                  href="#" 
                  className="cursor-effect flex-1 bg-transparent border border-black/20 text-black py-3 text-[10px] font-bold tracking-[0.2em] text-center uppercase hover:bg-black/5 transition-colors"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Works;