import { useState } from "react";
import { Home, Activity, Settings, Users, Lock, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
 
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6 text-blue-600" />
      </button>

    
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-gradient-to-r from-blue-200 to-blue-300 shadow-xl transform transition-transform duration-300 rounded-r-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold text-indigo-700 flex items-center">
          <span className="text-3xl mr-2">🔧</span>
          StatusBoard
        </div>

        <div className="px-6 py-4 mt-4 mb-6 flex items-center space-x-4 hover:bg-indigo-100 rounded-lg transition">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold text-gray-800">
            AB
          </div>
          <div className="text-gray-800 font-semibold">Hello, AB</div>
        </div>

        <nav className="mt-6 space-y-2">
          {[
            { to: "/dashboard", icon: <Home />, label: "Dashboard" },
            { to: "/incidents", icon: <Activity />, label: "Incidents" },
            { to: "/services", icon: <Settings />, label: "Services" },
            { to: "/teams", icon: <Users />, label: "Teams" },
            { to: "/status", icon: <Lock />, label: "Public Status Page" },
          ].map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center px-6 py-3 rounded-lg transition duration-300 hover:bg-indigo-300 ${
                location.pathname === to
                  ? "bg-indigo-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="w-6 h-6 mr-3 text-indigo-600">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

