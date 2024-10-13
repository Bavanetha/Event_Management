import React, { useState, useEffect } from 'react';

const EditEvent = () => {
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:5000/api/events');
            const data = await response.json();
            setEvents(data);
        };
        fetchEvents();
    }, []);


        // Handle search input with debounce to avoid frequent API calls
        useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                handleSearch();
            }, 500);  // Debounce time
            return () => clearTimeout(delayDebounceFn);
        }, [eventName]); // Trigger search when eventName changes
    
        // Fetch events based on search keyword
        const handleSearch = async () => {
            if (eventName) {
                try {
                    const response = await fetch(`http://localhost:5000/api/events?name=${eventName}`);
                    const data = await response.json();
                    setEvents(data);
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            } else {
                // If search term is empty, fetch all events again
                const response = await fetch('http://localhost:5000/api/events');
                const data = await response.json();
                setEvents(data);
            }
        };
    


    const handleEdit = (event) => {
        setSelectedEvent(event);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
        setEvents(events.filter(event => event._id !== id));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/api/events/${selectedEvent._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedEvent)
        });
        setSelectedEvent(null);
        setEvents(events.map(event => (event._id === selectedEvent._id ? selectedEvent : event)));
    };

    return (
        <div className="p-20-lg mt-10">
            <h2 className="text-2xl text-royalBlue font-semibold mb-4">Edit Event</h2>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" className="mb-2 w-11/12 p-2 border" />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mb-4">Search</button>
            {selectedEvent && (
                <div className="flex justify-center">
                    <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 w-full max-w-md">
                        <input 
                            type="text" 
                            value={selectedEvent.name} 
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, name: e.target.value })} 
                            className="mb-2 p-2 border rounded-md w-full"
                            placeholder="Event Name"
                        />
                        <input 
                            type="date" 
                            value={selectedEvent.date} 
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })} 
                            className="mb-2 p-2 border rounded-md w-full"
                        />
                        <textarea 
                            value={selectedEvent.description} 
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })} 
                            className="mb-2 p-2 border rounded-md w-full" 
                            placeholder="Event Description"
                        ></textarea>
                        <input 
                            type="text" 
                            value={selectedEvent.venue} 
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, venue: e.target.value })} 
                            className="mb-2 p-2 border rounded-md w-full"
                            placeholder="Event Venue"
                        />
                        <button 
                            type="submit" 
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full mb-6"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            )}

            <ul>
                {events.map(event => (
                    <li key={event._id} className="flex justify-between mb-2 p-3 bg-gray-100 rounded-sm text-royalBlue text-md font-medium">
                        <span>{event.name}</span>
                        <div>
                            <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white rounded-md p-1 pl-4 pr-4 mr-2 text-sm">Edit</button>
                            <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white rounded-md p-1 text-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default EditEvent;
