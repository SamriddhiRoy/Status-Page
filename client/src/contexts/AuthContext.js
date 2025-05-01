// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Load user when token exists
//   useEffect(() => {
//     const loadUser = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const response = await axios.get('http://localhost:5000/api/auth/me', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           setUser(response.data);
//         } catch (error) {
//           console.error("Error loading user:", error);
//           localStorage.removeItem('token'); // Clear invalid token
//         }
//       }
//       setLoading(false);
//     };

//     loadUser();
//   }, []);

//   const login = (token, userData) => {
//     localStorage.setItem('token', token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   // New function to update user data
//   const updateUser = (updatedData) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       ...updatedData
//     }));
//   };

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         user, 
//         loading, 
//         login, 
//         logout,
//         setUser, // Direct setter
//         updateUser // Partial updater
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load user data from backend
  const loadUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({
        ...response.data,
        // Track previous credits for change detection
        previousCredits: user?.credits || 0
      });
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and token change detection
  useEffect(() => {
    loadUserData();
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem('token', token);
    await loadUserData(); // Refresh user data after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Enhanced update function with credit tracking
  const updateUser = async (updatedData) => {
    try {
      // First update local state for immediate UI response
      setUser(prev => ({
        ...prev,
        ...updatedData,
        previousCredits: prev?.credits || 0
      }));

      // Then verify with server
      await loadUserData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Force refresh user data from server
  const refreshUser = async () => {
    await loadUserData();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout,
        updateUser,
        refreshUser // Add this new function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;