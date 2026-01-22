import React from 'react'
import PixelWord from './design-components/PixelWord'

const FrontSection = () => {
return (
<section className='front-section'>

    <div className='w-full lg:w-[50%] h-[25vh] p-5 absolute top-0 left-0 grid grid-cols-2 gap-2'>
        <div>
            
            <div className='text-xl pt-15 leading-6'>
                <h3 className='silk-regular '>JURIST</h3>
                <h3 className='silk-regular'>PLAZA</h3>
            </div>
        </div>
        <div className='pt-15 pointer-events-none text-xl silk-regular text-left leading-6 tracking-tighter'>
            <h3>FULL STACK</h3>
            <h3>DESIGN & CODE</h3>
        </div>
    </div>

    <div className='w-[50%] max-lg:hidden h-[25vh] p-5 absolute top-0 right-0'>
        <h3 className='pt-15'></h3>
    </div>

    <div className='w-full lg:w-[60%] h-[20vh] p-5 absolute bottom-0 left-0 bg-transparent'>
        <PixelWord text="BRANDING" size={4}/>
        <PixelWord text="EXPERIENCE" size={6}/>
        <PixelWord text="DESIGN" size={3}/>
        
    </div>
</section>
)
}

export default FrontSection