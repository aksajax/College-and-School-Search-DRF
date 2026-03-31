import React, { useState } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('login/', credentials);
            // Professional Way: Saving tokens
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            
            alert("Login Success!");
            navigate('/dashboard'); // Login ke baad redirection
        } catch (err) {
            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500">Please enter your details</p>
                </div>
                <div className="space-y-4">
                    <input type="text" placeholder="Username" required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
                    
                    <input type="password" placeholder="Password" required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
                    
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                        Sign In
                    </button>
                </div>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/register" className="text-blue-600 font-bold">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;