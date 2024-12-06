import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { allMenuItems } from '../utils';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../utils/CartContext';
import menu from "../assets/menu.webp"

const CategoriesPage = () => {
  const categoryRefs = useRef({});
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();

  const handleCategoryItems = (input) => {
    if (input === 'home') navigate('/');
    else if (input === 'cart') navigate('/cart');
  };

  const handleAddCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev; // Item already in the cart, do nothing
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const incrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    allMenuItems.forEach(item => {
      const img = new Image();
      img.src = item.items.map(item => item.url);
      img.src = menu
    });
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
        <button className='lg:text-lg text-sm flex items-center gap-2 mb-4 mt-8 px-4 py-2 bg-gray-300 rounded font-semibold hover:text-orange-600'
          onClick={() => handleCategoryItems('home')}>
          <FaArrowLeft />
          <span>Back to home</span>
        </button>

        <button className='lg:text-lg text-sm flex items-center gap-2 mb-4 mt-8 px-4 py-2 bg-gray-300 rounded font-semibold hover:text-orange-600'
          onClick={() => handleCategoryItems('cart')}>
          <span className='flex-row gap-2'>Go to Cart <FaShoppingCart /></span>
          <FaArrowRight />
        </button>
      </div>

      <div className='relative w-full py-5 flex items-center lg:justify-between justify-around'>

        <h1 className='lg:text-6xl text-2xl font-bold text-white absolute lg:top-10 top-6 lg:left-10 left-4'>Zesty Menu</h1>
        <img src={menu} alt="" className='w-full object-cover lg:h-[25rem] h-[10rem]' />
      </div>

      {allMenuItems.map((category) => (
        <div
          key={category.id}
          ref={(el) => (categoryRefs.current[category.id] = el)}
          className="mb-8 mt-2 "
        >
          <div className='flex gap-2'>
            <div className="w-1 h-10 bg-orange-500"></div>
            <h1 className="text-2xl font-bold mb-4">{category.categoryName}</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.items.map((item) => {
              const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
              return (
                <div
                  key={item.id}
                  className=" flex flex-col items-center p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                >
                  <div className="w-[10rem] h-[10rem] bg-black rounded-lg overflow-hidden mb-2 hover:scale-110">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-slate-700 font-semibold mb-2">{item.name}</h3>
                  <div className=" lg:text-lg text-sm w-full flex lg:flex-row flex-col justify-around items-center gap-2">
                    <p className=" font-bold">${item.price}</p>

                    {!isInCart ? (
                      <button
                        className="flex-row gap-2 px-2 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => handleAddCart(item)}
                      >
                        <span>Add to Cart</span>
                        <FaShoppingCart className='text-orange-500' />
                      </button>
                    ) : (
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => decrementItem(item.id)}
                          className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-lg font-semibold">
                          {cartItems.find(cartItem => cartItem.id === item.id)?.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item.id)}
                          className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoriesPage;
