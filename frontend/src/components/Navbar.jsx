import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api'; // Check karein aapka api file path sahi ho

const Navbar = ({ type, setType }) => {
    const [user, setUser] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('user-profile/'); 
                setUser(res.data);
            } catch (err) {
                console.error("Navbar user fetch error", err);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Left: Logo & Category Toggle */}
                    <div className="flex items-center gap-8">
                        <div 
                            className="text-xl font-bold text-indigo-600 cursor-pointer" 
                            onClick={() => navigate('/dashboard')}
                        >
                            EduRecommend
                        </div>
                        
                        <div className="hidden md:flex bg-gray-100 p-1 rounded-xl">
                            <button 
                                onClick={() => setType('colleges')}
                                className={`px-5 py-1.5 rounded-lg text-sm font-bold transition-all ${type === 'colleges' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Colleges
                            </button>
                            <button 
                                onClick={() => setType('schools')}
                                className={`px-5 py-1.5 rounded-lg text-sm font-bold transition-all ${type === 'schools' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Schools
                            </button>
                        </div>
                    </div>

                    {/* Right: User Profile & Logout */}
                    <div className="flex items-center gap-6">
                        {/* Profile Info */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">
                                    {user?.username || 'Loading...'}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                                    {user?.email ? 'Verified User' : 'Guest'}
                                </p>
                            </div>
                            
                            {/* Avatar Circle */}
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;