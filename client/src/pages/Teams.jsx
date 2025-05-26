import React, { useState, useEffect } from "react";
import axios from "axios";
import OrganizationForm from "./OrganizationForm";
import MemberList from "./MemberList";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Teams = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await axios.get("http://localhost:8001/organizations/");
        setOrganizations(res.data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };
    fetchOrgs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Sidebar />
      <div className="pl-64"> {/* 👈 offset the sidebar */}
        <Navbar />
        <div className="p-8 max-w-7xl mx-auto text-center">
  <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
    Teams & Organizations
  </h1>



          <OrganizationForm />

          <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
  Select Organization
</h2>

            <select
  onChange={(e) => setSelectedOrgId(e.target.value)}
  className="block w-full max-w-md mx-auto mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">-- Select --</option>
  {organizations.map((org) => (
    <option key={org.id} value={org.id}>
      {org.name}
    </option>
  ))}
</select>


            {selectedOrgId && (
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <MemberList orgId={selectedOrgId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
