import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard'; // Adjust the import based on your file structure

const UserMainPage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [user, setUser] = useState(null);
    const [profilePopup, setProfilePopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setUser(user);
        }

        // Fetch all events
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, []);

    // Handle search functionality
    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);

        const filtered = events.filter(
            (event) =>
                event.name.toLowerCase().includes(keyword) ||
                event.venue?.toLowerCase().includes(keyword) ||
                new Date(event.date).toLocaleDateString().includes(keyword)
        );
        setFilteredEvents(filtered);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-royalBlue text-white shadow-lg p-4 flex justify-between">
                <div className="text-2xl font-bold">EventManagement</div>
                <div>
                    <button onClick={() => setProfilePopup(!profilePopup)} className="mr-4">
                        Profile
                    </button>
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Profile Popup */}
            {profilePopup && (
                <div className="absolute bg-white p-4 shadow-lg rounded-lg right-4 top-16">
                    <p className="font-bold">Username: {user}</p>
                </div>
            )}

            <div className="container mx-auto mt-8 p-5">
                <div>
                    <div className="flex justify-between mb-4">
                        <input
                            type="text"
                            placeholder="Search by event name or date..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <EventCard
                                    key={event._id}
                                    event={event}
                                />
                            ))
                        ) : (
                            <p>No upcoming events.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMainPage;
