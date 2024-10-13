import React, { useState } from 'react';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import "./CreateEvent.css";

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        description: '',
        venue: ''
    });

    const [showAddImage, setShowAddImage] = useState(false);  // To show image after Add Event is clicked
    const [showTipImage, setShowTipImage] = useState(false);  // To show image when event is tipped

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
        if (e.target.name === 'name' && e.target.value !== '') {
            setShowAddImage(false); // Hide add image
            setShowTipImage(true);  // Show tip image when the event name is entered
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/events/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        setEventData({ name: '', date: '', description: '', venue: '' });
        setShowAddImage(true);  // Show add image when event is added
        setShowTipImage(false);  // Hide tip image
    };

    return (
        <div className="flex flex-col md:flex-row p-5 md:p-10">
            <div className="p-5 md:p-10 w-full md:w-1/2">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-royalBlue">Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        value={eventData.name}
                        onChange={handleChange}
                        required
                        className="block w-full mb-2 p-2 border"
                    />
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                        className="block w-full mb-2 p-2 border"
                    />
                    <textarea
                        name="description"
                        rows="7"
                        placeholder="Description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        className="block w-full mb-2 p-2 border"
                    ></textarea>
                    <input
                        type="text"
                        name="venue"
                        placeholder="Venue"
                        value={eventData.venue}
                        onChange={handleChange}
                        required
                        className="block w-full mb-2 p-2 border"
                    />
                    <button type="submit" className="bg-royalBlue text-white p-2 rounded-md hover:bg-blue-800">Add Event</button>
                </form>
            </div>

            {/* Display images based on state */}
            <div className="p-5 md:p-10 w-full md:w-1/2">
                {showAddImage && (
                    <img src={img2} alt="Event Added" className="w-full h-auto mb-4" />
                )}
                {showTipImage && (
                    <img src={img3} alt="Event Tipped" className="w-full h-auto" />
                )}
            </div>
        </div>
    );
};

export default CreateEvent;
