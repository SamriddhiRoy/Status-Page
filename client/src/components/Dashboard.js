import React from 'react';

const Dashboard = ({ credits }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <h3 className="text-lg">Credits: {credits}</h3>
      </div>
      <div className="mb-4">
        <h3 className="text-lg">Saved Feeds</h3>
        {/* Display saved feeds here */}
      </div>
      <div className="mb-4">
        <h3 className="text-lg">Recent Activity</h3>
        {/* Display recent activity like profile completion or login */}
      </div>
    </div>
  );
};

export default Dashboard;
