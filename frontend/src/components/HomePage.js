import React from 'react';
import { useNavigate } from 'react-router-dom';
import img5 from"../assets/img5.png";
import "./homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-royalBlue p-5 text-white">
        <h1 className="text-xl md:text-2xl font-bold">Event Management</h1>
        <button
          onClick={() => navigate('/login')}
          className="bg-royalBlue hover:text-gold px-4 py-2 rounded"
        >
          Sign In
        </button>
      </nav>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-between p-5 md:p-8">
        <div className="w-full md:w-1/2">
          <img
            src={img5} // Replace with your image URL
            alt="Event Management"
            className="rounded-lg text-royalBlue w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-8">
          <h2 className="text-2xl md:text-3xl font-bold text-royalBlue">Event Management System</h2>
          <p className="mt-4 text-royalBlue">
            Our Event Management System helps you organize, manage, and run your events smoothly and efficiently. Join us to make your events successful!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
