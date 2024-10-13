import React, { useState } from 'react';
import Sidebar from './Sidebar.js';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import ViewEvents from './ViewEvents';

import "./admin.css";

const Admin = () => {
    const [currentPage, setCurrentPage] = useState('create');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex admin-container">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰ {/* Hamburger menu icon for mobile */}
            </button>
            <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar setCurrentPage={setCurrentPage} />
            </div>
            <div className="flex-1 p-4 main-content">
                {currentPage === 'create' && <CreateEvent />}
                {currentPage === 'edit' && <EditEvent />}
                {currentPage === 'view' && <ViewEvents />}
            </div>
        </div>
    );
};

export default Admin