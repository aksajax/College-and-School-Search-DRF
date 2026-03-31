import React, { useState, useEffect } from "react";
import api from "../config/api";
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar'; // 1. SearchBar Import karein
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("colleges");
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 2. Search State
  const navigate = useNavigate();

  // Data Fetching Function with Search Params
  const fetchData = async () => {
    try {
      // Backend ko search query bhej rahe hain: ?search=keyword
      const endpoint = type === "colleges" 
        ? `colleges/list/?search=${searchQuery}` 
        : `schools/list/?search=${searchQuery}`;
      
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    // 3. Debouncing Logic: Har keypress par API hit na ho, 500ms wait karega
    const timeoutId = setTimeout(() => {
        fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [type, searchQuery]); // 4. SearchQuery change hone par fetch hoga

  const filteredData = selectedState
    ? data.filter(
        (item) => item.state.toLowerCase() === selectedState.toLowerCase(),
      )
    : data;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Navbar type={type} setType={setType} />

        <main className="p-8 max-w-7xl mx-auto w-full">
          {/* Filters & Search Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* 5. SearchBar Component yahan lagaya */}
            <SearchBar setSearchQuery={setSearchQuery} />

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                <span className="font-medium text-gray-400 text-sm ml-2 uppercase tracking-wider">State:</span>
                <select
                onChange={(e) => setSelectedState(e.target.value)}
                className="rounded-md p-2 outline-none font-semibold text-gray-700 cursor-pointer"
                >
                <option value="">All Regions</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi">Delhi</option>
                </select>
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-400 font-medium">
             Showing {filteredData.length} {type} results
          </div>

          {/* --- CARDS GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative overflow-hidden">
                    <img
                    src={item.image || "https://via.placeholder.com/400x200?text=No+Image"}
                    alt={item.name}
                    className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                        <span className="text-indigo-600 font-bold text-sm">
                        {item.ranking || item.rating} {type === "colleges" ? "Rank" : "⭐"}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                  <h3 className="font-extrabold text-xl text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex items-center font-medium">
                    📍 {item.city}, {item.state}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                      {type === "schools" ? item.board : "University"}
                    </span>
                    <Link
                      to={`/detail/${type}/${item.id}`}
                      className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 font-medium text-lg">No results found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;