import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    // Dynamically load the script only when the component is mounted
    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/google-business-profile/widget.js';
    script.async = true;
    script.onload = () => {
      // Initialize the widget or any other functionality after the script is loaded
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script if the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id='profile' className='w-full flex lg:flex-row flex-col'>
      <div className='lg:w-[30%] w-full h-full lg:pb-10'>
        <h1 className='lg:pt-24 lg:pl-[15%] pl-10 page-title pt-10'>
          Our Profile
        </h1>
      </div>

      <div className='lg:w-[70%] w-full flex-row pb-10'>
        <div className='sk-ww-google-business-profile' data-embed-id='25491326'></div>
      </div>
    </section>
  );
};

export default Map;
