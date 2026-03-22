import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import hablonneVid from "../assets/vidoes/Hablonne(edit 1).mp4"
import cooklookVid from "../assets/vidoes/cooklook.mp4"

import hablonneImage from "../assets/images/hablonneimage.png"
import cooklookImage from "../assets/images/cooklookimage.png"

gsap.registerPlugin(ScrollTrigger);

// 1. Grouped Data Structure (3 groups, 2 projects each = 6 total)
const PROJECT_GROUPS = [
  {
    id: 'group-1',
    items: [
      { id: 11, title: "Project One", videoSrc: hablonneVid, imageSrc: hablonneImage },
      { id: 12, title: "Project Two", videoSrc: cooklookVid, imageSrc: cooklookImage }
    ]
  },
  {
    id: 'group-2',
    items: [
      { id: 21, title: "Project Three", videoSrc: "/media/photo-demo.mp4", imageSrc: "/media/photo-thumb.jpg" },
      { id: 22, title: "Project Four", videoSrc: "/media/app-demo.mp4", imageSrc: "/media/app-thumb.jpg" }
    ]
  },
  {
    id: 'group-3',
    items: [
      { id: 31, title: "Project Five", videoSrc: "/media/shop-demo.mp4", imageSrc: "/media/shop-thumb.jpg" },
      { id: 32, title: "Project Six", videoSrc: "/media/dashboard-demo.mp4", imageSrc: "/media/dashboard-thumb.jpg" }
    ]
  }
];

// 2. The Automated Media Looper
const LoopingMedia = ({ videoSrc, imageSrc }) => {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let timer;
    if (!showVideo) {
      // Stay on image for 2 seconds, then trigger the video
      timer = setTimeout(() => {
        setShowVideo(true);
      }, 2000);
    } else if (videoRef.current) {
      // Play the video and reset it to the start just in case
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log("Playback prevented:", err));
    }

    return () => clearTimeout(timer);
  }, [showVideo]);

  const handleVideoEnded = () => {
    // When the video naturally reaches the end, switch back to the image
    setShowVideo(false);
  };

  return (
    <div className='w-full h-full relative overflow-hidden'>
      {/* The Static Image Layer */}
      <img 
        src={imageSrc} 
        alt="Project Preview" 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
          showVideo ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* The Video Layer (Notice 'loop' is removed so onEnded can fire) */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

// 3. Main Section with Diagonal Positioning
const ProjectSection = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    // We now calculate based on the number of GROUPS, not individual projects
    const xOffset = -100 * ((PROJECT_GROUPS.length - 1) / PROJECT_GROUPS.length);

    gsap.to(horizontalRef.current, {
      xPercent: xOffset,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-screen px-[10vw] bg-inherit">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="sticky top-0 w-screen h-screen flex items-center overflow-hidden">
                <div 
                    ref={horizontalRef} 
                    className="flex h-[80vh]"
                    style={{ width: `${PROJECT_GROUPS.length * 100}vw` }} 
                >
                    {PROJECT_GROUPS.map((group) => (
                        <div key={group.id} className="w-screen h-full flex items-center justify-center bg-transparent relative">
                            <div className="w-[80vw] h-[80vh] relative pointer-events-auto overflow-hidden">
                                
                                {/* Item 1: Upper Left */}
                                <div className='absolute top-[5%] left-[5%] w-[35vw] min-w-[250px] aspect-video p-2 border-1 shadow-lg bg-base-100'>
                                    <div className='w-full h-full overflow-hidden border border-neutral/20'>
                                      <LoopingMedia videoSrc={group.items[0].videoSrc} imageSrc={group.items[0].imageSrc}/>
                                    </div>
                                </div>

                                {/* Item 2: Lower Right */}
                                <div className='absolute bottom-[5%] right-[5%] w-[35vw] min-w-[250px] aspect-video p-2 border-1 shadow-lg bg-base-100'>
                                    <div className='w-full h-full overflow-hidden border border-neutral/20'>
                                      <LoopingMedia videoSrc={group.items[1].videoSrc} imageSrc={group.items[1].imageSrc}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Empty space to allow the horizontal scroll to scrub completely */}
        <div className="relative z-10 w-full h-full pointer-events-none">
            {PROJECT_GROUPS.map((group) => (
                <div key={`spacer-${group.id}`} className="w-full h-screen pointer-events-none"></div>
            ))}
        </div>
    </section>
  )
}

export default ProjectSection;