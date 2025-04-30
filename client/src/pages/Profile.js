import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'; // Redirect to login if user is not logged in
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        '/api/user/update', // Your API endpoint to update user details
        { name, email, password },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Assuming the response contains updated user data
      setUser(response.data.user);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg">Password (optional)</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
