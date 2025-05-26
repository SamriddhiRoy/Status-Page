import React from "react";
import ServiceStatusList from "../components/ServiceStatusList";
import IncidentTimeline from "../components/IncidentTimeline";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const PublicStatusPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Sidebar />
      <div className="pl-64"> {/* Offset for sidebar */}
        <Navbar />

        <div className="max-w-4xl mx-auto py-10 px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              📡 Status 
            </h1>
            
          </div>

          {/* Light blue background for services card */}
          <div className="bg-blue-50 rounded-xl shadow-md p-6 mb-8 border border-blue-100">
            <ServiceStatusList />
          </div>

          {/* Light yellow background for incidents card */}
          <div className="bg-yellow-50 rounded-xl shadow-md p-6 border border-yellow-100">
            <IncidentTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicStatusPage;

