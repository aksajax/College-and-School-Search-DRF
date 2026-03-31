import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DetailPage from './components/DetailPage';
 // Maan lete hain aapne ye file bana li hai

// --- PROTECTED ROUTE LOGIC ---
// Ye check karta hai ki localStorage mein token hai ya nahi
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('access'); // Token check
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    

                    {/* Protected Routes (Sirf logged in users ke liye) */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
    path="/detail/:type/:id" 
    element={
        <ProtectedRoute>
            <DetailPage />
        </ProtectedRoute>
    } 
/>

                    {/* Default Route: Agar user kisi galat URL par jaye ya root '/' par ho */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;