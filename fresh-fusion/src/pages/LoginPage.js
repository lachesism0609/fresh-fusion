import React, { useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        
        try {
            const response = await fetch(`https://fresh-fusion-backend.onrender.com${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://ae8278.pages.labranet.jamk.fi'
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="container mx-auto px-4 md:px-8 lg:px-16 pt-[120px] pb-8 md:pb-16">
                <div className="max-w-[400px] mx-auto">
                    <h1 className="font-josefin text-4xl md:text-5xl mb-8 text-center">
                        <span className="text-pink700">
                            {isLogin ? "Welcome Back" : "Join Us"}
                        </span>
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md font-jost"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md font-jost"
                                    required
                                />
                            </>
                        )}
                        
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md font-jost"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md font-jost"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-pink600 text-white p-3 rounded-md font-jost hover:bg-pink700 transition-colors"
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </form>

                    <p className="mt-6 text-center font-jost">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-pink600 hover:text-pink700"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
