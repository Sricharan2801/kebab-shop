// Cart.js
import OrderModal from '../Components/OrderModel'
import CartItem from "../Components/CartItem"
import { useState, useMemo } from 'react'
import { FaArrowLeft} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../utils/CartContext'
import toast from 'react-hot-toast'

const Cart = () => {
    const { cartItems, setCartItems,currentUser } = useCart();
    const navigate = useNavigate();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePlaceOrder = () => {
        if(!currentUser){
            toast.error('Please sign in to place an order.',{
                duration: 6000,
                hideProgressBar: true
            });
            navigate('/sign-in');
        }
        setIsModalOpen(true);
    }
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCategoryItems = (category) => {
        if (category === 'all-categories') navigate('/all-categories');
        else if (category === 'home') navigate('/');
    };

    const handleOrderSubmit = () => {
        // Handle form submission
        setCartItems([]);
        localStorage.removeItem('cartItems');
        setIsModalOpen(false);
    };

    const incrementItem = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
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

    const deleteItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const uniqueCartItems = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            const existingItem = acc.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
            } else {
                acc.push({ ...item, quantity: item.quantity || 1 });
            }
            return acc;
        }, []);
    }, [cartItems]);

    const totalBill = useMemo(
        () => uniqueCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [uniqueCartItems]
    );

    return (
        <section className="w-full px-4 py-8 bg-gray-100">
            {/* Brand Header */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <img
                        src="/logo.webp"
                        alt="Zesty Kebabs Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <h1 className="text-2xl lg:text-4xl font-bold text-orange-600">
                        Zesty Kebabs
                    </h1>
                </div>

                <div className='flex lg:flex-row flex-col gap-4 pr-5'>
                    {/* Back to all-categories */}
                    <button
                        className="lg:text-lg text-sm flex items-center gap-2 px-4 py-2 bg-gray-300 rounded font-semibold hover:text-orange-600"
                        onClick={() => handleCategoryItems('all-categories')}
                    >
                        <FaArrowLeft />
                        <span>Back to menu</span>
                    </button>

                    {/* Back to Home Button */}
                    <button
                        className="lg:text-lg text-sm flex items-center gap-2 px-4 py-2 bg-gray-300 rounded font-semibold hover:text-orange-600"
                        onClick={() => handleCategoryItems('home')}
                    >
                        <FaArrowLeft />
                        <span>Back to home</span>
                    </button>
                </div>
            </div>


            {/* Cart content here */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <p className="text-xl font-bold text-orange-600">
                        Total: ${totalBill.toFixed(2)}
                    </p>
                </div>

                {uniqueCartItems.length > 0 ? (
                    <div className="grid gap-6 mt-4">
                        {uniqueCartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                incrementItem={incrementItem}
                                decrementItem={decrementItem}
                                deleteItem={deleteItem}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center mt-4">
                        Your cart is empty.
                    </p>
                )}
            </div>

            {/* Place Order Button */}
            {uniqueCartItems.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handlePlaceOrder}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-orange-700"
                    >
                        Place Order
                    </button>
                </div>
            )}

            {/* Order Modal */}
            <OrderModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleOrderSubmit}
                cartItems={uniqueCartItems}
                totalBill={totalBill} // Pass the unique cart items
                setIsModalOpen={setIsModalOpen}
            />
        </section>
    );
};

export default Cart;
