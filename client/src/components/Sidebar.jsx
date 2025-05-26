import { Home, Activity, Settings, Users, Group, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-gradient-to-r from-blue-200 to-blue-300 shadow-xl fixed left-0 top-0 z-10 rounded-r-xl">
      <div className="p-6 text-2xl font-bold text-indigo-700 flex items-center">
        <span className="text-3xl mr-2">🔧</span>
        StatusBoard
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4 mt-4 mb-6 flex items-center space-x-4 cursor-pointer hover:bg-indigo-100 transition duration-300 rounded-lg">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold text-gray-800">
          AB
        </div>
        <div className="text-gray-800 font-semibold">Hello, AB</div>
      </div>

      <nav className="mt-6 space-y-2">
        {/* Dashboard Link */}
        <Link
          to="/dashboard"
          className={`flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 rounded-lg text-gray-800 transition duration-300 ${
            location.pathname === "/dashboard" ? "bg-indigo-200 text-white" : ""
          }`}
        >
          <Home className="w-6 h-6 mr-3 text-indigo-600" />
          Dashboard
        </Link>

        {/* Incidents Link */}
        <Link
          to="/incidents"
          className={`flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 rounded-lg text-gray-800 transition duration-300 ${
            location.pathname === "/incidents" ? "bg-indigo-200 text-white" : ""
          }`}
        >
          <Activity className="w-6 h-6 mr-3 text-indigo-600" />
          Incidents
        </Link>

        {/* Services Link */}
        <Link
          to="/services"
          className={`flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 rounded-lg text-gray-800 transition duration-300 ${
            location.pathname === "/services" ? "bg-indigo-200 text-white" : ""
          }`}
        >
          <Settings className="w-6 h-6 mr-3 text-indigo-600" />
          Services
        </Link>

        {/* Teams Link */}
        <Link
          to="/teams"
          className={`flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 rounded-lg text-gray-800 transition duration-300 ${
            location.pathname === "/teams" ? "bg-indigo-200 text-white" : ""
          }`}
        >
          <Users className="w-6 h-6 mr-3 text-indigo-600" />
          Teams
        </Link>

        {/* Public Status Page Link */}
        <Link
          to="/status"
          className={`flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 rounded-lg text-gray-800 transition duration-300 ${
            location.pathname === "/status" ? "bg-indigo-200 text-white" : ""
          }`}
        >
          <Lock className="w-6 h-6 mr-3 text-indigo-600" />
          Public Status Page
        </Link>

        
       
      </nav>
    </aside>
  );
};

export default Sidebar;

