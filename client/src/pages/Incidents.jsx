import React, { useState, useEffect } from "react";
import axios from "axios";
import Label from "../components/ui/label"; // Assuming Label.jsx

import Input from "../components/ui/input";   // Assuming Input.jsx

import Button from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import Select from 'react-select';

import emailjs from "emailjs-com";

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [formIncident, setFormIncident] = useState({
    title: "",
    description: "",
    status: "investigating",
    services: [],
    type: "incident",
    email: "",
  });
  const [editingIncidentId, setEditingIncidentId] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);

  useEffect(() => {
    fetchIncidents();
    fetchAvailableServices();
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get("http://localhost:8001/incidents/");
      setIncidents(res.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const fetchAvailableServices = async () => {
    try {
      const response = await axios.get("http://localhost:8001/services/");
      setAvailableServices(response.data);
    } catch (error) {
      console.error("Error fetching available services:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingIncidentId) {
        const response = await axios.put(`http://localhost:8001/incidents/${editingIncidentId}`, formIncident);
        setIncidents((prev) =>
          prev.map((incident) =>
            incident.id === editingIncidentId ? response.data : incident
          )
        );
        setEditingIncidentId(null);
      } else {
        const response = await axios.post("http://localhost:8001/incidents/", formIncident);
        setIncidents((prev) => [...prev, response.data]);
      }
      setFormIncident({
        title: "",
        description: "",
        status: "investigating",
        services: [],
        type: "incident",
        email: "",
      });
    } catch (error) {
      console.error("Error submitting incident:", error.response ? error.response.data : error.message);
      alert(`Error submitting incident: ${error.response?.data?.detail || error.message}`);
    }
  };

  const sendEmail = (to_email, subject, message) => {
    emailjs.send(
      "service_a3ubtln",
      "template_ef5rfrb",
      {
        to_email,
        subject,
        message,
      },
      "X2AdJAfMlruyyGzgb"
    )
      .then((response) => {
        console.log("✅ Email sent successfully", response.status, response.text);
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("❌ Error sending email", error);
        alert(`Failed to send email: ${error.text || error.message}`);
      });
  };

  const startEditing = (incident) => {
    setEditingIncidentId(incident.id);
    const serviceIds = incident.services.map(serviceName => {
      const service = availableServices.find(s => s.name === serviceName);
      return service ? service.id : serviceName;
    });
    setFormIncident({
      title: incident.title,
      description: incident.description,
      status: incident.status,
      services: serviceIds || [],
      type: incident.type,
      email: incident.email || "",
    });
  };

  const cancelEditing = () => {
    setEditingIncidentId(null);
    setFormIncident({
      title: "",
      description: "",
      status: "investigating",
      services: [],
      type: "incident",
      email: "",
    });
  };

  const deleteIncident = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/incidents/${id}`);
      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
    } catch (error) {
      console.error("Error deleting incident:", error);
      alert(`Error deleting incident: ${error.message}`);
    }
  };

  const serviceOptions = availableServices.map(service => ({
    value: service.id,
    label: service.name
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Sidebar />
      <div className="pl-64"> {/* 👈 add this to offset the sidebar */}
        <Navbar />
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Incident Management</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editingIncidentId ? 'Edit Incident' : 'New Incident'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" value={formIncident.title} onChange={handleFormChange} placeholder="Incident title" />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input name="description" value={formIncident.description} onChange={handleFormChange} placeholder="Description" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" value={formIncident.email} onChange={handleFormChange} placeholder="someone@example.com" />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select name="status" value={formIncident.status} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-md">
              <option value="investigating">Investigating</option>
              <option value="identified">Identified</option>
              <option value="monitoring">Monitoring</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <select name="type" value={formIncident.type} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-md">
              <option value="incident">Incident</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <Label htmlFor="services">Services</Label>
            <Select
              isMulti
              name="services"
              options={serviceOptions}
              value={formIncident.services.map(id => {
                const service = availableServices.find(s => s.id === id);
                return { value: service?.id, label: service?.name };
              })}
              onChange={(selected) => setFormIncident(prev => ({ ...prev, services: selected.map(s => s.value) }))}
              className="z-10"
            />
          </div>
        </div>

      <div className="flex gap-4 mt-6">
  <button
    onClick={handleSubmit}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
  >
    {editingIncidentId ? 'Update' : 'Create'} Incident
  </button>
  {editingIncidentId && (
    <button
      onClick={cancelEditing}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
    >
      Cancel
    </button>
  )}
</div>


      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Incidents</h3>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
           <tbody className="bg-white divide-y divide-gray-200">
  {incidents.map((incident) => (
    <tr key={incident.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {incident.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {incident.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            incident.status === "resolved"
              ? "bg-green-100 text-green-800"
              : incident.status === "monitoring"
              ? "bg-blue-100 text-blue-800"
              : incident.status === "identified"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {incident.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
            incident.type === "maintenance"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {incident.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
  <button
    onClick={() => startEditing(incident)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
  >
    ✏️ Edit
  </button>
  <button
    onClick={() => deleteIncident(incident.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
  >
    🗑️ Delete
  </button>
  {incident.email && (
    <button
      onClick={() => sendEmail(incident.email, incident.title, incident.description)}
      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded transition duration-200"
    >
      📧 Email
    </button>
  )}
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

export default IncidentManagement;
