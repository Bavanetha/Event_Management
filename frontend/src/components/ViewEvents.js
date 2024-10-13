import React, { useState, useEffect } from 'react';
import img4 from '../assets/img4.png';

const ViewEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:5000/api/events');
            const data = await response.json();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        const date = new Date(e.target.value).toISOString().slice(0, 10);
        const filtered = events.filter(event => new Date(event.date).toISOString().slice(0, 10) === date);
        setFilteredEvents(filtered);
    };

    return (
        <div className="p-20-lg mt-10">
            <h2 className="text-2xl text-royalBlue font-semibold mb-4">View Events</h2>
            <input type="date" onChange={handleDateChange} className="mb-4 p-2 border" />
            {filteredEvents.length > 0 ? (
                <ul>
                    {filteredEvents.map(event => (
                        <li key={event._id} className="mb-2 bg-gray-100 p-5 rounded-md">
                            <h3 className="font-semibold text-royalBlue text-xl">{event.name}</h3>
                            <p className='text-blue-900'>{event.description}</p>
                            <p className='text-royalBlue'><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p className='text-royalBlue'><strong>Venue:</strong> {event.venue}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div class="flex justify-center items-center ">
                    <img 
                    src={img4}
                    alt="Admin Logo" 
                    className=" w-80 h-80 rounded-md"
                     />
                </div>
                
            )}
        </div>
    );
};

export default ViewEvents;
