import React from 'react';
import { useNavigate } from 'react-router-dom';

import img1 from '../assets/img1.png';
import "./sidebar.css";

const Sidebar = ({ setCurrentPage }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-royalBlue text-white w-64 h-screen p-4 sidebar">
            <div className="flex items-center mb-4">
                <img 
                    src={img1}
                    alt="Admin Logo" 
                    className="w-12 h-12 mr-2"
                />
                <h1 className="text-xl text-yellowAccent">Welcome to Admin Dashboard</h1>
            </div>
            <ul>
                <li className="cursor-pointer p-2 mb-2 hover:text-gold" onClick={() => setCurrentPage('create')}>Create Event</li>
                <li className="cursor-pointer p-2 mb-2 hover:text-gold" onClick={() => setCurrentPage('edit')}>Edit Event</li>
                <li className="cursor-pointer p-2 mb-2 hover:text-gold" onClick={() => setCurrentPage('view')}>View Events</li>
                <li className="cursor-pointer p-2 mb-2 hover:text-gold" onClick={() => navigate('/')}>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;