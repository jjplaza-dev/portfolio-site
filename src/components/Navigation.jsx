
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const [isLoading, setIsloading] = useState(true)

    setTimeout(() => {
        setIsloading(false)
    }, 300)

  return (
    <section className='w-full h-16 lg:h-20'>
        <div className={`Navigation w-screen h-16 ${isLoading? "h-full pb-10 py-4":"lg:h-20 pt-4"} duration-1000 px-[6vw] mx-auto fixed z-999`}>
            <div className='w-full h-full shadow-2xl shadow-base-300 rounded-4xl px-[6%] md:px-[4%] lg:px-[2%] flex items-center justify-between bg-base-100'>
                <div className='w-full h-full flex justify-start items-center'>
                    <Link to={"/"}>
                        <h5 className='font-semibold fredoka px-2 duration-300 hover:text-primary'>jurist • plaza</h5>
                    </Link>
                </div>
                <div className='w-full h-full flex justify-end gap-5 items-center'>
                    <Link to={"home"} className='flex gap-1 items-center group'>
                        <div className='scale-0 group-hover:scale-100 text-primary duration-300'>•</div>
                        <p className='font-semibold fredoka duration-300 group-hover:text-primary'>Home</p>
                    </Link>
                    <Link to={"works"} className='flex gap-1 items-center group'>
                        <div className='scale-0 group-hover:scale-100 text-primary duration-300'>•</div>
                        <p className='font-semibold fredoka duration-300 group-hover:text-primary'>Works</p>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Navigation