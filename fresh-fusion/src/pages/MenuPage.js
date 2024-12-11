import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

// Move constants outside component
const CACHE_KEY = 'menuItems';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const categories = ['all', 'Nigiri', 'Maki', 'Appetizers', 'Special Rolls'];

    // Wrap getCachedMenuItems with useCallback
    const getCachedMenuItems = useCallback(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

        if (isExpired) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return data;
    }, []);

    const setCacheMenuItems = (items) => {
        const cacheData = {
            data: items,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    const fetchMenuItems = useCallback(async () => {
        setLoading(true);
        
        // First try to get data from cache
        if (selectedCategory === 'all') {
            const cachedItems = getCachedMenuItems();
            if (cachedItems) {
                setMenuItems(cachedItems);
                setLoading(false);
                return;
            }
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const url = selectedCategory === 'all' 
                ? 'https://fresh-fusion-backend.onrender.com/api/menu'
                : `https://fresh-fusion-backend.onrender.com/api/menu/category/${selectedCategory}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': 'https://ae8278.pages.labranet.jamk.fi'
                },
                mode: 'cors',
                credentials: 'include',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Ensure we're setting an array
            const items = Array.isArray(data) ? data : 
                         Array.isArray(data.items) ? data.items :
                         Array.isArray(data.menuItems) ? data.menuItems : [];
            
            setMenuItems(items);
            
            // Cache only the full menu, not filtered categories
            if (selectedCategory === 'all') {
                setCacheMenuItems(items);
            }
            
        } catch (error) {
            console.error('Error fetching menu items:', error);
            // Try to use cached data as fallback if available
            const cachedItems = getCachedMenuItems();
            if (cachedItems) {
                setMenuItems(cachedItems);
                console.log('Using cached data as fallback');
            } else {
                setMenuItems([]); // Set empty array on error
            }
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, getCachedMenuItems]); // Add getCachedMenuItems to dependencies

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
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Add login prompt message */}
            {showLoginPrompt && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-pink700 text-white px-6 py-3 rounded-md shadow-lg z-50">
                    Please login to add items to cart
                </div>
            )}

            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[80px] pb-8 md:pb-16 flex justify-center">
                <div className="w-full max-w-[390px] md:max-w-[768px] lg:max-w-[1200px]">
                    <div className="flex flex-col items-center">
                        {/* Hero Section */}
                        <div className="text-center w-full">
                            <h1 className="font-josefin text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
                                <span className="font-light">Our </span>
                                <span className="text-pink700">Food </span>
                                <span className="font-light">Selection</span>
                            </h1>
                            <p className="font-jost text-lg md:text-xl leading-[25px] mb-8 md:mb-12">
                                We take pride in offering food products made with carefully chosen,
                                high-quality ingredients...
                            </p>
                        </div>

                        {/* Categories */}
                        <div className="mb-8 w-full text-center">
                            <div className="flex flex-wrap gap-4 justify-center">
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
                            <div className="text-center w-full py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink700 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading menu items...</p>
                            </div>
                        ) : menuItems.length === 0 ? (
                            <div className="text-center w-full py-8">
                                <p className="text-gray-600">Unable to load menu items. Please try again later.</p>
                                <button 
                                    onClick={fetchMenuItems}
                                    className="mt-4 px-6 py-2 bg-pink700 text-white rounded-md hover:bg-pink-800"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
                            <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ease-in-out 
                                border-t-2 border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ${
                                isCartOpen ? 'transform translate-y-0' : 'transform translate-y-[calc(100%-3rem)]'
                            }`}>
                                <div 
                                    className="flex items-center justify-between px-4 py-2 cursor-pointer border-b border-gray-200"
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                >
                                    <h3 className="text-xl">Shopping Cart ({cart.length} items)</h3>
                                    <svg 
                                        className={`w-6 h-6 transition-transform duration-300 ${isCartOpen ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                                <div className="container mx-auto p-4">
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
            </main>
        </div>
    );
};

export default MenuPage;
