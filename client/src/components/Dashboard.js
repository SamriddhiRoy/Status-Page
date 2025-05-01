import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { user, loading: userLoading } = useContext(AuthContext);
    const [savedFeeds, setSavedFeeds] = useState([]);
    const [feedsLoading, setFeedsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to check if date is valid
    const isValidDate = (date) => {
        return date && !isNaN(new Date(date).getTime());
    };

    useEffect(() => {
        const fetchSavedFeeds = async () => {
            if (!user) {
                setFeedsLoading(false);
                setSavedFeeds([]);
                return;
            }

            try {
                setFeedsLoading(true);
                setError(null);
                
                const response = await axios.get('http://localhost:5000/api/feed/saved', {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                    },
                });

                setSavedFeeds(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Error fetching saved feeds:", err);
                setError("Failed to load saved feeds. Please try again.");
                setSavedFeeds([]);
            } finally {
                setFeedsLoading(false);
            }
        };

        fetchSavedFeeds();
    }, [user]);

    if (userLoading) return <div>Loading user data...</div>;
    if (!user) return <div>Please log in to view your dashboard.</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">Feed</h1>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            
            <div className="mb-4">
                <p className="text-lg">Welcome, {user.email}</p>
                <p className="text-lg">Credits: {user.credits || 0}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Saved Feeds</h3>
                {feedsLoading ? (
                    <div>Loading saved feeds...</div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : savedFeeds.length > 0 ? (
                    <ul className="space-y-4">
                        {savedFeeds.map((feed) => (
                            <li key={feed._id} className="pb-4 border-b last:border-b-0">
                                <div className="mb-1">
                                    <a
                                        href={feed.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {feed.title}
                                    </a>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Source: {feed.source}</span>
                                    {isValidDate(feed.createdAt) && (
                                        <span>{new Date(feed.createdAt).toLocaleDateString()}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No saved feeds available.</p>
                )}
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                <ul className="space-y-1">
                    <li>Last Login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Unknown'}</li>
                    <li>Profile Completed: {user.profileCompleted ? 'Yes' : 'No'}</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;