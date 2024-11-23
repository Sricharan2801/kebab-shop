import React, { useState, useEffect } from 'react';
import { menuItems, menuCards } from '../utils/index';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Menu = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        menuItems.forEach(image => {
            const img = new Image();
            img.src = image.imgSrc;
        });

        menuCards.forEach(image => {
            const img = new Image();
            img.src = image.imgSrc;
        });
    }, []);

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Full stars count
        const halfStar = rating % 1 !== 0; // Check for half-star
        const emptyStars = 5 - Math.ceil(rating); // Empty stars count

        // Create an array of stars based on the rating
        const stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push('full');
        }

        // Add a half star if needed
        if (halfStar) {
            stars.push('half');
        }

        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push('empty');
        }
        return stars;
    };

    // Navigation handlers for the image carousel
    const handlePrevImage = () => {
        setCurrentImageIndex(prev => (prev === 0 ? menuCards.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prev => (prev === menuCards.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="menu" className="relative w-[100vw] flex flex-col justify-center items-center">
            <h1 className="page-title text-center pt-4 mb-5">
                Menu Items
            </h1>

            {/* Image Display Section */}
            <div className="lg:w-[75%] lg:h-[30rem] w-[90%] h-[15rem] mb-20">
                <img
                    src={menuCards[currentImageIndex].imgSrc}
                    alt="Menu Item"
                    className="w-full h-full border-solid border-2 border-slate-200 rounded-lg shadow-xl shadow-slate-950"
                />
            </div>

            <h2 className="page-title text-center pt-4 mb-5">
                Our Dishes
            </h2>

            {/* Swiper Section */}
            <div className="container mx-auto mb-5">
                <Swiper
                    spaceBetween={30}
                    loop={true}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    className="swiper-container"
                >
                    {menuItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="relative w-[90%] h-[18rem] mx-auto rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
                                <img
                                    src={item.imgSrc}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-6">
                                    <h1 className="text-white text-xl">{item.price}</h1>
                                    <div>
                                        <h2 className="text-white text-2xl">{item.name}</h2>
                                        <div className="flex gap-1 items-center pt-3">
                                            <span className="text-white">{item.rating}</span>
                                            {/* Display dynamic stars */}
                                            {renderStars(item.rating).map((star, index) => (
                                                <div key={index} className="text-yellow-400">
                                                    {star === 'full' && <ion-icon name="star"></ion-icon>}
                                                    {star === 'half' && <ion-icon name="star-half"></ion-icon>}
                                                    {star === 'empty' && <ion-icon name="star-outline"></ion-icon>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Navigation Buttons (optional, since you're no longer using custom navigation) */}
            <div className="absolute lg:top-[18rem] top-[21rem] lg:left-[7%] left-0 w-[3rem] h-[3rem] rounded-full flex justify-center items-center " onClick={handlePrevImage}>
                <FaChevronLeft className="text-4xl text-yellow-600 cursor-pointer" />
            </div>

            <div className="absolute lg:top-[18rem] top-[21rem] lg:right-[7%] right-0 w-[3rem] h-[3rem] rounded-full flex justify-center items-center " onClick={handleNextImage}>
                <FaChevronRight className="text-4xl text-yellow-600 cursor-pointer" />
            </div>
        </section>
    );
};

export default Menu;
