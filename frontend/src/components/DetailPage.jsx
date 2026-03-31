import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';

const DetailPage = () => {
    const { type, id } = useParams(); // URL se type aur id nikalna
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // Endpoint example: /api/colleges/list/1/
                const endpoint = type === 'colleges' ? `colleges/list/${id}/` : `schools/list/${id}/`;
                const res = await api.get(endpoint);
                setItem(res.data);
            } catch (err) {
                console.error("Error fetching details", err);
            }
        };
        fetchDetail();
    }, [type, id]);

    if (!item) return <div className="p-10 text-center">Loading details...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-6 text-indigo-600 font-semibold hover:underline flex items-center"
            >
                ← Back to Dashboard
            </button>

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="h-96 md:h-full">
                        <img 
                            src={item.image || 'https://via.placeholder.com/600x400'} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            {type === 'colleges' ? 'University' : 'School'}
                        </span>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{item.name}</h1>
                        <p className="text-gray-500 text-lg mb-6">📍 {item.city}, {item.state}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-gray-400 text-xs uppercase font-bold">Rating / Rank</p>
                                <p className="text-2xl font-bold text-indigo-600">{item.ranking || item.rating}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-gray-400 text-xs uppercase font-bold">
                                    {type === 'schools' ? 'Board' : 'Established'}
                                </p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {item.board || '1995'}
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">About</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description || "This institution is known for its academic excellence and world-class infrastructure. It provides a great environment for student growth."}
                            </p>
                        </div>

                        {item.website && (
                            <a 
                                href={item.website} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-block text-center bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg"
                            >
                                Visit Official Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;