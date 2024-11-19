import React from "react";
import { Header } from "../components/Header";
import { NavigationButton } from "../components/Button/NavigationButton";
import homeSushiImage from "../assets/homeSushi.jpg";

export const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[80px] pb-8 md:pb-16">
                <div className="max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] mx-auto">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="md:w-1/2 lg:w-[45%]">
                            {/* Hero Text */}
                            <h1 className="font-josefin text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
                                <span className="font-light">Where </span>
                                <span className="text-pink700">Fresh </span>
                                <span className="font-light">Meets </span>
                                <span className="text-pink600">Endless</span>
                            </h1>

                            {/* Description */}
                            <p className="font-jost text-lg md:text-xl leading-[25px] mb-8 md:mb-12">
                                <span className="font-medium">Fresh Fusion</span>
                                <span className="font-light">
                                    {" "}- your ultimate all-you-can-eat sushi buffet, where fresh
                                    ingredients and creative fusion dishes come together for an
                                    unlimited dining adventure.
                                </span>
                            </p>

                            {/* CTA Button */}
                            <NavigationButton 
                                text="View Menu"
                                to="/menu"
                                variant="primary"
                                className="mb-8 md:mb-0"
                            />
                        </div>

                        {/* Hero Image */}
                        <div className="md:w-1/2 lg:w-[50%]">
                            <img
                                className="w-full max-w-[343px] md:max-w-full h-[228px] md:h-[400px] lg:h-[500px] object-cover mx-auto md:mx-0"
                                alt="Fresh Fusion Sushi"
                                src={homeSushiImage}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;