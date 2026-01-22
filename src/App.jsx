import { useState } from 'react'
import HomeFront from './Components/HomeFront'
import gsap from 'gsap'
import * as THREE from 'three'
import CursorDot from './Components/design-components/CursorDot'
import Navigation from './Components/Navigation'


function App() {

  return (
    <>
      <Navigation />
      <HomeFront />
      <CursorDot />

    </>
  )
}

export default App
