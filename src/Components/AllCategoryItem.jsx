import { useEffect } from 'react'
import { allMenuItems } from '../utils'
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../utils/CartContext'

const AllCategoryItem = ({ categoryRefs }) => {
    const { cartItems, setCartItems } = useCart();

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
            prev.reduce((acc, item) => {
                if (item.id === id) {
                    const updatedQuantity = item.quantity - 1;
                    if (updatedQuantity > 0) {
                        acc.push({ ...item, quantity: updatedQuantity });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, [])
        );
    };

    useEffect(() => {
        allMenuItems.forEach(category => {
            const img = new Image();
            img.src = category.url
        })
    }, [])
    return (
        <>
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
                                    <h3 className="text-sm text-slate-700 font-inter  font-semibold mb-2">{item.name}</h3>
                                    <div className=" lg:text-lg text-sm w-full flex lg:flex-row flex-col justify-around items-center gap-2">
                                        <p className=" text-lg font-inter font-bold">${item.price}</p>

                                        {!isInCart ? (
                                            <button
                                                className="flex-row gap-2 px-2 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                                onClick={() => handleAddCart(item)}
                                            >
                                                <span className='font-inter text-sm'>Add to Cart</span>
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
                                                <span className="text-sm font-inter font-semibold">
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
        </>
    )
}

export default AllCategoryItem
