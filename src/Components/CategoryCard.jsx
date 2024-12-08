import React from 'react'

const CategoryCard = ({ name, url, onClick }) => {
    return (
        <div 
            className="flex flex-col items-center justify-center p-1 bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative w-[10rem] h-[10rem] rounded-lg overflow-hidden shadow-md mb-4">
                <img 
                    src={url} 
                    alt={name} 
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" 
                />
            </div>
            <h3 className="text-sm font-inter text-gray-800 font-semibold text-center tracking-wide">{name}</h3>
        </div>
    )
}

export default CategoryCard
