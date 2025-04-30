import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(response.data.token, response.data.user);
      window.location.href = '/';
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="p-2 mb-4 border border-gray-300 rounded" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="p-2 mb-4 border border-gray-300 rounded" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
