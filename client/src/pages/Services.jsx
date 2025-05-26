import React, { useState, useEffect } from "react";
import axios from "axios";
import Label from "../components/ui/label";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [formService, setFormService] = useState({ // Renamed from newService to formService
    name: "",
    description: "",
    status: "Operational",
  });
  const [editingServiceId, setEditingServiceId] = useState(null); // State to hold the ID of the service being edited

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8001/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      // Optional: Add user-facing error message
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingServiceId) {
        // If editingServiceId is set, it's an update operation
        const response = await axios.put(
          `http://localhost:8001/services/${editingServiceId}`,
          formService // Send the data from the form
        );
        setServices((prev) =>
          prev.map((service) =>
            service.id === editingServiceId ? response.data : service
          )
        );
        setEditingServiceId(null); // Clear editing state
      } else {
        // Otherwise, it's a create operation
        const response = await axios.post(
          "http://localhost:8001/services",
          formService // Send the data from the form
        );
        setServices((prev) => [...prev, response.data]);
      }
      // Reset form after create/update
      setFormService({ name: "", description: "", status: "Operational" });
    } catch (error) {
      console.error("Error submitting service:", error.response ? error.response.data : error.message);
      // Optional: Add user-facing error message
    }
  };

  const startEditing = (service) => {
    setEditingServiceId(service.id);
    setFormService({
      name: service.name,
      description: service.description,
      status: service.status,
    });
  };

  const cancelEditing = () => {
    setEditingServiceId(null);
    setFormService({ name: "", description: "", status: "Operational" });
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/services/${id}`);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      // Optional: Add user-facing error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Sidebar />
      <div className="pl-64"> {/* 👈 add this to offset the sidebar */}
        <Navbar />
    <div className="container mx-auto p-4"> {/* Added container for better spacing */}
      <h1 className="text-3xl font-bold mb-6 text-center">Service Management</h1>

      {/* New Service / Edit Service Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingServiceId ? "Edit Service" : "Create New Service"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</Label>
            <Input
              id="name"
              type="text"
              name="name" // Added name prop
              placeholder="Service Name"
              value={formService.name}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <Label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</Label>
            <Input
              id="description"
              type="text"
              name="description" // Added name prop
              placeholder="Service Description"
              value={formService.description}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <Label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</Label>
            <select
              id="status"
              name="status" // Added name prop
              value={formService.status}
              onChange={handleFormChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Operational">Operational</option>
              <option value="Degraded">Degraded</option>
              <option value="Partial Outage">Partial Outage</option>
              <option value="Major Outage">Major Outage</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
            <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {editingServiceId ? "Update Service" : "Create Service"}
            </Button>
            {editingServiceId && (
                <Button
                    onClick={cancelEditing}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </Button>
            )}
        </div>
      </div>

  
        {/* Service List */}
<div className="mt-10">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Services</h3>
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {services.map((service) => (
          <tr key={service.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  service.status === "Operational"
                    ? "bg-green-100 text-green-800"
                    : service.status === "Degraded"
                    ? "bg-yellow-100 text-yellow-800"
                    : service.status === "Partial Outage"
                    ? "bg-orange-100 text-orange-800"
                    : service.status === "Major Outage"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {service.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
              <button
                onClick={() => startEditing(service)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};
export default ServiceManagement;