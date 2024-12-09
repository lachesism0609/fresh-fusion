// pages/Address.js
import React from "react";
import { Header } from "../components/Header";

const variants = {
    primary: "bg-pink700 text-white all-[unset] box-border rounded-[10px] p-4",
    secondary: "bg-white text-black border-2 border-pink700 box-border rounded-[10px] p-4"
};

const Address = () => {
    const addresses = [
        {
            city: "Jyväskylä",
            street: "Kauppakatu 12",
            zip: "40100",
            variant:"secondary",
        },
        {
            city: "Turku",
            street: "Aurakatu 7",
            zip: "20100",
            variant:"primary",
        },
        {
            city: "Helsinki",
            street: "Mannerheimintie 10",
            zip: "00100",
            variant: "secondary",
        },
        {
            city: "Kuopio",
            street: "Tulliportinkatu 4",
            zip: "70100",
            variant: "primary",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[120px] pb-8">
                <h1 className="text-4xl font-bold text-center text-pink700 mb-10">
                    Our Locations
                </h1>
                <div className="space-y-6">
                    {addresses.map((address, index) => (
                        <div
                            key={index}
                            className={`${variants[address.variant]} shadow-md hover:shadow-lg transition-shadow w-100`}
                        >
                            <h2 className="text-2xl font-semibold">{address.city}</h2>
                            <p className="mt-2">{address.street}</p>
                            <p className="text-gray-600">{address.zip}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Address;

