import React, { useContext, useEffect, useState } from 'react';
 import AuthContext from '../contexts/AuthContext';
 import axios from 'axios';

 const Dashboard = () => {
   const { user, token } = useContext(AuthContext);
   const [savedFeeds, setSavedFeeds] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchSavedFeeds = async () => {
       if (token && user) {
         try {
           setLoading(true);
           console.log("Fetching saved feeds...");
           const response = await axios.get('http://localhost:5000/api/feed/saved', {
             headers: { Authorization: `Bearer ${token}` },
           });
           console.log("Saved feeds response:", response.data);
           setSavedFeeds(response.data);
           console.log("savedFeeds state after update:", savedFeeds); // CHECK THIS LOG
         } catch (error) {
           console.error("Error fetching saved feeds:", error);
         } finally {
           setLoading(false);
         }
       } else {
         setLoading(false);
       }
     };

     fetchSavedFeeds();
   }, [token, user]);

   if (loading) {
     return <div>Loading saved feeds...</div>;
   }

   if (!user) {
     return <div>Loading user data...</div>;
   }

   return (
     <div className="bg-white p-6 rounded-lg shadow-md">
       <h2 className="text-xl font-bold mb-4">Dashboard</h2>
       <div className="mb-4">
         <h3 className="text-lg">Credits: {user.credits}</h3>
       </div>
       <div className="mb-4">
         <h3 className="text-lg font-semibold mb-2">Saved Feeds</h3>
         {savedFeeds && savedFeeds.length > 0 ? (
           <ul>
             {savedFeeds.map((feed) => (
               <li key={feed.postId} className="py-2 border-b">
                 <a
                   href={feed.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-500 hover:underline"
                 >
                   {feed.title} ({feed.source})
                 </a>
               </li>
             ))}
           </ul>
         ) : (
           <p>No feeds saved yet.</p>
         )}
       </div>
       <div className="mb-4">
         <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
         <ul>
           {user.lastLogin && (
             <li className="py-1">Last Login: {new Date(user.lastLogin).toLocaleString()}</li>
           )}
           {user.profileCompleted && (
             <li className="py-1">Profile Completed: Yes</li>
           )}
           {!user.profileCompleted && (
             <li className="py-1">Profile Completed: No</li>
           )}
           {/* You can add more recent activity tracking here */}
         </ul>
       </div>
     </div>
   );
 };

 export default Dashboard;