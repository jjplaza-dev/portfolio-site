import { Environment, Lightformer } from '@react-three/drei'
import React from 'react'

const StudioLights = () => {
  return (
    <group name='lights'>
        <Environment resolution={256}>
            <group>
                <Lightformer
                    form="rect"
                    intensity={5}
                    position={[-10, 5, -5]}
                    scale={10}
                    rotation-y={Math.PI / 2}
                />
                <Lightformer
                    form="rect"
                    intensity={10}
                    position={[10, 0, 1]}
                    scale={10}
                    rotation-y={Math.PI / 2}
                />
            </group>
        </Environment>
        <spotLight 
            position={[0, 10, -1]}
            angle={5}
            decay={0}
            intensity={Math.PI * 0.2}
        />
        <spotLight 
            position={[0, -10, -1]}
            angle={1}
            decay={0}
            intensity={Math.PI * 0.2}
        />
        <spotLight 
            position={[-15, 10, 0]}
            angle={1}
            decay={0.2}
            intensity={Math.PI * 1}
        />
    </group>
  )
}

export default StudioLights