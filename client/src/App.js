import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // Import Navbar component
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'; // Add Profile pag
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar /> {/* Render Navbar globally */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
