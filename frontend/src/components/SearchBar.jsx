import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
    return (
        <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
            </div>
            <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
                placeholder="Search by name, city or state..."
            />
        </div>
    );
};

export default SearchBar;