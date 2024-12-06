import React, { useEffect, useState } from 'react';
import { db } from '../utils/Firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useCart } from '../utils/CartContext';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const { currentUser } = useCart();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser) return;

            const ordersRef = collection(db, 'orders');
            const q = query(
                ordersRef,
                where('userId', '==', currentUser.uid),
                orderBy('timestamp', 'desc')
            );

            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log('No orders found');
                }

                const fetchedOrders = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp.toDate(),
                    status: {
                        value: doc.data().status.value,
                        updatedAt: doc.data().status.updatedAt?.toDate() || null,
                    },
                }));

                console.log('Fetched Orders:', fetchedOrders);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [currentUser]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
                Your Orders
            </h1>
            {orders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-orange-500"
                        >
                            <h3 className="font-semibold text-xl text-orange-500 mb-2">
                                Order #{order.id}
                            </h3>
                            <p className="text-gray-700 mb-1">
                                <strong>Total Bill:</strong> ${order.totalBill.toFixed(2)}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Address:</strong> {order.address}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Special Instructions:</strong> {order.specialInstructions || 'None'}
                            </p>
                            <p className="text-gray-700 mb-3">
                                <strong>Ordered On:</strong>{' '}
                                {new Date(order.timestamp).toLocaleDateString()}
                            </p>

                            {/* Order Status */}
                            <p className="text-gray-700 mb-1">
                                <strong>Status:</strong>{' '}
                                <span className="text-orange-500">
                                    {order.status.value}
                                </span>
                            </p>
                            {order.status.updatedAt && (
                                <p className="text-gray-700 mb-3">
                                    <strong>Last Updated:</strong>{' '}
                                    {new Date(order.status.updatedAt).toLocaleString()}
                                </p>
                            )}

                            <h4 className="font-semibold text-lg text-gray-800 mb-2">
                                Items:
                            </h4>
                            <ul className="list-disc pl-5 text-gray-700">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="mb-1">
                                        {item.name} - ${item.price} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">
                    No orders to display. Place an order to see it here.
                </p>
            )}
            <div className="mt-8 text-center">
                <Link
                    to="/"
                    className="inline-block px-6 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default OrdersPage;
