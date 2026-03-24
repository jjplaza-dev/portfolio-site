import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      pageRef.current,
      { y: '100vh' },
      { y: '0', duration: 0.8, ease: 'power4.out', delay: 0.1 }
    );
    tl.fromTo(
      ".about-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-primary text-black flex flex-col pt-32 pb-20 px-4 md:px-10 translate-y-[100vh] will-change-transform">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between">
        {/* ABOUT ME STATEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start lg:items-end border-b border-black/20 pb-12 lg:pb-20">
          <h1 className="lg:col-span-5 about-reveal text-[15vw] lg:text-[10vw] font-light uppercase tracking-tighter leading-none mb-4 lg:mb-0">
            About
          </h1>
          <div className="lg:col-span-7 about-reveal pb-2 flex flex-col gap-6 lg:gap-8">
            <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight">
              I am Jurist John Plaza, a Filipino Web Designer and Developer experienced in crafting expressive, motion-driven web experiences.
            </p>
            <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight">
              Through the proper balance of design and functionality, I aim to create distinctive and memorable digital products tailored to diverse industries, businesses, and teams.
            </p>
          </div>
        </div>

        {/* PROFILE */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-16 md:mt-24 gap-12 md:gap-10 about-reveal">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-black/10 pb-2 mb-2">
              Core
            </h3>
            <p className="text-sm font-medium uppercase tracking-widest">Frontend Architecture</p>
            <p className="text-sm font-medium uppercase tracking-widest">Creative Coding</p>
            <p className="text-sm font-medium uppercase tracking-widest">UI / UX Design</p>
            <p className="text-sm font-medium uppercase tracking-widest">Interactive Motion</p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-black/10 pb-2 mb-2">
              Technical
            </h3>
            <p className="text-sm font-medium uppercase tracking-widest">React & Next.js</p>
            <p className="text-sm font-medium uppercase tracking-widest">GSAP & Three.js</p>
            <p className="text-sm font-medium uppercase tracking-widest">Tailwind CSS</p>
            <p className="text-sm font-medium uppercase tracking-widest">Supabase Database</p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-black/10 pb-2 mb-2">
              AI Tech
            </h3>
            <p className="text-sm font-medium uppercase tracking-widest">Stitch</p>
            <p className="text-sm font-medium uppercase tracking-widest">Claude</p>
            <p className="text-sm font-medium uppercase tracking-widest">Lovable</p>
            <p className="text-sm font-medium uppercase tracking-widest">Copilot</p>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-black/10 pb-2 mb-2">
              Dev Tools
            </h3>
            <p className="text-sm font-medium uppercase tracking-widest">Figma</p>
            <p className="text-sm font-medium uppercase tracking-widest">VS Code</p>
            <p className="text-sm font-medium uppercase tracking-widest">Vercel</p>
            <p className="text-sm font-medium uppercase tracking-widest">Hostinger</p>
          </div>
          {/* Column 5 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-black/10 pb-2 mb-2">
              Background
            </h3>
            <p className="text-sm font-medium uppercase tracking-widest">Based in Visayas, PH</p>
            <p className="text-sm font-medium uppercase tracking-widest">Logic & Puzzle Enthusiast</p>
            <p className="text-sm font-medium uppercase tracking-widest">Indie Pixel Game Dev</p>
            <p className="text-sm font-medium uppercase tracking-widest">Always with Music</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;