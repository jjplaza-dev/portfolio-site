import React from 'react'
import PixelWord from './design-components/PixelWord'
import PixelWordAnimated from './design-components/PixelWordAnimated'

const FrontSection = () => {
return (
<section className='front-section'>

    <div className='w-full lg:w-[50%] h-[25vh] p-5 absolute top-0 left-0 grid grid-cols-2 gap-2'>
        <div>
            
            <div className='pt-15 silk-regular leading-6 tracking-tighter flex flex-col gap-1'>
                <h2>JURIST</h2>
                <h2>PLAZA</h2>
            </div>
        </div>
        <div className='pt-15 silk-regular leading-6 tracking-tighter flex flex-col gap-1'>
                <h2>FULL STACK</h2>
                <h2>DEVELOPER | DESIGN</h2>
            </div>
    </div>

    <div className='w-[50%] max-lg:hidden h-[25vh] p-5 absolute top-0 right-0'>
        <h3 className='pt-15'></h3>
    </div>

    <div className='w-full lg:w-[60%] h-[20vh] p-5 absolute bottom-0 left-0 bg-transparent'>
        <PixelWord text="BRANDING" size={5}/>
        <PixelWord text="EXPERIENCE" size={6}/>
        <PixelWord text="DESIGN" size={4}/>
        
    </div>
</section>
)
}

export default FrontSection