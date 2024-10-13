import React, { useState } from 'react';

import Admin from './components/Admin';
import User from './components/UserMainPage';


import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} /> 
      </Routes>
    </Router>
  );
};

export default App;
