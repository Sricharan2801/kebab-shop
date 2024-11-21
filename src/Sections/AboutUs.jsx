import React, { useEffect, useState } from 'react';
import { aboutPageImages } from "../utils/index";

const AboutUs = () => {
    const [currentImage, setCurrentImage] = useState(0);

    // Preload images for smoother transitions
    useEffect(() => {
        aboutPageImages.forEach((image) => {
            const img = new Image();
            img.src = image.url; // Preload image
        });
    }, []);

    // Change image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => prev === aboutPageImages.length - 1 ? 0 : prev + 1);
        }, 3000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <section id='aboutUs' className='w-full lg:h-[100vh] h-auto flex lg:flex-row flex-col'>
            {/* Text Section */}
            <div className='lg:w-[60%] lg:h-full w-full  flex flex-col items-center gap-5'>
                <h1 className='text-5xl font-bold font-mono text-yellow-600 pt-10'>About Us</h1>
                <p className='pl-8 pr-8 lg:text-lg text-sm leading-6'>
                    Welcome to <strong>Zesty Kebabs</strong>, where we serve <strong>authentic</strong>, <strong>flavor-packed kebabs</strong> in Ballarat Central VIC. We pride ourselves on using only the <strong>freshest ingredients</strong>, ensuring every bite is delicious and satisfying.
                    At <strong>Zesty Kebabs</strong>, enjoy a variety of kebabs made with <strong>traditional Mediterranean</strong> recipes, including <strong>succulent lamb</strong>, <strong>tender chicken</strong>, and <strong>tasty vegetarian</strong> options. Whether you're after a quick takeaway or a sit-down meal, we’ve got you covered.
                    <br /><br />
                    <strong>Why Choose Us?</strong>
                    <ul>
                        <li><strong>Authentic Recipes:</strong> True Mediterranean flavors passed down through generations.</li>
                        <li><strong>Fresh Ingredients:</strong> Only the best, locally sourced ingredients in every meal.</li>
                        <li><strong>Quick & Convenient:</strong> Enjoy a quick takeaway or dine in at our welcoming shop.</li>
                    </ul>
                    <br />
                    Join us at Zesty Kebabs and experience why we’re one of Ballarat Central VIC favorite kebab spots. We can’t wait to serve you!
                </p>
            </div>

            {/* Image Section with Smooth Slide */}
            <div className='lg:w-[40%] lg:h-full w-full h-[25rem] flex justify-center items-center overflow-hidden'>
                <div className='relative lg:w-[75%] lg:h-[75%] w-[85%] h-[20rem] border-2 rounded-lg'>
                    {aboutPageImages.map((image, index) => (
                        <img
                            key={image.id}
                            src={image.url}
                            alt={image.alt}
                            className={`absolute top-0 left-0 w-full lg:h-full h-[20rem] object-cover border-none rounded-lg transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                            style={{ zIndex: index === currentImage ? 1 : 0 }} // Only the current image has z-index 1 to make it visible
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;



// lg:w-[75%] lg:h-[75%] w-[85%] h-[85%]