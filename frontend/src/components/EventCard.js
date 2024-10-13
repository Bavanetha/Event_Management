import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./eventcard.css";

const EventCard = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(() => {
    // Check local storage for registration status
    return localStorage.getItem(`registered_${event._id}`) === 'true';
  });
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const username = localStorage.getItem('username'); // Get username from local storage


  const handleFeedbackClick = () => {
    setIsFeedbackFormVisible(true);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/events/${event._id}/feedback", {
        username,
        eventName: event.name,
        eventDate: event.date,
        feedback,
      });
      alert('Feedback submitted successfully');
      setFeedback(''); // Clear feedback input
      setIsFeedbackFormVisible(false); // Hide the form
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`http://localhost:5000/api/events/${event._id}/register`, { username });
      setIsRegistered(true);
      localStorage.setItem(`registered_${event._id}`, 'true'); // Update local storage correctly
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleUnregister = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${event._id}/cancel`, { data: { username } });
      setIsRegistered(false);
      localStorage.setItem(`registered_${event._id}`, 'false'); // Update local storage correctly
    } catch (error) {
      console.error('Error unregistering for event:', error);
    }
  };

  const isEventDateToday = new Date().toLocaleDateString() === new Date(event.date).toLocaleDateString();
  const isEventDatePassed = new Date(event.date) < new Date();
  const isUnregisterable = new Date(event.date) > new Date(Date.now() + 86400000); // Check if event is more than 1 day away

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>Venue: {event.venue}</p>

      <div className="flex justify-start mt-4">
        {isRegistered && (
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded mr-2">Registered</span>
        )}
      </div>

      <div className="flex justify-between mt-4">
        {isRegistered ? (
          isUnregisterable ? (
            <button onClick={handleUnregister} className="bg-red-500 text-white px-4 py-2 rounded">
              Unregister
            </button>
          ) : (
            <span className="text-gray-400 px-4 py-2 rounded">Cannot Unregister</span>
          )
        ) : (
          <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        )}
        
        {isRegistered && isEventDateToday && (
          <button 
            onClick={handleFeedbackClick} 
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Feedback
          </button>
        )}
      </div>

      {isFeedbackFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsFeedbackFormVisible(false)}>&times;</span>
            <h3>Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div>
                <label>Username:</label>
                <input type="text" value={username} readOnly />
              </div>
              <div>
                <label>Event Name:</label>
                <input type="text" value={event.name} readOnly />
              </div>
              <div>
                <label>Event Date:</label>
                <input type="text" value={new Date(event.date).toLocaleDateString()} readOnly />
              </div>
              <div>
                <label>Feedback:</label>
                <textarea 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard; 