import React, { useState, useEffect } from "react";
import axios from "axios";
import OrganizationForm from "./OrganizationForm";
import MemberList from "./MemberList";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL;

const Teams = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await axios.get(`${API_URL}/organizations/`);
        setOrganizations(res.data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };
    fetchOrgs();
  }, []);

  return (
     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Sidebar />
      <div className="pl-0 lg:pl-64 transition-all duration-300">
        <Navbar />


        <main className="max-w-7xl mx-auto text-center"> 
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600 mb-6 sm:mb-8 lg:mb-10 tracking-tight leading-tight">
            Teams & Organizations
          </h1>

        
          <div className="mb-8"> 
            <OrganizationForm />
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4 text-center">
              Select Organization
            </h2>

            <select
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="block w-full max-w-sm sm:max-w-md mx-auto p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">-- Select an Organization --</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

        
          {selectedOrgId && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <MemberList orgId={selectedOrgId} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Teams;
