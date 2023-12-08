import React from 'react';
import { useLocation } from 'react-router-dom';


const Dashboard = (props) => {
    const location = useLocation();
    const { username } = location.state || {};
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-600 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                </div>
            </header>
            <div className="container mx-auto p-8">
                <div className="bg-white rounded-lg p-8 shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Welcome, {username || 'Guest'}</h2>
                    <p className="text-gray-600">This is your personalized dashboard.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
