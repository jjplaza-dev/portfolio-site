import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const FooterSection = () => {
  const containerRef = useRef(null);
  const cloudImages = [
    'src/assets/images/cloud1.png',
    'src/assets/images/cloud2.png',
    'src/assets/images/cloud3.png',
    'src/assets/images/cloud4.png',
    'src/assets/images/cloud5.png'
  ];

  useEffect(() => {
    // 8 Lanes from top (0%) to bottom (~90%)
    const lanes = [5, 15, 25, 40, 55, 70, 85, 95];

    const spawnCloud = () => {
      if (!containerRef.current) return;

      const cloud = document.createElement('img');
      const randomImg = cloudImages[Math.floor(Math.random() * cloudImages.length)];
      
      // Select a random lane index (0 to 7)
      const laneIndex = Math.floor(Math.random() * lanes.length);
      const laneY = lanes[laneIndex];

      /* PERSPECTIVE LOGIC:
         As laneIndex increases (moves down the screen):
         - Scale increases (0.3 to 1.5)
         - Duration decreases/Speed increases (60s down to 15s)
         - Z-index increases (1 to 8)
         - Opacity increases (0.3 to 0.9)
      */
      const scale = gsap.utils.mapRange(0, 7, 0.3, 1.6, laneIndex);
      const duration = gsap.utils.mapRange(0, 7, 60, 15, laneIndex);
      const zIndex = laneIndex + 1; // Lanes 1-8
      const opacity = gsap.utils.mapRange(0, 7, 0.8, 1, laneIndex);
      const blur = gsap.utils.mapRange(0, 7, 4, 0, laneIndex); // Far clouds are blurrier

      cloud.src = randomImg;
      // We use inline styles for the dynamic zIndex and filter
      cloud.className = 'absolute pointer-events-none select-none';
      cloud.style.zIndex = zIndex;
      cloud.style.filter = `blur(${blur}px)`;
      
      gsap.set(cloud, {
        top: `${laneY}%`,
        left: '100%',
        scale: scale,
        opacity: 0,
      });

      containerRef.current.appendChild(cloud);

      const tl = gsap.timeline({
        onComplete: () => cloud.remove()
      });

      tl.to(cloud, {
        opacity: opacity,
        duration: 2,
      }, 0)
      .to(cloud, {
        x: `-${window.innerWidth + (800 * scale)}px`, 
        duration: duration,
        ease: "none"
      }, 0);
    };

    const timer = setInterval(spawnCloud, 2000);
    for(let i = 0; i < 5; i++) spawnCloud(); // Initial fill

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className='w-full h-screen relative flex justify-center items-center overflow-hidden bg-[oklch(97.466%_0.011_259.822)]'
    >
      {/* FOOTER TEXT ELEMENT 
          z-index is 10 to ensure it stays above most clouds, 
          but you can set it to 5 if you want the bottom-lane clouds 
          to pass IN FRONT of the text.
      */}
      <div className='footer-text w-[50%] min-w-[300px] h-fit z-[10] relative pointer-events-auto'>
        <div className='text-center fredoka font-semibold text-[clamp(2rem,5vw,25rem)] leading-8 md:leading-15 2xl:leading-[7.5rem]'>
          FEEL LIKE
        </div>
        <div className='text-center fredoka font-semibold text-[clamp(2rem,5vw,25rem)] leading-8 md:leading-15 2xl:leading-[5rem]'>
          COLLABORATING ?
        </div>
        <p className='text-center font-medium scale-80 mt-10'>CONTACT ME</p>
        <h2 className='text-center courgette my-2 text-primary'>jjplaza.dev@gmail.com</h2>
      </div>
    </section>
  )
}

export default FooterSection;