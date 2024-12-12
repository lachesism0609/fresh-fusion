// pages/Address.js
import React, { useState } from "react";
import { Header } from "../components/Header";
import AddressCard from "../components/AddressCard";
import DiningRoom from "../assets/dining-table.jpg";


const introText = {
    title: "Find Your Nearest Sushi Delight!",
    
    body: "Welcome to Fresh Fusion Sushi Buffet, where you can enjoy an all-you-can-eat dining experience filled with Asian-inspired flavors. Indulge in a wide variety of sushi, including classic nigiri, creative maki rolls, vegetarian options, and an array of flavorful hot dishes. At Sakura Sushi Buffet, there’s something for everyone to enjoy!",
    notice: "On public holidays, our restaurants typically follow Sunday operating hours, though exceptions may occur. For the most accurate holiday opening hours, check the news section on our website or visit our social media pages on Facebook and Instagram (updates available in English and Finnish)."
};

const Address = () => {
    const addresses = [
        { id: 1, city: "Jyväskylä", street: "Kauppakatu 12", zip: "40100", variant: "secondary" },
        { id: 2, city: "Turku", street: "Aurakatu 7", zip: "20100", variant: "primary" },
        { id: 3, city: "Helsinki", street: "Mannerheimintie 10", zip: "00100", variant: "secondary" },
        { id: 4, city: "Kuopio", street: "Tulliportinkatu 4", zip: "70100", variant: "primary" },
        { id: 5, city: "Jyväskylä", street: "Väinönkatu 7", zip: "40100", variant: "primary" },
        { id: 6, city: "Turku", street: "Eerikinkatu 3", zip: "20100", variant: "secondary" },
    ];

    const groupedAddresses = addresses.reduce((acc, address) => {
        if (!acc[address.city]) {
            acc[address.city] = [];
        }
        acc[address.city].push(address);
        return acc;
    }, {});


    const [selectedCity, setSelectedCity] = useState("");

    const handleChange = (e) => {

        const cityKey = e.target.value;

        if (cityKey === "ALL") {
            setSelectedCity("");
         
            return;
        }

        setSelectedCity(cityKey ); // Update selected city
    };

    return (
        <div>
            <Header />

            {/* Intro Section */}
            <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start my-12 px-4 space-y-8 md:space-y-0 md:space-x-8 justify-between">
            {/* Text and Selector Section */}
            <div className="md:w-1/2 flex flex-col space-y-6">
                {/* Text Section */}
                <div>
            <h2 className="text-5xl font-bold mb-4 font-josefin text-4xl md:text-6xl lg:text-6xl mb-6">
                <span className="font-light">Find </span>
                <span className="text-pink700">Your </span>
                <span className="font-light">Nearest </span>
                <span className="text-pink600">Sushi</span>     
                <span className="font-light"> Delights</span>
                <span className="text-pink600">!</span> 
            </h2>
            <p className="text-gray-900 text-1xl lg:text-2xl">{introText.body}</p>

            <p className="font-bold mt-6 text-pink700">Holiday Hours Notice:</p>
            <p className="text-gray-800 text-sm lg:text-1xl">{introText.notice}</p>
        </div>

        {/* City Selector */}
        <div className="w-full">
            <label htmlFor="city-selector" className="block text-lg font-bold text-gray-700 mb-2">
                Select City:
            </label>
            <select
                id="city-selector"
                className="block w-full border-2 border-gray-300 rounded-full p-2"
                value={selectedCity}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Choose a city
                </option>
                <option value="ALL">All</option>
                {Object.keys(groupedAddresses).map((cityKey) => (
                    <option key={cityKey} value={cityKey}>
                        {cityKey}
                    </option>
                ))}
            </select>
        </div>
    </div>

    {/* Image Section */}
    <div className="md:m-1/2 flex justify-center">
        <img
            src={DiningRoom}
            alt="Sushi Buffet Restaurant"
            className="shadow-lg max-w-[320px] lg:max-w-[378px] object-cover hidden md:block"
            style={{
                borderRadius: "20px 110px", // Round corner
                objectFit: "cover"
            }}
        />
        </div>
    </div>

            {/* Address Section */}
            <div className="w-full max-w-5xl mx-auto my-12 px-4">
                {selectedCity ? (
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{selectedCity}</h2>
                        <div className="space-y-6">
                            {groupedAddresses[selectedCity].map((address) => (
                                <AddressCard key={address.id} {...address} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.keys(groupedAddresses).map((city) => (
                            <div key={city}>
                                <h2 className="text-3xl font-semibold text-gray-800 mb-6">{city}</h2>
                                <div className="space-y-6">
                                    {groupedAddresses[city].map((address) => (
                                        <AddressCard key={address.id} {...address} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Address;
