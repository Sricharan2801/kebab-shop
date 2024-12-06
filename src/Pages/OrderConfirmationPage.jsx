import React from 'react';
import orderConfirmed from '../assets/orderConfirmed.webp';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full flex flex-col justify-center items-center h-screen bg-gradient-to-b from-orange-100 to-yellow-200 text-center px-4">
      <div className="flex flex-col justify-center items-center  max-w-lg w-full bg-white shadow-lg rounded-lg p-6 animate-fade-in">
        <img
          src={orderConfirmed}
          alt="Order Confirmed"
          className="w-[15rem] h-[15rem] rounded-lg animate-scale-in"
        />
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-700 text-lg">
          Your order has been successfully placed. You’ll receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Back to Home
        </button>
        <p className="text-gray-600 mt-6 text-sm">
          <em>Best Regards,</em>
          <br />
          <span className="font-semibold text-orange-500">Zesty Kebabs</span>
        </p>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
