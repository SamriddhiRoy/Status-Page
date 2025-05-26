import React from "react";
import ServiceStatusList from "../components/ServiceStatusList";
import IncidentTimeline from "../components/IncidentTimeline";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const PublicStatusPage = () => {
  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
   
      <Sidebar />

     
      <div className="lg:pl-64 transition-all duration-300">
        <Navbar />
        <main className="max-w-4xl mx-auto py-4 sm:py-6 lg:py-10 px-0 sm:px-4 lg:px-6"> 
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">

            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-8">📡 System Status </h1>
            
        
          </div>

          <div className="bg-blue-50 rounded-xl shadow-md p-6 sm:p-8 lg:p-10 mb-8 border border-blue-100 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
            <ServiceStatusList />
          </div>

       
          <div className="bg-yellow-50 rounded-xl shadow-md p-6 sm:p-8 lg:p-10 border border-yellow-100 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
            <IncidentTimeline />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PublicStatusPage;

