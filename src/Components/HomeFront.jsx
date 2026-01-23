import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { Canvas } from '@react-three/fiber'
import { Box, Edges, Instance, OrbitControls, Sphere } from '@react-three/drei'
import StudioLights from './three/StudioLights'
import PlatedBackground from './design-components/PlatedBackground'
import { MidPoints, MidPointsManager } from './design-components/MidPoints'
import FrontSection from './FrontSection'


const HomeFront = () => { 
 
  return (
    <>        
        <main className='home-front w-full min-h-screen overflow-x-hidden bg-black'>
            {/* <Navigation /> */}
            {/* <Canvas className='myCanvas' camera={{position: [0, 0, -20], fov: 100, near: 0.1, far: 100}}>
                <OrbitControls enableZoom={true}/>
                <StudioLights />
                {Array.from({ length: 21 }).map((_, index) => (
                    <>
                        <Sphere position={[index, 0, 0]} rotation={[0,0,0]} scale={0.1}  material-color={'white'}></Sphere>
                    </> 
                ))}   
            </Canvas> */}
            
            {/* First Section: Remains h-screen to fill the initial view */}
            <section className='w-full h-screen relative'>
                <PlatedBackground />
                <FrontSection />
            </section>

            {/* Subsequent Sections: Removed 'snap-start' */}
            <section className='w-full h-screen lower-main bg-white border border-black'>
                 {/* Section 2 Content */}
            </section>    

            <section className='w-full h-screen lower-main bg-white border border-black'>
                 {/* Section 3 Content */}
            </section>   

            <section className='w-full h-screen lower-main bg-white border border-black'>
                 {/* Section 4 Content */}
            </section>   
            
        </main>
    </>
  )
}

export default HomeFront

