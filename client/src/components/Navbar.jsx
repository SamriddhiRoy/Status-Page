import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token"); // or sessionStorage.removeItem("token");

    // Redirect the user to the login page
    navigate("/"); // Assuming / is the login route
  };

  return (
    <header className="w-full h-16 bg-gradient-to-r from-blue-200 to-blue-300 shadow-md flex items-center justify-between px-6 text-gray-800">
      <h1 className="text-xl font-semibold"></h1>
      <div className="relative flex items-center space-x-4">
        {/* Profile Icon with Dropdown */}
        <div
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>AB</span>
        </div>
        {dropdownOpen && (
          <div className="absolute top-12 right-0 bg-white text-gray-800 rounded-lg shadow-lg w-48 py-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;





