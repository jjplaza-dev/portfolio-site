import React, { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import StudioLights from './three/StudioLights'
import globalstates from './constants/globalstates';
import gsap from 'gsap';
import * as THREE from 'three'

// --- INDIVIDUAL FLOATING CUBE ---
const FloatingCube = () => {
  const ref = useRef();
  
  const { position, rotationSpeed, randomStartRotation } = useMemo(() => {
    return {
      position: [
        (Math.random() - 0.5) * 25, 
        (Math.random() - 0.5) * 25, 
        (Math.random() - 0.5) * 4   
      ],
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      randomStartRotation: [0, Math.random() * Math.PI * 2, 0]
    };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed * delta;
    }
  });

  return <Instance ref={ref} position={position} rotation={randomStartRotation} />;
};

// --- RANDOMIZED WALL CONTAINER ---
const RandomizedWall = ({ count = 100, color = '#222222' }) => {
  return (
    <Instances range={count}>
      {/* Fixed: Depth is 1 so cubes look 3D */}
      <boxGeometry args={[1, 1, 0]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.8} />
      
      {Array.from({ length: count }).map((_, i) => (
        <FloatingCube key={i} />
      ))}
    </Instances>
  );
};

// --- ROTATING WRAPPER ---
const RotatingScene = ({ children }) => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.05; 
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1; 
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// --- GSAP CAMERA RIG ---
const CameraRig = ({ mouseX, mouseY }) => {
  const { camera } = useThree();
  const isLarge = globalstates((state) => state.isLarge); 

  const xTo = useRef();
  const yTo = useRef();

  useEffect(() => {
    xTo.current = gsap.quickTo(camera.position, "x", { duration: 1.5, ease: "power3.out" });
    yTo.current = gsap.quickTo(camera.position, "y", { duration: 1.5, ease: "power3.out" });
  }, [camera]);

  useEffect(() => {
    gsap.to(camera.position, {
        z: isLarge ? 18 : 25, 
        duration: 2, 
        ease: "power2.inOut"
    });
  }, [isLarge, camera]);

  useFrame(() => {
    if (xTo.current && yTo.current) {
        xTo.current(-mouseX.current * 5); 
        yTo.current(-mouseY.current * 2);
    }
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

const HomeFront = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const textRef = useRef(null);
  
  const xSet = useRef();
  const ySet = useRef();

  useEffect(() => {
    // Initialize GSAP setters
    if (textRef.current) {
        xSet.current = gsap.quickTo(textRef.current, "x", { duration: 0.8, ease: "power3.out" });
        ySet.current = gsap.quickTo(textRef.current, "y", { duration: 0.8, ease: "power3.out" });
    }

    // --- MOUSE EVENT HANDLER (Attached to Window for reliability) ---
    const handleMouseMove = (e) => {
        const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
        const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;
        
        // Update 3D Camera Refs
        mouseX.current = xNorm;
        mouseY.current = yNorm;

        // Update Text GSAP
        // Increased multiplier from 25 to 100 for visible movement
        if (xSet.current && ySet.current) {
            xSet.current(xNorm * 100); 
            ySet.current(-yNorm * 100); 
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Run once on mount

  const isLarge = globalstates.getState().isLarge;

  return (
    <>
        <main className='hero-section w-screen lg:h-[120vh] h-screen relative text-white bg-black/95 overflow-hidden'>
            <section className='front-background w-full h-screen absolute top-0 bg-transparent'>
                <Canvas camera={{position: [0, 0, 18], fov: 70, near: 0.1, far: 100}}>
                    
                    <CameraRig mouseX={mouseX} mouseY={mouseY} />
                    <StudioLights />
                    
                    <RotatingScene>
                        <RandomizedWall count={100} />
                    </RotatingScene>

                </Canvas>
            </section>

            <div className='w-full h-screen absolute top-0 z-10 pointer-events-none flex justify-center items-center mix-blend-difference'>
                <h1 
                    ref={isLarge? textRef : null} 
                    className='main-text font-bold text-center tracking-wide zalando text-green-200 text-6xl'
                    // Ensure it has block display for transform to work reliably
                    style={{ display: 'block', willChange: 'transform' }}
                >
                    <span>ROBOTCO</span>
                </h1>
            </div>
        </main>
    </>
  )
}

export default HomeFront