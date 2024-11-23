import React from 'react'
import brandLogo from "/brandLogo.svg"

const Loading = () => {
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-2'>

            <div className='lg:w-[25%] lg:h-[25%] w-[90%] h-[25%] rounded-full '>
                <img src={brandLogo} alt="Logo" className='w-full h-full object-cover'/>
               
            </div>
            <p className='text-2xl text-green-600'>Loading...</p>
        </div>
    )
}

export default Loading
