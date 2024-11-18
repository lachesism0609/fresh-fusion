import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../assets/Book 2.svg";
import Marker from "../assets/Marker 02.svg";
import evaBarChartFill from "../assets/eva_bar-chart-fill.svg";
import evaCloseFill from "../assets/clarity_times-line.svg";
import logoTransparent from "../assets/logo_transparent.png";
import akarIconsInstagramFill from "../assets/akar-icons_instagram-fill.svg";
import akarIconsTwitterFill from "../assets/akar-icons_twitter-fill.svg";
import akarIconsWhatsappFill from "../assets/akar-icons_whatsapp-fill.svg";
import brandicoFacebook from "../assets/brandico_facebook.svg";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-lg relative">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-[113px]">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            className="h-[113px] w-auto"
                            alt="Fresh Fusion Logo"
                            src={logoTransparent}
                        />
                    </Link>

                    {/* Menu Toggle Button */}
                    <button
                        className="w-10 h-10"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <img
                            src={evaBarChartFill}
                            alt="Menu"
                            className="w-full h-full"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`fixed top-0 right-0 w-[390px] h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <button
                    className="absolute top-10 right-4"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <img
                        src={evaCloseFill}
                        alt="Close"
                        className="w-8 h-8"
                    />
                </button>

                {/* Menu Items */}
                <div className="absolute w-[390px] h-[263px] top-[113px] left-0">
                    {/* Menu Link */}
                    <div className="absolute w-[254px] h-[25px] top-[31px] left-[68px] flex justify-between items-center">
                        <Link to="/menu" className="font-light text-black text-xl">
                            Menu
                        </Link>
                        <img src={Book} alt="Menu" className="w-[26px] h-[25px]" />
                    </div>

                    {/* Address Link */}
                    <div className="absolute w-[253px] h-[25px] top-[94px] left-[68px] flex justify-between items-center">
                        <Link to="/location" className="font-light text-black text-xl">
                            Address
                        </Link>
                        <img src={Marker} alt="Location" className="w-6 h-6" />
                    </div>

                    {/* Contact Section */}
                    <div className="absolute w-[246px] h-[84px] top-[152px] left-[68px]">
                        <div className="font-light text-black text-xl mb-4">
                            Contact Us
                        </div>
                        <div className="flex space-x-6">
                            <img src={akarIconsInstagramFill} alt="Instagram" className="w-[30px] h-[31px]" />
                            <img src={akarIconsWhatsappFill} alt="WhatsApp" className="w-[30px] h-[31px]" />
                            <img src={brandicoFacebook} alt="Facebook" className="w-3.5 h-[31px]" />
                            <img src={akarIconsTwitterFill} alt="Twitter" className="w-[30px] h-[31px]" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;