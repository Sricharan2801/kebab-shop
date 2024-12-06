import { useState } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import logo from "/logo.webp"
import { db } from '../utils/Firebase';  // Import Firebase Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {useCart} from '../utils/CartContext'


const OrderModal = ({ isOpen, onClose, onSubmit, cartItems, totalBill, setIsModalOpen }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        specialInstructions: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();
    const { currentUser } = useCart();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async(e) => {
        e.preventDefault();

        let validationErrors = {};
        if (!formData.name) validationErrors.name = 'Name is required';
        if (!formData.phone) validationErrors.phone = 'Phone number is required';
        if (!formData.address) validationErrors.address = 'Address is required';

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true); // Set loading state to true
            const cartDetails = cartItems
                .map(
                    (item) =>
                        `Item Name: ${item.name} | Price: $${item.price} | Quantity: ${item.quantity}`
                )
                .join('\n');

            emailjs
                .send(
                    'service_5t9wory',
                    'template_rfx7ieh',
                    {
                        name: formData.name,
                        phone: formData.phone,
                        address: formData.address,
                        special_instructions:
                            formData.specialInstructions || 'No special instructions.',
                        email: 'zestykebabs@gmail.com',
                        cart_items: cartDetails,
                        total_bill: totalBill,
                    },
                    'ZGy1RzOrisHdno2q4'
                )
                .then(
                    async (response) => {
                        console.log('Email sent successfully:', response);

                        // Save order to Firestore
                        try {
                            await addDoc(collection(db, 'orders'), {
                                userId: currentUser.uid, // Store user's ID
                                customerName: formData.name,
                                customerPhone: formData.phone,
                                items: cartItems,
                                totalBill: totalBill,
                                specialInstructions: formData.specialInstructions,
                                address: formData.address,
                                status: { 
                                    value: 'Pending', // Initial status
                                    updatedAt: serverTimestamp() // Timestamp of the status update
                                },
                                timestamp: serverTimestamp(), // Automatically set timestamp
                            });
                            
                          
                            onSubmit(formData); // Send the form data to the parent component
                            setIsModalOpen(false);
                            navigate('/order-confirmation');
                            toast.success('Order placed successfully!');
                        } catch (error) {
                            console.error('Error saving order:', error);
                            toast.error('Failed to place order. Please try again.');
                        }
                        setLoading(false); // Stop loading
                    },
                    (error) => {
                        console.error('Error sending email:', error);
                        toast.error('Failed to place order. Please try again.');
                        setLoading(false); // Stop loading
                    }
                );
        } else {
            setErrors(validationErrors);
        }
    };


    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-40">
            {loading && ( // Show spinner if loading
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin z-60"></div>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg w-96 relative">
                <div className='flex gap-2 items-center'>
                    <img src={logo} alt="zesty-logo" className='w-[4rem]' />
                    <h3 className="text-xl font-bold ">Enter details for delivery</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address}</p>
                        )}
                    </div>

                    {/* Special Instructions */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Special Instructions (optional)
                        </label>
                        <textarea
                            name="specialInstructions"
                            value={formData.specialInstructions}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                        >
                            Submit Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
