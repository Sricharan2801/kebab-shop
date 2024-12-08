import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from 'react-icons/fa';
import menu from "../assets/menu.webp"
import AllCategoryItem from '../Components/AllCategoryItem';
import NavBtns from '../Components/Buttons/NavBtns';

const CategoriesPage = () => {
  const categoryRefs = useRef({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategoryItems = (input) => {
    if (input === 'home') navigate('/');
    else if (input === 'cart') navigate('/cart');
  };

  useEffect(() => {
    const img = new Image();
    img.src = menu
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && categoryRefs.current[id]) {
      categoryRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <section className=" w-[100vw] h-auto px-8 bg-[#FFFAFA]">
      <div className='flex gap-4 '>
        <NavBtns className={'allCategory-page-btns'} onClick={() => handleCategoryItems('home')}>
          <FaArrowLeft />
          <span>Back to home</span>
        </NavBtns>

        <NavBtns className={'allCategory-page-btns'} onClick={() => handleCategoryItems('cart')}>
          <span className='flex-row gap-2'>Go to Cart <FaShoppingCart /></span>
          <FaArrowRight />
        </NavBtns>
      </div>

      <div className='relative w-full py-5 flex items-center lg:justify-between justify-around rounded-lg'>
        <h1 className='absolute lg:top-10 top-6 lg:left-10 left-4 lg:text-6xl text-2xl font-bold text-white font-openSans'>Zesty Menu</h1>
        <img src={menu} alt="" className='w-full object-cover lg:h-[25rem] h-[10rem] rounded-lg' />
      </div>

      <AllCategoryItem categoryRefs={categoryRefs} />
    </section>
  );
};

export default CategoriesPage;
