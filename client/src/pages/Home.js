import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Dashboard from '../components/Dashboard';
import Feed from '../components/Feed';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const { user } = useContext(AuthContext);
  const [feeds, setFeeds] = useState([]);
  const [activeTab, setActiveTab] = useState('feed'); // Track which tab is active
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetch data for the feed
      axios.get('https://api.reddit.com/r/all/top.json')
        .then(response => {
          setFeeds(response.data.data.children);
        });
    }
  }, [user]);

  // If no user is logged in, show the login/register prompt
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="text-center">
          <p>Please log in or register.</p>
          <button
            onClick={() => navigate('/login')} // Navigate to Login page
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Go to Login
          </button>
          <p className="mt-4">Don't have an account?</p>
          <button
            onClick={() => navigate('/register')} // Navigate to Register page
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Register Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="tabs mb-4">
        <button
          className={`p-2 ${activeTab === 'feed' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('feed')}
        >
          Feed
        </button>
        <button
          className={`p-2 ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
      </div>

      {activeTab === 'feed' && <Feed feeds={feeds} />}
      {activeTab === 'dashboard' && <Dashboard credits={user.credits} />}
    </div>
  );
};

export default Home;

