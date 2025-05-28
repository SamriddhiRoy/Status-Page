import { useState, useEffect } from 'react';
import axios from 'axios';
import UptimeGraph from '../components/UptimeGraph';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/services/`)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Sidebar />

      <div className="lg:pl-64 transition-all duration-300">
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600 mb-10 text-center tracking-tight leading-tight">
            System Status Dashboard
          </h1>

          {loading && (
            <div className="text-center text-gray-600 text-lg animate-pulse">
              Loading dashboard data...
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 text-center p-4 rounded-lg shadow-md max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-lg mb-8 max-w-4xl mx-auto border border-gray-300 hover:shadow-2xl transform transition duration-300 hover:scale-105">
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center hover:text-blue-800">
                  📊 Service Uptime Overview
                </h2>
                {services.length > 0 ? (
                  <UptimeGraph serviceData={services} />
                ) : (
                  <div className="text-center text-gray-500 py-10 text-lg">
                    No service data available. Add services in Service Management.
                  </div>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                🧩 Services Overview
              </h2>

              {services.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow-lg text-center text-gray-500 py-8 text-lg max-w-3xl mx-auto">
                  No services configured yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-gray-100 p-5 rounded-2xl shadow hover:shadow-xl transition duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {service.name}
                        </h3>
                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                            ${service.status === 'Operational' ? 'bg-green-100 text-green-700' : ''}
                            ${['Degraded', 'Partial Outage'].includes(service.status) ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${service.status === 'Major Outage' ? 'bg-red-100 text-red-700' : ''}
                          `}
                        >
                          {service.status === 'Operational' && '✅'}
                          {service.status === 'Degraded' && '⚠️'}
                          {service.status === 'Partial Outage' && '🚧'}
                          {service.status === 'Major Outage' && '❌'}
                          {service.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {service.description || 'No description available.'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
