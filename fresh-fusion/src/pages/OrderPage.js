import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import axios from "axios";

export const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://fresh-fusion-backend.onrender.com/api/orders/my-orders`, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Origin': 'https://ae8278.pages.labranet.jamk.fi'
                    },
                    withCredentials: true
                });
                setOrders(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch orders. Please try again later.');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="container mx-auto px-4 pt-[80px]">
                    <div className="text-center">Loading orders...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="container mx-auto px-4 pt-[80px]">
                    <div className="text-center text-red-600">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[80px] pb-8 md:pb-16">
                <div className="max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] mx-auto">
                    <h1 className="font-josefin text-4xl md:text-5xl mb-8 text-pink700">
                        Your Orders
                    </h1>

                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div 
                                key={order._id} 
                                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                            >
                                <div className="flex justify-between mb-4">
                                    <span className="font-medium">Order #{order._id.slice(-6)}</span>
                                    <span className="text-pink600">
                                        Status: {order.status}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{item.menuItemId.name} x {item.quantity}</span>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between font-medium">
                                        <span>Total:</span>
                                        <span>${order.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p>Delivery Address: {order.deliveryAddress}</p>
                                        <p>Contact: {order.contactNumber}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {orders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No orders found
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrderPage;
