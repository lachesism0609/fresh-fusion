import React from "react";
import { Header } from "../components/Header";
import { NavigationButton } from "../components/Button/NavigationButton";

export const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[80px] pb-8 md:pb-16">
                <div className="max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] mx-auto">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="font-josefin text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
                            <span className="font-light">Oops! </span>
                            <span className="text-pink700">Page </span>
                            <span className="font-light">Not </span>
                            <span className="text-pink600">Found</span>
                        </h1>

                        <p className="font-jost text-lg md:text-xl leading-[25px] mb-8 md:mb-12">
                            <span className="font-light">
                                The page you're looking for seems to have vanished like the last piece of sushi on a plate.
                            </span>
                        </p>

                        <NavigationButton 
                            text="Go Home"
                            to="/"
                            variant="primary"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;