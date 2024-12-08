import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

export const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const categories = ['all', 'Nigiri', 'Maki', 'Appetizers', 'Special Rolls'];

    const fetchMenuItems = useCallback(async () => {
        try {
            const url = selectedCategory === 'all' 
                ? 'https://fresh-fusion-backend.onrender.com/api/menu'
                : `https://fresh-fusion-backend.onrender.com/api/menu/category/${selectedCategory}`;
            const response = await fetch(url);
            const data = await response.json();
            setMenuItems(data.items || data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setLoading(false);
        }
    }, [selectedCategory]);

    useEffect(() => {
        fetchMenuItems();
    }, [fetchMenuItems]);

    // Add function to check if user is logged in
    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    // Modify addToCart function
    const addToCart = (menuItem) => {
        if (!isLoggedIn()) {
            setShowLoginPrompt(true);
            setTimeout(() => setShowLoginPrompt(false), 3000);
            return;
        }
        setCart(prev => [...prev, {
            menuItemId: menuItem._id,
            quantity: 1,
            price: menuItem.price,
            title: menuItem.title
        }]);
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item.menuItemId !== itemId));
    };

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <Header />
            
            {/* Login button and prompt */}
            {!isLoggedIn() && (
                <div className="fixed top-20 right-4">
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-pink700 text-white px-4 py-2 rounded-md hover:bg-pink-800"
                    >
                        Login
                    </button>
                </div>
            )}
            {showLoginPrompt && (
                <div className="fixed top-20 right-4 bg-pink700 text-white p-4 rounded-md shadow-lg z-50">
                    Please login first to add items to cart
                </div>
            )}

            <div className="bg-white w-[390px] md:w-[768px] lg:w-[1200px] relative">
                {/* Hero Section */}
                <div className="w-[343px] h-[476px] mt-[113px] mx-4">
                    <div className="[font-family:'Jockey_One-Regular',Helvetica] text-xl mb-4">
                        Home/Menu
                    </div>
                    <h1 className="font-josefin text-5xl mb-8">
                        <span className="font-light">Our </span>
                        <span className="text-pink700">Food </span>
                        <span className="font-light">Selection</span>
                    </h1>
                    <p className="font-jost font-light text-xl leading-[25px] mb-8">
                        We take pride in offering food products made with carefully chosen,
                        high-quality ingredients...
                    </p>
                </div>

                {/* Categories */}
                <div className="mx-4 mb-8">
                    <div className="font-jost font-bold text-xl mb-4">Show</div>
                    <div className="flex flex-wrap gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full ${
                                    selectedCategory === category
                                        ? 'bg-pink700 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items Grid */}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {menuItems.map((item) => (
                            <div 
                                key={item._id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-josefin text-xl">{item.title}</h3>
                                        <span className="font-jost text-pink700">${item.price}</span>
                                    </div>
                                    <p className="font-jost text-gray-600 text-sm mb-3">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.dietaryFlags?.map((flag) => (
                                            <span 
                                                key={flag}
                                                className="text-xs bg-pink100 text-pink700 px-2 py-1 rounded-full"
                                            >
                                                {flag}
                                            </span>
                                        ))}
                                    </div>
                                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Shopping Cart */}
                {cart.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                        <div className="container mx-auto">
                            <h3 className="text-xl mb-2">Shopping Cart ({cart.length} items)</h3>
                            <div className="max-h-40 overflow-y-auto mb-4">
                                {cart.map((item) => (
                                    <div key={item.menuItemId} className="flex justify-between items-center py-2">
                                        <span>{item.title} x {item.quantity}</span>
                                        <div>
                                            <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button 
                                                onClick={() => removeFromCart(item.menuItemId)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                </div>
                                <button 
                                    onClick={() => navigate('/checkout', { state: { cart } })}
                                    className="bg-pink700 text-white px-6 py-2 rounded-md hover:bg-pink-800"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
