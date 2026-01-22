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
        <main className='home-front'>
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
            <section className='w-screen h-screen overflow-hidden relative'>
                <PlatedBackground />
                <FrontSection />
            </section>
            <section className='w-full h-screen lower-main bg-black'>

            </section>    
            <section className='w-screen h-screen overflow-hidden relative'>
                <PlatedBackground />
                <div className='w-full h-screen absolute top-0' style={{background: 'linear-gradient(to bottom, #000000 0%, #000000 30%, #11111100 60%)'}}></div>
            </section>    
            <section className='w-screen h-screen overflow-hidden relative'>
                <PlatedBackground />
                <div className='w-full h-screen absolute bottom-0' style={{background: 'linear-gradient(to top, #000000 0%, #000000 30%, #11111100 60%)'}}></div>
            </section> 
        </main>
    </>
  )
}

export default HomeFront