import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { Canvas } from '@react-three/fiber'
import { Box, Edges, Instance, OrbitControls, Sphere } from '@react-three/drei'
import StudioLights from './three/StudioLights'
import PlatedBackground from './design-components/PlatedBackground'
import { MidPoints, MidPointsManager } from './design-components/MidPoints'


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
            <PlatedBackground />
            <div className='w-full take-up-space h-100 bg-white'></div>
    
            
        </main>
    </>
  )
}

export default HomeFront