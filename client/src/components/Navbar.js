import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user context
    localStorage.removeItem('token'); // Optionally clear token from localStorage if you're using it
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Creator Dashboard</Link>
        </div>
        <div>
          {user ? (
            <>
              <button
                onClick={() => navigate('/profile')} // Navigate to Profile page
                className="mr-4 p-2 bg-blue-500 text-white rounded"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout} // Logout user
                className="p-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')} // Navigate to Login page
              className="p-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
