const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Event = require('./models/Event');
const User = require('./models/User');
const Registration = require('./models/Registration'); 
const Feedback = require('./models/Feedback');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://bavanethamr:jo74pzsv7Ueu09Ej@cluster0.pu5fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Create Event
app.post('/api/events/create', async (req, res) => {
  const { name, date, description, venue } = req.body;

  try {
    const newEvent = new Event({ name, date, description, venue });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Get All Events
app.get('/api/events', async (req, res) => {
  const { name } = req.query;

    try {
        // Only filter if 'name' query param is provided
        let query = {};
        if (name) {
            query = { name: { $regex: name, $options: 'i' } }; // Case-insensitive search
        }

        const events = await Event.find(query); // Fetch filtered or all events
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
    
});

// Edit Event
app.put('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete Event
app.delete('/api/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// Event Registration Route
app.post('/api/events/:id/register', async (req, res) => {
  try {
    const { username } = req.body; // Get username from the request body
    const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const userId = user._id; // Get userId from the found user
    const { id: eventId } = req.params; // Get eventId from the URL params

    // Check if the user is already registered for this event
    const existingRegistration = await Registration.findOne({ userId, eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'User is already registered for this event.' });
    }

    // Register the user for the event
    const registration = new Registration({ userId, eventId });
    await registration.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Error registering for event' });
  }
});

app.get('/api/events/:username/registered', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const userId = user._id;

  try {
      // Find registered events for the user by userid
      const registeredEvents = await Registration.find({ userId }).populate('eventId'); // Assuming `eventId` stores the reference to the Event

      // Extract event details
      const eventsDetails = registeredEvents.map(event => event.eventId); // Assuming eventId points to the Event

      res.json(eventsDetails);
  } catch (error) {
      console.error('Error fetching registered events:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.delete('/api/events/:id/cancel', async (req, res) => {
  try {
    const { username } = req.body; // Get username from the request body
    const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const userId = user._id; // Get userId from the found user
    const { id: eventId } = req.params; // Get eventId from the URL params

    const registration = await Registration.findOneAndDelete({ userId, eventId });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration cancelled' });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    res.status(500).json({ message: 'Error cancelling registration' });
  }
});



// Submit Feedback
// Assuming you have a Feedback model defined
app.post('/api/events/:id/feedback', async (req, res) => {
  try {
    const { username, eventName, eventDate, feedback } = req.body;

    // Assuming you have a Feedback model
    const newFeedback = new Feedback({
      username,
      eventName,
      eventDate,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});


// User Signup
app.post('/api/auth/signup', async (req, res) => {
    const { username, password } = req.body;
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({ username, password: hashedPassword });
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ message: 'Error signing up' });
    }
  });
  
  // User Login
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret', {
        expiresIn: '1h',
      });
  
      res.json({ token, username: user.username });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
