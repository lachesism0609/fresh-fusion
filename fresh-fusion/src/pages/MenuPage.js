import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";

export const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const categories = ['all', 'Nigiri', 'Maki', 'Appetizers', 'Special Rolls'];

    const fetchMenuItems = useCallback(async () => {
        try {
            const url = selectedCategory === 'all' 
                ? 'http://localhost:5000/api/menu'
                : `http://localhost:5000/api/menu/category/${selectedCategory}`;
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

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[80px] pb-8 md:pb-16">
                <div className="max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] mx-auto">
                    {/* Menu Title */}
                    <h1 className="font-josefin text-4xl md:text-5xl lg:text-6xl mb-8 text-center">
                        <span className="text-pink700">Our </span>
                        <span className="font-light">Menu</span>
                    </h1>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-jost ${
                                    selectedCategory === category
                                        ? 'bg-pink700 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-pink100'
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Menu Grid */}
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MenuPage;
