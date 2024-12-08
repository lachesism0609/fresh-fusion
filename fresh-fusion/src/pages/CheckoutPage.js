import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import axios from 'axios';

export const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];
    const [formData, setFormData] = useState({
        deliveryAddress: '',
        contactNumber: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const orderData = {
                items: cart.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                deliveryAddress: formData.deliveryAddress,
                contactNumber: formData.contactNumber
            };

            const response = await axios.post('http://localhost:5000/api/orders', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.status === 201) {
                navigate('/orders');
            }
        } catch (error) {
            setError('Failed to place order. Please try again.');
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 pt-[80px] pb-8">
                <div className="max-w-[600px] mx-auto">
                    <h1 className="font-josefin text-4xl mb-8 text-pink700">Checkout</h1>
                    
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl mb-4">Order Summary</h2>
                        {cart.map((item) => (
                            <div key={item.menuItemId} className="flex justify-between py-2">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4">
                            <label className="block mb-2">Delivery Address</label>
                            <input
                                type="text"
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2">Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <button 
                            type="submit"
                            className="w-full bg-pink700 text-white py-3 rounded-md hover:bg-pink-800"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;