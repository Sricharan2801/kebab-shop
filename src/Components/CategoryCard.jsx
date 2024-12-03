import React from 'react'

const CategoryCard = ({ name, url, onClick }) => {
    return (
        <div className='flex flex-col items-center pt-2 cursor-pointer shadow-lg rounded-lg hover:scale-110' onClick={onClick}>
            <div className='w-[10rem] h-[10rem] bg-black rounded-lg'>
                <img src={url} alt="" className='rounded-lg'/>
            </div>
            <h3 className='text-[1rem] text-slate-500 font-semibold'>{name}</h3>
        </div>
    )
}

export default CategoryCard
