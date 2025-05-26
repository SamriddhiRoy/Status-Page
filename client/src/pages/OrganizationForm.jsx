import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Added icons for better UX

const OrganizationForm = () => {
  const [orgName, setOrgName] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [editOrgName, setEditOrgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchOrgs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8001/organizations/");
      setOrganizations(res.data);
    } catch (err) {
      console.error("Failed to fetch organizations:", err);
      setError("Failed to load organizations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  // Helper to clear messages after some time
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 3000); // Clear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orgName.trim()) { // Trim to prevent empty string submission
      setError("Organization name cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.post("http://localhost:8001/organizations/", { name: orgName });
      setOrgName("");
      setSuccessMessage("Organization created successfully!");
      fetchOrgs();
    } catch (err) {
      console.error("Failed to create organization:", err);
      setError("Failed to create organization. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrg = async (orgId) => {
    if (!editOrgName.trim()) {
      setError("Organization name cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.put(`http://localhost:8001/organizations/${orgId}`, { name: editOrgName });
      setSelectedOrgId(null); // Hide edit form after save
      setEditOrgName("");
      setSuccessMessage("Organization updated successfully!");
      fetchOrgs();
    } catch (err) {
      console.error("Failed to update organization:", err);
      setError("Failed to update organization. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrg = async (orgId) => {
    if (!window.confirm("Are you sure you want to delete this organization? This action cannot be undone.")) {
      return; // User cancelled
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.delete(`http://localhost:8001/organizations/${orgId}`);
      setSuccessMessage("Organization deleted successfully!");
      fetchOrgs();
    } catch (err) {
      console.error("Failed to delete organization:", err);
      setError("Failed to delete organization. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl rounded-xl max-w-3xl mx-auto mt-10 border border-blue-200">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
  ✨ Organization Management
</h2>

      {/* Loading, Success, Error Messages */}
      {isLoading && (
        <div className="flex items-center justify-center bg-blue-100 text-blue-700 p-3 rounded-lg mb-4 shadow-md">
          <FaSpinner className="animate-spin mr-2 text-xl" />
          <span>Processing request...</span>
        </div>
      )}
      {successMessage && (
        <div className="flex items-center justify-center bg-green-100 text-green-700 p-3 rounded-lg mb-4 shadow-md">
          <FaCheckCircle className="mr-2 text-xl" />
          <span>{successMessage}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center bg-red-100 text-red-700 p-3 rounded-lg mb-4 shadow-md">
          <FaExclamationCircle className="mr-2 text-xl" />
          <span>{error}</span>
        </div>
      )}

      {/* Create Organization Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaPlus className="mr-2 text-blue-500" /> Create New Organization
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaPlus className="mr-2" />}
            Create
          </button>
        </form>
      </div>

      {/* List Organizations */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaEdit className="mr-2 text-indigo-500" /> Your Existing Organizations
        </h3>
        <div className="overflow-x-auto">
          {organizations.length === 0 && !isLoading ? (
            <p className="text-gray-500 text-center py-4">No organizations created yet. Start by adding one above!</p>
          ) : (
            <ul className="space-y-4">
              {organizations.map((org) => (
                <li
                  key={org.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-100 transition duration-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <span className="text-lg font-medium text-gray-800 break-words pr-4 w-full sm:w-auto">
                      {org.name}
                    </span>
                    <div className="flex flex-shrink-0 space-x-2 mt-3 sm:mt-0">
                      {selectedOrgId === org.id ? (
                        <button
                          onClick={() => {
                            setSelectedOrgId(null); // Cancel editing
                            setEditOrgName("");
                          }}
                          className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition duration-200 flex items-center"
                        >
                          <FaTimes className="mr-1" /> Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedOrgId(org.id);
                            setEditOrgName(org.name);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200 flex items-center"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteOrg(org.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200 flex items-center"
                        disabled={isLoading}
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                  {selectedOrgId === org.id && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-200">
                      <input
                        type="text"
                        value={editOrgName}
                        onChange={(e) => setEditOrgName(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        placeholder="New organization name"
                        disabled={isLoading}
                      />
                      <button
                        onClick={() => handleUpdateOrg(org.id)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
                        disabled={isLoading}
                      >
                        {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave className="mr-2" />}
                        Save
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;