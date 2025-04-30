import React, { useState, useContext } from 'react';
 import axios from 'axios';
 import AuthContext from '../contexts/AuthContext'; // Ensure this is the correct path for your context

 const Feed = ({ feeds }) => {
   const { user } = useContext(AuthContext); // Get user from context
   const [savedFeeds, setSavedFeeds] = useState([]);

   const saveFeed = async (feed) => {
     if (!user) { // Check if user object exists (implies logged in)
       alert('Please log in to save feeds.');
       return;
     }

     const token = localStorage.getItem('token'); // Get token directly from localStorage

     try {
       const response = await axios.post(
         'http://localhost:5000/api/feed/save',
         {
           postId: feed.data.id,
           title: feed.data.title,
           url: feed.data.url,
           source: 'Reddit',
         },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       console.log("Response from backend (save):", response.data);
       alert('Feed saved!');
       setSavedFeeds([...savedFeeds, feed.data.id]);
       // If your backend returns updated user data (including credits), you might want to update context
       // Example: setUser(response.data.user); (if your AuthContext has setUser)
     } catch (err) {
       console.error("Error while saving feed:", err);
       alert(err.response?.data?.error || 'Save failed');
     }
   };

   const shareFeed = (feedUrl) => {
     alert(`Shared Feed: ${feedUrl}`); // Simulate sharing
   };

   const reportFeed = (feed) => {
     alert(`Reported Feed: ${feed.data.title}`);
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