import React, { useState } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('register/', formData);
            alert("Registration Successful! Now Login.");
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
            alert("Registration Failed: " + JSON.stringify(err.response.data));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">Create Account</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Username" required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    
                    <input type="email" placeholder="Email Address" required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    
                    <input type="password" placeholder="Password" required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
                        Register Now
                    </button>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-indigo-600 font-bold">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;