import React, { useState } from 'react';
import axios from 'axios';

const Feed = ({ feeds }) => {
  const [savedFeeds, setSavedFeeds] = useState([]);

  const saveFeed = async (feed) => {
    try {
      // Make API call to save feed to the backend
      const response = await axios.post('http://localhost:5000/api/feeds/save', { feed }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      // If saved successfully, update the savedFeeds state
      setSavedFeeds([...savedFeeds, feed]); // Add to state
      alert('Feed saved!');
    } catch (err) {
      console.error('Error saving feed:', err.response?.data?.error || 'Unknown error');
      alert('Failed to save feed');
    }
  };

  const shareFeed = (feedUrl) => {
    alert(`Shared Feed: ${feedUrl}`); // Simulate sharing
  };

  const reportFeed = (feed) => {
    alert(`Reported Feed: ${feed.title}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      <div className="space-y-4">
        {feeds.map((feed) => (
          <div key={feed.data.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{feed.data.title}</h3>
            <p>{feed.data.selftext}</p>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => saveFeed(feed)}
                className="p-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => shareFeed(feed.data.url)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Share
              </button>
              <button
                onClick={() => reportFeed(feed)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;

