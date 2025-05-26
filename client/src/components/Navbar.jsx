import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="
      w-full h-16
      bg-gradient-to-r from-blue-200 to-blue-300
      shadow-md
      flex items-center justify-end {/* Changed to justify-end */}
      px-4 sm:px-6 lg:px-8
      text-gray-800
      rounded-md mb-8 lg:mb-0 {/* Added rounded-md and responsive margin */}
    ">
     
      <h1 className="text-xl font-semibold"></h1> 

      <div className="relative flex items-center space-x-4">
      
        <div
          className="
            w-10 h-10 bg-gray-100 rounded-full
            flex items-center justify-center
            text-sm font-semibold text-gray-600
            cursor-pointer select-none
            shadow-sm hover:shadow-md transition-shadow duration-200
          "
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen ? "true" : "false"}
        >
          <span>AB</span>
        </div>

        {dropdownOpen && (
          <div className="
            absolute top-12 right-0
            bg-white text-gray-800
            rounded-lg shadow-xl
            w-48 py-2 z-10
            transform origin-top-right transition-all duration-200
            scale-100 opacity-100
          ">
            <button
              onClick={handleLogout}
              className="
                block w-full text-left
                px-4 py-2
                hover:bg-gray-100 hover:text-blue-600
                transition duration-200 ease-in-out
              "
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